import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AndroidNavBar } from '../components/AndroidNavBar';
import { BottomNavigation } from '../components/BottomNavigation';
import { NavigationDrawer } from '../components/NavigationDrawer';
import { Toast } from '../components/Toast';

export const MainLayout = () => {
  const location = useLocation();

  // Root primary tabs show the bottom nav
  const showBottomNav = [
    '/', 
    '/analytics', 
    '/alerts', 
    '/reports', 
    '/profile', 
    '/machines'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen w-full bg-[#0E1724] flex items-center justify-center p-0 md:p-6 overflow-hidden select-none">
      {/* Mobile container / Android Smartphone Wrapper */}
      <div 
        className="relative w-full max-w-[420px] h-[100dvh] md:h-[880px] md:max-h-[96vh] bg-[#F5F7FA] text-[#102438] flex flex-col overflow-hidden rounded-none md:rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] md:border-[10px] md:border-[#102438]"
      >
        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
          <Outlet />
        </main>

        {/* Bottom Navigation (Inside phone) */}
        {showBottomNav && <BottomNavigation />}

        {/* Android Bottom Navigation Pill (Inside phone) */}
        <AndroidNavBar />

        {/* Navigation Drawer (Inside phone as overlay) */}
        <NavigationDrawer />

        {/* Toast notifications (Inside phone as overlay) */}
        <Toast />
      </div>
    </div>
  );
};
