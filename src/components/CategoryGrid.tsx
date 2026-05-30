import { motion } from 'motion/react';
import { Zap, Activity, Compass, Mountain, Sun, ShoppingBag } from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  HERO_SHOE_PATH,
  ORANGE_SNEAKER_PATH,
  CLASSIC_MINIMALIST_PATH,
  BLACK_BOOT_PATH,
  RIFT_ROVER_SLIDE_PATH,
  HYDRO_SHIELD_BACKPACK_PATH
} from '../data';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

// Convert string name to respective Lucide icon
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-orange-500" />;
    case 'Activity':
      return <Activity className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-orange-500" />;
    case 'Compass':
      return <Compass className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 text-orange-500" />;
    case 'ShieldAlert':
      // Represents boots rugged
      return <Mountain className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-orange-500" />;
    case 'Sun':
      return <Sun className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:spin-slow text-orange-500" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-orange-500" />;
    default:
      return <Zap className="w-6 h-6 text-orange-500" />;
  }
};

const getCategoryImg = (catId: string) => {
  switch (catId) {
    case 'Sneakers':
      return ORANGE_SNEAKER_PATH;
    case 'Running':
      return HERO_SHOE_PATH;
    case 'Casual':
      return CLASSIC_MINIMALIST_PATH;
    case 'Boots':
      return BLACK_BOOT_PATH;
    case 'Sandals':
      return RIFT_ROVER_SLIDE_PATH;
    case 'Accessories':
      return HYDRO_SHIELD_BACKPACK_PATH;
    default:
      return '';
  }
};

export default function CategoryGrid({ activeCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <section id="categories" className="py-20 bg-black relative border-t border-white/5 scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-bold">Catalog divisions</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
              CHOOSE BY CATEGORY
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md">
            Explore footwear divisions tailored for specific run disciplines, trail adventure treks, urban street styling, and seasonal beachside strolls.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer rounded-2xl p-5 border relative overflow-hidden transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-br from-orange-600/20 to-neutral-900 border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-[#0e0e0e]/95 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Image overlay subtle blur background inside tile */}
                <div className="absolute right-[-2.5rem] bottom-[-2.5rem] w-28 h-28 opacity-[0.06] group-hover:opacity-[0.22] group-hover:scale-110 transition-all duration-500 select-none pointer-events-none">
                  <img
                    src={getCategoryImg(cat.id)}
                    alt=""
                    className="w-full h-full object-contain pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  {/* Icon Frame */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-orange-600 text-white' : 'bg-white/5 text-orange-500 group-hover:bg-orange-600/10'
                  }`}>
                    {getCategoryIcon(cat.icon)}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-mono tracking-wider uppercase mt-0.5">
                      {count} {count === 1 ? 'Option' : 'Options'}
                    </p>
                  </div>
                </div>

                {/* Hover Top Right Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-orange-500 font-bold tracking-tight">GO</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
