import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, CheckCircle2 } from "lucide-react";
import { AttendeeType } from "@/lib/meetings";

interface BookingConfirmationProps {
  meetingDetails: {
    time: string; // ISO datetime string
    eventLink?: string;
    attendeeType: AttendeeType;
    attendeeName: string;
  };
}

export function BookingConfirmation({ meetingDetails }: BookingConfirmationProps) {
  const { time, eventLink, attendeeType, attendeeName } = meetingDetails;

  // Format the meeting time
  const meetingDate = new Date(time);
  const formattedDate = meetingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = meetingDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Determine who they're meeting with
  const getAttendeeNames = () => {
    switch (attendeeType) {
      case "ROB":
        return "Robert Yeager";
      case "MAT":
        return "Mat Austin";
      case "BOTH":
        return "Robert Yeager and Mat Austin";
      default:
        return "our team";
    }
  };

  // Generate calendar file
  const handleAddToCalendar = () => {
    if (!eventLink) return;
    
    const startTime = new Date(time);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutes later

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Meeting with ${getAttendeeNames()}
DESCRIPTION:Join the meeting: ${eventLink}
LOCATION:${eventLink}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meeting.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-confirmation">
            Meeting Confirmed!
          </h3>
          <p className="text-muted-foreground">
            Great news! Your meeting is scheduled with {getAttendeeNames()}.
          </p>
        </div>
      </div>

      {/* Meeting Details Card */}
      <Card className="border-primary/20 bg-card/50">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">{formattedDate}</p>
                <p className="text-sm text-muted-foreground">{formattedTime}</p>
              </div>
            </div>
          </div>

          {/* Google Meet Link */}
          {eventLink && (
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">
                Join the meeting using this link:
              </p>
              <a
                href={eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group"
                data-testid="link-meet"
              >
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary group-hover:underline">
                  {eventLink}
                </span>
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCalendar}
          className="w-full"
          variant="outline"
          data-testid="button-add-calendar"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
      </div>

      {/* Next Steps - Sandler Good News */}
      <Card className="bg-green-500/5 border-green-500/20">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-3">
            What Happens Next?
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>You'll receive a calendar invite via email with all the details</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>A Google Meet link will be included for easy access</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>We'll discuss your specific needs and show you how we can help</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>No pressure - just an honest conversation about growing your business</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
