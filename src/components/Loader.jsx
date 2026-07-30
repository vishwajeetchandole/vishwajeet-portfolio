import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ finishLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => finishLoading(), 300);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f6f3]">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(249,99,0,0.06) 0%, transparent 65%)' }} />

      <div className="relative w-full max-w-sm px-8 text-center">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-wider text-gray-900">
            VISHWAJEET<span className="text-brand-orange">.</span>
          </h1>
          <p className="text-gray-400 tracking-widest text-xs uppercase mt-2 font-sans">
            AI & Full Stack Developer
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(249,99,0,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-mono text-gray-400">
          <span>LOADING PORTFOLIO</span>
          <span className="text-brand-orange font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
