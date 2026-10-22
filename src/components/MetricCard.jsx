import React from 'react';
import { CheckCircle2, Activity, ShieldCheck, Zap } from 'lucide-react';

export const MetricCard = ({ title, status = 'Healthy', type = 'health', onClick }) => {
  const norm = (status || '').toLowerCase();
  
  let dotColor = 'bg-emerald-500';
  let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let Icon = CheckCircle2;

  if (norm === 'active' || norm === 'running') {
    dotColor = 'bg-emerald-500';
    badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    Icon = Activity;
  } else if (norm === 'warning' || norm === 'needs review' || norm === 'idle') {
    dotColor = 'bg-amber-500';
    badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
    Icon = Activity;
  } else if (norm === 'critical' || norm === 'error') {
    dotColor = 'bg-rose-500';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    Icon = Zap;
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/90 shadow-soft flex flex-col justify-between transition-all hover:border-slate-300 min-w-0 ${onClick ? 'cursor-pointer active:scale-98' : ''}`}
    >
      <div className="flex items-center justify-between mb-1.5 min-w-0">
        <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight line-clamp-2 min-h-[24px]">
          {title}
        </span>
      </div>
      <div className="flex items-center space-x-1.5 min-w-0">
        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${dotColor} ${norm === 'active' ? 'animate-pulse' : ''}`} />
        <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight truncate">
          {status}
        </span>
      </div>
    </div>
  );
};
