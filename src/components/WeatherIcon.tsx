import React from 'react';
import { WeatherCondition } from '../types';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "", size = 64 }) => {
  const getIcon = () => {
    switch (condition) {
      case 'sunny':
        return (
          <svg className={`text-yellow-400 ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" className="text-yellow-500 animate-pulse-slow" />
            <path d="M12 2v2" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M12 20v2" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M4.93 4.93l1.41 1.41" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M17.66 17.66l1.41 1.41" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M2 12h2" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M20 12h2" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M6.34 17.66l-1.41 1.41" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <path d="M19.07 4.93l-1.41 1.41" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: 'center' }} />
          </svg>
        );
      case 'night':
        return (
          <svg className={`text-indigo-200 ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" className="animate-float" />
            <circle cx="18" cy="5" r="0.5" fill="white" className="animate-pulse" />
            <circle cx="4" cy="18" r="0.5" fill="white" className="animate-pulse delay-75" />
            <circle cx="20" cy="20" r="0.5" fill="white" className="animate-pulse delay-150" />
          </svg>
        );
      case 'cloudy':
        return (
          <svg className={`text-gray-100 ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path fill="currentColor" fillOpacity="0.8" d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19h11z" className="animate-drift" />
            <path fill="currentColor" fillOpacity="0.6" d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.184 0-.365.011-.544.032C16.533 7.72 14.444 6 12 6c-3.056 0-5.63 2.686-6.316 6.096C3.216 12.657 1.5 14.865 1.5 17.5c0 2.485 2.015 4.5 4.5 4.5h11.5z" />
          </svg>
        );
      case 'rainy':
      case 'stormy':
        return (
          <svg className={`text-blue-200 ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path fill="currentColor" fillOpacity="0.7" d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" className="animate-float" />
            <line x1="16" y1="13" x2="16" y2="21" className="stroke-blue-400 animate-rain delay-75" strokeDasharray="2 2" />
            <line x1="12" y1="15" x2="12" y2="23" className="stroke-blue-400 animate-rain" strokeDasharray="2 2" />
            <line x1="8" y1="13" x2="8" y2="21" className="stroke-blue-400 animate-rain delay-150" strokeDasharray="2 2" />
            {condition === 'stormy' && (
               <path d="M13 10L10 14h3l-3 4" stroke="yellow" strokeWidth="2" className="animate-pulse" />
            )}
          </svg>
        );
      case 'snowy':
        return (
          <svg className={`text-white ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path fill="currentColor" fillOpacity="0.7" d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" className="animate-float" />
             <g className="animate-snow" style={{ transformBox: 'fill-box' }}>
               <path d="M8 16h.01" strokeWidth="2" />
             </g>
             <g className="animate-snow delay-100" style={{ transformBox: 'fill-box' }}>
                <path d="M8 20h.01" strokeWidth="2" />
             </g>
             <g className="animate-snow delay-200" style={{ transformBox: 'fill-box' }}>
                <path d="M12 18h.01" strokeWidth="2" />
             </g>
             <g className="animate-snow delay-300" style={{ transformBox: 'fill-box' }}>
                <path d="M16 16h.01" strokeWidth="2" />
             </g>
             <g className="animate-snow delay-500" style={{ transformBox: 'fill-box' }}>
                <path d="M16 20h.01" strokeWidth="2" />
             </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

export default WeatherIcon;
