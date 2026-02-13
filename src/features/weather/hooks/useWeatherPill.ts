import { useMemo } from "react";
import {
  assessWeather,
  getOverallSentiment,
} from "@features/weather/utils/weatherAssessment";
import type { Sentiment } from "@features/weather/types";
import type { WeatherHour } from "@/types/weather";
import type { TimePeriod } from "@/types/time";

interface WeatherPillData {
  message: string;
  sentiment: Sentiment;
}

export function useWeatherPill(
  hours: WeatherHour[],
  selectedPeriod: TimePeriod,
): WeatherPillData | null {
  return useMemo(() => {
    const assessments = assessWeather(hours, selectedPeriod);
    if (assessments.length === 0) return null;

    const sentiment = getOverallSentiment(assessments);

    // For bad conditions, use a direct message
    if (sentiment === "bad") {
      return { message: "Probably reschedule", sentiment };
    }

    const cautionAssessment = assessments.find(
      (a) => a.sentiment === "caution",
    );
    const primaryAssessment = cautionAssessment ?? assessments[0];

    return primaryAssessment
      ? {
          message: primaryAssessment.message,
          sentiment: primaryAssessment.sentiment,
        }
      : null;
  }, [hours, selectedPeriod]);
}
