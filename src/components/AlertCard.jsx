import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Thermometer, 
  Activity, 
  Gauge, 
  AlertTriangle, 
  Wrench, 
  Flame, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const AlertCard = ({ alert, onAcknowledge, onResolve }) => {
  const navigate = useNavigate();

  const getAlertIcon = () => {
    const title = (alert.title || '').toLowerCase();
    if (title.includes('temperature') || title.includes('rising')) {
      return <Thermometer className="w-5 h-5 text-[#FF4D0A]" />;
    }
    if (title.includes('vibration')) {
      return <Activity className="w-5 h-5 text-amber-500" />;
    }
    if (title.includes('pressure')) {
      return <Gauge className="w-5 h-5 text-rose-500" />;
    }
    if (title.includes('maintenance')) {
      return <Wrench className="w-5 h-5 text-blue-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  };

  const getSeverityBadge = () => {
    const sev = (alert.severity || '').toLowerCase();
    if (sev === 'critical' || sev === 'high') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF4D0A]/10 text-[#FF4D0A] border border-[#FF4D0A]/30">
          {alert.severity}
        </span>
      );
    }
    if (sev === 'medium') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          {alert.severity}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        {alert.severity}
      </span>
    );
  };

  return (
    <div
      onClick={() => navigate(`/alerts/${alert.id}`)}
      className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft hover:shadow-card transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 group"
    >
      <div className="flex items-start space-x-3.5 min-w-0">
        <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FF4D0A]/5 transition-colors">
          {getAlertIcon()}
        </div>

        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-[#FF4D0A] transition-colors truncate">
              {alert.title}
            </h3>
          </div>

          <p className="text-xs text-slate-600 mt-0.5 truncate font-medium">
            {alert.machineId} • {alert.deviation || alert.location}
          </p>

          <p className="text-[11px] text-slate-400 mt-1">
            {alert.detectedAt}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-2 flex-shrink-0">
        {getSeverityBadge()}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D0A] group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};
