import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Zap, ArrowRight, Loader } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync selected options with incoming products
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 0);
      setSelectedColor(product.colors[0] || '#ffffff');
      setIsSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const handleCartAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          {/* Backdrop Trigger close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out"
          />

          {/* Modal Card frame */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            className="bg-[#101010] border border-white/10 rounded-3xl p-5 sm:p-8 max-w-3xl w-full relative z-10 shadow-2xl overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full transition-colors cursor-pointer z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
                            {/* Left Column: Media Presentation Frame */}
              <div className="relative rounded-2.5xl bg-black border border-white/5 p-6 flex flex-col items-center justify-center h-64 sm:h-80 overflow-hidden w-full group">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/15 to-transparent pointer-events-none" />

                {product.tag && (
                  <span className="absolute top-4 left-4 text-[9px] uppercase font-sans tracking-widest font-black px-2.5 py-1 rounded-full bg-brand-gold text-brand-spruce-dark shadow-md">
                    {product.tag}
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[85%] h-full object-contain transform group-hover:scale-105 group-hover:rotate-[-4deg] transition-all duration-500 filter drop-shadow-[0_15px_30px_rgba(197,160,89,0.2)] pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Column: Details Selection */}
              <div className="space-y-5 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase font-bold">
                    {product.category} Focus Unit
                  </span>
                  
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                    {product.name}
                  </h3>

                  {/* Star indicators */}
                  <div className="flex items-center gap-2 pt-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {product.rating} / 5.0 ({product.reviewsCount} Owner Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  {product.description}
                </p>

                {/* Swatches Color Choice */}
                <div>
                  <span className="block text-[10px] font-mono tracking-widest text-gray-520 uppercase mb-2 font-bold text-gray-400">
                    COMPASS COLORWAY
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border cursor-pointer flex items-center justify-center transition-all ${
                          selectedColor === color
                            ? 'border-brand-gold ring-2 ring-brand-gold/20 scale-110'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select Color ${color}`}
                      >
                        {selectedColor === color && (
                          <span className={`w-1.5 h-1.5 rounded-full ${color === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing choosing element (only if sizes > 0 e.g. not bags) */}
                {product.sizes[0] > 0 && (
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest text-gray-520 uppercase mb-2 font-bold text-gray-400">
                      SELECT SIZE (EU FOOTWEAR MATRIX)
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-all ${
                            selectedSize === size
                              ? 'bg-brand-gold border-brand-gold text-brand-spruce-dark shadow-md shadow-brand-gold/15'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price block */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="space-y-0.5">
                    {product.originalPrice && (
                      <span className="text-[10px] font-mono text-gray-500 line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <h4 className="text-brand-gold font-mono text-xl font-bold tracking-tight">
                      KSh {product.price.toLocaleString()}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-gray-500 leading-tight uppercase max-w-[80px]">
                    Delivery: KSh 350 or Free &gt; 5k
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="grid grid-cols-5 gap-3 pt-4">
                  <button
                    onClick={handleCartAdd}
                    disabled={isSuccess}
                    className="col-span-4 bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-xs sm:text-sm py-4 rounded-xl transition-all shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/30 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer disabled:bg-emerald-600 disabled:text-white"
                  >
                    {isSuccess ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin text-white" />
                        Fitting in shopping bag...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Secure Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onAddToWishlist(product)}
                    className="col-span-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 p-4 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    title={isWishlisted ? 'Remove favorited' : 'Save favorited'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 font-bold uppercase justify-center pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  M-Pesa Verified Merchant Code
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
