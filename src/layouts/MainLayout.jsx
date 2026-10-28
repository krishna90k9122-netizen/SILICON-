import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Monitor, 
  Layers, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Sparkles,
  BarChart3,
  FileText
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { NavigationDrawer } from '../components/NavigationDrawer';
import { Toast } from '../components/Toast';
import { useApp } from '../context/AppContext';
import driftCoreVideo from '../assets/gemini_generated_video_c5a93418.mp4';

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeAlertsCount } = useApp();
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'expanded'

  // Root primary tabs show the bottom nav
  const normPath = location.pathname.endsWith('/') && location.pathname.length > 1
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const showBottomNav = [
    '/', 
    '/analytics', 
    '/alerts', 
    '/reports', 
    '/profile', 
    '/machines'
  ].includes(normPath);

  const desktopShortcuts = [
    { label: 'Process Overview', path: '/', icon: Activity },
    { label: 'Asset Fleet', path: '/machines', icon: Cpu },
    { label: 'OEE & Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Active Alerts', path: '/alerts', icon: AlertTriangle, badge: activeAlertsCount },
    { label: 'Reports & Export', path: '/reports', icon: FileText },
    { label: 'System About', path: '/about', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#F5F7FA] lg:bg-[#0A121E] flex flex-col items-center justify-start lg:justify-center p-0 lg:p-6 overflow-x-hidden">
      {/* Ambient background decoration on desktop */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Desktop Top Command Bar (Visible on lg+ screens) */}
      <header className="hidden lg:flex w-full max-w-6xl items-center justify-between py-3 px-6 mb-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl z-20 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#FF4D0A] flex items-center justify-center text-white shadow-md shadow-[#FF4D0A]/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm tracking-wider text-white">DRYFTQ ENTERPRISE</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-bold">
                EDGE LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400">DRIFTLENS-Q • Silicon Industrial Drift Suite</p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs">
            <button
              onClick={() => setViewMode('phone')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'phone'
                  ? 'bg-[#FF4D0A] text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Simulator</span>
            </button>
            <button
              onClick={() => setViewMode('expanded')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'expanded'
                  ? 'bg-[#FF4D0A] text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Expanded Widescreen</span>
            </button>
          </div>

          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-[#FF4D0A] flex items-center justify-center text-[10px] font-bold text-white">
              KG
            </div>
            <span className="text-xs font-semibold text-slate-200">Krishna Gupta</span>
          </div>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <div className="w-full flex items-center justify-center gap-6 relative z-10">
        {/* Left Side HUD on Desktop (Only in Phone mode) */}
        {viewMode === 'phone' && (
          <aside className="hidden xl:flex flex-col w-64 space-y-4 flex-shrink-0 text-white">
            {/* Neural Drift Core Mini Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">AI Drift Core</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-purple-500 to-[#FF4D0A] shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <video
                  src={driftCoreVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110 rounded-full"
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-white">Quantum-Drift v4.2</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Invariance: 99.84%</div>
              </div>
            </div>

            {/* Edge Node Cluster Telemetry */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 border border-slate-800 shadow-xl space-y-2.5 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Edge Sensors</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>CNC-01 Pyrometer:</span>
                  <span className="text-emerald-400 font-mono">ONLINE</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>PRESS-02 Accel:</span>
                  <span className="text-emerald-400 font-mono">ONLINE</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>FURN-01 Thermocouple:</span>
                  <span className="text-emerald-400 font-mono">ONLINE</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Throughput Rate:</span>
                  <span className="text-cyan-300 font-mono">1.24M pts/s</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Application Container */}
        <div 
          className={`
            relative w-full bg-[#F5F7FA] text-[#102438] flex flex-col transition-all duration-300
            ${viewMode === 'phone' 
              ? 'max-w-full lg:max-w-[420px] min-h-screen lg:min-h-0 lg:h-[880px] lg:max-h-[94vh] rounded-none lg:rounded-[44px] shadow-none lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-none lg:border-[10px] lg:border-[#102438] lg:overflow-hidden' 
              : 'max-w-full lg:max-w-5xl min-h-screen lg:min-h-0 lg:h-[880px] lg:max-h-[94vh] rounded-none lg:rounded-3xl shadow-none lg:shadow-2xl border-none lg:border border-slate-300/60 lg:overflow-hidden'
            }
          `}
        >
          {/* Scrollable Main Content Area */}
          <main className="flex-1 w-full flex flex-col relative overscroll-contain lg:overflow-y-auto lg:min-h-0 scroll-touch scroll-smooth pb-24 sm:pb-28">
            <Outlet />
          </main>

          {/* Bottom Navigation */}
          {showBottomNav && (
            <div className="fixed bottom-0 left-0 right-0 z-30 lg:static lg:w-full flex-shrink-0">
              <BottomNavigation />
            </div>
          )}

          {/* Navigation Drawer */}
          <NavigationDrawer />

          {/* Toast notifications */}
          <Toast />
        </div>

        {/* Right Side HUD on Desktop (Only in Phone mode) */}
        {viewMode === 'phone' && (
          <aside className="hidden xl:flex flex-col w-64 space-y-4 flex-shrink-0 text-white">
            {/* Quick Route Shortcuts */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 border border-slate-800 shadow-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Quick Navigation</span>
              <div className="space-y-1">
                {desktopShortcuts.map((sc) => {
                  const Icon = sc.icon;
                  const isActive = location.pathname === sc.path;
                  return (
                    <button
                      key={sc.path}
                      onClick={() => navigate(sc.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#FF4D0A] text-white font-bold shadow-md shadow-[#FF4D0A]/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{sc.label}</span>
                      </div>
                      {sc.badge > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                          {sc.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Plant Summary */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 border border-slate-800 shadow-xl space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Plant Status</span>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Shift:</span>
                  <span className="font-semibold text-white">Shift 1 (Day)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Assets:</span>
                  <span className="font-mono text-cyan-300 font-bold">6 Machines</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Plant OEE:</span>
                  <span className="font-mono text-emerald-400 font-bold">85.6%</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
