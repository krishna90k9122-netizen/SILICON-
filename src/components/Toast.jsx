import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast, showToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-[#FF4D0A] flex-shrink-0" />
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
      <div className="bg-[#102438] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between border border-slate-700/60">
        <div className="flex items-center space-x-2.5 text-xs font-medium pr-2">
          {icons[toast.type] || icons.info}
          <span className="line-clamp-2">{toast.message}</span>
        </div>
        <button 
          onClick={() => showToast(null)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
