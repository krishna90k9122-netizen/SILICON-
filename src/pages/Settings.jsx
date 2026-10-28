import React, { useState } from 'react';
import { 
  Globe, 
  Bell, 
  Mail, 
  MessageSquare, 
  Cloud, 
  Wifi, 
  RotateCcw
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { settings, resetDemoData, showToast } = useApp();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Controlled states initialized from settings or sensible defaults
  const [language, setLanguage] = useState(settings?.general?.language || 'English');
  const [pushEnabled, setPushEnabled] = useState(settings?.notifications?.pushEnabled ?? true);
  const [emailAlerts, setEmailAlerts] = useState(settings?.notifications?.emailAlerts ?? true);
  const [smsAlerts, setSmsAlerts] = useState(settings?.notifications?.smsAlerts ?? false);
  const [cloudSync, setCloudSync] = useState(settings?.dataSync?.cloudSync || 'Every 5 minutes');
  const [dataUsage, setDataUsage] = useState(settings?.dataSync?.wifiOnly ? 'Wi-Fi Only' : 'Cellular & Wi-Fi');

  const handleToggle = (setter, currVal) => {
    const newVal = !currVal;
    setter(newVal);
    showToast(`Preference updated (local state)`, 'info');
  };

  const handleReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Settings" showBack backPath="/profile" />

      <div className="p-4 space-y-5">
        {/* SECTION 1: GENERAL matching reference image */}
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            General
          </h2>
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  showToast(`Language set to ${e.target.value}`, 'info');
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30"
              >
                <option value="English">English</option>
                <option value="German">Deutsch (German)</option>
                <option value="Japanese">日本語 (Japanese)</option>
                <option value="Spanish">Español (Spanish)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: NOTIFICATIONS matching reference image */}
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Notifications
          </h2>
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-4 divide-y divide-slate-100">
            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Push Notifications</span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setPushEnabled, pushEnabled)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  pushEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  pushEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Email Alerts Toggle */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Email Alerts</span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setEmailAlerts, emailAlerts)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  emailAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  emailAlerts ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* SMS Alerts Toggle */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">SMS Alerts</span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setSmsAlerts, smsAlerts)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  smsAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  smsAlerts ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: DATA & SYNC matching reference image */}
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Data & Sync
          </h2>
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-4 divide-y divide-slate-100">
            {/* Cloud Sync Frequency */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Cloud className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Cloud Sync</span>
              </div>
              <select
                value={cloudSync}
                onChange={(e) => {
                  setCloudSync(e.target.value);
                  showToast(`Sync interval: ${e.target.value}`, 'info');
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30"
              >
                <option value="Every 1 minute">Every 1 min</option>
                <option value="Every 5 minutes">Every 5 minutes</option>
                <option value="Every 15 minutes">Every 15 minutes</option>
                <option value="Manual Only">Manual Only</option>
              </select>
            </div>

            {/* Data Usage Preference */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Data Usage</span>
              </div>
              <select
                value={dataUsage}
                onChange={(e) => {
                  setDataUsage(e.target.value);
                  showToast(`Data mode: ${e.target.value}`, 'info');
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30"
              >
                <option value="Wi-Fi Only">Wi-Fi Only</option>
                <option value="Cellular & Wi-Fi">Cellular & Wi-Fi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="pt-2">
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-bold text-xs shadow-soft transition-all flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Factory Defaults</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset Local Demo Data?"
        message="This will restore all machines, alerts, reports, and settings back to initial factory demo values. Any custom created machines will be replaced."
        confirmText="Reset Now"
        isDestructive
        onConfirm={handleReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
