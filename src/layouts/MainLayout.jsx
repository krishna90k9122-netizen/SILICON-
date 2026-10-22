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
    <div className="min-h-[100vh] min-h-[100dvh] w-full bg-[#F5F7FA] lg:bg-[#0E1724] flex items-center justify-center p-0 lg:p-6 select-none">
      {/* Mobile container: 100% fluid on all mobile/tablet sizes & landscape; elegant mockup only on large desktop screens */}
      <div 
        className="relative w-full h-[100vh] h-[100dvh] lg:max-w-[420px] lg:h-[880px] lg:max-h-[96vh] bg-[#F5F7FA] text-[#102438] flex flex-col overflow-hidden rounded-none lg:rounded-[44px] shadow-none lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-none lg:border-[10px] lg:border-[#102438]"
      >
        {/* Scrollable Main Content Area with native touch momentum */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative overscroll-contain scroll-touch scroll-smooth">
          <Outlet />

          {/* Safe area spacer for pages without bottom nav (ensures content is never hidden behind Android gesture pill) */}
          {!showBottomNav && (
            <div 
              aria-hidden="true" 
              className="w-full flex-shrink-0" 
              style={{ height: 'max(env(safe-area-inset-bottom, 0px), 12px)' }} 
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {showBottomNav && <BottomNavigation />}

        {/* Simulated Android Gesture Pill (Only visible in desktop mockup preview) */}
        <div className="hidden lg:block">
          <AndroidNavBar />
        </div>

        {/* Navigation Drawer (Overlay inside phone frame) */}
        <NavigationDrawer />

        {/* Toast notifications (Overlay inside phone frame) */}
        <Toast />
      </div>
    </div>
  );
};
