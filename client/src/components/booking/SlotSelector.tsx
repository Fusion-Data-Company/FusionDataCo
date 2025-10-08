import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin } from "lucide-react";
import { useMeetingAvailability, AttendeeType, TimeSlot } from "@/lib/meetings";

interface SlotSelectorProps {
  attendeeType: AttendeeType;
  onSlotSelect: (slot: TimeSlot) => void;
  leadTimezone?: string;
}

// Common timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Phoenix", label: "Arizona (MT - No DST)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
];

export function SlotSelector({ attendeeType, onSlotSelect, leadTimezone }: SlotSelectorProps) {
  // Auto-detect timezone
  const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState(leadTimezone || detectedTimezone);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Update timezone if leadTimezone changes
  useEffect(() => {
    if (leadTimezone) {
      setTimezone(leadTimezone);
    }
  }, [leadTimezone]);

  // Format date for API (YYYY-MM-DD)
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  // Fetch available slots
  const { data: slots, isLoading } = useMeetingAvailability(
    attendeeType,
    formattedDate,
    timezone
  );

  // Format slot time for display
  const formatSlotTime = (slot: TimeSlot) => {
    const date = new Date(slot.startTime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    });
  };

  // Disable past dates
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="space-y-6">
      {/* Timezone Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2 text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          Your Timezone
        </label>
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger data-testid="select-timezone">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Select a Date
        </label>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={disabledDates}
            className="rounded-md border border-border"
            data-testid="calendar-date-picker"
          />
        </div>
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Available Times
          </label>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : slots && slots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slots
                .filter((slot) => slot.available)
                .map((slot) => {
                  const timeKey = new Date(slot.startTime).toISOString();
                  return (
                    <Card
                      key={timeKey}
                      className="cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => onSlotSelect(slot)}
                      data-testid={`slot-${formatSlotTime(slot)}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">
                              {formatSlotTime(slot)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {slot.duration} minutes
                            </p>
                          </div>
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No available slots for this date. Please try another day.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
