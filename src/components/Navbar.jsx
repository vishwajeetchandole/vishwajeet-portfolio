import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Journey', id: 'journey' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 200;
      for (let i = 0; i < navItems.length; i++) {
        const el = document.getElementById(navItems[i].id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between">
            {/* Creative Floating Logo */}
            <motion.div 
              className="cursor-pointer flex-shrink-0 flex items-center gap-2 group" 
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-orange-light flex items-center justify-center text-white font-extrabold text-sm shadow-[0_4px_14px_rgba(249,99,0,0.3)] group-hover:rotate-6 transition-transform duration-300">
                VC
              </div>
              <span className="font-sans text-xl font-black tracking-tight text-gray-900">
                VISHWAJEET<span className="text-brand-orange animate-pulse">.</span>
              </span>
            </motion.div>

            {/* Desktop Creative Pill Nav */}
            <nav className={`hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-500 ${
              scrolled 
                ? 'bg-gray-100/80 border border-gray-200/70 shadow-inner backdrop-blur-md'
                : 'bg-white/60 border border-gray-200/80 shadow-sm backdrop-blur-md hover:bg-white/90'
            }`}>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-brand-orange'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="creativeActiveTab"
                      className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange-light shadow-[0_4px_16px_rgba(249,99,0,0.35)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Creative CTA Button */}
            <div className="hidden lg:block">
              <motion.button 
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white rounded-full cursor-pointer bg-gray-900 px-6 py-2.5 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Glowing Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orange-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="h-3.5 w-3.5 text-brand-orange group-hover:text-white transition-colors relative z-10" />
                <span className="relative z-10">Let's Talk</span>
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden p-2 rounded-xl text-gray-700 bg-white/80 border border-gray-200/80 shadow-sm cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Creative Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-2xl border border-gray-200/80 rounded-3xl shadow-2xl overflow-hidden lg:hidden p-4"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-brand-orange to-brand-orange-light text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-center bg-gray-900 text-white rounded-2xl py-3 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Let's Connect
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
