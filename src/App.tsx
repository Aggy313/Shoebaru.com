import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Heart, AlertCircle, Sparkles, ShoppingBag, X } from 'lucide-react';

import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import PromoBanners from './components/PromoBanners';
import TestimonialReviews from './components/Testimonials';
import Newsletter from './components/Newsletter';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';

import { Product, CartItem } from './types';

export default function App() {
  // Cart & Wishlist Persistent Local State triggers
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shoebaru_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shoebaru_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  // Dynamic feedback Toast alerts
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'info' | 'error' }>({
    show: false,
    msg: '',
    type: 'success',
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shoebaru_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shoebaru_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helpers
  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    // Auto timeout dismissal
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number, color: string) => {
    setCart((prev) => {
      // Check if product with identical parameters (id, size, color) exists
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });

    showToast(`Added ${product.name} to checkout bag!`, 'success');
  };

  const handleUpdateCartQuantity = (productId: string, size: number, color: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: number, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    showToast('Removed item from shopping bag.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlisting operations
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);

    if (isSaved) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed ${product.name} from favorites.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to your Wishlist!`, 'success');
    }
  };

  // Filter Reset actions
  const handleClearCategoryFilter = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  const handleSelectCategoryAndScroll = (category: string) => {
    setActiveCategory(category);
    setTimeout(() => {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleScrollToKicks = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart unit calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-black text-gray-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* 1. Custom status Toast feedback notifications */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl bg-black border border-white/10 shadow-2xl flex items-center gap-3 w-80 max-w-[90vw]"
            id="toast-notification"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <div className="text-left flex-grow">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">Notification</p>
              <p className="text-xs text-white mt-1 leading-normal font-sans font-medium">{toast.msg}</p>
            </div>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Auto rolling marquee promotion banner */}
      <Ticker />

      {/* 3. Navigation controller */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onQuickView={setSelectedQuickViewProduct}
      />

      {/* 4. Split Hero section with float variables */}
      <Hero onExploreKicks={handleScrollToKicks} />

      {/* 5. 6-Tile categories showcase layout */}
      <CategoryGrid activeCategory={activeCategory} onSelectCategory={handleSelectCategoryAndScroll} />

      {/* 6. Product grid displaying and filtering tabs */}
      <ProductGrid
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleToggleWishlist}
        wishlist={wishlist}
        activeCategory={activeCategory}
        onClearCategoryFilter={handleClearCategoryFilter}
        searchQuery={searchQuery}
        onQuickView={setSelectedQuickViewProduct}
      />

      {/* 7. Special Drops promo banner leaflets */}
      <PromoBanners onSelectCategoryFilter={handleSelectCategoryAndScroll} />

      {/* 8. Local Reviews feedback wall */}
      <TestimonialReviews />

      {/* 9. Priority newsletter membership capture */}
      <Newsletter />

      {/* 10. Drawer shopping slide in panel sheets */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 11. Detail Quick view selection lens modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        isOpen={selectedQuickViewProduct !== null}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleToggleWishlist}
        isWishlisted={selectedQuickViewProduct ? wishlist.some((w) => w.id === selectedQuickViewProduct.id) : false}
      />

      {/* 12. Corporate footer block with payment logs */}
      <Footer />
    </div>
  );
}
