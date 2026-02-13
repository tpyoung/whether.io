import type { WeatherResponse } from "@features/weather/types";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "WeatherApiError";
  }
}

interface ForecastOptions {
  location: string;
  days?: number;
  include?: string;
}

// Fetch weather forecast for a location
export async function fetchForecast({
  location,
  include = "days,hours",
}: ForecastOptions): Promise<WeatherResponse> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new WeatherApiError(
      "Missing VITE_WEATHER_API_KEY environment variable",
    );
  }

  const params = new URLSearchParams({
    key: apiKey,
    unitGroup: "us",
    include,
  });

  const url = `${BASE_URL}${encodeURIComponent(location)}?${params}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new WeatherApiError("Network error - check your connection");
  }

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new WeatherApiError(message, response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new WeatherApiError("Invalid response from weather API");
  }
}
