import React from 'react';
import { WeatherCondition, DetailType, ForecastDay } from '../types';

interface BackgroundProps {
  condition: WeatherCondition;
  activeDetail: DetailType | null;
  activeForecastDay: ForecastDay | null;
}

const Background: React.FC<BackgroundProps> = ({ condition: currentCondition, activeDetail, activeForecastDay }) => {
  
  // Determine which condition to display:
  // 1. If a forecast day is selected, show that day's weather (Future Preview)
  // 2. Otherwise, show current weather (Live)
  const displayCondition = activeForecastDay ? activeForecastDay.icon : currentCondition;

  // Base background gradients
  const getBaseGradient = (c: WeatherCondition) => {
    switch (c) {
      case 'sunny': return 'bg-gradient-to-br from-blue-400 via-sky-300 to-amber-100';
      case 'cloudy': return 'bg-gradient-to-br from-slate-400 via-gray-300 to-white';
      case 'rainy': return 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-600';
      case 'stormy': return 'bg-gradient-to-br from-indigo-950 via-slate-800 to-black';
      case 'snowy': return 'bg-gradient-to-br from-blue-50 via-slate-100 to-blue-200';
      case 'night': return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black';
      default: return 'bg-gray-800';
    }
  };

  // Artistic blobs config based on condition/state
  const renderArtBlobs = () => {
    // 1. Detail View Overrides (Focus Mode)
    if (activeDetail === 'humidity') {
      return (
        <>
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-white/30 to-transparent blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] animate-blob-bounce" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/20 rounded-full blur-[80px] animate-drift-slow" />
        </>
      );
    }
    
    if (activeDetail === 'wind') {
      return (
        <>
          <div className="absolute top-0 left-0 w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-[0.05] animate-drift" />
          <div className="absolute top-1/4 -left-20 w-[120%] h-40 bg-white/10 blur-xl rotate-[-5deg] animate-drift" />
          <div className="absolute bottom-1/3 -right-20 w-[120%] h-20 bg-white/5 blur-xl rotate-[-2deg] animate-drift delay-75" />
        </>
      );
    }

    if (activeDetail === 'feelsLike') {
      return (
        <>
           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 mix-blend-overlay" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px] animate-pulse-slow" />
        </>
      );
    }

    if (activeDetail === 'uv') {
      return (
        <>
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-[150px] animate-pulse-slow" />
        </>
      )
    }

    // 2. Weather Condition Art (Live or Preview)
    switch (displayCondition) {
      case 'sunny':
        return (
          <>
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute top-40 left-10 w-64 h-64 bg-yellow-100/30 rounded-full blur-[60px] animate-blob-bounce" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/20 rounded-full blur-[80px] animate-drift-slow" />
          </>
        );
      case 'night':
        return (
          <>
            <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-100/10 rounded-full blur-[40px] shadow-[0_0_100px_rgba(255,255,255,0.2)]" />
            <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px] animate-pulse-slow" />
          </>
        );
      case 'rainy':
      case 'stormy':
        return (
          <>
            <div className="absolute top-0 w-full h-full bg-slate-900/30" />
            <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] animate-blob-bounce" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-700/40 rounded-full blur-[80px] animate-drift-slow" />
          </>
        );
      case 'cloudy':
        return (
          <>
             <div className="absolute top-1/4 -left-20 w-[600px] h-[400px] bg-white/20 rounded-full blur-[80px] animate-drift-slow" />
             <div className="absolute bottom-1/4 -right-20 w-[500px] h-[400px] bg-gray-200/20 rounded-full blur-[90px] animate-drift-slow delay-1000" />
          </>
        );
      case 'snowy':
        return (
          <>
             <div className="absolute inset-0 bg-white/30 mix-blend-overlay" />
             <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-[80px] animate-pulse-slow" />
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden transition-all duration-[2000ms] ease-in-out">
      {/* Base Gradient Layer */}
      <div className={`absolute inset-0 transition-colors duration-[2000ms] ease-in-out ${getBaseGradient(displayCondition)}`} />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-bg mix-blend-soft-light opacity-30" />

      {/* Dynamic Art Layer */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {renderArtBlobs()}
      </div>

      {/* Global overlay for unified tint based on detail */}
      <div className={`absolute inset-0 transition-colors duration-1000 pointer-events-none ${
        activeDetail === 'humidity' ? 'bg-cyan-500/10' :
        activeDetail === 'feelsLike' ? 'bg-orange-500/5' :
        activeDetail === 'uv' ? 'bg-yellow-500/5' :
        'bg-transparent'
      }`} />
      
      {/* Forecast Overlay - Darken slightly when in forecast mode to make the modal pop */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none ${activeForecastDay ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default Background;
