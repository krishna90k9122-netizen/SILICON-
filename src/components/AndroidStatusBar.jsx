import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar = ({ dark = false, showCamera = true }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full px-5 pt-2 pb-1 flex items-center justify-between text-xs font-medium select-none z-30 transition-colors ${dark ? 'text-white bg-[#102438]' : 'text-slate-800 bg-[#F5F7FA]'}`}>
      <span className="font-semibold tracking-tight text-[11px] font-mono">{time}</span>
      {showCamera && (
        <div className="w-3.5 h-3.5 rounded-full bg-[#0a1018] ring-1 ring-slate-700/60 flex items-center justify-center -mt-0.5 shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-950/90" />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center space-x-0.5">
          <span className="text-[10px] font-mono">98%</span>
          <BatteryMedium className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
};
