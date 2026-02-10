import React, { useEffect, useState } from 'react';
import { ForecastDay, WeatherCondition } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastDetailPanelProps {
  isOpen: boolean;
  day: ForecastDay | null;
  onClose: () => void;
}

const ForecastDetailPanel: React.FC<ForecastDetailPanelProps> = ({ isOpen, day, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(false);
    }
  }, [isOpen, day]);

  if (!isOpen || !day) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md pointer-events-auto transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="
           pointer-events-auto relative w-full md:w-[500px] 
           glass-panel border-t md:border border-white/20 
           rounded-t-[40px] md:rounded-[40px] 
           p-8 pb-12 md:pb-8 shadow-2xl 
           animate-slide-up-modal md:animate-scale-up
           flex flex-col overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-start mb-6">
           <div>
             <h2 className="text-white text-3xl font-light tracking-wide">{day.day}</h2>
             <p className="text-white/60 text-sm">{day.date}</p>
           </div>
           <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
           >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
           </button>
        </div>

        {/* Summary Card */}
        <div className="w-full glass rounded-2xl p-4 mb-6 flex items-center gap-4">
           <WeatherIcon condition={day.icon} size={48} />
           <div>
              <p className="text-white text-lg font-medium">{day.summary}</p>
              <div className="flex gap-3 text-white/70 text-sm mt-1">
                 <span>High: {day.high}°</span>
                 <span>Low: {day.low}°</span>
              </div>
           </div>
        </div>

        {/* Day Part Breakdown */}
        <h3 className="text-white/50 text-xs uppercase tracking-widest font-bold mb-4">Daily Breakdown</h3>
        <div className="grid grid-cols-4 gap-2 mb-8">
           {Object.entries(day.details).map(([part, info], idx) => (
              <div 
                key={part} 
                className={`flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 ease-out`}
                style={{ 
                   transform: animate ? 'translateY(0)' : 'translateY(20px)',
                   opacity: animate ? 1 : 0,
                   transitionDelay: `${idx * 100}ms`
                }}
              >
                 <span className="text-white/60 text-[10px] uppercase mb-2">{part}</span>
                 <WeatherIcon condition={info.condition} size={24} className="mb-2" />
                 <span className="text-white font-bold">{Math.round(info.temp)}°</span>
                 <div className="mt-1 flex items-center gap-0.5">
                    <span className="text-blue-300 text-[10px]">💧</span>
                    <span className="text-blue-200 text-[10px]">{info.precipChance}%</span>
                 </div>
              </div>
           ))}
        </div>

        {/* Beyond This Week / Trends */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-5 border border-white/10">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="white"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
           </div>
           <h3 className="text-white/90 font-medium mb-1">Looking Ahead</h3>
           <p className="text-white/70 text-sm font-light leading-relaxed">
              Temperatures are trending <span className="text-orange-200 font-normal">slightly warmer</span> heading into next week. 
              Expect clearer skies and lower humidity after the weekend.
           </p>
        </div>

      </div>
    </div>
  );
};

export default ForecastDetailPanel;
