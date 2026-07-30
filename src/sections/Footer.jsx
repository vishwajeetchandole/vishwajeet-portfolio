import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const { contact } = data;

  const quickLinks = [
    { label: 'Home', id: 'home' }, { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' }, { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' }, { label: 'Journey', id: 'journey' },
    { label: 'Achievements', id: 'achievements' }, { label: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 pt-16 pb-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="font-sans text-2xl font-extrabold tracking-wider text-white">
              VISHWAJEET<span className="text-brand-orange">.</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              AI & Full Stack Developer passionate about building intelligent applications and continuously learning new technologies.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { href: contact?.github || "https://github.com/vishwajeetchandole", icon: Github },
                { href: contact?.linkedin || "https://linkedin.com/in/vishwajeetchandole", icon: Linkedin },
                { href: `mailto:${contact?.email || 'vishwajeetchandole@gmail.com'}`, icon: Mail }
              ].map(({ href, icon: Icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-brand-orange hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all duration-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-7 text-left">
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-white mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-500 hover:text-brand-orange text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                >{link.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-gray-600 text-xs gap-2">
          <span>© 2026 Vishwajeet Chandole. All Rights Reserved.</span>
          <a href="/admin" className="text-gray-500 hover:text-brand-orange transition-colors font-medium text-[11px] underline">
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
