import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { 
  AlertTriangle, 
  ChevronRight
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { MetricCard } from '../components/MetricCard';
import { DriftCoreHero } from '../components/DriftCoreHero';
import { useApp } from '../context/AppContext';
import { EventDetailsModal } from '../components/EventDetailsModal';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { alerts } = useApp();
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Selected telemetry dataset for the chart based on timeRange
  const telemetryData = timeRange === '24h' ? [
    { time: '00:00', actual: 68, target: 70 },
    { time: '03:00', actual: 69, target: 70 },
    { time: '06:00', actual: 72, target: 70 },
    { time: '09:00', actual: 74, target: 70 },
    { time: '12:00', actual: 82, target: 70 },
    { time: '15:00', actual: 79, target: 70 },
    { time: '18:00', actual: 78, target: 70 },
    { time: '21:00', actual: 76, target: 70 },
    { time: '24:00', actual: 75, target: 70 }
  ] : timeRange === '7d' ? [
    { time: 'Mon', actual: 70, target: 70 },
    { time: 'Tue', actual: 72, target: 70 },
    { time: 'Wed', actual: 71, target: 70 },
    { time: 'Thu', actual: 76, target: 70 },
    { time: 'Fri', actual: 82, target: 70 },
    { time: 'Sat', actual: 79, target: 70 },
    { time: 'Sun', actual: 78, target: 70 }
  ] : [
    { time: 'W1', actual: 71, target: 70 },
    { time: 'W2', actual: 73, target: 70 },
    { time: 'W3', actual: 75, target: 70 },
    { time: 'W4', actual: 78, target: 70 }
  ];

  const vibrationData = [
    { t: '1', v: 1.2 }, { t: '2', v: 1.8 }, { t: '3', v: 1.5 },
    { t: '4', v: 2.3 }, { t: '5', v: 1.9 }, { t: '6', v: 2.1 },
    { t: '7', v: 1.7 }, { t: '8', v: 2.4 }
  ];

  // Critical alert to highlight (e.g. ALT-1092)
  const criticalAlert = alerts.find(a => a.severity === 'High' || a.severity === 'Critical') || alerts[0];

  const recentEvents = [
    { time: '12:45', machineId: 'CNC-01', zone: 'Zone 3', description: 'Temp. exceeded threshold (+12°C above target)', severity: 'High' },
    { time: '10:32', machineId: 'PRESS-02', zone: 'Zone 1', description: 'Vibration spike detected (8.4 mm/s)', severity: 'Medium' },
    { time: '08:17', machineId: 'FURN-01', zone: 'Zone 2', description: 'Process back to normal envelope', severity: 'Low' },
    { time: '06:50', machineId: 'CONV-01', zone: 'Zone 1', description: 'Maintenance routine check completed', severity: 'Info' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader />

      <div className="p-3.5 sm:p-4 space-y-3.5 sm:space-y-4">
        {/* Admin Operator Banner (Krishna Gupta) */}
        <div 
          onClick={() => navigate('/profile')}
          className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-soft flex items-center justify-between cursor-pointer hover:border-[#FF4D0A]/30 transition-all group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D0A] to-amber-500 p-0.5 shadow-sm flex-shrink-0">
              <div className="w-full h-full bg-[#102438] rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                KG
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="text-xs font-extrabold text-slate-900 group-hover:text-[#FF4D0A] transition-colors truncate">
                  Krishna Gupta
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FF4D0A] text-white tracking-wider flex-shrink-0">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate">Product Specialist • Plant Operations</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#FF4D0A] transition-colors flex-shrink-0 ml-2">
            Profile →
          </span>
        </div>

        {/* Page Title & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight truncate">
              Process Overview
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
              Live Edge Telemetry • Plant 4
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot flex-shrink-0" />
            <span>Live</span>
          </div>
        </div>

        {/* AI Quantum Drift Neural Core Hero */}
        <DriftCoreHero />

        {/* Machine Health Summary Cards (Responsive 3-column / 2-column layout) */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 min-[380px]:grid-cols-3 gap-2">
            <MetricCard 
              title="Machine Health" 
              status="Healthy" 
              onClick={() => navigate('/machines')} 
            />
            <MetricCard 
              title="Anomaly Detection" 
              status="Active" 
              onClick={() => navigate('/alerts')} 
            />
            <MetricCard 
              title="Process Stability" 
              status="Stable" 
              onClick={() => navigate('/analytics')} 
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MetricCard 
              title="Anomaly Stability" 
              status="Stable" 
              onClick={() => navigate('/alerts')} 
            />
            <MetricCard 
              title="Overall Efficiency" 
              status="Stable" 
              onClick={() => navigate('/analytics/oee')} 
            />
          </div>
        </div>

        {/* Telemetry Chart: Temperature Actual vs Target */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-soft space-y-3 min-w-0 overflow-hidden">
          <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-slate-900">Temperature (°C)</span>
                <span className="text-[10px] text-slate-400 font-mono">(CNC-01)</span>
              </div>
              <div className="flex items-center space-x-3 mt-1 text-[11px]">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D0A]" />
                  <span className="text-slate-600 font-medium">Actual</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-slate-600 font-medium">Target</span>
                </div>
              </div>
            </div>

            {/* Time range selector pills */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl text-[11px] font-semibold text-slate-600 self-start min-[380px]:self-auto">
              {['24h', '7d', '30d'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg transition-all min-h-[30px] ${
                    timeRange === r 
                      ? 'bg-white text-slate-900 shadow-xs font-bold' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Container */}
          <div className="h-44 w-full pt-2 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryData} margin={{ top: 5, right: 10, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10, fill: '#94A3B8' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[50, 100]} 
                  width={30}
                  tick={{ fontSize: 10, fill: '#94A3B8' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#102438', 
                    borderRadius: '12px', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '11px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' 
                  }}
                  itemStyle={{ padding: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#0EA5E9" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#FF4D0A" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, fill: '#FF4D0A', strokeWidth: 1.5, stroke: '#fff' }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dual Secondary Cards: Vibration Sparkline & Production Quality */}
        <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Vibration Sparkline */}
          <div 
            onClick={() => navigate('/machines/CNC-01')}
            className="bg-white rounded-3xl p-3.5 border border-slate-200/90 shadow-soft cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-slate-800">Vibration</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                2.3 mm/s
              </span>
            </div>
            <div className="h-12 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vibrationData}>
                  <defs>
                    <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v: 1" data={vibrationData.map(d => ({ v: d.v }))} stroke="#0EA5E9" strokeWidth={2} fillOpacity={1} fill="url(#vibGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Normal frequency band</span>
          </div>

          {/* Production Quality Meter */}
          <div 
            onClick={() => navigate('/analytics')}
            className="bg-white rounded-3xl p-3.5 border border-slate-200/90 shadow-soft cursor-pointer hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-800">Production Quality</span>
              <span className="text-xs font-mono font-extrabold text-emerald-600">88.7%</span>
            </div>
            
            <div className="my-2">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '88.7%' }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Tolerance ±0.02mm</span>
              <span className="text-emerald-600 font-semibold">+0.8%</span>
            </div>
          </div>
        </div>

        {/* Critical Alert Banner (Matching reference image bottom orange card) */}
        {criticalAlert && (
          <div 
            onClick={() => navigate(`/alerts/${criticalAlert.id}`)}
            className="bg-[#FF4D0A] rounded-2xl p-4 text-white shadow-lg shadow-[#FF4D0A]/20 cursor-pointer active:scale-[0.985] transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  Anomaly detected in {criticalAlert.zone || 'Zone 3'}
                </h4>
                <p className="text-[11px] text-white/90 mt-0.5 leading-snug line-clamp-1">
                  {criticalAlert.description}
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Recent Events Section */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Plant Events
            </h2>
            <button 
              onClick={() => navigate('/history')}
              className="text-xs font-semibold text-[#FF4D0A] hover:underline"
            >
              View History
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEvents.map((evt, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedEvent(evt)}
                className="py-2.5 flex items-start space-x-3 cursor-pointer hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors"
              >
                <div className="text-[11px] font-mono font-bold text-slate-400 mt-0.5">
                  {evt.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {evt.description}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {evt.machineId} • {evt.zone}
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={Boolean(selectedEvent)}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
