import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, MapPin, GraduationCap, Sparkles, Code2 } from 'lucide-react';
import profilePic from '../assets/Vish Pic.png';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const { hero } = data;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[25rem] h-[25rem] bg-orange-100/60 rounded-full blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Text Content */}
          <div className="lg:col-span-7 text-left space-y-6 order-2 lg:order-1">
            
            {/* Glowing Welcome Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/90 border border-orange-200/80 px-4 py-1.5 rounded-full text-brand-orange text-xs sm:text-sm font-bold tracking-wider shadow-sm backdrop-blur-md hover:border-brand-orange/40 transition-colors"
            >
              <span>{hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-[3.8rem] font-black tracking-tight leading-[1.1] text-gray-900"
            >
              I'm <span className="text-gradient-orange relative">
                {hero.name}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>,<br />
              <span className="font-semibold text-gray-500 text-2xl sm:text-3xl md:text-4xl block mt-3">
                {hero.role}
              </span>
            </motion.h1>

            {/* Optional Location / Institute Pills */}
            {(hero.institute || hero.location) && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex flex-wrap gap-2.5"
              >
                {hero.institute && (
                  <span className="inline-flex items-center gap-1.5 text-gray-600 text-xs font-medium bg-white border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                    <GraduationCap className="h-3.5 w-3.5 text-brand-orange" />
                    {hero.institute}
                  </span>
                )}
                {hero.location && (
                  <span className="inline-flex items-center gap-1.5 text-gray-600 text-xs font-medium bg-white border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                    {hero.location}
                  </span>
                )}
              </motion.div>
            )}

            {/* Glassmorphic Quote Block */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-base sm:text-lg font-semibold text-gray-800 bg-white/60 border-l-4 border-brand-orange p-4 rounded-r-2xl shadow-sm backdrop-blur-sm italic max-w-2xl leading-snug"
            >
              "{hero.tagline}"
            </motion.p>

            {/* Intro Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              {hero.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange-light text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-2xl shadow-[0_6px_24px_rgba(249,99,0,0.35)] hover:shadow-[0_8px_32px_rgba(249,99,0,0.5)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <span>View Featured Projects</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a 
                href="/Vishwajeet_Chandole_Resume.pdf" 
                download
                className="group inline-flex items-center gap-2 border-2 border-gray-200 bg-white hover:border-brand-orange/40 hover:bg-orange-50 text-gray-800 hover:text-brand-orange font-bold uppercase tracking-wider text-xs px-7 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <FileText className="h-4 w-4 text-brand-orange" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Creative Profile Display with Soft Animated Background */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[27rem] md:h-[27rem]"
            >
              {/* Soft Pulsing Animated Background Halo */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-orange-300/40 via-amber-200/50 to-orange-100/30 blur-2xl pointer-events-none"
              />

              {/* Gentle Rotating Dashed Accent Ring */}
              <div className="absolute inset-4 border border-dashed border-orange-300/70 rounded-full animate-[spin_25s_linear_infinite]" />
              
              {/* Soft Inner Gradient Ring */}
              <div className="absolute inset-7 rounded-full bg-gradient-to-br from-orange-100/60 to-orange-50/20 border border-orange-200/40 backdrop-blur-sm" />

              {/* Profile Image Frame */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_45px_rgba(249,99,0,0.22)] ring-4 ring-orange-100/90 bg-white">
                <img 
                  src={profilePic} 
                  alt={`${hero.name} — ${hero.role}`}
                  className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge: Status */}
              <motion.div 
                animate={{ y: [-6, 6, -6] }} 
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 -right-4 sm:right-0 flex items-center gap-2 bg-white/95 border border-gray-200/90 px-4 py-2 rounded-2xl text-xs font-bold text-gray-800 shadow-xl backdrop-blur-md z-10"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Available for Roles
              </motion.div>

              {/* Floating Badge: Tech */}
              <motion.div 
                animate={{ y: [6, -6, 6] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-2 -left-4 sm:left-0 flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xl border border-gray-700 z-10"
              >
                <Code2 className="h-4 w-4 text-brand-orange" />
                <span>B.Tech AIML Student</span>
              </motion.div>

              {/* Corner Code Bubbles */}
              <div className="absolute top-12 -left-8 text-[10px] font-mono text-brand-orange border border-orange-200 rounded-xl px-2.5 py-1 bg-white/90 shadow-sm backdrop-blur-sm hidden sm:block z-10">
                model.fit()
              </div>
              <div className="absolute bottom-16 -right-8 text-[10px] font-mono text-gray-600 border border-gray-200 rounded-xl px-2.5 py-1 bg-white/90 shadow-sm backdrop-blur-sm hidden sm:block z-10">
                git push
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
