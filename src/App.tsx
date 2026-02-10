import React, { useState } from 'react';
import Background from './components/Background';
import WeatherCard from './components/WeatherCard';
import LocationSearch from './components/LocationSearch';
import DetailPanel from './components/DetailPanel';
import ForecastDetailPanel from './components/ForecastDetailPanel';
import { MOCK_WEATHER_DATA, MOCK_FORECAST } from './constants';
import { WeatherCondition, WeatherData, DetailType, ForecastDay } from './types';

const App: React.FC = () => {
  // Start with San Francisco (Sunny) data
  const [weatherData, setWeatherData] = useState<WeatherData>(MOCK_WEATHER_DATA['sunny']);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<DetailType | null>(null);
  const [activeForecastDay, setActiveForecastDay] = useState<ForecastDay | null>(null);

  // Helper function to capitalize city names
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Handle city selection (or manual entry)
  const handleCitySelect = (cityInput: string) => {
    // 1. Check if the city exists in our mock data (case insensitive)
    const existingCityKey = (Object.keys(MOCK_WEATHER_DATA) as WeatherCondition[]).find(
      key => MOCK_WEATHER_DATA[key].city.toLowerCase() === cityInput.toLowerCase()
    );

    if (existingCityKey) {
      setWeatherData(MOCK_WEATHER_DATA[existingCityKey]);
    } else {
      // 2. If not found, GENERATE realistic random weather for this city
      const conditions: WeatherCondition[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'night', 'stormy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      // Generate temp based on condition roughly
      let baseTemp = 70;
      if (randomCondition === 'snowy') baseTemp = 30;
      if (randomCondition === 'rainy') baseTemp = 60;
      if (randomCondition === 'night') baseTemp = 55;
      if (randomCondition === 'sunny') baseTemp = 80;
      if (randomCondition === 'stormy') baseTemp = 75;

      const randomTemp = Math.floor(baseTemp + (Math.random() * 10 - 5));
      
      const descriptions: Record<WeatherCondition, string[]> = {
         sunny: ["Clear Sky", "Sunny", "Mostly Sunny"],
         cloudy: ["Overcast", "Cloudy", "Partly Cloudy"],
         rainy: ["Light Rain", "Showers", "Drizzle"],
         snowy: ["Light Snow", "Flurries", "Snow Showers"],
         night: ["Clear Night", "Moonlight", "Starry"],
         stormy: ["Thunderstorms", "Heavy Rain", "Stormy"]
      };
      
      const possibleDescriptions = descriptions[randomCondition];
      const randomDesc = possibleDescriptions[Math.floor(Math.random() * possibleDescriptions.length)];

      const newWeather: WeatherData = {
        city: capitalize(cityInput),
        temp: randomTemp,
        condition: randomCondition,
        description: randomDesc,
        high: randomTemp + 5,
        low: randomTemp - 8,
        humidity: Math.floor(Math.random() * 60) + 30,
        windSpeed: Math.floor(Math.random() * 20) + 2,
        feelsLike: randomTemp - 2,
        uvIndex: randomCondition === 'sunny' ? 6 : 1
      };

      setWeatherData(newWeather);
    }
  };

  // Keep the demo buttons for testing themes quickly
  const handleDemoConditionChange = (condition: WeatherCondition) => {
    setWeatherData(MOCK_WEATHER_DATA[condition]);
  };

  const isModalOpen = !!activeDetail || !!activeForecastDay || isSearchOpen;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans select-none">
      
      {/* Background Layer */}
      <Background 
        condition={weatherData.condition} 
        activeDetail={activeDetail} 
        activeForecastDay={activeForecastDay}
      />

      {/* Main Content Container */}
      {/* Applied conditional scaling/blur when detail panel is open for depth effect */}
      <main 
        className={`
          relative z-10 flex min-h-screen items-center justify-center p-4 py-12 md:p-8
          transition-all duration-500 ease-out origin-center
          ${isModalOpen ? 'scale-95 opacity-80 blur-[2px]' : 'scale-100 opacity-100 blur-0'}
        `}
      >
        <WeatherCard 
          data={weatherData} 
          forecast={MOCK_FORECAST}
          onSearchClick={() => setIsSearchOpen(true)}
          onDetailClick={setActiveDetail}
          onDayClick={setActiveForecastDay}
        />
      </main>

      {/* Overlays */}
      <LocationSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectCity={handleCitySelect}
      />

      <DetailPanel 
        isOpen={!!activeDetail}
        type={activeDetail}
        data={weatherData}
        onClose={() => setActiveDetail(null)}
      />

      <ForecastDetailPanel 
        isOpen={!!activeForecastDay}
        day={activeForecastDay}
        onClose={() => setActiveForecastDay(null)}
      />

      {/* Demo Controls */}
      <div 
        className={`fixed bottom-6 right-6 z-40 flex flex-col gap-2 p-2 rounded-2xl glass-panel opacity-50 hover:opacity-100 transition-all duration-300 ${isModalOpen ? 'translate-y-20 opacity-0' : 'translate-y-0'}`}
      >
         <span className="text-[10px] text-white/70 uppercase tracking-widest text-center font-bold mb-1">Theme Demo</span>
         <div className="grid grid-cols-3 gap-2">
            {(Object.keys(MOCK_WEATHER_DATA) as WeatherCondition[]).map((cond) => (
               <button
                  key={cond}
                  onClick={() => handleDemoConditionChange(cond)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200 border border-white/10 ${
                     weatherData.condition === cond 
                     ? 'bg-white text-black scale-110 shadow-lg' 
                     : 'bg-black/20 text-white hover:bg-white/20'
                  }`}
                  title={cond}
               >
                  {getEmojiForCondition(cond)}
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

const getEmojiForCondition = (c: WeatherCondition) => {
   switch(c) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      case 'night': return '🌙';
      case 'stormy': return '⛈️';
      default: return '❓';
   }
};

export default App;
