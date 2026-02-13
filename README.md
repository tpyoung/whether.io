# WHETHER.IO MVP

☀️⛈️☔️

## Features

- **Interactive Charts** - Temperature, wind, and precipitation visualized with Chart.js
- **Persistent Preferences** - Location, day, and time period saved to localStorage
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-optimized with carousel view and hamburger menu
- **Data Caching** - TanStack Query handles caching, refetching, and stale data management

## Tech Stack

| Category          | Technology                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | React                                                                                                                  |
| **Language**      | TypeScript                                                                                                             |
| **Build Tool**    | Vite                                                                                                                   |
| **Styling**       | Tailwind                                                                                                               |
| **Data Fetching** | TanStack Query                                                                                                         |
| **Routing**       | TanStack Router                                                                                                        |
| **Charts**        | Chart.js + react-chartjs-2                                                                                             |
| **UI Components** | ShadCn                                                                                                                 |
| **Icons**         | Lucide React + Animated Weather Icons from [Sakta Akbari](https://iconscout.com/contributors/msakta/lottie-animations) |

## Project Structure

**Feature-Driven Architecture** - Code is organized by domain (weather, planning). Each feature is self-contained with its own components, hooks, utilities, and types. Shared code lives in top-level folders (`components/`, `hooks/`, `types/`). Keeps related code together, makes features easier to understand, and simplifies refactoring.

```
src/
├── features/           # Feature-based modules
│   ├── weather/        # Weather data + charts
│   │   ├── api/        # API client
│   │   ├── components/ # Weather-specific UI
│   │   ├── hooks/      # useWeather + useWeatherChart
│   │   └── utils/      # Assessment logic + chart config
│   └── planning/       # User preferences and selectors
│       ├── components/ # Day, time, location selectors
│       ├── hooks/      # useStoredPreferences
│       └── utils/      # Forecast day matching
├── components/         # Shared UI components
│   └── ui/             # shadcn/ui base components
├── types/              # Shared type definitions
├── hooks/              # Shared hooks (useMobile, useDarkMode)
└── routes/             # Page routes
```

## Minor Design Changes

- **Weather Data** - Wind and precipitation amount moved to chart. Replaced with conditions to make information more accessible for screen readers
- **Date Seperation** - Instead of "This {Day} the {nth}", separated to "This {Day}" and date apart

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```
