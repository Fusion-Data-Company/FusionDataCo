import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users } from "lucide-react";
import { SlotSelector } from "./SlotSelector";
import { BookingConfirmation } from "./BookingConfirmation";
import { useCreateMeeting, AttendeeType, TimeSlot } from "@/lib/meetings";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadContext: {
    name: string;
    email: string;
    phone?: string;
  };
}

export function BookingDialog({ isOpen, onClose, leadContext }: BookingDialogProps) {
  const [selectedAttendee, setSelectedAttendee] = useState<AttendeeType | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookedMeeting, setBookedMeeting] = useState<any | null>(null);

  const createMeeting = useCreateMeeting();

  const handleSlotSelect = async (slot: TimeSlot) => {
    if (!selectedAttendee) return;

    setSelectedSlot(slot);

    // Create meeting
    try {
      const result = await createMeeting.mutateAsync({
        attendeeType: selectedAttendee,
        attendeeName: leadContext.name,
        attendeeEmail: leadContext.email,
        attendeePhone: leadContext.phone,
        preferredDateTime: slot.startTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        duration: slot.duration,
      });

      setBookedMeeting({
        time: result.preferredDateTime,
        eventLink: result.googleEventLink,
        attendeeType: result.attendeeType,
        attendeeName: result.attendeeName,
      });
    } catch (error) {
      console.error("Failed to create meeting:", error);
      // Error toast is handled by the hook
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setSelectedAttendee(null);
    setSelectedSlot(null);
    setBookedMeeting(null);
    onClose();
  };

  const attendeeOptions = [
    {
      type: "ROB" as AttendeeType,
      label: "Meet Rob",
      name: "Robert Yeager",
      role: "CEO & Co-Founder",
      description: "Strategy, sales, and business growth",
      testId: "button-meet-rob",
    },
    {
      type: "MAT" as AttendeeType,
      label: "Meet Mat",
      name: "Mat Austin",
      role: "CTO & Co-Founder",
      description: "Technical implementation and automation",
      testId: "button-meet-mat",
    },
    {
      type: "BOTH" as AttendeeType,
      label: "Meet Rob & Mat",
      name: "Rob & Mat",
      role: "Complete Team",
      description: "Comprehensive strategy and technical overview",
      testId: "button-meet-both",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!bookedMeeting ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {!selectedAttendee ? "Choose Your Meeting" : "Select a Time"}
              </DialogTitle>
              <DialogDescription>
                {!selectedAttendee ? (
                  // Pain Section - Sandler Structure
                  <span className="text-base">
                    Stop waiting days for callbacks. Book your consultation instantly and get the answers you need.
                  </span>
                ) : (
                  // Info Section - Sandler Structure
                  <span className="text-base">
                    Pick a time that works best for you. All times are shown in your local timezone.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {!selectedAttendee ? (
                // Attendee Selection
                <div className="space-y-3">
                  {attendeeOptions.map((option) => (
                    <Card
                      key={option.type}
                      className="cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => setSelectedAttendee(option.type)}
                      data-testid={option.testId}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            {option.type === "BOTH" ? (
                              <Users className="h-6 w-6 text-primary" />
                            ) : (
                              <User className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {option.label}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {option.role}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                // Slot Selection
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Meeting with
                      </p>
                      <p className="font-semibold text-foreground">
                        {
                          attendeeOptions.find((opt) => opt.type === selectedAttendee)
                            ?.name
                        }
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAttendee(null)}
                      data-testid="button-change-attendee"
                    >
                      Change
                    </Button>
                  </div>

                  <SlotSelector
                    attendeeType={selectedAttendee}
                    onSlotSelect={handleSlotSelect}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          // Good News Section - Sandler Structure
          <>
            <DialogHeader>
              <DialogTitle className="sr-only">Booking Confirmed</DialogTitle>
            </DialogHeader>
            <BookingConfirmation meetingDetails={bookedMeeting} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
