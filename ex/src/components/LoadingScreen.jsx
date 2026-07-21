import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING PORTAL...');

  const phrases = [
    'CONNECTING SHIPPING CARRIERS...',
    'ESTABLISHING GLOBAL PORTS...',
    'CALCULATING LOGISTICS MARGINS...',
    'COMPILING 3D CARGO CONTAINERS...',
    'SYSTEM READY - EXPORT PORTAL OPENING'
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(calculatedProgress);

      // Rotate through phrases
      const phraseIdx = Math.min(
        Math.floor((calculatedProgress / 100) * phrases.length),
        phrases.length - 1
      );
      setLoadingText(phrases[phraseIdx]);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish();
        }, 500); // Small buffer for visual flow
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100vh',
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-[#121829] z-50 flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      
      {/* Decorative Blur Spheres */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] top-1/3 left-1/3 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-center space-x-2"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
            </svg>
          </div>
          <span className="font-display font-bold tracking-widest text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">ARAVIND</span>
        </motion.div>

        {/* Counter */}
        <h1 className="font-display font-black text-8xl md:text-9xl mb-4 tracking-tighter text-white select-none">
          {progress}<span className="text-teal-400 text-3xl md:text-4xl">%</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress status phrase */}
        <div className="h-6 flex items-center justify-center">
          <p className="font-mono text-xs text-gray-400 tracking-widest uppercase">
            {loadingText}
          </p>
        </div>
      </div>

      {/* Frame Corners */}
      <div className="absolute top-8 left-8 border-t-2 border-l-2 border-white/20 w-8 h-8" />
      <div className="absolute top-8 right-8 border-t-2 border-r-2 border-white/20 w-8 h-8" />
      <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-white/20 w-8 h-8" />
      <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-white/20 w-8 h-8" />

      {/* Additional Stats for Aesthetic */}
      <div className="absolute bottom-8 left-20 hidden md:block font-mono text-[9px] text-gray-500 tracking-wider">
        SYS_STATUS: ACTIVE<br />
        PORT: 8080 // SECURE_SSL
      </div>
      <div className="absolute bottom-8 right-20 hidden md:block font-mono text-[9px] text-gray-500 tracking-wider text-right">
        LAT: 13.0827° N<br />
        LNG: 80.2707° E
      </div>
    </motion.div>
  );
}
