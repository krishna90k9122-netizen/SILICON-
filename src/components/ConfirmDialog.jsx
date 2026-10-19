import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  isDestructive = false, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onCancel}
      />

      {/* Dialog box */}
      <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95 duration-150 border border-slate-100">
        <div className="flex items-center space-x-2.5 mb-2.5">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white transition-colors ${
              isDestructive 
                ? 'bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20' 
                : 'bg-[#FF4D0A] hover:bg-[#E64205] shadow-md shadow-[#FF4D0A]/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
