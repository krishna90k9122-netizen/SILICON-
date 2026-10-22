import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ChevronRight, Activity, Thermometer, Gauge } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const MachineCard = ({ machine }) => {
  const navigate = useNavigate();

  // Machine icon mapping based on type
  const renderMachineThumb = () => {
    let gradient = "from-slate-700 to-slate-900";
    if (machine.status === 'running') gradient = "from-slate-800 to-slate-950";
    if (machine.status === 'error') gradient = "from-rose-950 to-slate-900";
    
    return (
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} p-2 flex items-center justify-center text-white shadow-sm flex-shrink-0 relative border border-slate-700/50`}>
        <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200" />
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-white ${
          machine.status === 'running' ? 'bg-emerald-500' : (machine.status === 'idle' ? 'bg-amber-500' : 'bg-rose-500')
        }`} />
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate(`/machines/${machine.id}`)}
      className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-soft hover:shadow-card transition-all cursor-pointer active:scale-[0.985] flex items-center justify-between gap-2 sm:gap-3 group"
    >
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1">
        {renderMachineThumb()}

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight group-hover:text-[#FF4D0A] transition-colors truncate">
              {machine.id}
            </h3>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal truncate min-w-0">
              {machine.zone || machine.model}
            </span>
          </div>

          <div className="mt-1 flex items-center space-x-2">
            <StatusBadge 
              status={machine.status} 
              text={machine.statusText || (machine.status === 'running' ? 'Running' : (machine.status === 'idle' ? 'Idle' : 'Issue'))} 
              size="xs" 
            />
          </div>
        </div>
      </div>

      {/* Right metrics */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0 text-right">
        <div>
          <div className="flex items-center justify-end space-x-1 sm:space-x-1.5">
            <span className="text-xs font-bold text-slate-900 font-mono">
              {machine.load}%
            </span>
            <div className="w-10 sm:w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden xs:block">
              <div 
                className={`h-full rounded-full ${
                  machine.load > 85 ? 'bg-rose-500' : (machine.load > 60 ? 'bg-emerald-500' : 'bg-amber-500')
                }`} 
                style={{ width: `${Math.min(machine.load, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-1 sm:space-x-1.5 text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
            <span className="hidden xs:inline">{machine.vibration} mm/s</span>
            <span className="hidden xs:inline">•</span>
            <span className="font-semibold text-slate-700">{machine.temperature}°C</span>
          </div>
        </div>

        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-[#FF4D0A] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
    </div>
  );
};
