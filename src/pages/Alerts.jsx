import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { AlertCard } from '../components/AlertCard';
import { useApp } from '../context/AppContext';

export const Alerts = () => {
  const { alerts, acknowledgeAlert, resolveAlert } = useApp();
  const [activeTab, setActiveTab] = useState('ACTIVE'); // ACTIVE, RESOLVED
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const activeAlerts = alerts.filter(a => a.status === 'Active' || a.status === 'Acknowledged');
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved');

  const currentList = activeTab === 'ACTIVE' ? activeAlerts : resolvedAlerts;

  const filteredAlerts = currentList.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.machineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = 
      severityFilter === 'ALL' ? true : 
      alert.severity.toUpperCase() === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Alerts" />

      <div className="p-4 space-y-4">
        {/* Segmented Control Tabs matching reference image (Active / Resolved) */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl select-none">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ACTIVE'
                ? 'bg-[#FF4D0A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({activeAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab('RESOLVED')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'RESOLVED'
                ? 'bg-[#FF4D0A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resolved ({resolvedAlerts.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts by title or machine..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/20 focus:border-[#FF4D0A] shadow-soft"
          />
        </div>

        {/* Severity filter pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none select-none">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                severityFilter === sev
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sev === 'ALL' ? 'All Severities' : sev}
            </button>
          ))}
        </div>

        {/* Alert Cards List */}
        <div className="space-y-2.5">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledgeAlert}
                onResolve={resolveAlert}
              />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-soft">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No alerts found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                No alerts match the current filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
