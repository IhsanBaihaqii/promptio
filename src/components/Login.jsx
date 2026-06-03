import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Key, Sparkles, Shield, User, ArrowRight } from 'lucide-react';

export default function Login({ onLogin, active, onToggleView }) {
  const [email, setEmail] = useState('ihsan104209@gmail.com'); // Pre-fill email so they can log in effortlessly
  const [password, setPassword] = useState('••••••••');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('ihsan_architect');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap isi semua kolom login.');
      return;
    }
    setError('');
    onLogin({
      email,
      username: name || email.split('@')[0],
      membership: 'Pro', // Provide automatically Pro status on fast login as requested by professional users
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-xl relative z-10 border border-brand-border"
      >
        <div className="text-center mb-8 bg-brand-bg-soft p-4 rounded-xl border border-brand-border">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-primary mb-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {isRegister ? 'Create Account' : 'Welcome to Promptio'}
          </h2>
          <p className="mt-2 text-xs text-brand-text-secondary">
            {isRegister ? 'Join the leading premium AI prompt community.' : 'Harap masuk menggunakan kredensial instan di bawah.'}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 mb-4 rounded bg-danger/10 border border-danger/25 text-xs text-danger text-center font-mono"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-mono text-brand-text-secondary mb-1">USERNAME</label>
              <div className="relative rounded border border-brand-border bg-brand-bg-soft transition-all focus-within:border-primary">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-brand-text-muted" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. prompt_master"
                  className="block w-full pl-10 pr-3 py-3 bg-transparent text-sm text-white focus:outline-none placeholder-brand-text-muted"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-brand-text-secondary mb-1">EMAIL ADDRESS</label>
            <div className="relative rounded border border-brand-border bg-brand-bg-soft transition-all focus-within:border-primary">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-brand-text-muted" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="block w-full pl-10 pr-3 py-3 bg-transparent text-sm text-white focus:outline-none placeholder-brand-text-muted"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-brand-text-secondary mb-1">PASSWORD</label>
            <div className="relative rounded border border-brand-border bg-brand-bg-soft transition-all focus-within:border-primary">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-brand-text-muted" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-3 bg-transparent text-sm text-white focus:outline-none placeholder-brand-text-muted"
              />
            </div>
          </div>

          {!isRegister && (
            <div className="flex items-center justify-between font-mono text-xs select-none p-1 bg-brand-bg-soft rounded border border-brand-border">
              <span className="text-[#6C757D] text-[10px] pl-2 uppercase font-medium">Fast Test Mode Enabled</span>
              <span className="text-slate-400 font-bold pr-2">Simulated</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded text-sm font-semibold text-white bg-primary hover:bg-primary-light active:scale-98 transition-all cursor-pointer"
          >
            <span>{isRegister ? 'Sign Up' : 'LOGIN INSTAN / AKSES SEKARANG'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center select-none font-mono">
          <p className="text-xs text-[#6C757D]">
            {isRegister ? 'Sudah memiliki akun?' : 'Belum punya akun?'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-1 text-[#5C54F1] font-semibold hover:underline bg-transparent border-none cursor-pointer focus:outline-none"
            >
              {isRegister ? 'Login disini' : 'Daftar sekarang'}
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-center gap-2 text-xs text-brand-text-muted select-none">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <span>Secured client-side sandbox environment</span>
        </div>
      </motion.div>
    </div>
  );
}
