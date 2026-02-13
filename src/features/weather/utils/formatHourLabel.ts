export function getHourFromWeatherHour(datetime: string): number {
  return parseInt(datetime.split(":")[0] ?? "0");
}

/**
 * Formats a datetime string (e.g., "14:00:00") to 12-hour format (e.g., "2:00")
 */
export function formatHourLabel(datetime: string): string {
  const hour = getHourFromWeatherHour(datetime);
  if (hour === 0 || hour === 12) return "12:00";
  return hour > 12 ? `${hour - 12}:00` : `${hour}:00`;
}
