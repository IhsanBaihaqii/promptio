import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Key, CreditCard, Sparkles, Check, Lock } from 'lucide-react';

export default function Profile({ user, onSetMembership, onTriggerToast, onLogout }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [username, setUsername] = useState(user.username || 'prompt_enthusiast');
  const [email, setEmail] = useState(user.email || 'guest@promptio.id');

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    onTriggerToast('success', 'Informasi akun sukses diperbarui!');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      onTriggerToast('error', 'Harap isi semua kolom kata sandi.');
      return;
    }
    if (newPassword !== confirmPassword) {
      onTriggerToast('error', 'Konfirmasi kata sandi baru tidak cocok.');
      return;
    }
    onTriggerToast('success', 'Kata sandi berhasil diperbarui secara aman.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleToggleMembershipFromProfile = () => {
    const target = user.membership === 'Pro' ? 'Free' : 'Pro';
    onSetMembership(target);
    if (target === 'Pro') {
      onTriggerToast('success', 'Membership Anda diubah menjadi PRO Access!');
    } else {
      onTriggerToast('warning', 'Membership Anda diubah menjadi FREE Access.');
    }
  };

  return (
    <div className="py-20 relative min-h-[85vh] bg-brand-bg md:py-24">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-6">
        
        {/* Profile Card Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl glass-panel p-6 sm:p-10 mb-8 border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
        >
          {/* Cover border background - Solid Indigo */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary" />

          {/* Avatar frame */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-primary">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                alt={username}
                referrerPolicy="no-referrer"
                draggable="false"
                className="w-full h-full rounded-full object-cover border-4 border-brand-bg-soft"
              />
            </div>
            
            {/* Pulsing state badge */}
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-success border-2 border-brand-bg-card flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* User basic status info */}
          <div className="flex-1 text-center md:text-left select-none">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {username}
              </h2>

              <div className="mx-auto md:mx-0 shrink-0">
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold tracking-wider inline-flex items-center gap-1.5 border uppercase ${
                  user.membership === 'Pro'
                    ? 'bg-primary text-white border-primary-light'
                    : 'bg-brand-bg-soft text-brand-text-muted border-brand-border'
                }`}>
                  {user.membership === 'Pro' ? <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{user.membership || 'Free'} Status</span>
                </span>
              </div>
            </div>

            <p className="mt-1 text-sm text-brand-text-secondary flex items-center justify-center md:justify-start gap-1.5 font-mono">
              <Mail className="w-4 h-4 text-brand-text-muted shrink-0" />
              <span>{email}</span>
            </p>

            <div className="mt-4 pt-4 border-t border-brand-border flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-mono text-brand-text-muted">
              <span>MEMBER SINCE: <span className="text-white">June 2026</span></span>
              <span>•</span>
              <span>EXPIRED STATUS: <span className="text-accent font-bold">12 Juli 2027</span></span>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
            <button
              onClick={handleToggleMembershipFromProfile}
              className="w-full md:w-auto px-5 py-3 rounded text-xs font-mono font-bold text-center text-white bg-primary hover:bg-primary-light cursor-pointer transition-all whitespace-nowrap"
            >
              {user.membership === 'Pro' ? 'DEMOTE TO FREE TIER' : 'ACTIVATE PRO ACCESS ✓'}
            </button>
            <button
              onClick={onLogout}
              className="w-full md:w-auto px-5 py-2.5 rounded text-xs font-mono font-bold text-center text-brand-text-muted hover:text-white bg-brand-bg-soft hover:bg-brand-bg transition-all cursor-pointer border border-[#2D313F]"
            >
              LOGOUT ACCOUNT
            </button>
          </div>
        </motion.div>

        {/* 3 Core Fields Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Segment 1: Account Information */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl glass-card p-6 bg-brand-bg-card flex flex-col justify-between border border-brand-border"
          >
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-brand-border pb-4">
                <User className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-display font-medium text-white">Account Information</h3>
              </div>

              <form onSubmit={handleUpdateAccount} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-brand-text-secondary mb-1">EDIT USERNAME</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-3 bg-brand-bg-soft border border-brand-border rounded text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-text-secondary mb-1">EDIT CONTACT EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 bg-brand-bg-soft border border-brand-border rounded text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded text-xs font-mono font-bold text-white bg-brand-bg-soft border border-brand-border hover:border-primary cursor-pointer transition-all"
                  >
                    SAVE PROFILE INFORMATION
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-border flex items-center gap-2 text-xs text-brand-text-muted font-mono">
              <Shield className="w-4 h-4 text-primary-light" />
              <span>Semua data terenkripsi lokal 256-bit</span>
            </div>
          </motion.div>

          {/* Segment 2: Change Password Form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl glass-card p-6 bg-brand-bg-card border border-brand-border"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-brand-border pb-4">
              <Key className="w-5 h-5 text-primary-light" />
              <h3 className="text-lg font-display font-medium text-white">Change Password</h3>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-brand-text-secondary mb-1">CURRENT PASSWORD</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-4 py-3 bg-brand-bg-soft border border-brand-border rounded text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-text-secondary mb-1">NEW PASSWORD</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="block w-full px-4 py-3 bg-brand-bg-soft border border-brand-border rounded text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-text-secondary mb-1">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="block w-full px-4 py-3 bg-brand-bg-soft border border-brand-border rounded text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded text-xs font-mono font-bold text-white bg-brand-bg-soft border border-brand-border hover:border-primary cursor-pointer transition-all"
                >
                  SAVE NEW SECURED PASSWORD
                </button>
              </div>
            </form>
          </motion.div>

        </div>

        {/* Subscription Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl glass-card p-6 sm:p-8 bg-brand-bg-card mt-8 border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded bg-brand-bg-soft border border-brand-border text-primary-light shrink-0">
              <CreditCard className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="text-lg font-display font-medium text-white">Subscription Management</h3>
              <p className="text-sm text-brand-text-secondary mt-1 font-sans">
                {user.membership === 'Pro' 
                  ? 'Keanggotaan aktif terdaftar pada metode credit-card. Tanggal perpanjangan otomatis berikutnya adalah 12 Juli 2027.'
                  : 'Anda terdaftar pada paket Free. Tingkatkan keanggotaan sekarang untuk membuka copy-paste prompt tak terbatas.'
                }
              </p>
            </div>
          </div>

          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            {user.membership === 'Pro' ? (
              <button
                onClick={() => {
                  onSetMembership('Free');
                  onTriggerToast('warning', 'Siklus perpanjangan otomatis dinonaktifkan.');
                }}
                className="w-full sm:w-auto px-5 py-3 rounded text-xs font-mono font-bold text-brand-text-muted hover:text-white bg-transparent border border-brand-border hover:border-danger hover:text-danger hover:bg-danger/5 transition-all cursor-pointer whitespace-nowrap"
              >
                CANCEL SUBSCRIPTION
              </button>
            ) : (
              <button
                onClick={() => {
                  onSetMembership('Pro');
                  onTriggerToast('success', 'Selamat datang di paket PRO!');
                }}
                className="w-full sm:w-auto px-5 py-3 rounded text-xs font-mono font-bold text-brand-text-bg bg-primary text-white hover:bg-primary-light cursor-pointer transition-all whitespace-nowrap"
              >
                UPGRADE TO PRO
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
