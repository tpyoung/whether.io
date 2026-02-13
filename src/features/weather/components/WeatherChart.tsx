import { useRef } from "react";
import { Line } from "react-chartjs-2";
import { useWeatherChart } from "@features/weather/hooks/useWeatherChart";
import type { WeatherHour } from '@/types/weather'
import type { TimePeriod } from "@/types/time";
import type { Chart as ChartJS } from "chart.js";

import "@features/weather/utils/chartConfig";

interface WeatherChartProps {
  hours: WeatherHour[];
  selectedPeriod: TimePeriod;
  className?: string;
}

export function WeatherChart({
  hours,
  selectedPeriod,
  className,
}: WeatherChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const { data, options, containerRef } = useWeatherChart(hours, selectedPeriod);

  const periodLabel =
    selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Chart container - minimum width for responsiveness of centered hour range */}
        <div className="min-w-[1000px] sm:min-w-[1250px] md:min-w-[2000px] h-[30vh] md:h-[30vh] lg:h-[45vh]"> 
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
      <p className="text-center text-muted-foreground text-sm mt-2 uppercase tracking-wider">
        {periodLabel}
      </p>
    </div>
  );
}
