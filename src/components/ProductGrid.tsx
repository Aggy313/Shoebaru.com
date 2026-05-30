import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductGridProps {
  onAddToCart: (product: Product, selectedSize: number, selectedColor: string) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
  activeCategory: string;
  onClearCategoryFilter: () => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
}

type TabType = 'All' | 'Featured' | 'Best Sellers' | 'New Arrivals' | 'Sale';

export default function ProductGrid({
  onAddToCart,
  onAddToWishlist,
  wishlist,
  activeCategory,
  onClearCategoryFilter,
  searchQuery,
  onQuickView,
}: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const tabs: TabType[] = ['All', 'Featured', 'Best Sellers', 'New Arrivals', 'Sale'];

  // Reset activeTab to 'All' whenever selected category changes
  useEffect(() => {
    setActiveTab('All');
  }, [activeCategory]);

  // Combine tab filtering, category filtering, and search inquiry querying
  const filteredProducts = PRODUCTS.filter((item) => {
    // 1. Search Query filter (matches Name, Category, or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // 2. Category selection block
    if (activeCategory !== 'All' && activeCategory !== '') {
      if (item.category !== activeCategory) return false;
    }

    // 3. Tab filter
    if (activeTab === 'Featured') return item.isFeatured;
    if (activeTab === 'Best Sellers') return item.isBestSeller;
    if (activeTab === 'New Arrivals') return item.isNewArrival;
    if (activeTab === 'Sale') return item.isSale;

    return true;
  });

  const isWishlisted = (id: string) => wishlist.some((w) => w.id === id);

  return (
    <section id="products" className="py-20 bg-[#050505] relative border-t border-white/5 scroll-mt-20">
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-orange-600/[0.012] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header containing Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-bold">Original speed fits</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
              THE PREMIUM FLIGHT DECK
            </h2>
          </div>

          {/* Filtering Tabs bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Division alert pill resets */}
        {(activeCategory !== 'All' && activeCategory !== '' || searchQuery.trim() !== '') && (
          <div className="flex flex-wrap items-center gap-3 mb-8 bg-[#121212] p-3 border border-white/5 rounded-2xl w-fit">
            <span className="text-xs text-gray-400 font-sans">Active Filters:</span>
            {activeCategory !== 'All' && activeCategory !== '' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 text-orange-400 text-xs font-mono font-medium border border-orange-500/20">
                Div: {activeCategory}
                <button
                  type="button"
                  onClick={onClearCategoryFilter}
                  className="font-black text-white hover:text-orange-500 ml-1 cursor-pointer focus:outline-none"
                  title="Clear Category"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-mono font-medium border border-white/10">
                Search: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => onClearCategoryFilter()} // This handles multi-resets
                  className="font-black text-white hover:text-orange-500 ml-1 cursor-pointer focus:outline-none"
                  title="Clear Search"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                onClearCategoryFilter();
                setActiveTab('All');
              }}
              className="text-xs text-gray-500 hover:text-orange-500 transition-colors underline pl-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dynamic Products Grid Panel */}
        {filteredProducts.length === 0 ? (
          <div id="empty-product-state" className="text-center py-24 bg-[#0a0a0a] rounded-3xl border border-white/5">
            <p className="font-display font-medium text-lg text-gray-400">No Shoebaru kicks match your current parameters.</p>
            <p className="text-xs text-gray-500 mt-2">Try writing a shorter query or clearing category overrides.</p>
            <button
              onClick={() => {
                onClearCategoryFilter();
                setActiveTab('All');
              }}
              className="bg-white/5 border border-white/10 hover:bg-orange-600 hover:border-orange-600 text-white hover:text-white transition-all text-xs font-semibold px-5 py-2.5 rounded-full mt-5 cursor-pointer"
            >
              Reset Product Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const wish = isWishlisted(product.id);
                // Calculate percentage off
                const discountPercent = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <motion.div
                    key={product.id}
                    layout // Smooth rearrangement when tab toggles
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-[#0e0e0e]/95 border border-white/5 hover:border-white/15 hover:shadow-2xl hover:shadow-orange-500/[0.02] rounded-3xl p-4 flex flex-col relative transition-all"
                  >
                    {/* Badge Pill tag overlay */}
                    {product.tag && (
                      <span className={`absolute top-4 left-4 z-20 text-[9px] uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-full ${
                        product.tag === 'New' ? 'bg-emerald-600 text-white' :
                        product.tag === 'Sale' ? 'bg-orange-600 text-white' :
                        product.tag === 'Limited' ? 'bg-purple-600 text-white' : 'bg-orange-600/20 text-orange-400'
                      }`}>
                        {product.tag}
                      </span>
                    )}

                    {/* Discount badge if sale item */}
                    {product.originalPrice && (
                      <span className="absolute top-4 right-4 z-20 text-[9px] font-mono font-black bg-red-600 text-white px-2 py-0.5 rounded-md">
                        -{discountPercent}% OFF
                      </span>
                    )}

                    {/* Image Block Container */}
                    <div className="relative w-full h-48 sm:h-52 bg-[#050505] rounded-2.5xl p-4 flex items-center justify-center overflow-hidden border border-white/5 mb-4 shrink-0 transition-colors group-hover:bg-[#0c0c0c]">
                      
                      {/* Interactive hover overlay action nodes */}
                      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                        <button
                          onClick={() => onQuickView(product)}
                          className="bg-black/90 p-2.5 rounded-full text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all shadow-lg hover:bg-orange-600 active:scale-95 cursor-pointer"
                          title="Quick View Parameters"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onAddToWishlist(product)}
                          className="bg-black/90 p-2.5 rounded-full border border-white/10 hover:border-white/20 transition-all shadow-lg hover:bg-orange-600 active:scale-95 cursor-pointer"
                          title="Toggle Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-white'}`} />
                        </button>
                      </div>

                      {/* Main shoe thumbnail representation */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[85%] h-full object-contain transform group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-500 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(255,87,34,0.1)] group-hover:drop-shadow-[0_15px_25px_rgba(255,87,34,0.25)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details content column */}
                    <div className="flex-grow flex flex-col justify-between text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{product.category}</span>
                        <h3 className="font-display font-medium text-sm text-white group-hover:text-orange-500 transition-colors line-clamp-1 leading-snug">
                          {product.name}
                        </h3>
                        
                        {/* Rating block */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center gap-0.5" aria-label={`Rating: ${product.rating}`}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Pricing + Add-to-cart strip */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                        <div className="space-y-0.5">
                          {product.originalPrice && (
                            <p className="text-gray-500 text-[11px] font-mono line-through tracking-tight">
                              KSh {product.originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="text-orange-500 text-sm font-mono font-bold tracking-tight">
                            KSh {product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Add to Cart node */}
                        <button
                          onClick={() => {
                            // Default details choice on direct card buy:
                            // choose size[0] (or 40 if 0 is N/A like bags), color[0]
                            const size = product.sizes[0] || 0;
                            const color = product.colors[0] || '#000000';
                            onAddToCart(product, size, color);
                          }}
                          className="bg-white/5 group-hover:bg-orange-600 text-white group-hover:text-white p-2.5 rounded-xl border border-white/10 group-hover:border-orange-500 transition-all cursor-pointer shadow-sm hover:shadow-orange-605/30 active:scale-95"
                          title="Quick Add to Cart Drawer"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
