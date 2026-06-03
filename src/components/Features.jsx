import React from 'react';
import { motion } from 'motion/react';
import { Camera, ClipboardCopy, TrendingUp, Sparkles } from 'lucide-react';

const FEATURE_LIST = [
  {
    icon: Camera,
    title: "Cinematic Results",
    description: "Hasil foto berkualitas premium dengan komposisi kamera kelas dunia, pencahayaan dramatis, dan detail fotorealistik layaknya kamera analog 35mm.",
    badge: "8K QUALITY",
    bgColor: "bg-slate-800",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    icon: ClipboardCopy,
    title: "Ready To Use",
    description: "Satu klik untuk menyalin prompt orisinal yang telah dioptimasi matang untuk Midjourney v6, DALL-E 3, Stable Diffusion, dan siap langsung di-generate.",
    badge: "FAST COPY",
    bgColor: "bg-slate-800",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    icon: TrendingUp,
    title: "Trending Styles",
    description: "Koleksi yang selalu diperbarui mengikuti gaya visual paling viral di media sosial, dari estetika cyberpunk malam hari hingga konsep futuristik minimalis.",
    badge: "WEEKLY UPDATE",
    bgColor: "bg-slate-800",
    glow: "rgba(245, 158, 11, 0.4)"
  },
  {
    icon: Sparkles,
    title: "Unlimited Creativity",
    description: "Temukan ribuan inspirasi visual untuk desain otomotif, potret sinematik, arsitektur futuristik, konsep busana avant-garde, dan gaya anime modern.",
    badge: "ULTRA CREATIVE",
    bgColor: "bg-slate-800",
    glow: "rgba(16, 185, 129, 0.4)"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-brand-bg-soft">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-bg border border-brand-border text-xs font-mono font-medium text-primary-light mb-4 text-center uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCEPTIONAL VALUE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-medium text-white mb-4 text-center"
          >
            Kenapa Menggunakan <span className="text-accent font-bold">Promptio</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-brand-text-secondary text-base sm:text-lg text-center"
          >
            Didesain khusus untuk kreator konten, desainer, dan seniman digital yang mendambakan visual berkualitas tinggi tanpa harus membuang waktu bereksperimen.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_LIST.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-xl glass-card p-6 bg-brand-bg-card flex flex-col justify-between overflow-hidden cursor-default border border-brand-border"
              >
                <div>
                  {/* Icon Frame - Solid */}
                  <div className="inline-flex items-center justify-center p-3.5 rounded bg-primary text-white mb-6">
                    <IconComponent className="w-5 h-5 stroke-[25px]" />
                  </div>
                  
                  {/* Badge */}
                  <p className="text-[10px] font-mono tracking-widest text-[#CED4DA] font-semibold mb-2">
                    {feat.badge}
                  </p>
                  
                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-250">
                    {feat.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border text-xs font-mono text-brand-text-muted flex items-center justify-between group-hover:text-white transition-colors duration-250">
                  <span>PROMPTIO STUDIO</span>
                  <span className="text-accent">✓ ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
