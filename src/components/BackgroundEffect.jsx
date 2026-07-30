import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none" style={{ background: '#f8f6f3' }}>
      {/* Soft orange blob — top left */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[640px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(249,99,0,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Soft peach blob — bottom right */}
      <motion.div
        className="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[580px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(249,99,0,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, -35, 30, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle warm center glow */}
      <motion.div
        className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] max-w-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(249,99,0,0.04) 0%, transparent 65%)' }}
        animate={{ x: [0, 20, -30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Very subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
