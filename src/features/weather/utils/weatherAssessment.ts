import { TIME_PERIODS } from "@features/weather/constants";
import { getHourFromWeatherHour } from "@features/weather/utils/formatHourLabel";
import type { Sentiment } from "@features/weather/types";
import type { WeatherHour } from "@/types/weather";
import type { TimePeriod } from "@/types/time";

export interface Assessment {
  message: string;
  sentiment: Sentiment;
}

export function assessWeather(
  hours: WeatherHour[],
  period: TimePeriod,
): Assessment[] {
  const timeRange = TIME_PERIODS[period];
  const periodHours = hours.filter((h) => {
    const hour = getHourFromWeatherHour(h.datetime);
    return hour >= timeRange.start && hour <= timeRange.end;
  });

  if (periodHours.length === 0) return [];

  const assessments: Assessment[] = [];

  // Calculate averages
  const avgTemp =
    periodHours.reduce((sum, h) => sum + h.temp, 0) / periodHours.length;
  const avgHumidity =
    periodHours.reduce((sum, h) => sum + h.humidity, 0) / periodHours.length;
  const avgWind =
    periodHours.reduce((sum, h) => sum + h.windspeed, 0) / periodHours.length;
  const maxPrecipProb = Math.max(...periodHours.map((h) => h.precipprob));

  // Temperature assessment
  if (avgTemp >= 60 && avgTemp <= 75) {
    assessments.push({ message: "Perfect out!", sentiment: "good" });
  } else if (avgTemp < 50) {
    assessments.push({ message: "Bundle up!", sentiment: "caution" });
  } else if (avgTemp > 85) {
    assessments.push({ message: "Too hot!", sentiment: "caution" });
  } else if (avgTemp > 75 && avgTemp <= 85) {
    assessments.push({ message: "A little warm", sentiment: "good" });
  } else if (avgTemp >= 50 && avgTemp < 60) {
    assessments.push({ message: "Cool weather", sentiment: "good" });
  }

  // Precipitation assessment
  if (maxPrecipProb >= 70) {
    assessments.push({ message: "Probably rainy", sentiment: "bad" });
  } else if (maxPrecipProb >= 40) {
    assessments.push({ message: "Maybe some rain", sentiment: "caution" });
  } else if (maxPrecipProb < 20) {
    assessments.push({ message: "Not rainy!", sentiment: "good" });
  }

  // Wind assessment
  if (avgWind > 19) {
    assessments.push({ message: "Very windy!", sentiment: "bad" });
  } else if (avgWind > 12) {
    assessments.push({ message: "Pretty breezy", sentiment: "caution" });
  } else if (avgWind <= 8) {
    assessments.push({ message: "Light winds", sentiment: "good" });
  }

  // Humidity assessment
  if (avgHumidity > 80) {
    assessments.push({ message: "Really humid!", sentiment: "caution" });
  }

  return assessments;
}

export function getOverallSentiment(assessments: Assessment[]): Sentiment {
  if (assessments.some((a) => a.sentiment === "bad")) return "bad";
  if (assessments.some((a) => a.sentiment === "caution")) return "caution";
  return "good";
}
