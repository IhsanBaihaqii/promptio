import React from 'react';
import { motion } from 'motion/react';
import { Check, X, ShieldCheck, Sparkles, Zap, Lock, Star } from 'lucide-react';

export default function Pricing({ currentMembership, onSetMembership, onTriggerToast }) {
  
  const handleSelectTier = (tier) => {
    onSetMembership(tier);
    if (tier === 'Pro') {
      onTriggerToast('success', 'Selamat! Anda berhasil Upgrade ke PRO Membership.');
    } else {
      onTriggerToast('warning', 'Kembali ke Free Membership. Beberapa prompt premium kini terkunci.');
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-bg-soft border border-brand-border text-xs font-mono font-medium text-accent mb-4 uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>PRICING CATALOG</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white mb-4 text-center">
            Pilih Paket <span className="text-primary-light font-bold">Kreativitas Anda</span>
          </h2>
          <p className="text-brand-text-secondary text-base sm:text-lg">
            Akses tak terbatas ke ribuan studio preset copy-paste dan visual cinematic unik. Batalkan kapan saja tanpa komitmen.
          </p>
        </div>

        {/* Dual Tier Comparison Grid Cards with Solid Colors only! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* FREE PLAN CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`group rounded-xl p-8 bg-brand-bg-soft border relative flex flex-col justify-between ${
              currentMembership === 'Free' 
                ? 'border-brand-text-muted shadow-xl' 
                : 'border-brand-border'
            }`}
          >
            {currentMembership === 'Free' && (
              <span className="absolute top-4 right-4 bg-brand-bg px-3 py-1 rounded text-[10px] font-mono tracking-widest text-[#B8C1EC] border border-brand-border">
                YOUR TIER
              </span>
            )}
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-mono tracking-widest text-brand-text-muted uppercase">STARTUP TIER</span>
              </div>
              <h3 className="text-3xl font-display font-medium text-white">Free Plan</h3>
              <p className="text-brand-text-secondary text-sm mt-2 mb-6">Cocok untuk pemula yang ingin mengeksplorasi gaya dasar prompt AI.</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl sm:text-5xl font-display font-bold text-white">Rp 0</span>
                <span className="text-brand-text-muted text-xs font-mono ml-2 uppercase">/ FOREVER</span>
              </div>

              {/* List features preview */}
              <ul className="space-y-4 border-t border-brand-border pt-6 mb-8">
                <li className="flex items-center gap-3 text-sm text-brand-text-secondary">
                  <span className="w-5 h-5 rounded bg-success/10 flex items-center justify-center border border-success/20 shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </span>
                  <span>View Basic Prompts (Terbatas)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-brand-text-secondary">
                  <span className="w-5 h-5 rounded bg-danger/10 flex items-center justify-center border border-danger/20 shrink-0">
                    <X className="w-3 h-3 text-danger" />
                  </span>
                  <span className="text-brand-text-muted">Copy Prompt (Dinonaktifkan)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-brand-text-secondary">
                  <span className="w-5 h-5 rounded bg-danger/10 flex items-center justify-center border border-danger/20 shrink-0">
                    <X className="w-3 h-3 text-danger" />
                  </span>
                  <span className="text-brand-text-muted">Delayed New Releases</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-brand-text-secondary">
                  <span className="w-5 h-5 rounded bg-danger/10 flex items-center justify-center border border-danger/20 shrink-0">
                    <X className="w-3 h-3 text-danger" />
                  </span>
                  <span className="text-brand-text-muted">Premium Cinematic Styles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier('Free')}
              disabled={currentMembership === 'Free'}
              className={`w-full py-3.5 rounded text-xs font-mono font-bold tracking-wider cursor-pointer border ${
                currentMembership === 'Free'
                  ? 'border-brand-border bg-[#14161E] text-brand-text-muted cursor-not-allowed'
                  : 'bg-brand-bg border border-brand-border text-white hover:bg-black transition-all'
              }`}
            >
              {currentMembership === 'Free' ? 'FREE ACTIVE TIER' : 'DOWNGRADE TO FREE'}
            </button>
          </motion.div>

          {/* PRO PLAN CARD (PREMIUM STYLING WITH SOLID HIGH CONTRAST) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`group rounded-xl p-8 bg-brand-bg-card border relative flex flex-col justify-between shadow-2xl ${
              currentMembership === 'Pro' 
                ? 'border-primary' 
                : 'border-brand-border'
            }`}
          >
            {/* Tag popular - Solid */}
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded text-[10px] font-mono tracking-widest text-white border border-primary-light flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-yellow-300" />
              RECOMMENDED ACCESS
            </span>

            {currentMembership === 'Pro' && (
              <span className="absolute top-4 right-4 bg-primary/20 border border-primary/30 px-3 py-1 rounded text-[10px] font-mono tracking-widest text-[#CED4DA] font-extrabold animate-pulse">
                PRO ACTIVE
              </span>
            )}
            
            <div>
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span className="text-sm font-mono tracking-widest text-[#CED4DA] uppercase">ELITE DESIGNER PLAN</span>
              </div>
              <h3 className="text-3xl font-display font-medium text-white flex items-center gap-2">
                Pro Access
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </h3>
              <p className="text-[#CED4DA] text-sm mt-2 mb-6">Akses instan tak terbatas ke generator prompt, preset eksklusif, kopi tak terbatas.</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl sm:text-5xl font-display font-bold text-white">Rp 99.000</span>
                <span className="text-[#CED4DA] text-xs font-mono ml-2">/ BULAN</span>
              </div>

              {/* List features preview */}
              <ul className="space-y-4 border-t border-brand-border pt-6 mb-8">
                <li className="flex items-center gap-3 text-sm text-[#CED4DA]">
                  <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="font-semibold text-white">Unlimited Prompt View (Full Access)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#CED4DA]">
                  <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="font-semibold text-white">Full Copy-Paste Active Engine</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#CED4DA]">
                  <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="font-semibold text-white">Instant Release Updates</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#CED4DA]">
                  <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="font-semibold text-white">Premium Styles & Cyberpunk Presets</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier('Pro')}
              className={`w-full py-3.5 rounded text-xs font-mono font-bold tracking-wider cursor-pointer transition-all ${
                currentMembership === 'Pro'
                  ? 'border border-[#2D313F] bg-transparent text-[#CED4DA] cursor-default'
                  : 'bg-primary border border-primary-light hover:bg-primary-light text-white'
              }`}
            >
              {currentMembership === 'Pro' ? 'YOUT ARE ON THE PRO PLAN ✓' : 'UPGRADE TO ELITE PRO'}
            </button>
          </motion.div>

        </div>

        {/* COMPARATIVE SYSTEM TABLE */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-display font-bold text-white mb-2 text-center">Tabel Perbandingan Fitur</h3>
            <p className="text-brand-text-secondary text-sm">Review detail kemampuan akses dari masing-masing level keanggotaan.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg-card shadow-2xl">
            <table className="w-full text-left font-mono text-xs select-none border-collapse text-center">
              <thead>
                <tr className="border-b border-brand-border bg-brand-bg-soft text-brand-text-secondary uppercase tracking-widest text-[10px]">
                  <th className="py-5 px-6 font-bold text-left">FITUR UTAMA</th>
                  <th className="py-5 px-6 font-bold">FREE PLAN</th>
                  <th className="py-5 px-6 font-bold text-accent">PRO ELITE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-white/90">
                
                <tr>
                  <td className="py-5 px-6 text-left font-sans font-medium">View Direct Prompt</td>
                  <td className="py-5 px-6 text-brand-text-secondary">Limited (Sangat Terbatas)</td>
                  <td className="py-5 px-6 text-success font-semibold">Unlimited (Tak Terbatas)</td>
                </tr>

                <tr>
                  <td className="py-5 px-6 text-left font-sans font-medium">Copy Prompt ke Clipboard</td>
                  <td className="py-5 px-6 text-danger"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-5 px-6 text-success font-semibold"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                <tr>
                  <td className="py-5 px-6 text-left font-sans font-medium">New Uploads Releases</td>
                  <td className="py-5 px-6 text-brand-text-secondary">Delayed (Tertunda 7 Hari)</td>
                  <td className="py-5 px-6 text-success font-semibold">Instant Access</td>
                </tr>

                <tr>
                  <td className="py-5 px-6 text-left font-sans font-medium">Premium Styles & Cyberpunk Filters</td>
                  <td className="py-5 px-6 text-danger"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-5 px-6 text-success font-semibold"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                <tr>
                  <td className="py-5 px-6 text-left font-sans font-medium">Lisensi Komersial Hasil Visual</td>
                  <td className="py-5 px-6 text-brand-text-secondary">Penggunaan Pribadi Saja</td>
                  <td className="py-5 px-6 text-success font-semibold">Lisensi Komersial Penuh</td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-brand-bg-soft border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded bg-brand-bg-card text-accent border border-brand-border">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div>
                <h4 className="text-sm font-sans font-bold text-white">Garansi Uang Kembali 7 Hari</h4>
                <p className="text-xs text-[#CED4DA]">Tidak puas dengan kualitas prompt? Ajukan refund penuh kapan saja semudah satu tombol.</p>
              </div>
            </div>
            <button className="text-xs font-mono font-bold text-white bg-[#1A1D26] hover:bg-black px-5 py-2.5 rounded border border-brand-border">
              TERMS OF REFUND
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
