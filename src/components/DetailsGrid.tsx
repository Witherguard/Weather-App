import React from 'react';
import { WeatherData, DetailType } from '../types';

interface DetailsGridProps {
  data: WeatherData;
  onDetailClick: (type: DetailType) => void;
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ data, onDetailClick }) => {
  const items: { label: string; value: string; icon: string; type: DetailType }[] = [
    { label: "Humidity", value: `${data.humidity}%`, icon: "💧", type: 'humidity' },
    { label: "Wind", value: `${data.windSpeed} mph`, icon: "💨", type: 'wind' },
    { label: "Feels Like", value: `${data.feelsLike}°`, icon: "🌡️", type: 'feelsLike' },
    { label: "UV Index", value: data.uvIndex.toString(), icon: "☀️", type: 'uv' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full mt-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
      {items.map((item) => (
        <button
          key={item.type}
          onClick={() => onDetailClick(item.type)}
          className="
            glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-white 
            transition-all duration-300 hover:scale-[1.05] hover:bg-white/15 
            active:scale-95 cursor-pointer outline-none focus:ring-2 focus:ring-white/20
          "
        >
          <span className="text-2xl mb-1 filter drop-shadow-sm">{item.icon}</span>
          <span className="text-sm font-light opacity-80">{item.label}</span>
          <span className="text-lg font-medium">{item.value}</span>
        </button>
      ))}
    </div>
  );
};

export default DetailsGrid;
