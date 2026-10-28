import React, { useState } from 'react';
import { Search, Plus, Cpu } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { MachineCard } from '../components/MachineCard';
import { AddMachineModal } from '../components/AddMachineModal';
import { useApp } from '../context/AppContext';

export const Machines = () => {
  const { machines, addMachine } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Counts
  const countAll = machines.length;
  const countRunning = machines.filter(m => m.status === 'running').length;
  const countIdle = machines.filter(m => m.status === 'idle').length;
  const countError = machines.filter(m => m.status === 'error').length;

  // Filtered machines
  const filteredMachines = machines.filter(m => {
    const matchesSearch = 
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' ? true :
      statusFilter === 'RUNNING' ? m.status === 'running' :
      statusFilter === 'IDLE' ? m.status === 'idle' :
      m.status === 'error';

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Machines" />

      <div className="p-4 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search machines, zones, types..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D0A]/20 focus:border-[#FF4D0A] shadow-soft"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Pills matching reference image */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none select-none">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'ALL'
                ? 'bg-[#FF4D0A] text-white shadow-sm shadow-[#FF4D0A]/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All ({countAll})
          </button>
          <button
            onClick={() => setStatusFilter('RUNNING')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'RUNNING'
                ? 'bg-[#FF4D0A] text-white shadow-sm shadow-[#FF4D0A]/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Running ({countRunning})
          </button>
          <button
            onClick={() => setStatusFilter('IDLE')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'IDLE'
                ? 'bg-[#FF4D0A] text-white shadow-sm shadow-[#FF4D0A]/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Idle ({countIdle})
          </button>
          <button
            onClick={() => setStatusFilter('ERROR')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'ERROR'
                ? 'bg-[#FF4D0A] text-white shadow-sm shadow-[#FF4D0A]/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Error ({countError})
          </button>
        </div>

        {/* Machines List */}
        <div className="space-y-2.5">
          {filteredMachines.length > 0 ? (
            filteredMachines.map(machine => (
              <MachineCard key={machine.id} machine={machine} />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-soft">
              <Cpu className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No machines found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                No machines match "{searchQuery}" under the selected filter.
              </p>
            </div>
          )}
        </div>

        {/* Add Machine Button matching reference image "+ Add New Machine" */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FF4D0A] hover:bg-[#E64205] text-white font-bold text-sm shadow-lg shadow-[#FF4D0A]/25 transition-all active:scale-[0.985] flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Add New Machine</span>
        </button>
      </div>

      {/* Add Machine Modal */}
      <AddMachineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addMachine}
      />
    </div>
  );
};
