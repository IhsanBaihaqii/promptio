import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Instagram } from 'lucide-react';

const MOSAIC_IMAGES = [
  {
    category: "Portrait",
    url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-1",
    floatClass: "floating-element"
  },
  {
    category: "Cinematic",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-2",
    floatClass: "floating-element-delayed"
  },
  {
    category: "Cyberpunk",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
    span: "col-span-2 row-span-1",
    floatClass: "floating-element"
  },
  {
    category: "Fashion",
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-1",
    floatClass: "floating-element-delayed"
  },
  {
    category: "Automotive",
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-1",
    floatClass: "floating-element"
  },
  {
    category: "Anime",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-2",
    floatClass: "floating-element-delayed"
  },
  {
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400",
    span: "col-span-2 row-span-1",
    floatClass: "floating-element"
  },
  {
    category: "Product",
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    span: "col-span-1 row-span-1",
    floatClass: "floating-element-delayed"
  }
];

export default function Hero({ onExplore, onProJoin }) {
  
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-brand-bg overflow-hidden select-none">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Contents */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
            
            {/* Elegant solid pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-center lg:self-start items-center gap-1.5 px-3.5 py-1.5 rounded bg-brand-bg-soft border border-brand-border text-xs font-mono font-semibold text-primary-light hover:border-primary-light/40 transition-all duration-300 cursor-pointer uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>Promptio — Midjourney Preset Suite // v3.0</span>
            </motion.div>

            {/* Title text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.1] text-white"
            >
              Turn Ordinary Photos <br className="hidden sm:inline" />
              Into <span className="text-primary-light relative inline-block">Extraordinary Visuals<span className="absolute bottom-1 left-0 w-full h-[2px] bg-accent opacity-60 rounded" /></span>.
            </motion.h1>

            {/* Subtitle/Description text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-brand-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans"
            >
              Platform koleksi prompt AI berkualitas tinggi untuk membantu kreator menghasilkan foto AI yang sinematik, realistis, estetik, profesional, dan viral secara instan.
            </motion.p>

            {/* Social media footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-brand-text-muted"
            >
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded bg-brand-bg-soft border border-[#2D313F] flex items-center justify-center text-[8px] font-bold">MJ</div>
                <div className="w-5 h-5 rounded bg-brand-bg-soft border border-[#2D313F] flex items-center justify-center text-[8px] font-bold">SD</div>
                <div className="w-5 h-5 rounded bg-brand-bg-soft border border-[#2D313F] flex items-center justify-center text-[8px] font-bold">DE</div>
              </div>
              <span>Optimized for Stable Diffusion & Midjourney v6</span>
              <span>•</span>
              <a 
                href="https://instagram.com/promptio.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-primary-light hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@promptio.id</span>
              </a>
            </motion.div>

            {/* CTA action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded text-sm font-semibold tracking-wide text-white bg-primary hover:bg-primary-light active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Jelajahi Koleksi Prompt (/prompt)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onProJoin}
                className="w-full sm:w-auto px-8 py-4 rounded text-sm font-semibold tracking-wide text-brand-text-secondary bg-brand-bg-soft border border-brand-border hover:border-accent hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-accent fill-current" />
                <span>Join Pro Membership</span>
              </button>
            </motion.div>

            {/* Short statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8 grid grid-cols-3 gap-4 border-t border-brand-border select-none text-center lg:text-left"
            >
              <div>
                <p className="text-xl sm:text-2xl font-display font-medium text-white">4.8k+</p>
                <p className="text-[10px] sm:text-xs font-mono text-brand-text-muted uppercase">Active Users</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-medium text-accent">12,500+</p>
                <p className="text-[10px] sm:text-xs font-mono text-brand-text-muted uppercase">Copied Prompts</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-medium text-white">99.2%</p>
                <p className="text-[10px] sm:text-xs font-mono text-brand-text-muted uppercase">REALISTIC RATINGS</p>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Mosaic Grid */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-full min-h-[400px] lg:min-h-[550px]">
            
            {/* Asymmetrical Masonry bento grid */}
            <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-[500px]" onContextMenu={handleContextMenu}>
              {MOSAIC_IMAGES.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "var(--primary-light)",
                    zIndex: 20
                  }}
                  className={`relative overflow-hidden rounded border border-brand-border bg-brand-bg-soft select-none cursor-default transition-all duration-300 ${img.span} ${img.floatClass}`}
                >
                  <img
                    src={img.url}
                    alt={img.category}
                    loading="lazy"
                    draggable="false"
                    referrerPolicy="no-referrer"
                    onDragStart={(e) => e.preventDefault()}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* Image protective overlay */}
                  <div className="protected-image-overlay" />

                  {/* Solid indicator */}
                  <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider font-extrabold bg-[#0B0C10] text-[#CED4DA] border border-[#2D313F] uppercase">
                    {img.category}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
