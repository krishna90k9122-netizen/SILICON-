import React, { useState } from 'react';
import { X, Cpu, Plus } from 'lucide-react';

export const AddMachineModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'CNC Milling Center',
    zone: 'Zone 3',
    location: 'Zone 3 - Precision Machining',
    targetTemperature: 70,
    temperature: 68,
    vibration: 1.8,
    load: 65,
    rpm: 3600,
    powerConsumption: 12.0,
    description: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.id.trim()) {
      errs.id = 'Machine ID is required (e.g. CNC-05)';
    }
    if (!formData.name.trim()) {
      errs.name = 'Machine Name is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      ...formData,
      status: 'running',
      statusText: 'Online'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-sm max-h-[88vh] max-h-[88dvh] overflow-y-auto scroll-touch shadow-2xl z-10 p-4 sm:p-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#FF4D0A]/10 text-[#FF4D0A] flex items-center justify-center flex-shrink-0">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Add New Machine</h2>
              <p className="text-[10px] text-slate-500">Configure demo machine telemetry</p>
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

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Machine ID *
            </label>
            <input
              type="text"
              placeholder="e.g. CNC-02, LATHE-01"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase() })}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30 ${
                errors.id ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.id && <p className="text-[10px] text-rose-500 mt-0.5">{errors.id}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Equipment Name *
            </label>
            <input
              type="text"
              placeholder="e.g. High-Speed 5-Axis Milling Center"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30 ${
                errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Equipment Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30 bg-white"
              >
                <option value="CNC Milling Center">CNC Milling</option>
                <option value="Hydraulic Press">Hydraulic Press</option>
                <option value="Induction Furnace">Induction Furnace</option>
                <option value="Steam Boiler">Steam Boiler</option>
                <option value="Conveyor Line">Conveyor Line</option>
                <option value="Robotic Welder">Robotic Welder</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Plant Zone
              </label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  zone: e.target.value,
                  location: `${e.target.value} - Manufacturing Cell`
                })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/30 bg-white"
              >
                <option value="Zone 1">Zone 1 (Stamping)</option>
                <option value="Zone 2">Zone 2 (Thermal)</option>
                <option value="Zone 3">Zone 3 (Machining)</option>
                <option value="Zone 4">Zone 4 (Utility)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Target Temp (°C)
              </label>
              <input
                type="number"
                value={formData.targetTemperature}
                onChange={(e) => setFormData({ ...formData, targetTemperature: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Initial Load (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.load}
                onChange={(e) => setFormData({ ...formData, load: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
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
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#FF4D0A] hover:bg-[#E64205] shadow-md shadow-[#FF4D0A]/20 transition-all flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
