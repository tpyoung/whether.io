import { useLottie } from "lottie-react";

import sun from "@/assets/lottie/sun.json";
import moon from "@/assets/lottie/moon.json";
import cloudy from "@/assets/lottie/cloudy.json";
import cloudSun from "@/assets/lottie/cloud-sun.json";
import cloudMoon from "@/assets/lottie/cloud-moon.json";
import cloudRain from "@/assets/lottie/cloud-rain.json";
import cloudHeavyRain from "@/assets/lottie/cloud-heavy-rain.json";
import cloudSunRain from "@/assets/lottie/cloud-sun-rain.json";
import cloudMoonRain from "@/assets/lottie/cloud-moon-rain.json";
import snow from "@/assets/lottie/snow.json";
import cloudSnow from "@/assets/lottie/cloud-snow.json";
import cloudSunSnow from "@/assets/lottie/cloud-sun-snow.json";
import cloudMoonSnow from "@/assets/lottie/cloud-moon-snow.json";
import wind from "@/assets/lottie/wind.json";
import cloudWind from "@/assets/lottie/cloud-wind.json";
import cloudThunder from "@/assets/lottie/cloud-thunder.json";
import cloudThunderRain from "@/assets/lottie/cloud-thunder-rain.json";
import cloudSunThunder from "@/assets/lottie/cloud-sun-thunder.json";
import cloudMoonThunder from "@/assets/lottie/cloud-moon-thunder.json";

// Lottie animation data type - using object since different animations have varying structures
type LottieAnimationData = object;

const iconMap: Record<string, LottieAnimationData> = {
  "clear-day": sun,
  "clear-night": moon,
  cloudy: cloudy,
  "partly-cloudy-day": cloudSun,
  "partly-cloudy-night": cloudMoon,
  rain: cloudRain,
  "showers-day": cloudSunRain,
  "showers-night": cloudMoonRain,
  thunder: cloudThunder,
  "thunder-rain": cloudThunderRain,
  "thunder-showers-day": cloudSunThunder,
  "thunder-showers-night": cloudMoonThunder,
  snow: snow,
  "snow-showers-day": cloudSunSnow,
  "snow-showers-night": cloudMoonSnow,
  wind: wind,
  fog: cloudy,
};

const conditionMap: Record<string, LottieAnimationData> = {
  clear: sun,
  sunny: sun,
  "partially cloudy": cloudSun,
  overcast: cloudy,
  rain: cloudRain,
  "light rain": cloudSunRain,
  "heavy rain": cloudHeavyRain,
  drizzle: cloudRain,
  snow: snow,
  "light snow": cloudSnow,
  "heavy snow": cloudSnow,
  sleet: cloudSnow,
  thunderstorm: cloudThunderRain,
  windy: wind,
  breezy: cloudWind,
  fog: cloudy,
  mist: cloudy,
  haze: cloudy,
};

interface WeatherIconProps {
  icon?: string;
  condition?: string;
  size?: number;
  className?: string;
}

export function WeatherIcon({
  icon,
  condition,
  size = 136,
  className,
}: WeatherIconProps) {
  let animationData = icon ? iconMap[icon] : undefined;

  if (!animationData && condition) {
    const normalizedCondition = condition.toLowerCase();
    animationData = conditionMap[normalizedCondition];

    if (!animationData) {
      for (const [key, value] of Object.entries(conditionMap)) {
        if (normalizedCondition.includes(key) || key.includes(normalizedCondition)) {
          animationData = value;
          break;
        }
      }
    }
  }

  if (!animationData) {
    animationData = sun;
  }

  const { View } = useLottie({
    animationData,
    style: {
      width: size,
      height: size,
    },
  });

  return <div className={className}>{View}</div>;
}
