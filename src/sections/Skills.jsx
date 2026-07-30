import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Brain, Database, FileCode, Code, Cpu, Wrench, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Layout, Server, Brain, Database, FileCode, Code, Cpu, Wrench, Terminal
};

export default function Skills() {
  const { data } = usePortfolio();
  const skillCategories = data.skills || [];

  return (
    <section id="skills" className="relative py-28 section-alt section-top-line overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs"
          >
            <Cpu className="h-3.5 w-3.5 text-brand-orange" />
            Technical Stack & Expertise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            Skills & Competencies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
            className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Languages, frameworks, databases, AI libraries, and tools I work with.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const IconComp = iconMap[cat.iconName] || Code;

            return (
              <motion.div
                key={cat.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-7 text-left border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Corner Pill Decorative Fill */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/70 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors duration-500 pointer-events-none z-0" />

                <div className="relative z-10 space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                    <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComp className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-gray-900 text-xl group-hover:text-brand-orange transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 uppercase tracking-widest">
                        {Array.isArray(cat.skills) ? cat.skills.length : 0} Technologies
                      </span>
                    </div>
                  </div>

                  {/* Tech Tags Badge Pills */}
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(cat.skills) && cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-50/90 border border-gray-200/80 text-gray-700 hover:border-brand-orange/50 hover:bg-orange-50 hover:text-brand-orange hover:shadow-2xs transition-all duration-200 cursor-default select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

