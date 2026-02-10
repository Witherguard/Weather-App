import React, { useEffect, useState } from 'react';
import { WeatherData, DetailType } from '../types';

interface DetailPanelProps {
  isOpen: boolean;
  type: DetailType | null;
  data: WeatherData;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ isOpen, type, data, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger internal animations after mount
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(false);
    }
  }, [isOpen, type]);

  if (!isOpen || !type) return null;

  const renderContent = () => {
    switch (type) {
      case 'humidity':
        const dewPoint = Math.round(data.temp - ((100 - data.humidity) / 5));
        return (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-48 h-48 mb-6">
               {/* Background Circle */}
               <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  {/* Progress Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    className="text-blue-300 transition-all duration-1000 ease-out"
                    strokeDasharray="283"
                    strokeDashoffset={animate ? 283 - (283 * data.humidity) / 100 : 283}
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-4xl font-light">{data.humidity}%</span>
                  <span className="text-xs opacity-70 uppercase tracking-widest mt-1">Humidity</span>
               </div>
            </div>
            <p className="text-white text-center text-lg font-light mb-2">
               The dew point is <span className="font-medium">{dewPoint}°</span> right now.
            </p>
            <p className="text-white/60 text-sm text-center">
               {data.humidity > 60 ? "The air feels heavy and sticky." : data.humidity < 30 ? "The air feels dry." : "The air feels comfortable."}
            </p>
          </div>
        );

      case 'wind':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
               {/* Compass Background */}
               <div className="absolute inset-0 border-2 border-white/10 rounded-full flex items-center justify-center">
                  <span className="absolute top-2 text-xs font-bold text-white/50">N</span>
                  <span className="absolute bottom-2 text-xs font-bold text-white/50">S</span>
                  <span className="absolute left-2 text-xs font-bold text-white/50">W</span>
                  <span className="absolute right-2 text-xs font-bold text-white/50">E</span>
               </div>
               
               {/* Wind Arrow */}
               <div 
                 className={`transition-transform duration-[1.5s] ease-in-out ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                 style={{ transform: `rotate(${animate ? -45 : 0}deg)` }} // Mock direction NW
               >
                 <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L12 22" />
                    <path d="M12 2L5 9" />
                    <path d="M12 2L19 9" />
                 </svg>
               </div>

               {/* Speed Lines Animation */}
               <div className="absolute inset-0 animate-spin-slow opacity-30">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45" />
                  <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent transform -rotate-45" />
               </div>
            </div>
            <div className="text-center text-white">
               <span className="text-5xl font-light">{data.windSpeed}</span>
               <span className="text-xl ml-2 font-thin opacity-70">mph</span>
            </div>
            <p className="text-white/60 text-sm mt-4 text-center max-w-[80%]">
               Wind is blowing from the Northwest. Gusts around {data.windSpeed + 5} mph.
            </p>
          </div>
        );

      case 'feelsLike':
        return (
          <div className="flex flex-col items-center w-full px-4">
            <div className="w-full flex justify-center gap-8 h-48 items-end mb-6 relative">
               {/* Actual Temp Bar */}
               <div className="flex flex-col items-center gap-2 w-16 group">
                  <span className="text-white font-bold text-xl mb-1">{Math.round(data.temp)}°</span>
                  <div className="w-full bg-white/10 rounded-t-xl relative h-32 overflow-hidden">
                     <div 
                       className="absolute bottom-0 left-0 right-0 bg-white/40 transition-all duration-1000 ease-out rounded-t-xl"
                       style={{ height: animate ? '60%' : '0%' }}
                     />
                  </div>
                  <span className="text-white/50 text-xs uppercase tracking-wider">Actual</span>
               </div>

               {/* Feels Like Bar */}
               <div className="flex flex-col items-center gap-2 w-16 group">
                  <span className={`font-bold text-xl mb-1 ${data.feelsLike > data.temp ? 'text-red-300' : 'text-blue-300'}`}>
                     {data.feelsLike}°
                  </span>
                  <div className="w-full bg-white/10 rounded-t-xl relative h-32 overflow-hidden">
                     <div 
                       className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out rounded-t-xl ${data.feelsLike > data.temp ? 'bg-gradient-to-t from-orange-300/50 to-red-400/80' : 'bg-gradient-to-t from-blue-300/50 to-cyan-400/80'}`}
                       style={{ height: animate ? (data.feelsLike > data.temp ? '70%' : '50%') : '0%' }}
                     />
                  </div>
                  <span className="text-white/50 text-xs uppercase tracking-wider">Feels Like</span>
               </div>
            </div>
            
            <p className="text-white text-lg font-light text-center">
              {data.feelsLike === data.temp 
                 ? "It feels exactly like the actual temperature."
                 : data.feelsLike > data.temp 
                    ? "Humidity is making it feel warmer."
                    : "Wind is making it feel cooler."}
            </p>
          </div>
        );

      case 'uv':
        const uvPercent = (data.uvIndex / 12) * 100;
        return (
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[280px] h-32 relative mb-6">
               {/* Arc Gauge */}
               <div className="w-full h-full overflow-hidden relative">
                  <div className="w-full h-[200%] rounded-[50%] border-[12px] border-white/10 absolute top-0 box-border"></div>
                  {/* Gradient Arc (Simulated with clip-path or multiple divs, simplifying for CSS) */}
                  <div className="absolute bottom-0 left-0 w-full h-4 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 opacity-80" />
                  
                  {/* Marker */}
                  <div 
                    className="absolute bottom-0 w-1 h-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-1000 ease-out"
                    style={{ left: animate ? `${Math.min(uvPercent, 100)}%` : '0%' }}
                  />
               </div>
               <div className="flex justify-between w-full text-xs text-white/40 mt-2 font-bold uppercase">
                  <span>Low</span>
                  <span>Extreme</span>
               </div>
            </div>

            <div className="text-center text-white mb-2">
               <span className="text-5xl font-light">{data.uvIndex}</span>
               <span className="text-xl font-thin opacity-70 block">
                  {data.uvIndex < 3 ? 'Low' : data.uvIndex < 6 ? 'Moderate' : data.uvIndex < 8 ? 'High' : 'Very High'}
               </span>
            </div>

            <p className="text-white/60 text-sm text-center max-w-[80%]">
               {data.uvIndex < 3 ? "No protection needed." : "Use sun protection 10AM-4PM."}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className="
           pointer-events-auto relative w-full md:w-[400px] 
           glass-panel border-t md:border border-white/20 
           rounded-t-[40px] md:rounded-[40px] 
           p-8 pb-12 md:pb-8 shadow-2xl 
           animate-slide-up-modal md:animate-scale-up
           flex flex-col items-center
           mb-0 md:mb-0
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
           <h3 className="text-white text-xl font-medium capitalize flex items-center gap-2">
              {type === 'feelsLike' ? 'Feels Like' : type === 'uv' ? 'UV Index' : type}
           </h3>
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

        {/* Dynamic Content */}
        {renderContent()}

      </div>
    </div>
  );
};

export default DetailPanel;
