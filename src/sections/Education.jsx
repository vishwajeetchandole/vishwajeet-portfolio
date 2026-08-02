import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Clock, MapPin, Building2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Education() {
  const { data } = usePortfolio();
  const educationData = data.education || [];

  return (
    <section id="education" className="relative py-28 section-top-line overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-orange-100/30 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs"
          >
            <GraduationCap className="h-3.5 w-3.5 text-brand-orange" />
            Academic Qualifications
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            Education
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
            className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            My academic foundation and technical engineering studies.
          </motion.p>
        </div>

        {/* Clean Single Row Grid (3 equal columns on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {educationData.map((item, idx) => {
            const isOngoing = item.status === 'Ongoing';

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-7 border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Corner Accent Fill */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/70 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors duration-500 pointer-events-none z-0" />

                <div className="space-y-5 relative z-10">
                  {/* Top Row: Duration & Status Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-gray-600 font-mono font-semibold bg-gray-50 px-3 py-1 rounded-xl border border-gray-200/60">
                      <Clock className="h-3.5 w-3.5 text-brand-orange" />
                      {item.duration}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider ${
                      isOngoing 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200/80'
                    }`}>
                      {isOngoing && <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                      {item.status}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="font-sans font-bold text-gray-900 text-xl leading-snug group-hover:text-brand-orange transition-colors">
                    {item.degree}
                  </h3>

                  {/* Institute Name */}
                  <div className="flex items-start gap-2 text-gray-600 text-xs font-semibold">
                    <Building2 className="h-4 w-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>{item.institute}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Score Badge (if present) */}
                {item.score && (
                  <div className="pt-4 mt-5 border-t border-gray-100 flex items-center gap-2 text-xs text-brand-orange font-bold relative z-10">
                    <div className="p-1 rounded-lg bg-orange-50 border border-orange-100">
                      <Award className="h-3.5 w-3.5 text-brand-orange" />
                    </div>
                    <span>Score: {item.score}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

