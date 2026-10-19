import React from 'react';

export const AndroidNavBar = ({ dark = false }) => {
  return (
    <div className={`w-full py-2.5 flex items-center justify-center select-none ${dark ? 'bg-[#102438]' : 'bg-white'}`}>
      <div className={`w-32 h-1 rounded-full ${dark ? 'bg-slate-600' : 'bg-slate-300'}`} />
    </div>
  );
};
