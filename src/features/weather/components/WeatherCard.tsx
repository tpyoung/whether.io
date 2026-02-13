import {
  WeatherSummary,
  WeatherPill,
  WeatherChart,
} from "@/features/weather";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/useMobile";
import type { WeatherHour } from "@/types/weather";
import type { DayMatch, TimePeriod } from "@/types/time";

interface WeatherCardProps {
  title: string;
  match: DayMatch;
  hours: WeatherHour[];
  selectedPeriod: TimePeriod;
}

export function WeatherCard({ title, match, hours, selectedPeriod }: WeatherCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card>
     <CardContent>
      <div className="mb-4">

       <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h2 className="text-lg font-semibold">{title}</h2>
            {!isMobile && ( <WeatherPill
                hours={match.day.hours ?? []}
                selectedPeriod={selectedPeriod}
            />)}
        </div>
        <span className="text-muted-foreground text-sm font-medium">{match.label}</span>
      </div>
        {isMobile && ( <WeatherPill
            hours={match.day.hours ?? []}
            selectedPeriod={selectedPeriod}
        />)}
    </div>
      <WeatherSummary
        hours={match.day.hours ?? []}
        selectedPeriod={selectedPeriod}
        className="mb-4"
      />
      <WeatherChart hours={hours} selectedPeriod={selectedPeriod} />
     </CardContent>
    </Card>
  );
}