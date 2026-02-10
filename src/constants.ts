import { WeatherData, ForecastDay, WeatherCondition } from './types';

// Initial state data
export const MOCK_WEATHER_DATA: Record<WeatherCondition, WeatherData> = {
  sunny: {
    city: "San Francisco",
    temp: 72,
    condition: "sunny",
    description: "Mostly Sunny",
    high: 76,
    low: 58,
    humidity: 45,
    windSpeed: 8,
    feelsLike: 74,
    uvIndex: 6
  },
  cloudy: {
    city: "London",
    temp: 64,
    condition: "cloudy",
    description: "Cloudy",
    high: 68,
    low: 55,
    humidity: 72,
    windSpeed: 12,
    feelsLike: 62,
    uvIndex: 2
  },
  rainy: {
    city: "Seattle",
    temp: 58,
    condition: "rainy",
    description: "Heavy Rain",
    high: 60,
    low: 52,
    humidity: 88,
    windSpeed: 15,
    feelsLike: 55,
    uvIndex: 1
  },
  snowy: {
    city: "Reykjavik",
    temp: 28,
    condition: "snowy",
    description: "Light Snow",
    high: 32,
    low: 24,
    humidity: 65,
    windSpeed: 20,
    feelsLike: 18,
    uvIndex: 0
  },
  night: {
    city: "Tokyo",
    temp: 68,
    condition: "night",
    description: "Clear Night",
    high: 75,
    low: 65,
    humidity: 60,
    windSpeed: 5,
    feelsLike: 68,
    uvIndex: 0
  },
  stormy: {
    city: "Miami",
    temp: 82,
    condition: "stormy",
    description: "Thunderstorms",
    high: 85,
    low: 78,
    humidity: 92,
    windSpeed: 28,
    feelsLike: 90,
    uvIndex: 1
  }
};

const createDayDetails = (baseTemp: number, condition: WeatherCondition) => ({
  morning: { temp: baseTemp - 5, condition, precipChance: 10 },
  afternoon: { temp: baseTemp + 5, condition, precipChance: 20 },
  evening: { temp: baseTemp, condition: (condition === 'sunny' ? 'night' : condition) as WeatherCondition, precipChance: 15 },
  night: { temp: baseTemp - 8, condition: 'night' as WeatherCondition, precipChance: 10 },
});

export const MOCK_FORECAST: ForecastDay[] = [
  { 
    day: "Today", 
    date: "Oct 24",
    icon: "sunny", 
    high: 76, 
    low: 58,
    summary: "Clear skies throughout the day with gentle breezes.",
    details: createDayDetails(70, 'sunny')
  },
  { 
    day: "Wed", 
    date: "Oct 25",
    icon: "cloudy", 
    high: 72, 
    low: 59,
    summary: "Overcast clouds in the morning clearing by noon.",
    details: createDayDetails(68, 'cloudy')
  },
  { 
    day: "Thu", 
    date: "Oct 26",
    icon: "rainy", 
    high: 68, 
    low: 55,
    summary: "Light showers expected in the afternoon.",
    details: createDayDetails(62, 'rainy')
  },
  { 
    day: "Fri", 
    date: "Oct 27",
    icon: "sunny", 
    high: 75, 
    low: 60,
    summary: "Sunny and warm, perfect for outdoor activities.",
    details: createDayDetails(72, 'sunny')
  },
  { 
    day: "Sat", 
    date: "Oct 28",
    icon: "night", 
    high: 78, 
    low: 62,
    summary: "A clear, starry night following a warm day.",
    details: createDayDetails(74, 'sunny')
  },
];
