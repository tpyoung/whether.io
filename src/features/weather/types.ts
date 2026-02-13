import type { WeatherDay } from "@/types/weather";

export type Sentiment = "good" | "caution" | "bad";

export interface WeatherResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: WeatherDay[];
  stations?: Record<string, unknown>;
}
