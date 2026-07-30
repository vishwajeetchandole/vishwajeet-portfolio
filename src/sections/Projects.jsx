import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Car, Database, Eye, MessageSquare, Workflow, Folder, ArrowRight, Code2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = { Car, Database, Eye, MessageSquare, Workflow, Folder };

const accentMap = {
  orange: { icon: 'bg-orange-50/90 border-orange-200/80 text-orange-600 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent', bar: 'from-orange-500 via-amber-500 to-orange-400', cardHover: 'hover:bg-orange-50/40 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10', tag: 'bg-orange-50 border-orange-200/70 text-orange-700 hover:bg-orange-100' },
  violet: { icon: 'bg-violet-50/90 border-violet-200/80 text-violet-600 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-500 group-hover:text-white group-hover:border-transparent', bar: 'from-violet-500 via-purple-500 to-indigo-400', cardHover: 'hover:bg-violet-50/40 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10', tag: 'bg-violet-50 border-violet-200/70 text-violet-700 hover:bg-violet-100' },
  sky:    { icon: 'bg-sky-50/90 border-sky-200/80 text-sky-600 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent', bar: 'from-sky-500 via-blue-500 to-cyan-400', cardHover: 'hover:bg-sky-50/40 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10', tag: 'bg-sky-50 border-sky-200/70 text-sky-700 hover:bg-sky-100' },
  emerald:{ icon: 'bg-emerald-50/90 border-emerald-200/80 text-emerald-600 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent', bar: 'from-emerald-500 via-teal-500 to-green-400', cardHover: 'hover:bg-emerald-50/40 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10', tag: 'bg-emerald-50 border-emerald-200/70 text-emerald-700 hover:bg-emerald-100' },
  rose:   { icon: 'bg-rose-50/90 border-rose-200/80 text-rose-600 group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent', bar: 'from-rose-500 via-pink-500 to-red-400', cardHover: 'hover:bg-rose-50/40 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10', tag: 'bg-rose-50 border-rose-200/70 text-rose-700 hover:bg-rose-100' },
  amber:  { icon: 'bg-amber-50/90 border-amber-200/80 text-amber-600 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white group-hover:border-transparent', bar: 'from-amber-500 via-yellow-500 to-orange-400', cardHover: 'hover:bg-amber-50/40 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10', tag: 'bg-amber-50 border-amber-200/70 text-amber-700 hover:bg-amber-100' },
};

export default function Projects() {
  const { data } = usePortfolio();
  const projects = data.projects || [];
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="projects" className="relative py-28 section-top-line overflow-hidden">
      {/* Creative Background Decorative Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs"
          >
            <Code2 className="h-3.5 w-3.5 text-brand-orange" />
            My Works & Case Studies
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            Featured Projects
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Real-world AI models, Full-Stack applications, and intelligent tools built with precision.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, idx) => {
            const IconComp = iconMap[project.iconName] || Folder;
            const a = accentMap[project.accent] || accentMap.orange;
            const isHovered = hoveredIdx === idx;
            const hasDemo = project.demo && project.demo.trim() !== '' && project.demo !== '#';
            const formattedIndex = (idx + 1).toString().padStart(2, '0');

            return (
              <motion.div key={project.id || idx}
                initial={{ opacity: 0, y: 35 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative flex flex-col rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md border border-gray-200/90 transition-all duration-300 cursor-default shadow-xs ${a.cardHover} ${
                  isHovered ? '-translate-y-2' : ''
                }`}
                style={{ minHeight: '420px' }}
              >
                {/* Top Accent Strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${a.bar} relative z-10`} />

                <div className="flex flex-col flex-grow p-7 space-y-5 relative z-10">
                  
                  {/* Icon & Links Header */}
                  <div className="flex items-start justify-between">
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className={`p-3.5 rounded-2xl border ${a.icon} shadow-xs transition-all duration-300`}
                    >
                      <IconComp className="h-6 w-6 stroke-[2]" />
                    </motion.div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400/80 bg-gray-100/80 px-2.5 py-1 rounded-full border border-gray-200/60 mr-1">
                        PROJECT #{formattedIndex}
                      </span>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer"
                          className="p-2 rounded-xl text-gray-400 border border-gray-200/80 bg-gray-50/80 hover:text-gray-900 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200"
                          title="GitHub Repository"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {hasDemo && (
                        <a href={project.demo} target="_blank" rel="noreferrer"
                          className="p-2 rounded-xl text-gray-400 border border-gray-200/80 bg-gray-50/80 hover:text-brand-orange hover:border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all duration-200"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] font-bold text-brand-orange uppercase tracking-widest inline-block">
                      {project.tagline}
                    </span>
                    <h3 className={`font-sans font-bold text-2xl tracking-tight transition-colors duration-300 ${
                      isHovered ? 'text-brand-orange' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow font-normal">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech?.map((t, tIdx) => (
                      <span key={tIdx} 
                        className={`px-3 py-1 rounded-xl text-[11px] font-medium font-mono border transition-all duration-200 ${a.tag}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Bar */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100/90">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer"
                        className={`${hasDemo ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-50/90 border border-gray-200/90 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 cursor-pointer shadow-xs`}
                      >
                        <Github className="h-4 w-4" /> Source Code
                      </a>
                    )}
                    {hasDemo && (
                      <a href={project.demo} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-orange-light shadow-[0_4px_16px_rgba(249,99,0,0.3)] hover:shadow-[0_6px_24px_rgba(249,99,0,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        <span>Live Preview</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <a href={data.contact?.github || 'https://github.com/vishwajeetchandole'} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-gray-200/90 bg-white text-gray-800 hover:border-brand-orange/50 hover:bg-orange-50/50 hover:text-brand-orange text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md"
          >
            <Github className="h-5 w-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
            <span>Explore All Repositories on GitHub</span>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

