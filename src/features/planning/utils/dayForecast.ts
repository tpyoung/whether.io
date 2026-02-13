import { DAY_TO_INDEX } from "@features/planning/constants";
import type { DayOfWeek } from "@features/planning/types";
import type { DayMatch } from "@/types/time";
import type { WeatherDay } from "@/types/weather";

function createDayMatch(
  days: WeatherDay[],
  index: number,
  dateOverride?: Date,
): DayMatch | null {
  const day = days[index];
  if (!day) return null;

  const date = dateOverride ?? new Date(day.datetime);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const dayNum = date.getDate();

  return {
    day,
    nextDay: days[index + 1],
    index,
    label: `${month} ${dayNum}`,
  };
}

export function findDaysInForecast(
  days: WeatherDay[] | undefined,
  targetDay: DayOfWeek,
): { thisWeek: DayMatch | null; nextWeek: DayMatch | null } {
  if (!days?.length) return { thisWeek: null, nextWeek: null };

  const targetDayIndex = DAY_TO_INDEX[targetDay];

  // Find first matching day, cache parsed Date for reuse
  let firstMatchDate: Date | undefined;
  const firstIndex = days.findIndex((d) => {
    const date = new Date(d.datetime);
    const isMatch = date.getDay() === targetDayIndex;
    if (isMatch) firstMatchDate = date;
    return isMatch;
  });

  if (firstIndex === -1) return { thisWeek: null, nextWeek: null };

  return {
    thisWeek: createDayMatch(days, firstIndex, firstMatchDate),
    nextWeek: createDayMatch(days, firstIndex + 7),
  };
}
// Gets hours for the matched day, plus a few hours of the next day
export function getExtendedHours(match: DayMatch | null) {
  if (!match) return [];
  const EXTRA_MORNING_HOURS = 7;

  const dayHours = match.day.hours ?? [];
  const nextDayHours = match.nextDay?.hours ?? [];
  const nextMorning = nextDayHours.slice(0, EXTRA_MORNING_HOURS);
  return [...dayHours, ...nextMorning];
}
