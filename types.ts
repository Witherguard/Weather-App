export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'night' | 'stormy';

export type DetailType = 'humidity' | 'wind' | 'feelsLike' | 'uv';

export interface WeatherData {
  city: string;
  temp: number;
  condition: WeatherCondition;
  description: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
}

export interface DayPart {
  temp: number;
  condition: WeatherCondition;
  precipChance: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  icon: WeatherCondition;
  high: number;
  low: number;
  summary: string;
  details: {
    morning: DayPart;
    afternoon: DayPart;
    evening: DayPart;
    night: DayPart;
  };
}

export interface WeatherTrend {
  type: 'warming' | 'cooling' | 'stable' | 'wetter' | 'drier';
  description: string;
}
