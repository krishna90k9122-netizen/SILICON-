import React from 'react';
import { FileText, Download, Eye, Zap, CheckCircle2, BarChart2, Wrench, Factory } from 'lucide-react';

export const ReportCard = ({ report, onPreview, onDownload }) => {
  const getIcon = () => {
    switch (report.category) {
      case 'energy':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'quality':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'oee':
        return <BarChart2 className="w-5 h-5 text-blue-500" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-slate-600" />;
      case 'production':
        return <Factory className="w-5 h-5 text-[#FF4D0A]" />;
      default:
        return <FileText className="w-5 h-5 text-[#FF4D0A]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft hover:shadow-card transition-all flex items-center justify-between gap-3 group">
      <div 
        onClick={() => onPreview && onPreview(report)} 
        className="flex items-center space-x-3.5 min-w-0 cursor-pointer flex-1"
      >
        <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D0A]/5 transition-colors">
          {getIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-[#FF4D0A] transition-colors truncate">
            {report.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {report.type} • {report.format} • {report.size}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1.5 flex-shrink-0">
        <button
          onClick={() => onPreview && onPreview(report)}
          className="p-2 rounded-xl text-slate-500 hover:text-[#102438] hover:bg-slate-100 active:scale-95 transition-all"
          title="Preview Report"
          aria-label="Preview Report"
        >
          <Eye className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          onClick={() => onDownload && onDownload(report)}
          className="p-2 rounded-xl text-[#FF4D0A] hover:bg-[#FF4D0A]/10 active:scale-95 transition-all"
          title="Download Report (CSV)"
          aria-label="Download Report"
        >
          <Download className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
