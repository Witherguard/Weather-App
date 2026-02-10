import React from 'react';
import { WeatherData, ForecastDay, DetailType } from '../types';
import WeatherIcon from './WeatherIcon';
import DetailsGrid from './DetailsGrid';
import ForecastRow from './ForecastRow';

interface WeatherCardProps {
  data: WeatherData;
  forecast: ForecastDay[];
  onSearchClick: () => void;
  onDetailClick: (type: DetailType) => void;
  onDayClick: (day: ForecastDay) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, forecast, onSearchClick, onDetailClick, onDayClick }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="relative w-full max-w-md mx-auto z-10 p-6 flex flex-col items-center">
      {/* Main Glass Card */}
      <div className="glass w-full rounded-[40px] p-8 flex flex-col items-center shadow-2xl animate-fade-in transition-all duration-500">
        
        {/* Header */}
        <div className="w-full flex justify-between items-start mb-2">
          <div className="flex flex-col text-white group">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onSearchClick} title="Change Location">
              <h2 className="text-3xl font-semibold tracking-wide drop-shadow-md">{data.city}</h2>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 p-1.5 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="11" cy="11" r="8"></circle>
                   <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <p className="text-sm font-light opacity-90">{today}</p>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium backdrop-blur-sm shadow-sm">
            Live
          </div>
        </div>

        {/* Main Weather Visual */}
        <div className="my-8 flex flex-col items-center">
          <div className="drop-shadow-2xl filter transform transition-transform hover:scale-110 duration-500 cursor-pointer" onClick={onSearchClick}>
             <WeatherIcon condition={data.condition} size={160} />
          </div>
          <h1 className="text-8xl font-thin text-white mt-4 tracking-tighter drop-shadow-lg">
            {Math.round(data.temp)}°
          </h1>
          <p className="text-xl text-white font-medium mt-2 capitalize tracking-wide drop-shadow-md">
            {data.description}
          </p>
          <div className="flex gap-4 text-white/90 text-sm mt-2 font-light">
             <span>H: {data.high}°</span>
             <span>L: {data.low}°</span>
          </div>
        </div>
      </div>

      {/* Details Grid (Outside main card for depth) */}
      <DetailsGrid data={data} onDetailClick={onDetailClick} />

      {/* Forecast Row */}
      <ForecastRow forecast={forecast} onDayClick={onDayClick} />

      {/* Footer / Attribution */}
      <p className="mt-8 text-white/50 text-xs font-light">
        ZenWeather UI • Designed for clarity
      </p>
    </div>
  );
};

export default WeatherCard;
