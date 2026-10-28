import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ANALYTICS_DATA } from '../data/analyticsData';

export const OEEAnalysis = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const { kpis, oeeTrends } = ANALYTICS_DATA;

  const currentTrendData = oeeTrends[timeRange] || oeeTrends['7days'];

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="OEE Analysis" showBack backPath="/analytics" />

      <div className="p-4 space-y-4">
        {/* Time Filter Dropdown matching reference image */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Time Interval
          </span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-soft focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/20"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        {/* Semi-circular OEE Gauge Card matching reference image */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft text-center relative overflow-hidden">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Overall OEE</span>

          {/* SVG Semicircle Gauge */}
          <div className="relative w-48 h-28 mx-auto flex items-end justify-center">
            <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Value Arc (85.6% fill) */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#16A36A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * (1 - 0.856)}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Gauge center stats */}
            <div className="absolute bottom-0 inset-x-0 text-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono block">
                {kpis.oee.value}%
              </span>
              <div className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>{kpis.oee.delta} vs last {timeRange === '7days' ? '7 days' : (timeRange === '30days' ? '30 days' : '90 days')}</span>
              </div>
            </div>
          </div>

          {/* Min / Max Labels */}
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 px-6 mt-2">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Three Factor Progress Bars matching reference image */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            OEE Factor Breakdown
          </h2>

          {/* Availability */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Availability</span>
              <span className="text-slate-900 font-mono font-bold">{kpis.availability.value}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${kpis.availability.value}%` }} 
              />
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Performance</span>
              <span className="text-slate-900 font-mono font-bold">{kpis.performance.value}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#FF4D0A] h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${kpis.performance.value}%` }} 
              />
            </div>
          </div>

          {/* Quality */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Quality</span>
              <span className="text-slate-900 font-mono font-bold">{kpis.quality.value}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${kpis.quality.value}%` }} 
              />
            </div>
          </div>
        </div>

        {/* OEE Trend Chart matching reference image */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              OEE Trend
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Target: 85%</span>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#102438', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="oee" 
                  stroke="#0EA5E9" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, fill: '#0EA5E9', strokeWidth: 1.5, stroke: '#fff' }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
