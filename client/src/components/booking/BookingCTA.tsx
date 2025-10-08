import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface BookingCTAProps {
  onOpenDialog: () => void;
  leadData?: {
    name?: string;
    email?: string;
  };
}

export function BookingCTA({ onOpenDialog, leadData }: BookingCTAProps) {
  return (
    <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Book Your Meeting Now
              </h3>
            </div>
            <p className="text-muted-foreground">
              Tired of waiting days for callbacks? See our calendar and book instantly.
            </p>
            {leadData?.name && (
              <p className="text-sm text-muted-foreground">
                Thanks {leadData.name}! Schedule your consultation with our team.
              </p>
            )}
          </div>
          <Button
            onClick={onOpenDialog}
            size="lg"
            className="btn-titanium md:flex-shrink-0"
            data-testid="button-view-times"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View Available Times
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
