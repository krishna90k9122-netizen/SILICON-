import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { 
  TrendingUp, 
  ChevronRight
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ANALYTICS_DATA } from '../data/analyticsData';

export const Analytics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const { kpis, downtimeTotal, downtimeDistribution, machinePerformanceList } = ANALYTICS_DATA;

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Analytics" />

      <div className="p-3.5 sm:p-4 space-y-3.5 sm:space-y-4">
        {/* Analytics Tabs matching reference image */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none select-none -mx-3.5 sm:-mx-4 px-3.5 sm:px-4">
          {['Overview', 'Time', 'OEE', 'Quality', 'Energy'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'OEE') {
                  navigate('/analytics/oee');
                } else {
                  setActiveTab(tab);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === tab
                  ? 'bg-[#FF4D0A] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Key Performance Section matching reference image */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Performance
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">Shift 1 • Running</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* OEE Card (Clicking opens OEE Analysis screen) */}
            <div 
              onClick={() => navigate('/analytics/oee')}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-soft cursor-pointer hover:border-[#FF4D0A]/40 transition-all group min-w-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">OEE</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF4D0A] transition-colors flex-shrink-0" />
              </div>
              <div className="mt-2 flex items-baseline space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {kpis.oee.value}%
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span>{kpis.oee.delta}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-soft min-w-0">
              <span className="text-xs font-semibold text-slate-500">Availability</span>
              <div className="mt-2 flex items-baseline space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {kpis.availability.value}%
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span>{kpis.availability.delta}</span>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-soft min-w-0">
              <span className="text-xs font-semibold text-slate-500">Performance</span>
              <div className="mt-2 flex items-baseline space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {kpis.performance.value}%
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span>{kpis.performance.delta}</span>
              </div>
            </div>

            {/* Quality */}
            <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-soft min-w-0">
              <span className="text-xs font-semibold text-slate-500">Quality</span>
              <div className="mt-2 flex items-baseline space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {kpis.quality.value}%
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span>{kpis.quality.delta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downtime Analysis Donut Chart matching reference image */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-soft space-y-4 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Downtime Analysis
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">Past 24h</span>
          </div>

          <div className="flex flex-col min-[420px]:flex-row items-center justify-between gap-4">
            {/* Donut Chart with center label */}
            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center mx-auto min-[420px]:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downtimeDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={44}
                    outerRadius={62}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {downtimeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#102438', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Total</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{downtimeTotal}</span>
              </div>
            </div>

            {/* Donut breakdown legend */}
            <div className="w-full flex-1 space-y-2 text-xs">
              {downtimeDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 truncate text-[11px] font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 flex-shrink-0 text-right">
                    <span className="font-bold text-slate-900 font-mono text-[11px]">{item.value}%</span>
                    <span className="text-[10px] text-slate-400">({item.duration})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Machine-Level Performance Table */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-soft space-y-3 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Asset OEE Ranking
            </h2>
            <button 
              onClick={() => navigate('/analytics/oee')}
              className="text-xs font-semibold text-[#FF4D0A] hover:underline min-h-[36px] flex items-center"
            >
              Full Gauge
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {machinePerformanceList.map((m) => (
              <div 
                key={m.id}
                onClick={() => navigate(`/machines/${m.id}`)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded-xl transition-colors min-h-[52px]"
              >
                <div className="min-w-0 flex-1 mr-2">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{m.id}</span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 truncate">{m.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                    <span>Avail: {m.availability}%</span>
                    <span>•</span>
                    <span>Qual: {m.quality}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">{m.oee}%</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                    m.oee > 90 ? 'bg-emerald-50 text-emerald-700' : (m.oee > 80 ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700')
                  }`}>
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
