import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Plus,
  Cpu
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const Maintenance = () => {
  const navigate = useNavigate();
  const { maintenance, updateMaintenanceStatus, showToast } = useApp();
  const [filter, setFilter] = useState('ALL');

  const filteredTasks = maintenance.filter(task => {
    if (filter === 'ALL') return true;
    return task.status.toUpperCase() === filter;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Critical</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#FF4D0A] border border-orange-200">High</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Routine</span>;
    }
  };

  const cycleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'In Progress' : (currentStatus === 'In Progress' ? 'Completed' : 'Pending');
    updateMaintenanceStatus(id, nextStatus);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Maintenance Orders" />

      <div className="p-4 space-y-4">
        {/* Status Filter */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl select-none text-xs font-bold">
          {['ALL', 'PENDING', 'IN PROGRESS', 'COMPLETED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === f ? 'bg-[#FF4D0A] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f === 'IN PROGRESS' ? 'In Prog.' : (f.charAt(0) + f.slice(1).toLowerCase())}
            </button>
          ))}
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div 
              key={task.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">{task.id}</span>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h3>
                  </div>
                </div>
                {getPriorityBadge(task.priority)}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                {task.notes}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <div 
                  onClick={() => navigate(`/machines/${task.machineId}`)}
                  className="flex items-center space-x-1 font-semibold text-slate-700 hover:text-[#FF4D0A] cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  <span>{task.machineId}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{task.technician}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{task.dueDate}</span>
                </div>
              </div>

              {/* Status Action Button */}
              <button
                onClick={() => cycleStatus(task.id, task.status)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  task.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : (task.status === 'In Progress'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200')
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: {task.status} (Tap to change)</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
