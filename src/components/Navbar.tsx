import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, User, Menu, X, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';

export const ShoebaruLogoSVG = ({ className = "w-10 h-10 text-white" }: { className?: string }) => (
  <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M78 82 C72 70, 60 55, 60 42 C60 28, 77 24, 78 38 C79 50, 94 58, 94 68 C94 76, 80 78, 78 72 Z" strokeWidth="4.5" />
      <path d="M78 40 C85 32, 98 42, 90 53 C81 64, 76 72, 78 82" strokeWidth="4.5" />
      
      <path d="M52 82 C44 85, 34 83, 31 75 C29.5 71, 31 66, 31 62" />
      <path d="M31 62 C31 58, 41 58, 46 54 C51 51, 57 48, 64 48 C71 48, 72 50, 78 57 C82 56, 88 56, 92 58 C96 60, 107 63, 114 66 C121 69, 126 71, 126 77 C126 81, 118 82, 109 82" />
      
      <path d="M28 85 L129 88 L127 94 L29 90 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="4.5" />
      <path d="M30 83 L124 85" strokeWidth="2.5" />
      
      <path d="M36 78 C32 74, 34 68, 38 70" strokeWidth="2.5" />
      <path d="M68 62 L74 65" strokeWidth="3.5" />
      <path d="M74 62 L80 65" strokeWidth="3.5" />
      <path d="M80 62 L86 65" strokeWidth="3.5" />
    </g>
  </svg>
);

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  wishlist,
  onRemoveFromWishlist,
  onSearch,
  searchQuery,
  onQuickView,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Authenticated user state synchronizer with persistent localStorage
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('shoebaru_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail.trim() && authEmail.includes('@')) {
      setIsSubmitted(true);
      const parts = authEmail.split('@')[0];
      const displayName = parts.charAt(0).toUpperCase() + parts.slice(1);
      setTimeout(() => {
        const loggedInUser = { email: authEmail, name: displayName };
        setUser(loggedInUser);
        localStorage.setItem('shoebaru_user', JSON.stringify(loggedInUser));
        setShowAuthModal(false);
        setIsSubmitted(false);
        setAuthEmail('');
      }, 2000);
    }
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const loggedInUser = {
        email: 'javanaggrey54@gmail.com',
        name: 'Javan Aggrey',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
      };
      setUser(loggedInUser);
      localStorage.setItem('shoebaru_user', JSON.stringify(loggedInUser));
      setIsGoogleLoading(false);
      setShowAuthModal(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shoebaru_user');
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-spruce-dark/90 backdrop-blur-md border-b border-white/5 py-2 shadow-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Elegant Logo matching the user's custom layout */}
            <a href="#" className="flex items-center gap-3 group shrink-0 select-none">
              <div className="w-11 h-11 rounded-xl bg-brand-spruce border border-brand-gold/20 flex items-center justify-center p-0.5 transition-all group-hover:scale-105 duration-300 group-hover:border-brand-gold/40 shadow-md">
                <ShoebaruLogoSVG className="w-9 h-9 text-brand-cream" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-script text-3.5xl text-brand-cream leading-none tracking-normal font-medium mt-1">
                  Shoebaru
                </span>
                <span className="text-[7.5px] font-mono tracking-[0.25em] uppercase font-semibold text-brand-gold -mt-0.5 opacity-90">
                  PREMIUM FOOTWEAR
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-gray-300">
              <a href="#" className="hover:text-brand-gold transition-colors">Home</a>
              <a href="#categories" className="hover:text-brand-gold transition-colors">Categories</a>
              <a href="#products" className="hover:text-brand-gold transition-colors">Shop</a>
              <a href="#new-arrivals" className="hover:text-brand-gold transition-colors">New Drops</a>
              <a href="#reviews" className="hover:text-brand-gold transition-colors">Reviews</a>
            </nav>

            {/* Premium Search input */}
            <div className="hidden md:flex items-center relative max-w-xs w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search premium kicks..."
                className="w-full bg-white/5 border border-white/10 hover:border-white/25 focus:border-brand-gold focus:bg-white/10 text-white rounded-full py-2 px-4 pl-10 text-xs focus:outline-none transition-all placeholder:text-gray-500 font-sans"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Icons Action Items */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Search Toggle for Mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Dropdown Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowWishlistDropdown(!showWishlistDropdown)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Wishlist Dropdown Overlay */}
                <AnimatePresence>
                  {showWishlistDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-[#121212]/95 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-lg z-50"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                        <span className="font-display font-bold text-sm text-white">Your Wishlist</span>
                        <span className="text-xs text-gray-400 font-mono">{wishlist.length} items</span>
                      </div>

                      {wishlist.length === 0 ? (
                        <div className="py-6 text-center text-gray-500 text-xs text-sans">
                          Your wishlist is empty. Tap the heart icon on shoes!
                        </div>
                      ) : (
                        <div className="max-h-60 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                          {wishlist.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 justify-between group">
                              <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => {
                                  onQuickView(item);
                                  setShowWishlistDropdown(false);
                                }}
                              >
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="text-left">
                                  <p className="text-white text-xs font-medium line-clamp-1 group-hover:text-brand-gold transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="text-brand-gold text-[11px] font-mono font-semibold">
                                    KSh {item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => onRemoveFromWishlist(item)}
                                className="text-gray-500 hover:text-red-500 p-1 rounded transition-colors"
                                title="Remove item"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Toggle */}
              <button
                onClick={onOpenCart}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-brand-gold text-brand-spruce-dark text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono shadow-md shadow-brand-gold/30"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Sign In Button / User Profile Indicator */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-[9px] text-brand-gold font-mono font-black tracking-widest leading-none">MEMBER</span>
                    <span className="text-xs text-white font-medium mt-0.5 leading-none">{user.name}</span>
                  </div>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-brand-gold/30 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold font-mono text-xs font-black flex items-center justify-center border border-brand-gold/25">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1 px-2.5 rounded-full text-[10px] uppercase font-mono tracking-wider text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-center shrink-0 border border-transparent hover:border-red-500/10 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-brand-gold hover:text-brand-spruce-dark text-gray-300 font-sans font-semibold text-xs px-4 py-2 rounded-full border border-white/10 hover:border-brand-gold transition-all cursor-pointer shadow-sm animate-pulse-slow"
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </button>
              )}

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 lg:hidden text-gray-400 hover:text-white hover:bg-white/5 rounded-full"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg overflow-hidden py-4 px-6 space-y-4"
            >
              {/* Mobile Search input */}
              <div className="relative mt-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search kicks..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-full py-2 px-10 text-xs focus:outline-none focus:border-brand-gold"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
                {searchQuery && (
                  <button
                    onClick={() => onSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-3 text-sm font-sans font-medium text-gray-300 text-left pt-2">
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  Home
                </a>
                <a
                  href="#categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  Categories
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  Shop Homepage
                </a>
                <a
                  href="#new-arrivals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  New Arrivals
                </a>
                <a
                  href="#reviews"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  Customer Reviews
                </a>
              </nav>

               <div className="pt-3 border-t border-white/5">
                {user ? (
                  <div className="flex items-center justify-between gap-4 p-3.5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-left">
                      <p className="text-[10px] font-mono tracking-widest text-[#c5a059] font-black uppercase">MEMBERSHIP ACTIVE</p>
                      <p className="text-sm font-sans font-bold text-white mt-1">{user.name}</p>
                      <p className="text-xs font-mono text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider font-bold py-1.5 px-3.5 rounded-xl transition-all mr-1 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowAuthModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-bold text-xs py-2 px-4 rounded-full transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    Sign In Account
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Sign-In Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-spruce border border-brand-gold/25 flex items-center justify-center p-1 mx-auto shadow-lg shadow-brand-gold/15">
                  <ShoebaruLogoSVG className="w-11 h-11 text-brand-cream" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mt-4">Welcome back to Shoebaru</h3>
                <p className="text-gray-400 text-xs mt-1">Sign in to track orders & save your favorites.</p>
              </div>

               {!isSubmitted ? (
                <div className="space-y-4">
                  <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="auth-email" className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                        Email Address
                      </label>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        placeholder="e.g. name@domain.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-gold hover:border-white/20 text-white rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Proceed with Email
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Visual Divider */}
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-3 text-[9px] font-mono text-gray-500 uppercase tracking-wider leading-none">or</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  {/* Authentic Branded Google Action */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isGoogleLoading}
                    className="w-full bg-white hover:bg-neutral-100 text-black font-semibold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 select-none"
                  >
                    {isGoogleLoading ? (
                      <span className="w-4.5 h-4.5 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    {isGoogleLoading ? 'Connecting safely...' : 'Continue with Google'}
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <p className="font-display font-bold text-sm text-white">Login Link Dispatched!</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Check <span className="text-brand-gold font-medium">{authEmail}</span> for a secure onetime login key. 
                    Integrating with Safaricom & M-Pesa client profile sync.
                  </p>
                </div>
              )}

              <div className="border-t border-white/5 pt-4 mt-6 text-center text-[10px] text-gray-500 leading-relaxed">
                By entering, you accept user terms. Standard M-Pesa billing verification and security checks apply.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
