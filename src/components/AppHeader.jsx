import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, ArrowLeft, Bell, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AppHeader = ({ title, showBack = false, backPath = null, rightAction = null }) => {
  const { toggleDrawer, unreadNotificationsCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  const isMainTab = ['/', '/analytics', '/alerts', '/reports', '/profile'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2.5 sm:px-3.5 pt-[max(env(safe-area-inset-top,0px),0.625rem)] pb-2 transition-all flex-shrink-0">
      <div className="w-full flex items-center justify-between min-w-0">
        {/* Left Action: Hamburger or Back button + Logo/Title */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1 mr-2">
          {showBack || !isMainTab ? (
            <button
              onClick={handleBack}
              className="p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={toggleDrawer}
              className="p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

          {/* Logo or Title */}
          {title ? (
            <h1 
              className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight truncate min-w-0"
              title={title}
            >
              {title}
            </h1>
          ) : (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-1.5 cursor-pointer select-none min-w-0 flex-shrink-0"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FF4D0A] flex items-center justify-center text-white shadow-sm shadow-[#FF4D0A]/30 flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-sm tracking-wider text-slate-900">DRYFTQ</span>
                <span className="text-[8px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-mono font-medium border border-slate-200">DEMO</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Action: Live indicator, Notifications & Admin Avatar */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {rightAction ? (
            rightAction
          ) : (
            <>
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot flex-shrink-0" />
                <span className="hidden xs:inline">Live</span>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 stroke-[2]" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF4D0A] border-2 border-white ring-1 ring-[#FF4D0A]/30" />
                )}
              </button>

              {/* Sleek Admin Avatar Circle */}
              <button
                onClick={() => navigate('/profile')}
                className="w-7 h-7 rounded-full bg-[#102438] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-[#FF4D0A]/30 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                title="Admin: Krishna Gupta"
                aria-label="Admin Profile"
              >
                KG
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
