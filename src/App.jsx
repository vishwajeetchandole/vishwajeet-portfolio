import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context
import { PortfolioProvider } from './context/PortfolioContext';

// Admin
import AdminLogin, { isAdminAuthenticated } from './admin/AdminLogin';
import AdminPanel, { ToastContainer } from './admin/AdminPanel';

// Components
import Loader from './components/Loader';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Marquee from './components/Marquee';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Achievements from './sections/Achievements';
import BeyondCoding from './sections/BeyondCoding';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Portfolio main page
function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="min-h-screen text-gray-900 bg-[#f8f6f3] selection:bg-brand-orange selection:text-white relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" finishLoading={() => setLoading(false)} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex flex-col relative w-full overflow-hidden"
          >
            <BackgroundEffect />
            <Navbar />
            <BackToTop />
            <main className="flex-grow w-full">
              <Hero />
              <About />
              <Education />
              <Skills />
              <Projects />
              <Journey />
              <Achievements />
              <Marquee />
              <BeyondCoding />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}

// Admin route guard
function AdminRoute() {
  const [authed, setAuthed] = useState(isAdminAuthenticated());
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;
  return <AdminPanel onLogout={() => setAuthed(false)} />;
}

export default function App() {
  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PortfolioProvider>
  );
}
