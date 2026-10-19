import React, { useState } from 'react';
import { FileText, Plus, Download, Eye, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ReportCard } from '../components/ReportCard';
import { CustomReportModal } from '../components/CustomReportModal';
import { ReportPreviewModal } from '../components/ReportPreviewModal';
import { useApp } from '../context/AppContext';
import { downloadService } from '../services/downloadService';

export const Reports = () => {
  const { reports, machines } = useApp();
  const [activeTab, setActiveTab] = useState('Standard');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);

  const standardReports = reports.filter(r => !r.id.startsWith('REP-CUSTOM'));
  const customReports = reports.filter(r => r.id.startsWith('REP-CUSTOM'));

  const displayedReports = activeTab === 'Standard' ? standardReports : (customReports.length > 0 ? customReports : standardReports);

  const handleDownload = (report) => {
    downloadService.downloadReportById(report, machines);
  };

  const handlePreview = (report) => {
    setPreviewReport(report);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Reports" />

      <div className="p-4 space-y-4">
        {/* Segmented Control Tabs matching reference image (Standard / Custom) */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl select-none">
          <button
            onClick={() => setActiveTab('Standard')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'Standard'
                ? 'bg-[#FF4D0A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standard ({standardReports.length})
          </button>
          <button
            onClick={() => setActiveTab('Custom')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'Custom'
                ? 'bg-[#FF4D0A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Custom ({customReports.length})
          </button>
        </div>

        {/* Reports List matching reference image */}
        <div className="space-y-2.5">
          {displayedReports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Bottom CTA Button matching reference image "Generate Custom Report" */}
        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FF4D0A] hover:bg-[#E64205] text-white font-bold text-sm shadow-lg shadow-[#FF4D0A]/25 transition-all active:scale-[0.985] flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4 stroke-[2.2]" />
          <span>Generate Custom Report</span>
        </button>
      </div>

      {/* Custom Report Builder Modal */}
      <CustomReportModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />

      {/* Report Preview Modal */}
      <ReportPreviewModal
        report={previewReport}
        isOpen={Boolean(previewReport)}
        onClose={() => setPreviewReport(null)}
      />
    </div>
  );
};
