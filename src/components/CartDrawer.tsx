import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, Plus, Minus, CreditCard, ChevronRight, CheckCircle2, Smartphone, Loader, Wallet, ShieldAlert } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: number, color: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: number, color: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'method' | 'mpesa' | 'card' | 'success'>('cart');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaTimer, setMpesaTimer] = useState(0);

  // Math Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 5000;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 350;
  const grandTotal = subtotal + shippingFee;

  // Simulate Mpesa Checkout Action
  const handleMpesaPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsProcessing(true);
    setCheckoutStep('mpesa');
    // Start count timer
    let count = 6;
    setMpesaTimer(count);

    const mpesaCountdown = setInterval(() => {
      count -= 1;
      setMpesaTimer(count);
      if (count <= 0) {
        clearInterval(mpesaCountdown);
        setIsProcessing(false);
        setCheckoutStep('success');
        onClearCart();
      }
    }, 1000);
  };

  const startCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('method');
  };

  const handleCardPaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      onClearCart();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur screen overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Sliding sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-55 shadow-2xl flex flex-col justify-between"
          >
            {/* Header section of Drawer */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h3 className="font-display font-black text-lg text-white">
                  {checkoutStep === 'cart' && 'YOUR COMPASS CART'}
                  {checkoutStep === 'method' && 'PAYMENT TERMINAL'}
                  {checkoutStep === 'mpesa' && 'WAITING FOR CONFIRMATION'}
                  {checkoutStep === 'card' && 'STRIPE CARD CHECKOUT'}
                  {checkoutStep === 'success' && 'TRANSACTION CONFIRMED'}
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  // Reset steps
                  setTimeout(() => setCheckoutStep('cart'), 300);
                }}
                className="text-gray-500 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic steps body */}
            <div className="flex-grow overflow-y-auto px-5 py-4 scrollbar-thin">
              
              {/* STEP 1: CART ITEMS SHEET */}
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-24 space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-gray-400">
                        <ShoppingBag className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-base text-white">Your cart is empty</p>
                        <p className="text-gray-500 text-xs mt-1">Sling some high-performance kicks in here.</p>
                      </div>
                      <button
                        onClick={onClose}
                        className="bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Keep Exploring
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left">
                      {cart.map((item, id) => (
                        <div
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${id}`}
                          className="flex items-center gap-4 bg-[#111111] border border-white/5 p-3.5 rounded-2xl group relative"
                        >
                          {/* Image thumbnail */}
                          <div className="w-16 h-16 rounded-xl bg-black border border-white/5 p-1 flex items-center justify-center shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Content column */}
                          <div className="flex-grow space-y-1">
                            <h4 className="font-display font-bold text-xs text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            
                            {/* Selected attributes info tag pill row */}
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                              {item.selectedSize > 0 && (
                                <span className="bg-white/5 border border-white/10 px-1.5 py-0.25 rounded">
                                  EU {item.selectedSize}
                                </span>
                              )}
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-white/15"
                                style={{ backgroundColor: item.selectedColor }}
                                title="Colorway Swatch"
                              />
                            </div>

                            {/* Pricing * quantity calculations */}
                            <div className="flex items-center justify-between pt-1">
                              <p className="text-brand-gold font-mono text-xs font-bold">
                                KSh {item.product.price.toLocaleString()}
                              </p>

                              {/* Small Quantity selector indicators */}
                              <div className="flex items-center bg-black/60 rounded-lg p-0.5 border border-white/5">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono font-bold text-white min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      item.quantity + 1
                                    )
                                  }
                                  className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Delete Bin button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                            className="text-gray-500 hover:text-red-500 p-1.5 bg-black/40 hover:bg-black border border-transparent hover:border-white/5 rounded-full absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                            title="Remove from Cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: CHOOSE PAYMENT METHOD METHOD */}
              {checkoutStep === 'method' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">How would you like to settle?</h4>
                    <p className="text-gray-400 text-xs mt-1">Choose between Lipi Na M-Pesa or standard Stripe Card checkout.</p>
                  </div>

                  <div className="space-y-3">
                    {/* M-Pesa selection box */}
                    <button
                      onClick={() => setCheckoutStep('mpesa')}
                      className="w-full flex items-center justify-between p-4 bg-emerald-600/10 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl text-left cursor-pointer transition-all hover:bg-emerald-600/15"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold font-display flex items-center gap-1.5">
                            Safaricom M-Pesa
                            <span className="text-[9px] bg-emerald-600 text-white font-mono uppercase px-1.5 py-0.25 rounded font-black">
                              Instant STK
                            </span>
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">Pay via secure sim pin prompt on your Safaricom mobile line.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Card payment selection box */}
                    <button
                      onClick={() => setCheckoutStep('card')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl text-left cursor-pointer transition-all hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-300 shrink-0">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold font-display flex items-center gap-1.5">
                            Credit / Debit Cards
                            <span className="text-[9px] bg-white/10 text-gray-300 font-mono uppercase px-1.5 py-0.25 rounded">
                              Stripe Sec
                            </span>
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5 font-sans">Settle via Stripe matching Visa, Mastercard, AMEX.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-gray-400 hover:text-white font-sans transition-colors block text-center w-full"
                  >
                    ← Back to Shopping Bag
                  </button>
                </div>
              )}

              {/* STEP 3.A: M-PESA STK DIALOG FORM */}
              {checkoutStep === 'mpesa' && (
                <div className="space-y-6 text-left">
                  {isProcessing ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <Loader className="w-16 h-16 text-emerald-400 animate-spin absolute" />
                        <span className="font-mono text-[14px] font-black text-emerald-400">{mpesaTimer}s</span>
                      </div>
                      <div>
                        <p className="font-display font-black text-white uppercase text-sm tracking-widest">SENDING STK PUSH PROMPT...</p>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed max-w-xs mx-auto">
                          Check your phone! Safaricom STK Push has been sent to <span className="text-emerald-400 font-bold">{phoneNumber}</span>. 
                          Key in your MPESA PIN and accept billing.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleMpesaPay} className="space-y-4">
                      <div>
                        <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Input Safaricom Line</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                          Enter your Safaricom phone number below. We will push an instant STK prompt authorizing KSh <strong>{grandTotal.toLocaleString()}</strong> to Shoebaru Checkout portal.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="mpesa-phone" className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                          Phone Number (M-Pesa registered format)
                        </label>
                        <input
                          id="mpesa-phone"
                          type="text"
                          required
                          placeholder="e.g. 0712345678 or +254712345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 text-white rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all placeholder:text-gray-650"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#1bde4c]/10 text-[#1bde4c] border border-[#1bde4c]/20 hover:bg-[#1bde4c] hover:text-black font-semibold text-xs py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                      >
                        <Smartphone className="w-4 h-4" />
                        Trigger M-Pesa STK Push
                      </button>

                      <button
                        type="button"
                        onClick={() => setCheckoutStep('method')}
                        className="text-xs text-gray-500 hover:text-white transition-colors block text-center w-full focus:outline-none"
                      >
                        ← Return to payment methods
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* STEP 3.B: CARD DIALOG FORM */}
              {checkoutStep === 'card' && (
                <div className="space-y-6 text-left">
                  <form onSubmit={handleCardPaySubmit} className="space-y-4">
                    <div>
                      <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Card details</h4>
                      <p className="text-gray-400 text-xs mt-1">Payments are encrypted and proxy processed via Stripe secure network.</p>
                    </div>

                    <div className="space-y-3 font-sans">
                      <div>
                        <label htmlFor="card-number" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                          Cardholder Name
                        </label>
                        <input
                          id="card-number"
                          type="text"
                          required
                          placeholder="e.g. Cynthia Mwangi"
                          className="w-full bg-white/5 border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="card-field" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                          Secure Card Number
                        </label>
                        <input
                          id="card-field"
                          type="text"
                          required
                          placeholder="••••  ••••  ••••  ••••"
                          maxLength={19}
                          className="w-full bg-white/5 border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-4 text-xs font-mono focus:outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                          <label htmlFor="card-expiry" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            id="card-expiry"
                            type="text"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full bg-white/5 border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-3 text-xs focus:outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="card-cvc" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                            CVV / CVC
                          </label>
                          <input
                            id="card-cvc"
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={4}
                            className="w-full bg-white/5 border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-3 text-xs focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-xs py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {isProcessing ? (
                        <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Pay KSh {grandTotal.toLocaleString()} Securing with Stripe
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCheckoutStep('method')}
                      className="text-xs text-gray-500 hover:text-white transition-colors block text-center w-full focus:outline-none"
                    >
                      ← Return to methods
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: SUCCESS CONGRATULATIONS */}
              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-5">
                  <CheckCircle2 className="w-16 h-16 text-emerald-450 text-emerald-450 fill-emerald-500/10 animate-bounce" />
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-black text-xl text-white">ORDER SUCCESSFULLY LOCKED!</h4>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                      Checkout confirmed successfully. Safaricom has authorized transaction. We have dispatched a purchase confirmation receipt and SMS tracking keys.
                    </p>
                  </div>

                  <div className="bg-[#111] p-4 border border-white/5 rounded-2xl w-full text-left space-y-1 font-mono text-[11px] text-gray-500">
                    <p className="text-white font-bold flex justify-between">RECEIPT DETS <span className="text-brand-gold">PAID via MOBILE M-PESA</span></p>
                    <p className="border-b border-white/5 pb-1 mb-1"></p>
                    <p className="flex justify-between">EST. DISPATCH: <span>4 Hours (Nairobi Delivery)</span></p>
                    <p className="flex justify-between">VESSEL CODE: <span>SB-TX-{Math.floor(Math.random() * 89999 + 10000)}</span></p>
                    <p className="flex justify-between text-white font-bold">TOTAL ACQUIRED: <span>KSh {grandTotal.toLocaleString()}</span></p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      setCheckoutStep('cart');
                    }}
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-xs py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Sling More Kicks
                  </button>
                </div>
              )}

            </div>

            {/* Calculations Footer section of Drawer */}
            {checkoutStep === 'cart' && cart.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0d0d0d] space-y-4 text-left">
                <div className="space-y-2 text-xs font-mono text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">KSh {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Delivery</span>
                    <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {shippingFee === 0 ? 'FREE' : `KSh ${shippingFee.toLocaleString()}`}
                    </span>
                  </div>

                  {/* Free shipping alert progression bar */}
                  {!isFreeShipping && (
                    <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-[10px] text-gray-400 space-y-1">
                      <p className="flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-brand-gold" />
                        Spend another <strong className="text-brand-gold">KSh {(5000 - subtotal).toLocaleString()}</strong> to unlock <strong>FREE DELIVERY</strong>!
                      </p>
                      <div className="w-full bg-black/60 rounded-full h-1">
                        <div
                          className="bg-brand-gold h-1 rounded-full transition-all"
                          style={{ width: `${(subtotal / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {isFreeShipping && (
                    <p className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Congratulations! You have unlocked Free Countrywide Shipment!
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 font-display">
                  <span className="text-white text-sm font-bold">GRAND TOTAL</span>
                  <span className="text-brand-gold font-mono text-lg font-black tracking-tight">
                    KSh {grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={startCheckout}
                  className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-sm py-4 rounded-xl transition-all shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/25 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  Proceed with Payment Checkout
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
