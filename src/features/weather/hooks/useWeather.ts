import { useQuery } from "@tanstack/react-query";
import {
  fetchForecast,
  WeatherApiError,
} from "@features/weather/api/weather.api";
import type { WeatherResponse } from "@features/weather/types";

export const weatherKeys = {
  all: ["weather"] as const,
  forecast: (location: string) =>
    [...weatherKeys.all, "forecast", location] as const,
};

interface UseWeatherOptions {
  enabled?: boolean;
  include?: string; // e.g. "days,hours"
}

/**
 * Fetch and cache weather forecast for a location
 * - Caches for 10 minutes (weather doesn't change rapidly)
 * - Retries 2 times on failure
 * - Refetches when window regains focus
 */
export function useWeather(location: string, options?: UseWeatherOptions) {
  const normalizedLocation = location.trim().toLowerCase();

  return useQuery<WeatherResponse, WeatherApiError>({
    queryKey: weatherKeys.forecast(normalizedLocation),
    queryFn: () =>
      fetchForecast({
        location: normalizedLocation,
        include: options?.include,
      }),
    enabled: Boolean(normalizedLocation) && (options?.enabled ?? true),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
