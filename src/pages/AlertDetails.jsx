import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  Cpu, 
  History,
  Activity,
  Layers,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const AlertDetails = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const { alerts, acknowledgeAlert, resolveAlert, reopenAlert } = useApp();

  const alert = alerts.find(a => a.id.toLowerCase() === (alertId || '').toLowerCase()) || alerts[0];

  const [actionsList, setActionsList] = useState(alert?.recommendedActions || [
    { id: '1', title: 'Check coolant flow rate & reservoir valve', completed: true },
    { id: '2', title: 'Inspect cooling fan and vent particulate filters', completed: true },
    { id: '3', title: 'Reduce spindle load if cutting high-temp alloy', completed: false }
  ]);

  if (!alert) {
    return (
      <div className="flex-1 flex flex-col">
        <AppHeader title="Alert Details" showBack />
        <div className="p-6 text-center text-slate-500">
          Alert record not found.
        </div>
      </div>
    );
  }

  const toggleAction = (id) => {
    setActionsList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const isResolved = alert.status === 'Resolved';
  const isAcknowledged = alert.status === 'Acknowledged';

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Alert Details" showBack backPath="/alerts" />

      <div className="p-4 space-y-4">
        {/* Main Alert Identity Card matching reference image */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft text-center space-y-3">
          {/* Circular Alert Icon */}
          <div className="w-16 h-16 rounded-full bg-[#FF4D0A]/10 border border-[#FF4D0A]/20 flex items-center justify-center mx-auto text-[#FF4D0A] shadow-inner">
            <Thermometer className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {alert.title}
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                alert.severity === 'High' || alert.severity === 'Critical'
                  ? 'bg-[#FF4D0A]/10 text-[#FF4D0A] border border-[#FF4D0A]/30'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {alert.severity}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-700 mt-1">
              {alert.machineId} • {alert.location}
            </p>

            <p className="text-[11px] text-slate-400 mt-1">
              {alert.detectedTimeFormatted || alert.detectedAt}
            </p>
          </div>

          <div className="pt-2 text-left">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Description
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {alert.description}
            </p>
          </div>

          {/* Three Metric Cards matching reference image (Current, Threshold, Duration) */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Current</span>
              <span className="text-sm font-extrabold text-[#FF4D0A] font-mono mt-0.5 block">{alert.currentValue}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Threshold</span>
              <span className="text-sm font-extrabold text-slate-700 font-mono mt-0.5 block">{alert.threshold}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
              <span className="text-sm font-extrabold text-slate-700 font-mono mt-0.5 block">{alert.duration}</span>
            </div>
          </div>
        </div>

        {/* Telemetry Excerpt */}
        {alert.telemetrySnippet && alert.telemetrySnippet.length > 0 && (
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Breach Telemetry Curve
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">Limit: {alert.threshold}</span>
            </div>

            <div className="h-36 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={alert.telemetrySnippet}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#102438', borderRadius: '10px', color: '#fff', fontSize: '10px' }} />
                  <Area type="monotone" dataKey="temp" stroke="#FF4D0A" strokeWidth={2.5} fill="#FF4D0A" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Recommended Actions Checklist matching reference image */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recommended Actions
          </h2>

          <div className="space-y-2">
            {actionsList.map((action) => (
              <div
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className="flex items-start space-x-3 p-2.5 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                {action.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-xs font-medium leading-snug ${
                  action.completed ? 'text-slate-500 line-through' : 'text-slate-800'
                }`}>
                  {action.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Uncertainty & Evidence Section (Prompt requirement) */}
        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-slate-800 font-bold">
            <Info className="w-4 h-4 text-sky-500" />
            <span>AI Statistical Evidence & Uncertainty Note</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {alert.uncertaintyNote || "Algorithm flags potential heat sink airflow reduction. This prediction does not prove mechanical root cause and requires manual technician verification."}
          </p>
          <div className="text-[10px] text-slate-400 font-mono">
            Model: DRIFT-LENS-V4 • Confidence: 87.4% • Demo Observation
          </div>
        </div>

        {/* Related Navigation */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/machines/${alert.machineId}`)}
            className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center space-x-1.5 shadow-soft"
          >
            <Cpu className="w-4 h-4 text-slate-500" />
            <span>View Machine</span>
          </button>
          <button
            onClick={() => navigate(`/history?machine=${alert.machineId}`)}
            className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center space-x-1.5 shadow-soft"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>View History</span>
          </button>
        </div>

        {/* Primary Action Button matching reference image */}
        <div className="space-y-2 pt-1">
          {!isResolved ? (
            <>
              <button
                onClick={() => acknowledgeAlert(alert.id)}
                disabled={isAcknowledged}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-[0.985] flex items-center justify-center space-x-2 ${
                  isAcknowledged
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#FF4D0A] hover:bg-[#E64205] text-white shadow-[#FF4D0A]/25'
                }`}
              >
                <span>{isAcknowledged ? 'Alert Acknowledged (UI State)' : 'Acknowledge Alert'}</span>
              </button>

              <button
                onClick={() => resolveAlert(alert.id)}
                className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Resolved (UI Only)</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => reopenAlert(alert.id)}
              className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-900 shadow-md transition-all"
            >
              Reopen Demo Alert
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
