import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Types matching backend schema
export type AttendeeType = "ROB" | "MAT" | "BOTH";

export interface TimeSlot {
  startTime: string; // ISO datetime string
  endTime: string; // ISO datetime string
  duration: number; // minutes
  available: boolean;
}

export interface MeetingAvailabilityParams {
  attendeeType: AttendeeType;
  startDate: string; // ISO date string
  timezone: string;
}

export interface CreateMeetingRequest {
  attendeeType: AttendeeType;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  preferredDateTime: string; // ISO datetime string
  timezone: string;
  duration: number;
  meetingPurpose?: string;
  notes?: string;
}

export interface MeetingResponse {
  id: number;
  attendeeType: AttendeeType;
  attendeeName: string;
  attendeeEmail: string;
  preferredDateTime: string;
  timezone: string;
  duration: number;
  status: string;
  googleEventId?: string;
  googleEventLink?: string;
  createdAt: string;
}

// Hook to fetch meeting availability
export function useMeetingAvailability(
  attendeeType: AttendeeType | null,
  startDate: string | null,
  timezone: string
) {
  const { toast } = useToast();

  return useQuery<TimeSlot[]>({
    queryKey: ["/api/meetings/availability", attendeeType, startDate, timezone],
    enabled: !!attendeeType && !!startDate && !!timezone,
    queryFn: async () => {
      if (!attendeeType || !startDate) {
        return [];
      }

      const params = new URLSearchParams({
        attendeeType,
        startDate,
        timezone,
      });

      try {
        const response = await apiRequest(
          `/api/meetings/availability?${params.toString()}`
        );
        return await response.json();
      } catch (error) {
        toast({
          title: "Failed to load availability",
          description: "Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

// Hook to create a meeting
export function useCreateMeeting() {
  const { toast } = useToast();

  return useMutation<MeetingResponse, Error, CreateMeetingRequest>({
    mutationFn: async (meetingData: CreateMeetingRequest) => {
      const response = await apiRequest("/api/meetings", {
        method: "POST",
        body: JSON.stringify(meetingData),
      });
      return await response.json();
    },
    onSuccess: (data) => {
      // Invalidate availability queries to refresh calendar
      queryClient.invalidateQueries({
        queryKey: ["/api/meetings/availability"],
      });

      toast({
        title: "Meeting booked successfully!",
        description: "Check your email for calendar invite and meeting link.",
      });
    },
    onError: (error) => {
      console.error("Meeting creation error:", error);
      toast({
        title: "Booking failed",
        description:
          error.message || "Unable to book meeting. Please try again.",
        variant: "destructive",
      });
    },
  });
}
