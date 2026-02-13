import { TimePeriod } from "@/types/time";
import type { DayOfWeek } from "./types";

export const DEFAULT_LOCATION = "New York, NY";

export const DAY_TO_INDEX: Record<DayOfWeek, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export const STORAGE_KEYS = {
  day: "whether-selected-day",
  period: "whether-selected-period",
  location: "whether-selected-location",
} as const;

export const VALID_DAYS: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const VALID_PERIODS: TimePeriod[] = ["morning", "afternoon", "evening"];
