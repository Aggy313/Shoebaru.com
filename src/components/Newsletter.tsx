import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Classic standard email pattern test
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please feed in an email address.');
      return;
    }
    if (!emailPattern.test(email)) {
      setStatus('error');
      setErrorMessage('Please include a valid structured email pattern (e.g., mail@domain.com).');
      return;
    }

    setStatus('loading');
    
    // Smooth timing representation to simulate secure database write
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section id="newsletter-capture" className="py-20 bg-[#011B15]/40 relative border-t border-white/5 overflow-hidden">
      {/* Back glow */}
      <div className="absolute top-1/2 left-[80%] w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="bg-[#04241d] border border-white/5 hover:border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
          
          {/* Pitch info column */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-mono font-bold tracking-widest uppercase border border-brand-gold/20">
              <Sparkles className="w-3 h-3 animate-pulse" />
              PRIORITY FLIGHT CLUB
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
              BE THE FIRST TO LOCK <br />
              <span className="text-brand-gold">THE NEXT SPEED DROP.</span>
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Lock in your spot. Club members receive 24-hour priority access codes to limited editions, member-only sizing, and exclusive shipping events across Kenya.
            </p>
          </div>

          {/* Capture Form block column */}
          <div className="w-full max-w-md lg:max-w-none">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <form onSubmit={handleSubscribeSubmit} className="space-y-3">
                  <div className="text-left">
                    <label htmlFor="newsletter-email" className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5 font-bold">
                      YOUR SECURE EMAIL ADDRESS
                    </label>
                    
                    <div className="relative flex items-center">
                      <input
                        id="newsletter-email"
                        type="text"
                        disabled={status === 'loading'}
                        placeholder="e.g. pace-setter@fastrunner.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle'); // clear errors on edit
                        }}
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-gold hover:border-white/20 text-white rounded-xl py-3.5 px-4 pl-11 text-xs focus:outline-none transition-all placeholder:text-gray-600 font-sans"
                      />
                      <Mail className="absolute left-4 text-gray-500 w-4 h-4" />
                    </div>
                  </div>

                  {/* Actions Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-gold hover:bg-brand-gold-light disabled:bg-brand-gold/50 text-brand-spruce-dark font-sans font-black text-xs py-4 rounded-xl transition-all shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 rounded-full border-2 border-brand-spruce-dark/20 border-t-brand-spruce-dark animate-spin" />
                    ) : (
                      <>
                        Request Priority Drop Keys
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Error Notification banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-650/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-left mt-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-red-400 font-mono tracking-wide uppercase">Entry Refused</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-600/10 border border-emerald-500/20 rounded-2.5xl p-6 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <div>
                    <h4 className="font-display font-bold text-base text-white">PROVISIONAL ACCESS LOCKED</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      Your address has been vetted and added. Watch your inbox shortly for your custom Shoebaru priority access credentials!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
