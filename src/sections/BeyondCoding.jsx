import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Rocket, BookOpen, BrainCircuit, Lightbulb, Compass } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  GitBranch, Rocket, BookOpen, BrainCircuit, Lightbulb, Compass
};

export default function BeyondCoding() {
  const { data } = usePortfolio();
  const { beyondCoding } = data;

  return (
    <section className="relative py-28 section-alt section-top-line overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Intro & Quote */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-5 text-left space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200/80 rounded-full">
                <Compass className="h-3.5 w-3.5 text-brand-orange" />
                Personal Pursuits
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                Beyond Coding
              </h2>
              <p className="text-gray-600 text-base leading-relaxed pt-2">
                {beyondCoding?.description}
              </p>
            </div>

            {beyondCoding?.quote && (
              <div className="bg-white rounded-3xl p-6 border-l-4 border-brand-orange border border-gray-200/80 shadow-sm space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">Philosophy</p>
                <p className="text-gray-800 font-semibold text-sm sm:text-base italic">
                  "{beyondCoding.quote}"
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Block: Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beyondCoding?.cards?.map((card, idx) => {
              const IconComp = iconMap[card.iconName] || Lightbulb;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-7 text-left border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative overflow-hidden group cursor-default flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/70 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors duration-500 pointer-events-none z-0" />

                  <div className="relative z-10 space-y-4">
                    <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 w-max shadow-sm">
                      <IconComp className="h-6 w-6 stroke-[2]" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-gray-900 text-xl group-hover:text-brand-orange transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
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
