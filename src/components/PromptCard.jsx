import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, Heart, Copy, Check, Share2, Sparkles, Calendar } from 'lucide-react';

export default function PromptCard({ 
  card, 
  userMembership, 
  isFavorited, 
  onToggleFavorite, 
  onUpgrade, 
  onTriggerToast 
}) {
  const [copied, setCopied] = useState(false);

  // Prompt is locked if the prompt isPro but the user's membership is 'Free'
  const isLocked = card.isPro && userMembership === 'Free';

  const handleCopy = (e) => {
    e.stopPropagation();
    if (isLocked) {
      onTriggerToast("upgrade", "Upgrade ke PRO untuk menyalin prompt eksklusif ini!");
      return;
    }

    navigator.clipboard.writeText(card.prompt);
    setCopied(true);
    onTriggerToast("success", "Prompt berhasil disalin ke clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/#/prompt?id=${card.id}`);
    onTriggerToast("info", "Link share disalin ke clipboard!");
  };

  const handleImageContextMenu = (e) => {
    e.preventDefault();
    onTriggerToast("warning", "© Promptio: Source image is protected.");
  };

  return (
    <motion.div
      layout
      className="group rounded-xl overflow-hidden glass-card hover:scale-[1.01] duration-250 transition-all flex flex-col h-full bg-brand-bg-card relative"
      onContextMenu={handleImageContextMenu}
    >
      {/* Image Container with Protective Overlays */}
      <div 
        className="relative pt-[70%] overflow-hidden bg-brand-bg-soft select-none protected-image-container"
        onContextMenu={handleImageContextMenu}
      >
        <img
          src={card.imageUrl}
          alt={card.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
        />

        {/* Completely transparent overlay to intercept all drag & context action */}
        <div 
          className="protected-image-overlay"
          onContextMenu={handleImageContextMenu}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Top Floating badges with SOLID backings */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1 rounded text-[10px] font-mono tracking-wider font-extrabold bg-[#0B0C10] text-white border border-brand-border uppercase">
            {card.category}
          </span>

          <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider font-extrabold flex items-center gap-1 border ${
            card.isPro 
              ? 'bg-primary border-primary-light text-white' 
              : 'bg-[#14161E] text-accent border-accent/20'
          }`}>
            {card.isPro ? (
              <>
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>PRO</span>
              </>
            ) : (
              <span>FREE</span>
            )}
          </span>
        </div>

        {/* Bottom statistics */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between text-[11px] font-mono text-white bg-[#0B0C10]/90 px-2.5 py-1 rounded border border-brand-border pointer-events-none">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-accent" /> {card.views || "1.2k"}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-500" /> {card.likes + (isFavorited ? 1 : 0)}
          </span>
        </div>

        {/* Locked state overlay with flat SOLID look */}
        {isLocked && (
          <div className="absolute inset-0 bg-[#0B0C10]/95 z-10 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-10 h-10 rounded bg-[#14161E] border border-brand-border flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-sm font-display font-bold text-white mb-1">PROMPT BLOCKED</h4>
            <p className="text-[11px] text-brand-text-secondary max-w-[180px] leading-relaxed mb-3">
              Upgrade membership untuk melihat dan menyalin prompt premium ini.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpgrade();
              }}
              className="px-4 py-1.5 rounded text-xs font-mono font-bold text-white bg-primary hover:bg-primary-light cursor-pointer transition-all"
            >
              UNLOCK PRO
            </button>
          </div>
        )}
      </div>

      {/* Card Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata upload */}
          <div className="flex items-center gap-1 text-[10px] font-mono text-brand-text-muted mb-2">
            <Calendar className="w-3 h-3" />
            <span>Uploaded {card.upload}</span>
          </div>

          <h3 className="text-base sm:text-lg font-display font-semibold text-white mb-3 hover:text-primary-light transition-colors duration-250">
            {card.title}
          </h3>

          {/* Prompt Preview section */}
          <div className="relative rounded bg-brand-bg-soft border border-brand-border p-4 mb-4 font-mono text-xs text-brand-text-secondary leading-relaxed">
            <span className="text-[10px] text-accent block mb-1.5 tracking-widest font-bold">PROMPT ENGINE:</span>
            
            <p className={`select-all ${isLocked ? 'blur-md pointer-events-none select-none' : ''}`}>
              {card.prompt}
            </p>

            {isLocked && (
              <div className="absolute inset-0 bg-brand-bg-soft flex items-center justify-center">
                <span className="text-[10px] font-mono text-brand-text-muted">•••••••• LOCKED PROMPT ••••••••</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="flex items-center justify-between border-t border-brand-border pt-4">
          <button
            onClick={() => onToggleFavorite(card.id)}
            className={`flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded border transition-all cursor-pointer ${
              isFavorited
                ? 'bg-pink-500/10 border-pink-500/30 text-pink-500 font-bold'
                : 'border-brand-border bg-brand-bg-soft text-brand-text-secondary hover:border-pink-500/20 hover:text-pink-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
            <span>{isFavorited ? 'Liked' : 'Like'}</span>
          </button>

          <div className="flex gap-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-brand-border bg-brand-bg-soft text-brand-text-secondary hover:border-accent hover:text-accent transition-all cursor-pointer"
              title="Share Prompt"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded font-mono text-xs font-bold border cursor-pointer transition-all ${
                isLocked
                  ? 'border-brand-border bg-[#14161E] text-brand-text-muted cursor-not-allowed'
                  : copied
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'bg-primary border-primary-light text-white hover:bg-primary-light'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
