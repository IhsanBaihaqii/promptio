import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Database, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CATEGORIES, INITIAL_PROMPTS } from '../data';
import PromptCard from './PromptCard';

export default function PromptsGrid({ 
  userMembership, 
  favs, 
  onToggleFavorite, 
  onUpgrade, 
  onTriggerToast 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFocused, setIsFocused] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // or 'popular'

  // Fitur search realtime (title, prompt, category)
  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Text search match
      const searchLower = searchQuery.toLowerCase();
      const matchesText = 
        item.title.toLowerCase().includes(searchLower) ||
        item.prompt.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesText;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        const parseLikes = (likes) => parseInt(likes) || 0;
        return parseLikes(b.likes) - parseLikes(a.likes);
      } else {
        // Sort newest
        return new Date(b.upload) - new Date(a.upload);
      }
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <section id="prompts-library" className="py-20 relative min-h-[90vh]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-bg-soft border border-brand-border text-xs font-mono font-medium text-accent mb-3 uppercase">
              <Database className="w-3.5 h-3.5" />
              <span>EXPLORE DIRECTORY</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
              Studio Prompt <span className="text-primary-light font-bold">Collection</span>
            </h2>
            <p className="mt-2 text-brand-text-secondary text-sm sm:text-base max-w-xl">
              Gunakan bilah pencarian cerdas kami untuk memfilter ribuan gaya visual yang siap pakai dalam sekejap.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 font-mono text-[11px] text-[#6C757D]">
            <span className="flex items-center gap-1.5 bg-brand-bg-soft px-4 py-2 rounded border border-brand-border">
              <span className="w-2 h-2 rounded-full bg-success" />
              Database Up to Date: 12 New Prompts
            </span>
          </div>
        </div>

        {/* STICKY SEARCH & FILTER CONTROLLER */}
        <div className="sticky top-20 z-40 bg-brand-bg-card border border-brand-border p-4 rounded-xl mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Realtime Search Input */}
            <div className="w-full lg:flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 transition-colors duration-205 ${isFocused ? 'text-primary-light' : 'text-brand-text-muted'}`} />
              </div>

              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari prompt, judul, kategori cyber, cinematic..."
                className={`block w-full pl-11 pr-4 py-3.5 bg-brand-bg-soft text-sm text-white placeholder-brand-text-muted rounded border transition-all duration-300 focus:outline-none ${
                  isFocused 
                    ? 'border-primary' 
                    : 'border-brand-border'
                }`}
              />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-text-muted hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting controller and statistics summary */}
            <div className="flex flex-wrap w-full lg:w-auto items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded bg-brand-bg-soft border border-brand-border text-xs text-brand-text-secondary w-full sm:w-auto justify-between lg:justify-start">
                <span className="font-mono text-brand-text-muted flex items-center gap-1 uppercase tracking-widest text-[10px]">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> SORT:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white border-none focus:outline-none cursor-pointer text-xs font-semibold pl-1"
                >
                  <option value="newest" className="bg-brand-bg-card text-white">🔥 Newest Release</option>
                  <option value="popular" className="bg-brand-bg-card text-white">⭐ Popularity</option>
                </select>
              </div>

              <div className="text-xs font-mono text-brand-text-muted px-3 py-2 rounded bg-brand-bg-soft border border-brand-border w-full sm:w-auto text-center">
                Found <span className="text-accent font-bold">{filteredPrompts.length}</span> outcomes
              </div>
            </div>

          </div>

          {/* Category Horizontal Scrolling Container */}
          <div className="flex items-center gap-2 overflow-x-auto mt-4 pt-4 border-t border-brand-border scrollbar-thin select-none">
            <span className="text-[10px] font-mono tracking-widest text-[#CED4DA] uppercase mr-2 shrink-0">
              Categories:
            </span>
            
            <div className="flex items-center gap-1.5 pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white scale-102 border-none'
                      : 'border border-brand-border bg-brand-bg-soft text-brand-text-secondary hover:bg-brand-bg'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROMPTS GRID */}
        {filteredPrompts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PromptCard
                    card={card}
                    userMembership={userMembership}
                    isFavorited={favs.includes(card.id)}
                    onToggleFavorite={onToggleFavorite}
                    onUpgrade={onUpgrade}
                    onTriggerToast={onTriggerToast}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass-panel rounded p-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded bg-brand-bg-soft border border-brand-border flex items-center justify-center mx-auto mb-4 text-brand-text-muted">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-medium text-white mb-2">Prompt Tidak Ditemukan</h3>
            <p className="text-sm text-brand-text-secondary mb-6">
              Tidak ada prompt yang cocok dengan kata kunci "{searchQuery}". Coba masukkan kategori lain atau setel ulang filter Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded text-xs font-mono font-bold text-white bg-primary hover:bg-primary-light transition-all cursor-pointer"
            >
              Reset Filters & Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
