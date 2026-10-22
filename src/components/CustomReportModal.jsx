import React, { useState } from 'react';
import { X, FileText, Download, CheckSquare, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadService } from '../services/downloadService';

export const CustomReportModal = ({ isOpen, onClose }) => {
  const { machines, generateReport } = useApp();

  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-14');
  const [selectedMachine, setSelectedMachine] = useState('ALL');
  const [category, setCategory] = useState('telemetry');
  const [includeTelemetry, setIncludeTelemetry] = useState(true);
  const [includeQuality, setIncludeQuality] = useState(true);
  const [includeAlerts, setIncludeAlerts] = useState(true);
  const [format, setFormat] = useState('CSV');

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    const targetMachineName = selectedMachine === 'ALL' ? 'All Plant Assets' : selectedMachine;
    const newReport = generateReport({
      title: `${selectedMachine} Performance & Drift Audit`,
      category: category,
      machineId: targetMachineName,
      startDate,
      endDate,
      format
    });

    // Generate CSV immediately for instant usability
    const targetMachines = selectedMachine === 'ALL' ? machines : machines.filter(m => m.id === selectedMachine);
    downloadService.downloadReportById(newReport, targetMachines);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-sm max-h-[88vh] max-h-[88dvh] overflow-y-auto scroll-touch shadow-2xl z-10 p-4 sm:p-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#FF4D0A]/10 text-[#FF4D0A] flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Custom Report</h2>
              <p className="text-[10px] text-slate-500">Filter datasets and export audit logs</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="mt-3 space-y-3">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            <div className="min-w-0">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-[11px] font-medium focus:ring-2 focus:ring-[#FF4D0A]/30 outline-none min-w-0"
              />
            </div>
            <div className="min-w-0">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-[11px] font-medium focus:ring-2 focus:ring-[#FF4D0A]/30 outline-none min-w-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Select Machine
            </label>
            <select
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-[#FF4D0A]/30 outline-none"
            >
              <option value="ALL">All Machines (Plant-Wide)</option>
              {machines.map(m => (
                <option key={m.id} value={m.id}>{m.id} — {m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Report Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-[#FF4D0A]/30 outline-none"
            >
              <option value="telemetry">Operational Telemetry</option>
              <option value="quality">Quality & Tolerance</option>
              <option value="oee">OEE & Efficiency</option>
              <option value="energy">Power & Demand</option>
              <option value="maintenance">Asset Health & Wear</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
              Data Modules
            </label>
            <div className="space-y-1.5">
              <label 
                onClick={() => setIncludeTelemetry(!includeTelemetry)}
                className="flex items-center space-x-2 text-[11px] text-slate-700 font-medium cursor-pointer select-none p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {includeTelemetry ? (
                  <CheckSquare className="w-3.5 h-3.5 text-[#FF4D0A]" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-300" />
                )}
                <span>Include temperature & vibration data</span>
              </label>

              <label 
                onClick={() => setIncludeQuality(!includeQuality)}
                className="flex items-center space-x-2 text-[11px] text-slate-700 font-medium cursor-pointer select-none p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {includeQuality ? (
                  <CheckSquare className="w-3.5 h-3.5 text-[#FF4D0A]" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-300" />
                )}
                <span>Include quality deviation metrics</span>
              </label>

              <label 
                onClick={() => setIncludeAlerts(!includeAlerts)}
                className="flex items-center space-x-2 text-[11px] text-slate-700 font-medium cursor-pointer select-none p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {includeAlerts ? (
                  <CheckSquare className="w-3.5 h-3.5 text-[#FF4D0A]" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-300" />
                )}
                <span>Include alert incident history</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#FF4D0A] hover:bg-[#E64205] shadow-md shadow-[#FF4D0A]/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Export CSV</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
