import React, { useState } from 'react';
import { Building, Save } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const PlantSettings = () => {
  const { settings, updateSettings, showToast } = useApp();

  const [plantInfo, setPlantInfo] = useState({
    plantName: settings?.plant?.plantName || "Precision Aero Plant 4",
    facilityCode: settings?.plant?.facilityCode || "FAC-NY-420",
    timezone: settings?.plant?.timezone || "America/New_York (UTC-5)",
    activeLine: settings?.plant?.activeLine || "Primary CNC Cell B",
    shiftDuration: "8 Hours",
    operatingZones: 4
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (settings) {
      updateSettings({
        ...settings,
        plant: { ...settings.plant, ...plantInfo }
      });
    }
    showToast('Plant facility parameters updated', 'success');
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Plant Settings" showBack backPath="/profile" />

      <form onSubmit={handleSave} className="p-4 space-y-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-[#FF4D0A]/10 text-[#FF4D0A] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Facility Configuration</h2>
              <p className="text-xs text-slate-500">Site location and operating parameters</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-500 font-semibold block mb-1">Facility Name</label>
              <input 
                type="text" 
                value={plantInfo.plantName} 
                onChange={(e) => setPlantInfo({ ...plantInfo, plantName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Facility Site Code</label>
              <input 
                type="text" 
                value={plantInfo.facilityCode} 
                onChange={(e) => setPlantInfo({ ...plantInfo, facilityCode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium font-mono"
              />
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Timezone / Shift Baseline</label>
              <select
                value={plantInfo.timezone}
                onChange={(e) => setPlantInfo({ ...plantInfo, timezone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
              >
                <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                <option value="America/Chicago (UTC-6)">America/Chicago (UTC-6)</option>
                <option value="Europe/Berlin (UTC+1)">Europe/Berlin (UTC+1)</option>
                <option value="Asia/Tokyo (UTC+9)">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Primary Active Production Line</label>
              <input 
                type="text" 
                value={plantInfo.activeLine} 
                onChange={(e) => setPlantInfo({ ...plantInfo, activeLine: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FF4D0A] hover:bg-[#E64205] text-white font-bold text-sm shadow-lg shadow-[#FF4D0A]/20 transition-all flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Plant Configuration</span>
        </button>
      </form>
    </div>
  );
};
