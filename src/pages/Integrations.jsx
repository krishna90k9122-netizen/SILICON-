import React from 'react';
import { Network, Server, Wifi, Database, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const Integrations = () => {
  const { integrations, showToast } = useApp();

  const handleTestPing = (name) => {
    showToast(`Ping simulated for ${name} (Demo Only)`, 'info');
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Industrial Integrations" />

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="bg-[#102438] text-white rounded-3xl p-5 shadow-soft space-y-2">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#FF4D0A]" />
            <h2 className="text-sm font-bold tracking-tight">Edge & SCADA Gateway Connectors</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Industrial protocol adaptors for real-time edge telemetry ingest. All protocols operate in simulated demo mode until backend API pairing.
          </p>
          <div className="pt-1 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">Demo Sandbox Active</span>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="space-y-3">
          {integrations.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{item.protocol}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.statusType === 'demo'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                {item.description}
              </p>

              <div className="space-y-1 text-[11px] text-slate-500 font-mono">
                <div className="flex justify-between">
                  <span>Endpoint:</span>
                  <span className="text-slate-800 truncate max-w-[200px]">{item.endpoint}</span>
                </div>
                <div className="flex justify-between">
                  <span>Topics / Nodes:</span>
                  <span className="text-slate-800">{item.activeTopics} configured</span>
                </div>
                <div className="flex justify-between">
                  <span>Telemetry Ingest:</span>
                  <span className="text-emerald-600 font-semibold">{item.messagesPerMin} msgs/min</span>
                </div>
              </div>

              <button
                onClick={() => handleTestPing(item.name)}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Test Gateway Ping
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
