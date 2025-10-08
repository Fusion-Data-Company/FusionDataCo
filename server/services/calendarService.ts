import { google } from 'googleapis';
import { toZonedTime } from 'date-fns-tz';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-calendar',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Calendar not connected');
  }
  return accessToken;
}

async function getUncachableGoogleCalendarClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// Calendar IDs for team members (using primary for now, can be configured)
const CALENDAR_IDS = {
  ROB: 'primary',
  MAT: 'primary', // Will need to be updated with Mat's calendar ID
  BOTH: 'primary' // Can be a shared team calendar ID
};

export type AttendeeType = 'ROB' | 'MAT' | 'BOTH';

export interface AvailabilitySlot {
  start: string; // ISO 8601
  end: string;   // ISO 8601
}

export interface MeetingEventDetails {
  attendeeType: AttendeeType;
  summary: string;
  description: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  timezone: string;
  attendeeEmail: string;
  attendeeName: string;
}

class CalendarService {
  /**
   * Check availability for a specific attendee or both
   */
  async checkAvailability(
    attendeeType: AttendeeType,
    startDate: Date,
    endDate: Date,
    timezone: string
  ): Promise<AvailabilitySlot[]> {
    try {
      const calendar = await getUncachableGoogleCalendarClient();
      
      const calendarIds: string[] = [];
      if (attendeeType === 'ROB') {
        calendarIds.push(CALENDAR_IDS.ROB);
      } else if (attendeeType === 'MAT') {
        calendarIds.push(CALENDAR_IDS.MAT);
      } else {
        calendarIds.push(CALENDAR_IDS.ROB, CALENDAR_IDS.MAT);
      }

      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString(),
          timeZone: timezone,
          items: calendarIds.map(id => ({ id }))
        }
      });

      // Extract busy periods
      const busySlots: AvailabilitySlot[] = [];
      const calendars = response.data.calendars || {};
      
      for (const calendarId of calendarIds) {
        const calendarData = calendars[calendarId];
        if (calendarData?.busy) {
          busySlots.push(...calendarData.busy.map(slot => ({
            start: slot.start!,
            end: slot.end!
          })));
        }
      }

      // For BOTH type, we need to merge overlapping busy slots
      if (attendeeType === 'BOTH' && busySlots.length > 0) {
        return this.mergeBusySlots(busySlots);
      }

      return busySlots;
    } catch (error) {
      console.error('[CALENDAR] Error checking availability:', error);
      throw error;
    }
  }

  /**
   * Find available slots within a time range
   */
  async findAvailableSlots(
    attendeeType: AttendeeType,
    startDate: Date,
    endDate: Date,
    timezone: string,
    durationMinutes: number = 30,
    maxSlots: number = 5
  ): Promise<AvailabilitySlot[]> {
    const busySlots = await this.checkAvailability(attendeeType, startDate, endDate, timezone);
    
    const availableSlots: AvailabilitySlot[] = [];
    let currentTime = new Date(startDate);

    // Business hours: 9 AM - 5 PM in the requested timezone
    const businessHourStart = 9;
    const businessHourEnd = 17;

    while (currentTime < endDate && availableSlots.length < maxSlots) {
      // Normalize to exact 30-minute boundaries (remove seconds/milliseconds)
      const normalizedTime = new Date(currentTime);
      normalizedTime.setSeconds(0, 0);
      const zonedTime = toZonedTime(normalizedTime, timezone);
      const hour = zonedTime.getHours();
      const minute = zonedTime.getMinutes();
      const dayOfWeek = zonedTime.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Round up to next 30-minute slot if not already aligned
      if (minute !== 0 && minute !== 30) {
        const minutesToAdd = minute < 30 ? (30 - minute) : (60 - minute);
        normalizedTime.setMinutes(normalizedTime.getMinutes() + minutesToAdd);
        currentTime = new Date(normalizedTime);
        continue; // Skip to next iteration with aligned time
      }
      
      // Update currentTime to use normalized version
      currentTime = normalizedTime;
      
      // Only check business hours on weekdays (Monday-Friday)
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= businessHourStart && hour < businessHourEnd) {
        const slotEnd = new Date(currentTime.getTime() + durationMinutes * 60000);
        const zonedEndTime = toZonedTime(slotEnd, timezone);
        const endHour = zonedEndTime.getHours();
        const endMinute = zonedEndTime.getMinutes();
        
        // Ensure the slot END time is also within business hours (strict check: <= 17:00:00.000)
        const slotEndsWithinBusinessHours = endHour < businessHourEnd || 
                                            (endHour === businessHourEnd && endMinute === 0 && 
                                             zonedEndTime.getSeconds() === 0 && zonedEndTime.getMilliseconds() === 0);
        
        if (slotEndsWithinBusinessHours) {
          // Check if this slot conflicts with any busy slot
          const hasConflict = busySlots.some(busy => {
            const busyStart = new Date(busy.start);
            const busyEnd = new Date(busy.end);
            return (currentTime >= busyStart && currentTime < busyEnd) ||
                   (slotEnd > busyStart && slotEnd <= busyEnd) ||
                   (currentTime <= busyStart && slotEnd >= busyEnd);
          });

          if (!hasConflict) {
            availableSlots.push({
              start: currentTime.toISOString(),
              end: slotEnd.toISOString()
            });
          }
        }
      }

      // Move to next 30-minute slot
      currentTime = new Date(currentTime.getTime() + 30 * 60000);
    }

    return availableSlots;
  }

  /**
   * Create a calendar event
   */
  async createMeetingEvent(details: MeetingEventDetails): Promise<{ eventId: string; eventLink: string }> {
    try {
      const calendar = await getUncachableGoogleCalendarClient();
      
      let calendarId = CALENDAR_IDS[details.attendeeType];
      
      // Build attendee list - include internal team members
      const attendees: Array<{ email: string; displayName?: string }> = [
        { email: details.attendeeEmail, displayName: details.attendeeName }
      ];
      
      // Add internal attendees based on meeting type
      // TODO: Replace with actual email addresses
      if (details.attendeeType === 'ROB' || details.attendeeType === 'BOTH') {
        attendees.push({ email: 'rob@fusiondataco.com', displayName: 'Rob' });
      }
      if (details.attendeeType === 'MAT' || details.attendeeType === 'BOTH') {
        attendees.push({ email: 'mat@fusiondataco.com', displayName: 'Mat' });
      }
      
      const event = {
        summary: details.summary,
        description: details.description,
        start: {
          dateTime: details.startTime,
          timeZone: details.timezone
        },
        end: {
          dateTime: details.endTime,
          timeZone: details.timezone
        },
        attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 30 }        // 30 minutes before
          ]
        },
        conferenceData: {
          createRequest: {
            requestId: `fusion-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const response = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        requestBody: event,
        sendUpdates: 'all'
      });

      console.log('[CALENDAR] Event created:', response.data.id);
      return {
        eventId: response.data.id || '',
        eventLink: response.data.htmlLink || ''
      };
    } catch (error) {
      console.error('[CALENDAR] Error creating event:', error);
      throw error;
    }
  }

  /**
   * Merge overlapping busy slots
   */
  private mergeBusySlots(slots: AvailabilitySlot[]): AvailabilitySlot[] {
    if (slots.length === 0) return [];

    const sorted = slots.sort((a, b) => 
      new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    const merged: AvailabilitySlot[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i];
      const lastMerged = merged[merged.length - 1];

      if (new Date(current.start) <= new Date(lastMerged.end)) {
        lastMerged.end = new Date(Math.max(
          new Date(lastMerged.end).getTime(),
          new Date(current.end).getTime()
        )).toISOString();
      } else {
        merged.push(current);
      }
    }

    return merged;
  }
}

export const calendarService = new CalendarService();
