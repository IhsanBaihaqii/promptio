import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Unlock, ArrowRight } from 'lucide-react';
import { INITIAL_PROMPTS } from '../data';
import PromptCard from './PromptCard';

export default function PromptPreviewSection({ userMembership, onUpgrade, onTriggerToast, onExplore }) {
  // Take exactly 3 representative prompts for preview on the landing page
  const previewPrompts = INITIAL_PROMPTS.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden bg-brand-bg-soft border-t border-b border-brand-border">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-bg text-xs font-mono font-medium text-primary-light mb-4 border border-brand-border">
            <Unlock className="w-3.5 h-3.5" />
            <span>INTERACTIVE PREVIEW MODULE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4">
            Uji Coba <span className="text-accent font-bold">Sistem Promptio</span>
          </h2>
          <p className="text-brand-text-secondary text-sm sm:text-base">
            Rasakan langsung bagaimana sistem cerdas Promptio bekerja. Salin prompt gratis secara instan, atau upgrade ke PRO untuk membuka prompt bernilai tinggi yang dikunci secara otomatis.
          </p>
        </div>

        {/* 3 Grid samples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewPrompts.map((card, idx) => {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Simulated membership badge helper */}
                <div className="absolute -top-3 left-6 z-30 px-3 py-0.5 rounded text-[9px] font-mono tracking-widest bg-brand-bg-card text-brand-text-secondary border border-brand-border uppercase">
                  SAMPLE {idx + 1}: {card.category}
                </div>

                <div className="pt-2 h-full">
                  <PromptCard
                    card={card}
                    userMembership={userMembership}
                    isFavorited={false}
                    onToggleFavorite={() => {}}
                    onUpgrade={onUpgrade}
                    onTriggerToast={onTriggerToast}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner without gradients, solid design! */}
        <div className="text-center mt-12 bg-brand-bg-card p-8 sm:p-10 rounded-xl border border-brand-border max-w-4xl mx-auto relative overflow-hidden">
          
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
            Butuh Lebih Banyak Referensi Visual?
          </h3>
          <p className="text-brand-text-secondary text-sm max-w-2xl mx-auto mb-6">
            Kami merilis lebih dari 30+ prompt premium baru setiap minggu hasil riset prompt engineer profesional. Jelajahi ribuan pilihan dengan status PRO Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-3 rounded text-xs font-mono font-bold tracking-wider text-white bg-primary hover:bg-primary-light cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>LIHAT SEMUA PROMPT (/prompt)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onUpgrade}
              className="w-full sm:w-auto px-6 py-3 rounded text-xs font-mono font-bold tracking-wider text-white bg-[#222530] border border-brand-border hover:border-white transition-all cursor-pointer active:scale-98"
            >
              UPGRADE PRO SEKARANG
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
