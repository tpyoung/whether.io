import { useState, useEffect } from "react";
import type { TimePeriod } from "@/types/time";
import type { DayOfWeek } from "@features/planning/types";
import {
  STORAGE_KEYS,
  VALID_DAYS,
  VALID_PERIODS,
  DEFAULT_LOCATION,
} from "@features/planning/constants";

function getStoredDay(): DayOfWeek {
  const stored = localStorage.getItem(STORAGE_KEYS.day);
  return VALID_DAYS.includes(stored as DayOfWeek)
    ? (stored as DayOfWeek)
    : "friday";
}

function getStoredPeriod(): TimePeriod {
  const stored = localStorage.getItem(STORAGE_KEYS.period);
  return VALID_PERIODS.includes(stored as TimePeriod)
    ? (stored as TimePeriod)
    : "afternoon";
}

function getStoredLocation(): string {
  return localStorage.getItem(STORAGE_KEYS.location) || DEFAULT_LOCATION;
}

export function useStoredPreferences() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getStoredDay);
  const [selectedPeriod, setSelectedPeriod] =
    useState<TimePeriod>(getStoredPeriod);
  const [location, setLocation] = useState<string>(getStoredLocation);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.day, selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.period, selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.location, location);
  }, [location]);

  return {
    selectedDay,
    setSelectedDay,
    selectedPeriod,
    setSelectedPeriod,
    location,
    setLocation,
  };
}
