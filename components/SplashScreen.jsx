import React from 'react';
import { IEI_LOGO_IMG } from '../constants';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-splash-out pointer-events-none">
      <div className="text-center">
        <img
          src="https://ie-i-scrcciit.vercel.app/images/Official_ieircciit_Logo.png"
          alt="IEI Student Chapter RCCIIT Logo"
          className="h-40 w-40 md:h-48 md:w-48 mx-auto bg-white p-2 rounded-lg shadow-2xl animate-splash-logo"
        />
        <h1 className="mt-8 text-2xl md:text-4xl font-bold text-white font-algerian-like tracking-wider animate-splash-text opacity-0">
          The Institution of Engineers (India) Student Chapter
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 tracking-wider animate-splash-subtext opacity-0">
          Presented by the Department of Information Technology, RCCIIT
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
