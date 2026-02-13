import { useMemo } from "react";
import { WeatherIcon } from "./WeatherIcon";
import { getMostCommon } from "@/lib/utils";
import { TIME_PERIODS } from "@features/weather/constants";
import { getHourFromWeatherHour } from "@features/weather/utils/formatHourLabel";
import type { WeatherHour} from "@/types/weather"
import type { TimePeriod } from "@/types/time";

interface WeatherSummaryProps {
  hours: WeatherHour[];
  selectedPeriod: TimePeriod;
  className?: string;
}

// Summarizes the weather for the selected time period (morning, afternoon, evening)
export function WeatherSummary({
  hours,
  selectedPeriod,
  className,
}: WeatherSummaryProps) {
  const periodData = useMemo(() => {
    const period = TIME_PERIODS[selectedPeriod];

    // Filter hours to selected time period
    const periodHours = hours.filter((h) => {
      const hour = getHourFromWeatherHour(h.datetime);
      return hour >= period.start && hour <= period.end;
    });

    if (periodHours.length === 0) return null;

    const avgTemp =
      periodHours.reduce((sum, h) => sum + h.temp, 0) / periodHours.length;

    const icon = getMostCommon(periodHours.map((h) => h.icon));
    const conditions = getMostCommon(periodHours.map((h) => h.conditions));

    return { avgTemp, icon, conditions };
  }, [hours, selectedPeriod]);

  if (!periodData) return null;

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <WeatherIcon
        icon={periodData.icon}
        condition={periodData.conditions}
      />
      <div>
        <p className="text-4xl font-light">{Math.round(periodData.avgTemp)}°</p>
        <p className="text-muted-foreground">{periodData.conditions}</p>
      </div>
    </div>
  );
}
