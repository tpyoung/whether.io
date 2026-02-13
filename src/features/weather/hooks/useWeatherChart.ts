import { useMemo, useRef, useEffect } from "react";
import { TIME_PERIODS } from "@features/weather/constants";
import { useDarkMode } from "@/hooks/useDarkMode";
import { formatHourLabel } from "@features/weather/utils/formatHourLabel";
import { getHourFromWeatherHour } from "@features/weather/utils/formatHourLabel";
import {
  CHART_COLORS,
  DATASET_DEFAULTS,
  CHART_TICK_COLORS,
} from "@features/weather/utils/chartConfig";
import type { ChartData, ChartOptions } from "chart.js";
import type { WeatherHour } from "@/types/weather";
import type { TimePeriod } from "@/types/time";

interface PeriodIndices {
  start: number;
  end: number;
}

interface UseWeatherChartResult {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for weather chart functionality.
 * Handles chart data, options, period highlighting, and auto-scrolling.
 */
export function useWeatherChart(
  hours: WeatherHour[],
  selectedPeriod: TimePeriod,
): UseWeatherChartResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark] = useDarkMode();

  // Calculate period indices
  const periodIndices = useMemo((): PeriodIndices => {
    const period = TIME_PERIODS[selectedPeriod];

    const startIdx = hours.findIndex((h) => {
      const hour = getHourFromWeatherHour(h.datetime);
      return hour >= period.start;
    });

    const endIdx = hours.findIndex((h) => {
      const hour = getHourFromWeatherHour(h.datetime);
      return hour > period.end;
    });

    return {
      start: startIdx >= 0 ? startIdx : 0,
      end: endIdx >= 0 ? endIdx : hours.length - 1,
    };
  }, [hours, selectedPeriod]);

  // Build chart data
  const data = useMemo((): ChartData<"line"> => {
    const labels = hours.map((h) => formatHourLabel(h.datetime));
    const temperatureData = hours.map((h) => h.temp);
    const windData = hours.map((h) => h.windspeed);
    const precipData = hours.map((h) => h.precipprob);

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°F)",
          data: temperatureData,
          borderColor: CHART_COLORS.temperature,
          backgroundColor: CHART_COLORS.temperature,
          ...DATASET_DEFAULTS,
        },
        {
          label: "Wind (mph)",
          data: windData,
          borderColor: CHART_COLORS.wind,
          backgroundColor: CHART_COLORS.wind,
          ...DATASET_DEFAULTS,
        },
        {
          label: "Precip (%)",
          data: precipData,
          borderColor: CHART_COLORS.precipitation,
          backgroundColor: CHART_COLORS.precipitation,
          ...DATASET_DEFAULTS,
        },
      ],
    };
  }, [hours]);

  // Build chart options
  const options = useMemo((): ChartOptions<"line"> => {
    const tickColors = isDark
      ? CHART_TICK_COLORS.dark
      : CHART_TICK_COLORS.light;

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            startLine: {
              type: "line",
              xMin: periodIndices.start,
              xMax: periodIndices.start,
              borderColor: CHART_COLORS.annotation,
              borderWidth: 2,
              borderDash: [6, 4],
            },
            endLine: {
              type: "line",
              xMin: periodIndices.end,
              xMax: periodIndices.end,
              borderColor: CHART_COLORS.annotation,
              borderWidth: 2,
              borderDash: [6, 4],
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: (ctx) => {
              const isInPeriod =
                ctx.index >= periodIndices.start &&
                ctx.index <= periodIndices.end;
              return isInPeriod ? tickColors.active : tickColors.inactive;
            },
            font: (ctx) => {
              const isInPeriod =
                ctx.index >= periodIndices.start &&
                ctx.index <= periodIndices.end;
              return {
                size: 11,
                weight: isInPeriod ? "bold" : "normal",
              };
            },
          },
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    };
  }, [periodIndices, isDark]);

  // Auto-scroll to center the selected period
  useEffect(() => {
    if (!containerRef.current || hours.length === 0) return;

    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;

    const periodCenter = (periodIndices.start + periodIndices.end) / 2;
    const centerPixelPosition = (periodCenter / hours.length) * scrollWidth;

    const targetScroll = centerPixelPosition - containerWidth / 2;
    const clampedScroll = Math.max(
      0,
      Math.min(targetScroll, scrollWidth - containerWidth),
    );

    container.scrollTo({
      left: clampedScroll,
      behavior: "smooth",
    });
  }, [periodIndices.start, periodIndices.end, hours.length]);

  return { data, options, containerRef };
}
