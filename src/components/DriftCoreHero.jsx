import React, { useState } from 'react';
import { Sparkles, Activity, RefreshCw, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import driftCoreVideo from '../assets/gemini_generated_video_c5a93418.mp4';
import { useApp } from '../context/AppContext';

export const DriftCoreHero = () => {
  const { showToast } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [activeChannel, setActiveChannel] = useState('vibration');
  const [showTechDetails, setShowTechDetails] = useState(false);

  const channels = [
    { id: 'vibration', label: 'Spindle Vibration', value: '2.3 mm/s', status: 'Nominal', color: 'text-emerald-400' },
    { id: 'thermal', label: 'Thermal Envelope', value: '74.2 °C', status: 'Tracking', color: 'text-sky-400' },
    { id: 'kinematic', label: 'Kinematic Drift', value: '0.003 mm', status: 'Optimal', color: 'text-violet-400' },
  ];

  const handleRunDiagnostic = () => {
    setIsScanning(true);
    showToast('Running high-speed tensor invariance sweep across all 12 edge sensors...', 'info');
    setTimeout(() => {
      setIsScanning(false);
      showToast('Drift Diagnostic Complete: Invariance 99.84% • Zero anomalous drift detected', 'success');
    }, 1800);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1827] via-[#102438] to-[#0a1420] text-white p-4 sm:p-5 border border-slate-700/60 shadow-xl overflow-hidden group">
      {/* Ambient glowing radial orbs behind */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between mb-3.5">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FF4D0A] to-purple-600 p-0.5 shadow-md shadow-[#FF4D0A]/20 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-extrabold tracking-wide text-white">QUANTUM-DRIFT™ CORE</span>
              <span className="text-[9px] bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 text-violet-300 border border-violet-500/40 px-1.5 py-0.2 rounded font-mono font-bold">
                NEURAL v4.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Human-Aware Real-time Invariance Engine</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Main Visual Centerpiece: Video Orb & Telemetry Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
        {/* Glowing 3D Orb Video Container */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-[#FF4D0A] shadow-[0_0_30px_rgba(168,85,247,0.35)] flex items-center justify-center group-hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] transition-all duration-500">
            {/* Pulsing orbital ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '18s' }} />
            
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
              <video
                src={driftCoreVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110"
              />
              {/* Glass sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Sub-badge over video */}
            <div className="absolute -bottom-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-0.5 rounded-full text-[9px] font-mono text-cyan-300 font-bold shadow-md flex items-center space-x-1">
              <Activity className="w-2.5 h-2.5 animate-pulse text-cyan-400" />
              <span>LIVE TELEMETRY</span>
            </div>
          </div>
        </div>

        {/* Real-time Drift Metrics Panel */}
        <div className="sm:col-span-7 space-y-2">
          {/* Main Stability Metric */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-2.5 border border-slate-700/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-medium">Invariance Stability</span>
              <div className="flex items-baseline space-x-1.5 mt-0.5">
                <span className="text-xl font-black font-mono text-white tracking-tight">99.84%</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">+0.12%</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium">Throughput</span>
              <div className="text-xs font-bold font-mono text-violet-300 mt-0.5">
                1.24M pts/s
              </div>
            </div>
          </div>

          {/* Channel selector pills */}
          <div className="grid grid-cols-3 gap-1.5">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`p-1.5 rounded-xl text-left border transition-all ${
                  activeChannel === ch.id
                    ? 'bg-slate-800 border-[#FF4D0A] shadow-xs'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[9px] text-slate-400 truncate">{ch.label}</div>
                <div className={`text-[10px] font-bold font-mono mt-0.5 truncate ${ch.color}`}>
                  {ch.value}
                </div>
              </button>
            ))}
          </div>

          {/* Diagnostic Action Button */}
          <button
            onClick={handleRunDiagnostic}
            disabled={isScanning}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#FF4D0A] to-amber-600 hover:from-[#E64205] hover:to-amber-500 active:scale-[0.98] transition-all text-white font-bold text-xs shadow-md shadow-[#FF4D0A]/20 flex items-center justify-center space-x-1.5 disabled:opacity-70"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Analyzing Tensor Invariance...' : 'Run Neural Drift Sweep'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Technical Specs Toggle */}
      <div className="relative z-10 mt-3 pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setShowTechDetails(!showTechDetails)}
          className="w-full flex items-center justify-between text-[10px] font-medium text-slate-400 hover:text-slate-300 transition-colors"
        >
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-[#FF4D0A]" />
            <span>Edge AI Architecture: Quantized 4-bit INT4 Tensor Core</span>
          </span>
          {showTechDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showTechDetails && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-black/40 border border-slate-800/80 text-[10px] space-y-1.5 text-slate-300 animate-in fade-in-50">
            <div className="flex justify-between">
              <span className="text-slate-400">Drift Vector Estimation:</span>
              <span className="font-mono text-emerald-400">Continuous Kalman-LSTM Filter</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Inference Latency:</span>
              <span className="font-mono text-cyan-300">4.2 ms on Edge NPU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Physical Interlock Safety:</span>
              <span className="font-mono text-amber-300">ISO 13849 Category 4 Preserved</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
