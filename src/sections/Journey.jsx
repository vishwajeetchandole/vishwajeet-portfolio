import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Award, GraduationCap, Zap, Star, BookOpen, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Code2, Award, GraduationCap, Zap, Star, BookOpen
};

const tagColors = {
  Education: 'bg-blue-50/90 text-blue-700 border-blue-200/80',
  Development: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  Achievement: 'bg-amber-50/90 text-amber-700 border-amber-200/80',
  Current: 'bg-orange-50/90 text-orange-700 border-orange-200/80',
  Work: 'bg-purple-50/90 text-purple-700 border-purple-200/80',
  Research: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80',
};

export default function Journey() {
  const { data } = usePortfolio();
  const journeyData = data.journey || [];

  return (
    <section id="journey" className="relative py-28 section-alt section-top-line overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs"
          >
            <Zap className="h-3.5 w-3.5 text-brand-orange" />
            Timeline & Growth
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            My Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
            className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Milestones and key growth phases along my engineering path.
          </motion.p>
        </div>

        {/* Scroll-Triggered Reveal Timeline Stream */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-orange via-orange-300 to-brand-orange/20 rounded-full" />

          <div className="space-y-12">
            {journeyData.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || Zap;
              const tagStyle = tagColors[item.tag] || 'bg-orange-50 text-orange-700 border-orange-200';

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="relative flex items-start gap-6 sm:gap-8 group"
                >
                  {/* Glowing Icon Node */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-brand-orange text-brand-orange shadow-[0_4px_20px_rgba(249,99,0,0.2)] group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                    <IconComp className="h-5 w-5 sm:h-7 sm:w-7 stroke-[2]" />
                  </div>

                  {/* Card revealed as user scrolls */}
                  <div className="flex-1 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white rounded-xl text-xs font-mono font-bold shadow-xs">
                        <Clock className="h-3 w-3 text-brand-orange" />
                        {item.year}
                      </span>
                      {item.tag && (
                        <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${tagStyle}`}>
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed font-medium">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

