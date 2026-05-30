import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Tag, Flame, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface PromoBannersProps {
  onSelectCategoryFilter: (categoryName: string) => void;
}

export default function PromoBanners({ onSelectCategoryFilter }: PromoBannersProps) {
  // Live ticking countdown for the Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset back to stay active for preview
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="promo-banners" className="py-20 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Banner 1: Limited Edition Drop Custom Plate */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-tr from-[#141414] via-[#090909] to-[#1a0f0a] border border-white/5 hover:border-orange-500/20 text-left flex flex-col justify-between min-h-[380px] group transition-all"
          >
            {/* Ambient Background elements */}
            <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] bg-orange-600/10 rounded-full blur-[60px] pointer-events-none group-hover:scale-125 transition-transform" />
            
            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-650/15 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-orange-500/10 mb-4">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Apex Drops Exclusive
              </span>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
                THE SAFARICOM <br />
                <span className="text-orange-500">RIFT VALLEY</span> <br />
                OUTLAW EDITION
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                A custom adventure-proof tactical boot with double-reinforced waterproof liners, specialized orange high-density stitching, and mud-release grooved treads. Custom tailored for Rift Valley ruggedness.
              </p>
            </div>

            <div className="pt-6 relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 mt-6">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500 font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Safaricom Pay Compliant
              </div>

              <button
                onClick={() => onSelectCategoryFilter('Boots')}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer group-hover:shadow-lg group-hover:shadow-orange-600/20"
              >
                Secure Boots Focus
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Banner 2: Active Flash Sale with Ticking Timer */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-tr from-[#121212] via-[#080808] to-[#0c140f] border border-white/5 hover:border-emerald-500/20 text-left flex flex-col justify-between min-h-[380px] group transition-all"
          >
            {/* Ambient Background elements */}
            <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] bg-emerald-600/5 rounded-full blur-[65px] pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-emerald-500/10 mb-4">
                <Tag className="w-3.5 h-3.5" />
                Active Flash Drop
              </span>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
                COASTAL COOLDOWN <br />
                <span className="text-emerald-400">FLARE UP SALE</span> <br />
                UP TO 30% OFF
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                Take secure comfort down to the beach with our Rift River Sandal Slides and lightweight Walking sneakers. High breathable mesh limits coastal humidity fatigue.
              </p>

              {/* Countdown timer ticker */}
              <div className="flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black uppercase text-gray-300">
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white min-w-[28px] text-center">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-emerald-400">:</span>
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white min-w-[28px] text-center">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-emerald-400">:</span>
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-emerald-400 min-w-[28px] text-center">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold ml-1 tracking-wider">Remaining</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 mt-6">
              <div className="text-left font-mono">
                <span className="text-[10px] text-gray-500 block font-bold uppercase">Average Delivery</span>
                <span className="text-white text-xs font-semibold font-sans">Under 24H Countrywide</span>
              </div>

              <button
                onClick={() => onSelectCategoryFilter('Sandals')}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer group-hover:shadow-lg group-hover:shadow-emerald-600/20"
              >
                Access Sale Sandals
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
