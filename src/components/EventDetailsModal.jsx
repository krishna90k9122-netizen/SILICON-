import React from 'react';
import { X, Activity, Cpu } from 'lucide-react';

export const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-xs shadow-2xl z-10 p-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-orange-50 text-[#FF4D0A] flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-xs">Telemetry Event</h2>
              <p className="text-[10px] text-slate-500 font-mono">{event.time || '12:45'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2.5">
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="flex items-center space-x-1.5 mb-1">
              <Cpu className="w-3 h-3 text-slate-500" />
              <span className="text-xs font-bold text-slate-800">{event.machineId || 'CNC-01'}</span>
              <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                {event.zone || 'Zone 3'}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {event.description || event.text || 'Temperature exceeded configured threshold'}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 space-y-1 px-1">
            <div className="flex justify-between py-0.5 border-b border-slate-100">
              <span>Event Severity</span>
              <span className="font-semibold text-amber-600">{event.severity || 'Medium Warning'}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-slate-100">
              <span>Sensor Tag</span>
              <span className="font-mono text-slate-700">SPDL_THERM_02</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-slate-100">
              <span>Recorded Drift</span>
              <span className="font-semibold text-[#FF4D0A]">+12.0°C</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Audit State</span>
              <span className="text-emerald-600 font-medium">Auto-Logged</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-1 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
