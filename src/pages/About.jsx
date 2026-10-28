import React from 'react';
import { ShieldCheck, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';
import driftCoreVideo from '../assets/gemini_generated_video_c5a93418.mp4';

export const About = () => {
  const { resetDemoData } = useApp();

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="About DRIFTLENS-Q" showBack backPath="/profile" />

      <div className="p-4 space-y-4">
        {/* Brand Showcase with AI Neural Drift Core Video */}
        <div className="bg-[#102438] text-white rounded-3xl p-6 shadow-xl text-center space-y-3 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Video Core Display */}
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-[#FF4D0A] mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <video
                src={driftCoreVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="absolute -bottom-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[8px] font-mono text-cyan-300 font-bold">
              NEURAL CORE
            </div>
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-wider">DRIFTLENS-Q</h1>
            <p className="text-xs text-[#FF4D0A] font-semibold mt-0.5">
              Human-Aware Industrial Process Drift Detection
            </p>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Version 2.4.0 • Android Mobile Edition
            </p>
          </div>
        </div>

        {/* System Capabilities */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-3 text-xs">
          <h2 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            Platform Architecture
          </h2>
          <div className="space-y-2.5 text-slate-600">
            <div className="flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#FF4D0A] flex-shrink-0 mt-0.5" />
              <span><strong>Edge Telemetry Ingest:</strong> Capable of sampling high-speed spindle vibration, pyrometers, and current sensors.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <Cpu className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
              <span><strong>Human-Aware Drift Modeling:</strong> Identifies slow thermal or kinematic drift before catastrophic machine failure occurs.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Safety Envelope:</strong> Acknowledge and resolve actions operate as UI-level review logs and do not bypass physical safety interlocks.</span>
            </div>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="bg-amber-50 rounded-3xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <h3 className="font-bold flex items-center space-x-1.5">
            <span>Notice: Standalone Frontend Sandbox</span>
          </h3>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            This deployment is running in standalone frontend demonstration mode. All sensor values, alerts, and OEE indicators are generated locally and stored safely in your browser's localStorage.
          </p>
        </div>

        {/* Factory Reset button */}
        <button
          onClick={resetDemoData}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-[#FF4D0A] font-bold text-xs shadow-soft transition-all flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restore Default Demo Records</span>
        </button>
      </div>
    </div>
  );
};
