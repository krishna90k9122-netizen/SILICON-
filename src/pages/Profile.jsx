import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Key, 
  Users, 
  Building, 
  CreditCard, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useApp } from '../context/AppContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Demo user data
  const [userProfile, setUserProfile] = useState({
    name: "Krishna Gupta",
    role: "Product Specialist",
    department: "Plant Operations",
    email: "krishna.gupta@driftlens-q.industrial",
    employeeId: "EMP-4091"
  });

  const menuItems = [
    { label: 'Profile Information', icon: User, action: () => setIsEditProfileOpen(true) },
    { label: 'Change Password', icon: Key, action: () => setIsPasswordModalOpen(true) },
    { label: 'Team Management', icon: Users, action: () => navigate('/team') },
    { label: 'Plant Settings', icon: Building, action: () => navigate('/plant') },
    { label: 'Subscription', icon: CreditCard, action: () => setIsSubscriptionModalOpen(true) },
    { label: 'Help & Support', icon: HelpCircle, action: () => setIsSupportModalOpen(true) },
    { label: 'About DRIFTLENS-Q', icon: Info, action: () => navigate('/about') }
  ];

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    showToast('Logged out of demo session (simulated)', 'info');
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Profile" />

      <div className="p-4 space-y-4">
        {/* User Profile Identity Card matching reference image */}
        <div className="bg-[#102438] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center space-x-4 relative z-10">
            {/* Avatar circle */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF4D0A] to-amber-500 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-[#102438] rounded-2xl flex items-center justify-center font-bold text-xl text-white">
                KG
              </div>
            </div>

            {/* User Meta */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-tight truncate">
                  {userProfile.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FF4D0A] text-white tracking-wider">
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-[#FF4D0A] font-semibold mt-0.5">
                {userProfile.role}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {userProfile.department}
              </p>
            </div>
          </div>

          {/* Decorative geometric background elements */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#FF4D0A]/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Menu list matching reference image */}
        <div className="bg-white rounded-3xl p-2 border border-slate-200/90 shadow-soft divide-y divide-slate-100">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FF4D0A]/10 group-hover:text-[#FF4D0A] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D0A] group-hover:translate-x-0.5 transition-all" />
              </div>
            );
          })}
        </div>

        {/* Logout Button matching reference image */}
        <button
          onClick={() => setIsLogoutDialogOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-sm shadow-soft transition-all active:scale-[0.985] flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        title="Sign Out"
        message="Are you sure you want to log out of the DRIFTLENS-Q session? Your local demo changes will remain safely preserved in localStorage."
        confirmText="Logout"
        isDestructive
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsEditProfileOpen(false)} />
          <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs">Profile Information</h3>
              <button onClick={() => setIsEditProfileOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="mt-3 space-y-2.5 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={userProfile.name} 
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Job Title</label>
                <input 
                  type="text" 
                  value={userProfile.role} 
                  onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Email</label>
                <input 
                  type="email" 
                  value={userProfile.email} 
                  disabled
                  className="w-full p-2 rounded-xl border border-slate-200 font-medium bg-slate-50 text-slate-400"
                />
              </div>
              <button
                onClick={() => {
                  setIsEditProfileOpen(false);
                  showToast('Profile updated locally', 'success');
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#FF4D0A] text-white font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsPasswordModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs">Change Password (Demo UI)</h3>
              <button onClick={() => setIsPasswordModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="mt-3 space-y-2.5 text-xs">
              <input type="password" placeholder="Current Password" className="w-full p-2 rounded-xl border border-slate-200" />
              <input type="password" placeholder="New Password" className="w-full p-2 rounded-xl border border-slate-200" />
              <input type="password" placeholder="Confirm New Password" className="w-full p-2 rounded-xl border border-slate-200" />
              <button
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  showToast('Password change simulated (frontend only)', 'info');
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#FF4D0A] text-white font-bold"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {isSubscriptionModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSubscriptionModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95 text-center">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#FF4D0A] flex items-center justify-center mx-auto mb-2.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">DRIFTLENS Enterprise Tier</h3>
            <p className="text-[11px] text-slate-500 mt-1">Unlimited industrial nodes & edge analytics enabled.</p>
            <div className="my-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono">
              License: ENT-2026-AERO • Active
            </div>
            <button
              onClick={() => setIsSubscriptionModalOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {isSupportModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSupportModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl z-10 animate-in zoom-in-95 text-center">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Industrial Support Desk</h3>
            <p className="text-[11px] text-slate-500 mt-1">Direct access to systems engineering support.</p>
            <div className="my-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
              <p>Hotline: +1 (800) 555-DRYFT</p>
              <p>Email: support@driftlens-q.io</p>
            </div>
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
