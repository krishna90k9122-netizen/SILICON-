import React from 'react';

export const StatusBadge = ({ status, text, size = 'sm' }) => {
  const norm = (status || '').toLowerCase();
  
  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (norm === 'running' || norm === 'online' || norm === 'healthy' || norm === 'stable' || norm === 'optimal' || norm === 'completed') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (norm === 'idle' || norm === 'standby' || norm === 'pending' || norm === 'medium' || norm === 'good') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (norm === 'error' || norm === 'critical' || norm === 'high' || norm === 'fault') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (norm === 'low' || norm === 'info' || norm === 'resolved') {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  } else if (norm === 'active') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  }

  const padding = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : (size === 'md' ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-xs');

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{text || status}</span>
    </span>
  );
};
