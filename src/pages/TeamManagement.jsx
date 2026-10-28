import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../context/AppContext';

export const TeamManagement = () => {
  const { showToast } = useApp();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Krishna Gupta", role: "Product Specialist", dept: "Plant Operations", email: "krishna.g@driftlens-q.io", access: "Admin" },
    { id: 2, name: "Marcus Vance", role: "Chief Reliability Tech", dept: "Maintenance", email: "marcus.v@driftlens-q.io", access: "Editor" },
    { id: 3, name: "Elena Rostova", role: "Hydraulic Systems Lead", dept: "Operations", email: "elena.r@driftlens-q.io", access: "Editor" },
    { id: 4, name: "Devon Chen", role: "Thermal Systems Engineer", dept: "Utility", email: "devon.c@driftlens-q.io", access: "Viewer" }
  ]);

  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Operator', access: 'Viewer' });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;
    setTeamMembers([...teamMembers, { id: Date.now(), ...inviteForm, dept: 'Operations' }]);
    setIsInviteOpen(false);
    showToast(`Invitation sent to ${inviteForm.email}`, 'success');
    setInviteForm({ name: '', email: '', role: 'Operator', access: 'Viewer' });
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Team Management" showBack backPath="/profile" />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Plant Operations Staff</h2>
            <p className="text-xs text-slate-500">{teamMembers.length} active operators & engineers</p>
          </div>
          <button
            onClick={() => setIsInviteOpen(true)}
            className="py-2 px-3 rounded-xl bg-[#FF4D0A] text-white text-xs font-bold flex items-center space-x-1 shadow-md shadow-[#FF4D0A]/20"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft divide-y divide-slate-100">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 font-bold text-slate-700 flex items-center justify-center text-xs flex-shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{member.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-100 text-slate-700">
                      {member.access}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{member.role} • {member.dept}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsInviteOpen(false)} />
          <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Invite Team Member</h3>
              <button onClick={() => setIsInviteOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleInvite} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={inviteForm.name} 
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })} 
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Work Email</label>
                <input 
                  type="email" 
                  value={inviteForm.email} 
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} 
                  placeholder="sarah.j@driftlens-q.io"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Role Permission</label>
                <select
                  value={inviteForm.access}
                  onChange={(e) => setInviteForm({ ...inviteForm, access: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Admin">Admin (Full Control)</option>
                  <option value="Editor">Editor (Acknowledge & Edit)</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-[#FF4D0A] text-white font-bold"
              >
                Send Invite
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
