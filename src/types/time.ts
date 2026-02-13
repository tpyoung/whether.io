import type { WeatherDay } from "./weather";

export type TimePeriod = "morning" | "afternoon" | "evening";

export interface DayMatch {
  day: WeatherDay;
  nextDay: WeatherDay | undefined;
  index: number;
  label: string;
}
