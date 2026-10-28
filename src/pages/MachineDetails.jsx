import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Clock, 
  Zap, 
  Thermometer, 
  Activity, 
  Wrench, 
  AlertTriangle,
  History, 
  ChevronRight,
  Layers
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
import siliconChipHero from '../assets/hero.png';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

export const MachineDetails = () => {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const { machines, alerts } = useApp();
  const [activeTab, setActiveTab] = useState('Overview'); // Overview, Metrics, History

  const machine = machines.find(m => m.id.toLowerCase() === (machineId || '').toLowerCase()) || machines[0];

  if (!machine) {
    return (
      <div className="flex-1 flex flex-col">
        <AppHeader title="Machine Details" showBack />
        <div className="p-6 text-center text-slate-500">
          Machine not found.
        </div>
      </div>
    );
  }

  const relatedAlerts = alerts.filter(a => a.machineId === machine.id);

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Machine Details" showBack backPath="/machines" />

      <div className="p-4 space-y-4">
        {/* Machine Identity Banner matching reference image */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center space-x-4">
            {/* Visual Hardware Render Container */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#102438] via-slate-800 to-slate-900 border border-slate-700 p-3 flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden flex-shrink-0">
              <Cpu className="w-10 h-10 text-[#FF4D0A]" />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 mt-1 uppercase">
                {machine.type.split(' ')[0]}
              </span>
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF4D0A]/10 rounded-bl-full" />
            </div>

            {/* Title & Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {machine.id}
                </h1>
                <StatusBadge status={machine.status} text={machine.statusText} size="xs" />
              </div>

              <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                {machine.model} • {machine.location}
              </p>

              <div className="flex items-center space-x-1.5 text-xs text-slate-600 mt-2 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{machine.operatingDuration || 'Running for 12h 34m'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation matching reference image */}
        <div className="flex bg-slate-200/70 p-1 rounded-2xl select-none">
          {['Overview', 'Metrics', 'History'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#FF4D0A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="space-y-3">
            {/* Load Meter */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">Operating Load</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{machine.load}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    machine.load > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${machine.load}%` }}
                />
              </div>
            </div>

            {/* Temperature Progress */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <Thermometer className="w-4 h-4 text-[#FF4D0A]" />
                  <span className="text-xs font-semibold text-slate-500">Chamber Temperature</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 font-mono">{machine.temperature}°C</span>
                  <span className="text-[10px] text-slate-400 block font-normal">Target: {machine.targetTemperature}°C</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    machine.temperature > machine.targetTemperature + 5 ? 'bg-[#FF4D0A]' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min((machine.temperature / 120) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Vibration */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-semibold text-slate-500">Vibration Level</span>
                </div>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{machine.vibration} mm/s</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-2.5 rounded-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${Math.min((machine.vibration / 10) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Power Consumption */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-500">Power Consumption</span>
                </div>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{machine.powerConsumption} kW</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-2.5 rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${Math.min((machine.powerConsumption / 30) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Last Maintenance */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-500">Last Service / Maintenance</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{machine.lastMaintenance}</span>
            </div>

            {/* Related Alerts warning if any */}
            {relatedAlerts.length > 0 && (
              <div 
                onClick={() => navigate(`/alerts/${relatedAlerts[0].id}`)}
                className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-center justify-between cursor-pointer hover:bg-amber-100/60 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-amber-900">
                    {relatedAlerts.length} Active Alert logged for this asset
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DETAILED METRICS */}
        {activeTab === 'Metrics' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-soft">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Rotational Speed</span>
                <span className="text-base font-extrabold text-slate-900 block mt-1 font-mono">{machine.rpm || 3600} RPM</span>
                <span className="text-[10px] text-emerald-600 mt-1 block">Nominal balance</span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-soft">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Health Score</span>
                <span className="text-base font-extrabold text-emerald-600 block mt-1 font-mono">{machine.healthScore || 94}/100</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Algorithm index</span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-soft">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Cooling Efficiency</span>
                <span className="text-base font-extrabold text-slate-900 block mt-1 font-mono">{machine.coolingEfficiency || '89%'}</span>
                <span className="text-[10px] text-amber-600 mt-1 block">-3% deviation</span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-soft">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Next Inspection</span>
                <span className="text-base font-extrabold text-slate-900 block mt-1 font-mono">{machine.nextMaintenance || 'In 28 days'}</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Scheduled cycle</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Equipment Description</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {machine.description}
              </p>
            </div>

            {/* Silicon Edge Sensor Architecture Card with hero asset */}
            <div className="bg-gradient-to-br from-[#102438] to-[#0A1420] text-white rounded-2xl p-4 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-[#FF4D0A] flex items-center justify-center text-white">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">Silicon Edge Transducer</h4>
                    <p className="text-[10px] text-slate-400">Multi-Layer MEMS Drift Substrate</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  CALIBRATED
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 flex-shrink-0 bg-slate-900/60 rounded-xl p-1 border border-slate-700/60 flex items-center justify-center">
                  <img
                    src={siliconChipHero}
                    alt="Silicon Wafer Transducer Architecture"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div className="flex-1 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sensor Die:</span>
                    <span className="font-mono text-cyan-300">Si-Wafer Gen4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sampling Rate:</span>
                    <span className="font-mono text-white">20 kHz High-Band</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thermal Drift:</span>
                    <span className="font-mono text-emerald-400">&lt; 0.001 %/°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TELEMETRY TREND */}
        {activeTab === 'History' && (
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-3">
            <h3 className="text-xs font-bold text-slate-900">24-Hour Telemetry Record</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={machine.telemetryHistory || []}>
                  <defs>
                    <linearGradient id="mchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4D0A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF4D0A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#102438', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#FF4D0A" strokeWidth={2.5} fillOpacity={1} fill="url(#mchGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Bottom CTA Button matching reference image */}
        <button
          onClick={() => navigate(`/history?machine=${machine.id}`)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FF4D0A] hover:bg-[#E64205] text-white font-bold text-sm shadow-lg shadow-[#FF4D0A]/25 transition-all active:scale-[0.985] flex items-center justify-center space-x-2"
        >
          <History className="w-4 h-4 stroke-[2.2]" />
          <span>View Machine History</span>
        </button>
      </div>
    </div>
  );
};
