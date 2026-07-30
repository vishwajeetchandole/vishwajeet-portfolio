import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, GraduationCap, Code, Rocket, Globe, Star, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Award, Trophy, GraduationCap, Code, Rocket, Globe, Star
};

export default function Achievements() {
  const { data } = usePortfolio();
  const achievements = data.achievements || [];

  return (
    <section id="achievements" className="relative py-28 section-top-line overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs"
          >
            <Trophy className="h-3.5 w-3.5 text-brand-orange" />
            Milestones & Recognition
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            Achievements
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Key accomplishments, hackathon wins, and technical milestones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, idx) => {
            const IconComp = iconMap[item.iconName] || Trophy;
            const hasImage = item.image && item.image.trim() !== '';
            const hasLink = item.link && item.link.trim() !== '';

            return (
              <motion.div key={item.id || idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-default"
              >
                {/* Optional Media Image Banner */}
                {hasImage && (
                  <div className="relative w-full h-44 overflow-hidden bg-gray-100 border-b border-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                <div className="p-7 flex-grow flex flex-col justify-between space-y-4 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/70 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors duration-500 pointer-events-none z-0" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-xs">
                        <IconComp className="h-5 w-5 stroke-[2]" />
                      </div>

                      {/* Optional External Link Button */}
                      {hasLink && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-50/90 border border-gray-200/80 hover:bg-orange-50 hover:border-orange-200 hover:text-brand-orange text-gray-700 rounded-xl text-xs font-bold transition-all duration-200 z-20 cursor-pointer shadow-2xs"
                          title="View Proof / Reference"
                        >
                          <span>Verify</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-gray-900 text-xl leading-snug group-hover:text-brand-orange transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
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

