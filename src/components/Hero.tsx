import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Shield, Award, Zap, Sparkles, X, Activity } from 'lucide-react';
import { HERO_SHOE_PATH } from '../data';

interface HeroProps {
  onExploreKicks: () => void;
}

export default function Hero({ onExploreKicks }: HeroProps) {
  const [showTechModal, setShowTechModal] = useState(false);

  return (
    <>
      <section
        id="hero-banner"
        className="relative bg-brand-spruce-dark min-h-screen pt-32 pb-20 flex items-center overflow-hidden"
      >
        {/* Glow Radial Accents */}
        <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] bg-brand-spruce-light/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic Atmospheric Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center text-left">
            
            {/* Left Content Column */}
            <div className="space-y-6 max-w-xl md:max-w-2xl lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/5 border border-brand-gold/25 rounded-full text-xs text-brand-gold font-mono font-bold tracking-wider uppercase"
              >
                <Sparkles className="w-3 h-3 animate-pulse text-brand-gold" />
                Apex Performance Active Drop
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
              >
                THE ULTIMATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-cream to-brand-gold-light">
                  SHOEBARU
                </span> <br />
                EXPERIENCE.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 text-sm sm:text-base leading-relaxed"
              >
                Designed in Nairobi for elite pace. The Apex-X dual carbon-plate sneaker combines active kinetic propulsion with premium local craftsmanship, engineered for heavy road durability and continuous comfort.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={onExploreKicks}
                  className="bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-brand-gold/30 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Shop Nairobi Drop
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowTechModal(true)}
                  className="bg-white/5 hover:bg-white/10 text-brand-cream border border-white/10 hover:border-brand-gold/30 font-sans font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-brand-cream text-brand-cream" />
                  Explore Specs
                </button>
              </motion.div>

              {/* Stats Counters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-4"
              >
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">1.2M+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider uppercase mt-0.5">Miles Run Ke</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">98.7%</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider uppercase mt-0.5">Pace Accuracy</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">4.9★</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider uppercase mt-0.5">Buyer Rating</p>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Floating Image Column */}
            <div className="relative flex items-center justify-center lg:h-[500px]">
              
              {/* Outer soft ambient backlight glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-spruce/30 to-transparent rounded-full blur-[100px] pointer-events-none" />

              {/* Rotating Spinning Badge (circular seal of design) */}
              <div className="absolute z-20 -top-6 -right-2 sm:-top-4 sm:right-10 md:right-24 xl:right-12 scale-75 xs:scale-90 sm:scale-100 animate-[spin_12s_linear_infinite] select-none pointer-events-none duration-1000">
                <svg className="w-24 h-24 sm:w-28 sm:h-28 text-brand-gold font-mono text-[8px] font-bold fill-current" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="tracking-[3px] uppercase">
                    <textPath href="#circlePath">
                      • ORIGIN NAIROBI • ELITE PRO CARBON FORCE •
                    </textPath>
                  </text>
                </svg>
                {/* Central star icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold/10 text-brand-gold p-2 sm:p-2.5 rounded-full backdrop-blur-sm border border-brand-gold/20">
                  <Activity className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Big central background circle element */}
              <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/5 bg-white/[0.01] pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-dashed border-brand-gold/10 pointer-events-none" />

              {/* Animated Floating Shoe image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [-12, 12, -12],
                }}
                transition={{
                  scale: { duration: 0.8 },
                  opacity: { duration: 0.8 },
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                  },
                }}
                className="relative z-10 w-full max-w-[240px] sm:max-w-[360px] lg:max-w-[420px] px-4 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                {/* Radial drop shadow behind the shoe file */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-brand-gold/20 blur-xl hover:bg-brand-gold/35 transition-all rounded-full" />
                <img
                  src={HERO_SHOE_PATH}
                  alt="Nairobi Prime Shoe"
                  className="w-full h-auto object-contain transform -rotate-12 group-hover:rotate-[-6deg] transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(197,160,89,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Mini Interactive Spec Pill cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-10 left-4 sm:left-12 bg-brand-spruce-dark/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-xl z-20 hidden sm:flex items-center gap-3 select-none animate-pulse-slow"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Zap className="w-4 h-4 fill-brand-gold text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold">Carbon Plate</p>
                  <p className="text-white text-xs font-semibold">100% Kinetic Kickback</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-12 right-4 sm:right-12 bg-brand-spruce-dark/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-xl z-20 hidden sm:flex items-center gap-3 select-none animate-pulse-slow"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Shield id="hero-shield-icon" className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold">Lava Cushion</p>
                  <p className="text-white text-xs font-semibold">Joint Impact Shield</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* specifications technologic modal */}
      <AnimatePresence>
        {showTechModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTechModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white rounded-full p-1 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-bold">Spec sheet</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">APEX-X "NAIROBI" PLATE MECHANICS</h3>
                <p className="text-gray-400 text-xs mt-1">Breakdown of high-performance technological variables.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden bg-black p-4 border border-white/5 flex items-center justify-center h-52 sm:h-64">
                  <img
                    src={HERO_SHOE_PATH}
                    alt="Specs illustration"
                    className="w-[85%] h-auto object-contain transform -rotate-12"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-left">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-gold" />
                      ApexPlate Carbon Layering
                    </h4>
                    <p className="text-gray-400 text-xs mt-1">
                      A full-width curved carbon fiber plate that is integrated between layers of high-density responsive foam. Guides the foot through the compression cycle for a snappy transition.
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-cream" />
                      LavaForce Midsole Matrix
                    </h4>
                    <p className="text-gray-405 text-xs text-gray-400 mt-1">
                      Lightweight foam rubber formulation featuring an elastic micro-bubble grid. Yields up to 88% energy return to reduce muscle fatigue over grueling marathons.
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-gold-light" />
                      Rift-Tarp Outsole Traction
                    </h4>
                    <p className="text-gray-400 text-xs mt-1">
                      Customized high-friction tread designed with Safaricom rugged dirt roads in mind. Resists friction wear, maintaining strong directional stability on sand, stones, and wet pavement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowTechModal(false)}
                  className="bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Close Specification Portal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
