import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Shield, ArrowRight, AlertCircle } from 'lucide-react';

// Hardcoded admin credentials (change to environment variables in production)
const ADMIN_USER = 'vishwajeet';
const ADMIN_PASS = 'portfolio@2026';
const SESSION_KEY = 'portfolio_admin_session';

export function isAdminAuthenticated() {
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return false;
    const { expires } = JSON.parse(session);
    return Date.now() < expires;
  } catch {
    return false;
  }
}

export function setAdminSession() {
  const session = { expires: Date.now() + 4 * 60 * 60 * 1000 }; // 4 hours
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (attempts >= 5) {
      setError('Too many attempts. Please wait a few minutes.');
      return;
    }
    setIsLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800)); // simulate auth
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdminSession();
      onSuccess();
    } else {
      setAttempts(a => a + 1);
      setError(`Invalid credentials. ${5 - attempts - 1} attempts remaining.`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-orange-light rounded-2xl shadow-[0_8px_30px_rgba(249,99,0,0.3)] mb-4"
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-3xl font-extrabold text-gray-900"
          >
            Admin Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm mt-1"
          >
            Portfolio Content Management System
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200 p-8"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  placeholder="Enter username"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand-orange focus:bg-white rounded-xl text-sm text-gray-800 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 focus:border-brand-orange focus:bg-white rounded-xl text-sm text-gray-800 focus:outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || attempts >= 5}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_18px_rgba(249,99,0,0.35)] hover:shadow-[0_6px_24px_rgba(249,99,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Verifying...</span></>
              ) : (
                <><span>Access Admin Panel</span><ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <a href="/" className="text-xs text-gray-400 hover:text-brand-orange transition-colors font-semibold">
              ← Back to Portfolio
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          This page is restricted to authorized administrators only.
        </motion.p>
      </motion.div>
    </div>
  );
}
