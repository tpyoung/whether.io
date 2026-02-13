import type { Sentiment } from "./types";
import type { TimePeriod } from "@/types/time";

export const TIME_PERIODS: Record<TimePeriod, { start: number; end: number }> =
  {
    morning: { start: 6, end: 11 },
    afternoon: { start: 12, end: 17 },
    evening: { start: 18, end: 22 },
  };

export const SENTIMENT_STYLES: Record<Sentiment, string> = {
  good: "bg-green-500/20 text-green-400 border-green-500/30",
  caution: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  bad: "bg-red-500/20 text-red-400 border-red-500/30",
};
