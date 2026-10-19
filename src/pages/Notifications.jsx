import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, AlertTriangle, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const handleItemClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIcon = (sev) => {
    switch (sev) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#FF4D0A]" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader 
        title="Notifications" 
        showBack 
        rightAction={
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-bold text-[#FF4D0A] flex items-center space-x-1 hover:underline"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Mark read</span>
          </button>
        }
      />

      <div className="p-4 space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleItemClick(notif)}
            className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start space-x-3.5 shadow-soft ${
              notif.read 
                ? 'bg-white/80 border-slate-200/80 opacity-75' 
                : 'bg-white border-[#FF4D0A]/30 shadow-card'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              {getIcon(notif.severity)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-bold truncate ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                  {notif.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 ml-2">
                  {notif.time}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {notif.message}
              </p>

              {notif.machineId && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                  {notif.machineId}
                </span>
              )}
            </div>

            {!notif.read && (
              <span className="w-2 h-2 rounded-full bg-[#FF4D0A] flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
