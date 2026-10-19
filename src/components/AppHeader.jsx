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
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all flex-shrink-0">
      <div className="w-full flex items-center justify-between">
        {/* Left Action: Hamburger or Back button */}
        <div className="flex items-center space-x-2.5">
          {showBack || !isMainTab ? (
            <button
              onClick={handleBack}
              className="p-1.5 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={toggleDrawer}
              className="p-1.5 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}

          {/* Logo or Title */}
          {title ? (
            <h1 className="text-sm font-bold text-slate-900 tracking-tight line-clamp-1">
              {title}
            </h1>
          ) : (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-2 cursor-pointer select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FF4D0A] flex items-center justify-center text-white shadow-sm shadow-[#FF4D0A]/30">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-sm tracking-wider text-slate-900">DRYFTQ</span>
                  <span className="text-[8px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-mono font-medium border border-slate-200">DEMO</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Action: Admin Avatar, Live indicator & Notifications */}
        <div className="flex items-center space-x-2">
          {rightAction ? (
            rightAction
          ) : (
            <>
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                <span>Live</span>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 stroke-[2]" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF4D0A] border-2 border-white ring-1 ring-[#FF4D0A]/30" />
                )}
              </button>

              {/* Compact Admin Profile Button */}
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-1.5 p-1 pl-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 active:scale-95 transition-all"
                title="Admin: Krishna Gupta"
                aria-label="Admin Profile"
              >
                <span className="text-[10px] font-bold text-slate-800">Krishna</span>
                <div className="w-6 h-6 rounded-full bg-[#102438] text-white flex items-center justify-center text-[10px] font-bold ring-1 ring-[#FF4D0A]/30">
                  KG
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
