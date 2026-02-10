import React from 'react';
import { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastRowProps {
  forecast: ForecastDay[];
  onDayClick: (day: ForecastDay) => void;
}

const ForecastRow: React.FC<ForecastRowProps> = ({ forecast, onDayClick }) => {
  return (
    <div className="w-full mt-8 glass-panel rounded-3xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4 opacity-80 pl-2">5-Day Forecast</h3>
      <div className="flex justify-between items-center">
        {forecast.map((day, idx) => (
          <button 
            key={idx} 
            onClick={() => onDayClick(day)}
            className="flex flex-col items-center text-white space-y-2 hover:bg-white/10 p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer outline-none focus:ring-2 focus:ring-white/20"
          >
            <span className="text-xs font-light opacity-90">{day.day}</span>
            <WeatherIcon condition={day.icon} size={24} className="my-1" />
            <div className="flex flex-col items-center text-xs">
              <span className="font-semibold">{day.high}°</span>
              <span className="opacity-60">{day.low}°</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForecastRow;
