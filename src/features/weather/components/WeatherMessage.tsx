import { useMemo } from "react";
import { SENTIMENT_STYLES } from "@features/weather/constants";
import { useWeatherPill } from "@features/weather/hooks/useWeatherPill";
import { assessWeather, getOverallSentiment } from "@features/weather/utils/weatherAssessment";
import type { WeatherHour} from "@/types/weather"
import type { TimePeriod } from "@/types/time";

interface WeatherMessageProps {
  hours: WeatherHour[];
  selectedPeriod: TimePeriod;
  className?: string;
}

const sentimentLabels = {
  good: "Great day for outdoor activities",
  caution: "Check conditions before heading out",
  bad: "Probably reschedule",
};

export function WeatherMessage({
  hours,
  selectedPeriod,
  className,
}: WeatherMessageProps) {
  const assessments = useMemo(
    () => assessWeather(hours, selectedPeriod),
    [hours, selectedPeriod]
  );

  const overallSentiment = useMemo(
    () => getOverallSentiment(assessments),
    [assessments]
  );

  if (assessments.length === 0) return null;

  return (
    <div className={`flex items-center flex-col ${className ?? ""}`}>
      <p
        className={`text-xs font-medium px-3 py-1 rounded-full border ${SENTIMENT_STYLES[overallSentiment]}`}
      >
        {sentimentLabels[overallSentiment]}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {assessments.map((assessment, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${SENTIMENT_STYLES[assessment.sentiment]}`}
          >
            {assessment.message}
          </span>
        ))}
      </div>
    </div>
  );
}

interface WeatherPillProps {
  hours: WeatherHour[];
  selectedPeriod: TimePeriod;
}

export function WeatherPill({ hours, selectedPeriod }: WeatherPillProps) {
  const pill = useWeatherPill(hours, selectedPeriod);

  if (!pill) return null;

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border ${SENTIMENT_STYLES[pill.sentiment]}`}
    >
      {pill.message}
    </span>
  );
}
