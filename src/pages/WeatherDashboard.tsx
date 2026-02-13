import { useMemo } from "react";
import { useWeather, ChartLegend } from "@/features/weather";
import {
  DaySelector,
  LocationInput,
  TimePeriodSelector,
  useStoredPreferences,
} from "@/features/planning";
import { HelpModal } from "@/components/HelpModal";
import { MobileMenu } from "@/components/MobileMenu";
import { findDaysInForecast, getExtendedHours } from "@/features/planning/utils/dayForecast";
import { SignOutButton } from "@/features/auth";
import { useIsMobile } from "@/hooks/useMobile";
import { WeatherCard } from "@/features/weather/components/WeatherCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";



export function WeatherDashboard() {
  const {
    selectedDay,
    setSelectedDay,
    selectedPeriod,
    setSelectedPeriod,
    location,
    setLocation,
  } = useStoredPreferences();
  const isMobile = useIsMobile();

  const { data, isLoading } = useWeather(location);
  const { thisWeek, nextWeek } = useMemo(
    () => findDaysInForecast(data?.days, selectedDay),
    [data?.days, selectedDay]
  );

  const thisWeekHours = useMemo(() => getExtendedHours(thisWeek), [thisWeek]);
  const nextWeekHours = useMemo(() => getExtendedHours(nextWeek), [nextWeek]);

  const dayLabel = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);

  return (
    <div className="bg-background min-h-screen text-foreground p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">WHETHER.IO</h1>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <div className="flex gap-x-4 items-center">
            <HelpModal />
            <SignOutButton />
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto">
        
        {/* Selectors */}
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <LocationInput
            value={location}
            onChange={setLocation}
            className="w-full sm:w-64"
          />
          <div className="flex gap-x-4 justify-between md:justify-end w-full md:w-auto">
            <DaySelector selected={selectedDay} onChange={setSelectedDay} />
          <TimePeriodSelector
            selected={selectedPeriod}
            onChange={setSelectedPeriod}
          />
          </div>
        </div>

        {/* Two-week comparison */}
        {isLoading ? (
          <div className="h-72 flex items-center justify-center text-muted-foreground">
            <p>Loading Forecast...</p>
          </div>
        ) : !isLoading && (!thisWeek || !nextWeek) ? (
          <div className="h-72 flex flex-col items-center justify-center text-muted-foreground">
            <p>No Weather Data Found</p>
            <p>Try in the format of <span className="font-semibold">New York, NY</span> or <span className="font-semibold">London, UK</span></p>
          </div>
        ) : isMobile ? (
          <Carousel className="w-full">
            <CarouselContent>
              {thisWeek && thisWeekHours.length > 0 && (
                <CarouselItem>
                  <WeatherCard
                    title={`This ${dayLabel}`}
                    match={thisWeek}
                    hours={thisWeekHours}
                    selectedPeriod={selectedPeriod}
                  />
                </CarouselItem>
              )}
              {nextWeek && nextWeekHours.length > 0 && (
                <CarouselItem>
                  <WeatherCard
                    title={`Next ${dayLabel}`}
                    match={nextWeek}
                    hours={nextWeekHours}
                    selectedPeriod={selectedPeriod}
                  />
                </CarouselItem>
              )}
              </CarouselContent>
              <CarouselPrevious className="ml-8" />
              <CarouselNext className="mr-8"/>
          </Carousel>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {thisWeek && thisWeekHours.length > 0 && (
              <WeatherCard
                title={`This ${dayLabel}`}
                match={thisWeek}
                hours={thisWeekHours}
                selectedPeriod={selectedPeriod}
              />
            )}
            {nextWeek && nextWeekHours.length > 0 && (
              <WeatherCard
                title={`Next ${dayLabel}`}
                match={nextWeek}
                hours={nextWeekHours}
                selectedPeriod={selectedPeriod}
              />
            )}
          </div>
        )}

        <ChartLegend />
      </div>
    </div>
  );
}
