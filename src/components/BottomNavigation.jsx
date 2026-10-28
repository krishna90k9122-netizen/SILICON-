import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, AlertTriangle, FileText, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNavigation = () => {
  const { activeAlertsCount } = useApp();

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Alerts', path: '/alerts', icon: AlertTriangle, badge: activeAlertsCount },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30 pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-1.5">
      <div className="w-full max-w-lg mx-auto flex items-center justify-around h-13 sm:h-14 px-1 sm:px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center flex-1 h-full min-h-[48px] py-1 px-0.5 transition-all select-none min-w-0
                ${isActive 
                  ? 'text-[#FF4D0A]' 
                  : 'text-slate-400 hover:text-slate-600'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    <Icon className={`w-5 h-5 transition-all duration-150 ${isActive ? 'stroke-[2.5px] scale-105 text-[#FF4D0A]' : 'stroke-2 text-slate-400'}`} />
                    {tab.badge > 0 && (
                      <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-[#FF4D0A] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-sm leading-none">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 tracking-tight truncate max-w-full text-center leading-none ${isActive ? 'text-[#FF4D0A] font-bold' : 'text-slate-500 font-medium'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D0A] mt-1 flex-shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
