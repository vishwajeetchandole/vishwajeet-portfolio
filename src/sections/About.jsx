import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Code, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Terminal, Cpu, Award, Code
};

export default function About() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="relative py-28 section-alt section-top-line overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-100/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200/80 rounded-full"
          >
            <Sparkles className="h-3 w-3 text-brand-orange" />
            Discover My Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            {about.subtitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
            className="text-gray-400 text-sm max-w-lg mx-auto"
          >
            Combining strong technical fundamentals with creative problem solving to build scalable solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Narrative & Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left"
          >
            {/* Bio Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4 hover:border-orange-200/80 transition-all duration-300">
              <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed">
                {about.bio1}
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {about.bio2}
              </p>
            </div>

            {/* Current Focus Areas Card */}
            <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-7 sm:p-8 border border-orange-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-sans text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 bg-brand-orange rounded-full animate-ping" />
                  Core Technical Focus
                </h4>
                <span className="text-[11px] font-mono font-bold text-brand-orange bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60">
                  2026 ROADMAP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {about.focusAreas?.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 bg-white/90 rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="p-1.5 rounded-xl bg-orange-50 border border-orange-100 text-brand-orange">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Block: Highlight Cards Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"
          >
            {about.highlights?.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || Code;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-white rounded-3xl p-6 flex flex-col justify-between h-48 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative overflow-hidden group cursor-default"
                >
                  {/* Decorative Background Pill */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors duration-500 pointer-events-none z-0" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-all duration-300 shadow-sm">
                      <IconComp className="h-6 w-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <h4 className="font-sans font-bold text-gray-900 text-xl group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs font-medium leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Creative Bottom CTA Box */}
            <div className="sm:col-span-2 bg-gray-900 text-white rounded-3xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-1 relative z-10">
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">Ready to collaborate?</p>
                <h5 className="font-sans font-bold text-sm">Let me bring your ideas to life.</h5>
              </div>
              <a 
                href="#contact" 
                className="p-3 bg-brand-orange text-white rounded-2xl group-hover:scale-110 transition-transform shadow-md cursor-pointer relative z-10"
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
