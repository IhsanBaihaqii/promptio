import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Lock, 
  Unlock, 
  Globe, 
  Instagram, 
  Smartphone, 
  Zap, 
  Check, 
  AlertTriangle, 
  User, 
  Heart, 
  ShieldAlert, 
  Laptop,
  AlignRight,
  X,
  CreditCard
} from 'lucide-react';

// Subcomponents import
import { CATEGORIES } from './data';
import Hero from './components/Hero';
import Features from './components/Features';
import PromptsGrid from './components/PromptsGrid';
import Pricing from './components/Pricing';
import Profile from './components/Profile';
import Login from './components/Login';
import PromptPreviewSection from './components/PromptPreviewSection';

export default function App() {
  // State definitions
  // Set default isLoggedIn to false so the user can test the login requirement for accessing /prompt!
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({
    email: 'ihsan104209@gmail.com', // Pre-populated from metadata!
    username: 'ihsan_architect',
    membership: 'Free', // 'Free' or 'Pro'
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  });
  
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'prompts' | 'pricing' | 'profile' | 'login'
  const [favs, setFavs] = useState(() => {
    try {
      const stored = localStorage.getItem('promptio_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (_) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('promptio_favorites', JSON.stringify(favs));
  }, [favs]);

  // Scroll depth tracking to darken navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Toast trigger Helper
  const triggerToast = (type, message) => {
    setToast({ type, message });
    // Remove after 3.5s
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  };

  // CLIENT-SIDE ROUTER / HASH ROUTING CONTROLLER
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let targetTab = 'home';

      // Check current hash and map to activeTab
      if (hash.includes('/prompt') || hash.includes('#prompt') || hash.includes('/prompts')) {
        targetTab = 'prompts';
      } else if (hash.includes('/pricing') || hash.includes('#pricing')) {
        targetTab = 'pricing';
      } else if (hash.includes('/profile') || hash.includes('#profile')) {
        targetTab = 'profile';
      } else if (hash.includes('/login') || hash.includes('#login')) {
        targetTab = 'login';
      } else {
        targetTab = 'home';
      }

      // Check access permission for prompts section
      if (targetTab === 'prompts') {
        if (!isLoggedIn) {
          // Locked: Redirect to login
          triggerToast('error', 'Akses Ditolak: Anda harus login terlebih dahulu untuk menjelajahi semua prompt!');
          window.location.hash = '#/login';
          setActiveTab('login');
          return;
        }
      }

      // Verify profile access requires login too
      if (targetTab === 'profile') {
        if (!isLoggedIn) {
          triggerToast('warning', 'Silakan login terlebih dahulu untuk masuk ke halaman profil.');
          window.location.hash = '#/login';
          setActiveTab('login');
          return;
        }
      }

      setActiveTab(targetTab);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn]);

  // Navigation click dispatcher
  const navigateTo = (tabName) => {
    setMobileMenuOpen(false);

    if (tabName === 'prompts') {
      if (!isLoggedIn) {
        triggerToast('error', 'Akses Ditolak: Anda harus login untuk mengakses halaman /prompt!');
        window.location.hash = '#/login';
        return;
      }
      window.location.hash = '#/prompt';
    } else {
      window.location.hash = `#/${tabName}`;
    }
  };

  const handleToggleFavorite = (promptId) => {
    if (favs.includes(promptId)) {
      setFavs(favs.filter(id => id !== promptId));
      triggerToast('info', 'Dihapus dari daftar favorit.');
    } else {
      setFavs([...favs, promptId]);
      triggerToast('success', 'Ditambahkan ke daftar favorit!');
    }
  };

  const handleLogin = (newUser) => {
    setUser({
      ...user,
      email: newUser.email,
      username: newUser.username,
      membership: newUser.membership
    });
    setIsLoggedIn(true);
    triggerToast('success', `Berhasil Login! Selamat Datang Kembali, ${newUser.username || 'User'}.`);
    
    // Redirect securely to the prompts library now that they are logged in!
    setTimeout(() => {
      window.location.hash = '#/prompt';
    }, 150);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({
      email: '',
      username: '',
      membership: 'Free'
    });
    window.location.hash = '#/home';
    triggerToast('info', 'Anda telah log-out dengan aman.');
  };

  const handleSetMembership = (level) => {
    setUser(prev => ({
      ...prev,
      membership: level
    }));
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-primary selection:text-white relative flex flex-col justify-between">
      
      {/* TOAST SYSTEM ACCORDING TO SYSTEM HIGHLIGHTS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-6 right-6 z-50 glass-panel p-4 rounded-xl flex items-center gap-3 max-w-sm border border-brand-border pointer-events-auto shadow-2xl"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              toast.type === 'success' 
                ? 'bg-success/20 text-success border border-success/30' 
                : toast.type === 'error'
                  ? 'bg-danger/20 text-danger border border-danger/30'
                  : toast.type === 'warning'
                    ? 'bg-warning/20 text-warning border border-warning/30'
                    : 'bg-primary/20 text-accent border border-primary/30'
            }`}>
              {toast.type === 'success' ? (
                <Check className="w-4 h-4" />
              ) : toast.type === 'error' || toast.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono font-bold tracking-wider text-white uppercase">{toast.type} ALERTER</p>
              <p className="text-[11px] text-brand-text-secondary leading-normal">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM DUAL-STATE DEMO CONTROLLER HUD (COMPOSURE RAMP) */}
      <div className="fixed bottom-6 left-6 z-50 glass-panel px-4 py-3 rounded-xl border border-brand-border shadow-2xl flex items-center gap-3 text-xs select-none">
        <span className={`w-2.5 h-2.5 rounded-full ${isLoggedIn ? 'bg-success' : 'bg-danger'} shrink-0`} />
        <span className="font-mono text-brand-text-muted">LOGIN STATUS:</span>
        <span className="font-mono text-white bg-[#222530] px-2 py-0.5 rounded font-bold uppercase text-[10px]">
          {isLoggedIn ? 'LOGGED IN' : 'GUEST'}
        </span>
        <button
          onClick={() => {
            if (isLoggedIn) {
              handleLogout();
            } else {
              handleLogin({
                email: 'ihsan104209@gmail.com',
                username: 'ihsan_architect',
                membership: 'Pro'
              });
            }
          }}
          className="px-2.5 py-1 rounded bg-primary text-white font-mono text-[10px] font-extrabold hover:bg-primary-light active:scale-95 transition-all"
        >
          {isLoggedIn ? 'SIMULATE LOGOUT' : 'FAST LOGIN'}
        </button>
      </div>

      {/* PREMIUM NAV BAR (SOLID DESIGN) */}
      <nav className={`fixed top-0 left-0 w-full z-50 glass-navbar transition-all duration-300 ${
        scrolled ? 'py-4 bg-brand-bg/95 border-b border-brand-border shadow-2xl' : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Frame */}
          <div 
            className="flex items-center gap-3 select-none group cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <div className="w-9 h-9 rounded bg-primary flex items-center justify-center font-display font-extrabold text-xl text-white">
              P
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white tracking-tight leading-none group-hover:text-primary-light transition-colors">
                Promptio<span className="text-accent font-medium">.id</span>
              </span>
              <span className="text-[8px] font-mono tracking-widest text-[#6C757D] mt-0.5 uppercase">PREMIUM PRESETS</span>
            </div>
          </div>

          {/* Center Main Tabs Menu */}
          <div className="hidden md:flex items-center gap-1 bg-brand-bg-soft/80 p-1 rounded-xl border border-brand-border select-none">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'prompts', label: 'Studio Prompts (/prompt)' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'profile', label: 'My Profile' }
            ].map((menuItem) => {
              const tabId = menuItem.id;
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => navigateTo(tabId)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wide transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-white bg-primary'
                      : 'text-brand-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{menuItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3 select-none">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigateTo('profile')}
                  className="flex items-center gap-2 px-3 .5 py-2 rounded-lg bg-brand-bg-soft border border-brand-border text-xs text-brand-text-secondary hover:border-white/20 hover:text-white transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono font-semibold max-w-[100px] truncate">{user.username}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 text-xs font-mono font-bold rounded-lg text-white bg-danger hover:bg-danger/80 cursor-pointer transition-all"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 text-xs font-mono font-bold text-brand-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 text-xs font-mono font-bold rounded-lg text-white bg-primary hover:bg-primary-light active:scale-98 cursor-pointer transition-all"
                >
                  GET STARTED
                </button>
              </>
            )}
          </div>

          {/* Mobile responsive hamburger trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-brand-bg-soft border border-brand-border text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <AlignRight className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full absolute top-full left-0 bg-[#0B0C10] border-b border-brand-border z-50 overflow-hidden"
            >
              <div className="p-6 flex flex-col space-y-3">
                {[
                  { id: 'home', label: 'Home Landing' },
                  { id: 'prompts', label: 'Studio Prompts (/prompt)' },
                  { id: 'pricing', label: 'Pricing Premium' },
                  { id: 'profile', label: 'My Profile Panel' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => navigateTo(m.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg text-sm font-mono tracking-wide ${
                      activeTab === m.id
                        ? 'bg-primary text-white font-bold'
                        : 'text-brand-text-secondary hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}

                <div className="hr border-t border-brand-border my-2" />

                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <div className="p-3 rounded-lg bg-brand-bg-soft flex items-center justify-between text-xs font-mono border border-brand-border">
                      <span className="text-brand-text-muted">Username:</span>
                      <span className="text-white font-bold">{user.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2.5 rounded-lg text-xs font-mono font-bold text-white bg-danger"
                    >
                      LOG OUT
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigateTo('login')}
                      className="w-full text-center py-3 rounded-lg text-xs font-mono font-bold bg-brand-bg-soft border border-brand-border"
                    >
                      LOGIN
                    </button>
                    <button
                      onClick={() => navigateTo('login')}
                      className="w-full text-center py-3 rounded-lg text-xs font-mono font-bold text-white bg-primary"
                    >
                      JOIN NOW
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MAIN SPA CONTENT ROUTER WITH CLEAN TRANSITIONS */}
      <main className="flex-grow pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'home' && (
              <>
                <Hero 
                  onExplore={() => navigateTo('prompts')} 
                  onProJoin={() => navigateTo('pricing')} 
                />
                <Features />
                {/* Prompt Preview section display exactly 3 prompts with clean Solid styling */}
                <PromptPreviewSection
                  userMembership={user.membership}
                  onUpgrade={() => navigateTo('pricing')}
                  onTriggerToast={triggerToast}
                  onExplore={() => navigateTo('prompts')}
                />
              </>
            )}

            {activeTab === 'prompts' && (
              <PromptsGrid
                userMembership={user.membership}
                favs={favs}
                onToggleFavorite={handleToggleFavorite}
                onUpgrade={() => navigateTo('pricing')}
                onTriggerToast={triggerToast}
              />
            )}

            {activeTab === 'pricing' && (
              <Pricing
                currentMembership={user.membership}
                onSetMembership={handleSetMembership}
                onTriggerToast={triggerToast}
              />
            )}

            {activeTab === 'profile' && isLoggedIn && (
              <Profile
                user={user}
                onSetMembership={handleSetMembership}
                onTriggerToast={triggerToast}
                onLogout={handleLogout}
              />
            )}

            {activeTab === 'login' && (
              <Login
                onLogin={handleLogin}
                onTriggerToast={triggerToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* COMPOSURE SOLID FOOTER */}
      <footer className="border-t border-brand-border bg-brand-bg py-16 text-brand-text-muted text-xs font-mono select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            <div className="md:col-span-4 flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-display font-extrabold text-white text-sm">
                  P
                </div>
                <span className="font-display font-bold text-base text-white tracking-tight">Promptio.id</span>
              </div>
              
              <p className="font-sans text-brand-text-secondary leading-relaxed">
                Platform koleksi prompt AI berkualitas tinggi untuk membantu kreator menghasilkan foto AI yang sinematik, realistis, estetik, profesional, dan viral tanpa hambatan.
              </p>

              <div className="flex items-center gap-2">
                <a 
                  href="https://instagram.com/promptio.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-brand-bg-soft border border-brand-border hover:border-primary hover:text-white transition-all text-brand-text-secondary cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com/@promptio.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-brand-bg-soft border border-brand-border hover:border-primary hover:text-white transition-all text-brand-text-secondary cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col space-y-3">
              <h4 className="text-[10px] font-extrabold tracking-widest text-[#CED4DA] uppercase font-display">Platform Navigation</h4>
              <button onClick={() => navigateTo('home')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-none">Home Landing</button>
              <button onClick={() => navigateTo('prompts')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-none">Studio Prompts</button>
              <button onClick={() => navigateTo('pricing')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-none">Pricing Catalog</button>
              <button onClick={() => {
                if (isLoggedIn) navigateTo('profile'); 
                else navigateTo('login');
              }} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-none">My Account</button>
            </div>

            <div className="md:col-span-2 flex flex-col space-y-3">
              <h4 className="text-[10px] font-extrabold tracking-widest text-[#CED4DA] uppercase font-display">Supported Engines</h4>
              <span>Midjourney v6</span>
              <span>DALL-E 3 API</span>
              <span>Stable Diffusion XL</span>
              <span>Adobe Firefly</span>
            </div>

            <div className="md:col-span-4 flex flex-col space-y-4">
              <h4 className="text-[10px] font-extrabold tracking-widest text-[#CED4DA] uppercase font-display">Telegram Newsletter</h4>
              <p className="font-sans text-brand-text-secondary leading-normal">
                Dapatkan rilis prompt gratis dan trik prompting berkala gratis langsung ke ponsel Anda.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 px-4 py-2 rounded bg-brand-bg-soft border border-brand-border text-xs text-white placeholder-brand-text-muted focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => triggerToast('success', 'Email sukses terdaftar dalam database newsletter weekly!')}
                  className="px-4 py-2 rounded text-[10px] font-mono font-bold text-white bg-primary hover:bg-primary-light transition-all cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-brand-text-muted">
            <p>© 2026 Promptio.id. Semua hak cipta dilindungi.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Security Panel</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Terms & Privacy</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
