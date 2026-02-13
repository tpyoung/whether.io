import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

// Register Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
);

export const CHART_COLORS = {
  temperature: "#ff637e",
  wind: "#00d492",
  precipitation: "#00bcff",
  annotation: "#71717A",
} as const;

export const CHART_TICK_COLORS = {
  light: {
    active: "#484848",
    inactive: "#A1A1AA",
  },
  dark: {
    active: "#d4d3d3",
    inactive: "#71717A",
  },
} as const;

export const DATASET_DEFAULTS = {
  tension: 0.4,
  pointRadius: 0,
  borderWidth: 3,
} as const;
