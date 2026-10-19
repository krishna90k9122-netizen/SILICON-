import React from 'react';
import { X, FileText, Download } from 'lucide-react';
import { downloadService } from '../services/downloadService';
import { useApp } from '../context/AppContext';

export const ReportPreviewModal = ({ report, isOpen, onClose }) => {
  const { machines } = useApp();
  if (!isOpen || !report) return null;

  const handleDownload = () => {
    downloadService.downloadReportById(report, machines);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#FF4D0A]/10 text-[#FF4D0A] flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">{report.title}</h2>
              <p className="text-[10px] text-slate-500">{report.type} • {report.createdAt}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {report.description}
          </p>

          <div>
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Summary Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {report.summaryMetrics && Object.entries(report.summaryMetrics).map(([key, val]) => (
                <div key={key} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block font-mono">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#FF4D0A] hover:bg-[#E64205] shadow-md shadow-[#FF4D0A]/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
