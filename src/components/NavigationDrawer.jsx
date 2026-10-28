import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  AlertTriangle, 
  Wrench, 
  Network, 
  Settings, 
  X, 
  Sparkles,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavigationDrawer = () => {
  const { drawerOpen, setDrawerOpen, activeAlertsCount } = useApp();
  const navigate = useNavigate();

  if (!drawerOpen) return null;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Machines', path: '/machines', icon: Cpu },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle, badge: activeAlertsCount },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
    { name: 'Integrations', path: '/integrations', icon: Network },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-64 max-w-[82%] sm:max-w-[80%] h-full bg-[#102438] text-white flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200 overflow-y-auto scroll-touch pt-[env(safe-area-inset-top,0px)] pb-[max(env(safe-area-inset-bottom,0px),1rem)]">
        <div>
          {/* Header */}
          <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              {/* Logo icon */}
              <div className="w-8 h-8 rounded-lg bg-[#FF4D0A] flex items-center justify-center text-white shadow-md shadow-[#FF4D0A]/30 flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base tracking-wider text-white">DRYFTQ</span>
                  <span className="text-[9px] bg-[#FF4D0A]/20 text-[#FF4D0A] px-1.5 py-0.2 rounded font-mono font-bold">PRO</span>
                </div>
                <span className="text-[9px] text-slate-400 font-medium truncate">DRIFTLENS-Q Industrial</span>
              </div>
            </div>
            <button 
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin User Card (Prominently visible inside drawer) */}
          <div 
            onClick={() => {
              navigate('/profile');
              setDrawerOpen(false);
            }}
            className="m-3 p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center space-x-2.5 cursor-pointer hover:bg-slate-800 transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF4D0A] to-amber-500 p-0.5 shadow-sm flex-shrink-0">
              <div className="w-full h-full bg-[#102438] rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                KG
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1.5">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-[#FF4D0A] transition-colors">
                  Krishna Gupta
                </h4>
                <span className="text-[8px] bg-[#FF4D0A] text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider flex-shrink-0">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Plant Operations Lead</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </div>

          {/* Links list */}
          <nav className="p-3 pt-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl font-medium text-xs transition-all
                    ${isActive 
                      ? 'bg-[#FF4D0A] text-white shadow-lg shadow-[#FF4D0A]/30 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white flex-shrink-0 ml-2">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info card */}
        <div className="p-3 m-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-start space-x-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-300 leading-snug">
                AI-powered insights for a smarter tomorrow.
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5">
                Telemetry v2.4 • Demo Mode
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
