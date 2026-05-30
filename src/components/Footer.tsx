import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="shoebaru-footer" className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative z-35 text-left">
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-brand-gold/[0.01] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Shoebaru Brand Details */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <span className="w-9 h-9 rounded-xl bg-[#042d23] border border-brand-gold/30 flex items-center justify-center font-display font-black text-lg italic text-white tracking-tighter">
                S
              </span>
              <span className="font-display font-black text-xl italic tracking-tight text-white">
                SHOE<span className="text-brand-gold">BARU</span>
              </span>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premium high-performance sneakers and boots engineered in Nairobi. Combining carbon-plate speed with African road endurance.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-gold font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Safaricom M-Pesa Official Partner
            </div>
          </div>

          {/* Col 2: Shop Division Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-widest font-mono text-brand-gold">
              SHOP DIVISIONS
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-mono">
              <li><a href="#products" className="hover:text-white transition-colors">Elite Sneakers</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Vanguard Runners</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Adventure Boots</a></li>
              <li><a href="#products" className="hover:text-white transition-colors font-semibold text-brand-gold flex items-center gap-1">Rift Valley Limited <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Col 3: Technology specs */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-widest font-mono text-brand-gold">
              SPEC MECHANICS
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li><a href="#" className="hover:text-white transition-colors">ApexPlate Carbon Layer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LavaForce Midsole Matrix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rift-Tarp Rugged Traction</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eco-Thread Recycled Mesh</a></li>
            </ul>
          </div>

          {/* Col 4: Kenya Contact details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-widest font-mono text-brand-gold">
              KENYA HEADQUARTERS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Delta Corner Tower, Westlands, Nairobi, Ke</span>
              </li>
              <li className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+254757790390" className="hover:text-brand-gold transition-colors">
                  +254 757 790390
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono text-[#25D366]">
                <WhatsAppIcon className="w-4 h-4 shrink-0 fill-current" />
                <a
                  href="https://wa.me/254757790390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors font-semibold"
                >
                  WhatsApp: +254 757 790390
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:concierge@shoebaru.co.ke" className="hover:text-brand-gold transition-colors">
                  concierge@shoebaru.co.ke
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar copyrights and payment badges */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 md:text-left">
            <p className="text-[11px] text-gray-500 leading-none">
              &copy; {currentYear} Shoebaru Limited. Authorized Kenyan Footwear House. All Rights Reserved.
            </p>
            <p className="text-[9px] font-mono text-gray-600">
              Design strategy inspired by heavy endurance road run mechanics. Made in Kenya. Built for the Pace.
            </p>
          </div>

          {/* Payments Badge Indicators */}
          <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-end">
            <span className="text-[10px] text-gray-505 font-mono text-gray-600 font-bold uppercase mr-1">Accepted:</span>
            {/* M-PESA Badge */}
            <div className="px-2.5 py-1 bg-white/[0.02] border border-white/10 rounded font-black text-[9px] text-[#1bde4c] font-mono tracking-tighter" title="Safaricom Lipi Na M-Pesa">
              M-PESA
            </div>
            {/* Stripe Badge */}
            <div className="px-2.5 py-1 bg-white/[0.02] border border-white/10 rounded font-bold text-[9px] text-[#635bff] font-mono" title="Stripe Secure Gateway">
              STRIPE
            </div>
            {/* PayPal Badge */}
            <div className="px-2.5 py-1 bg-white/[0.02] border border-white/10 rounded font-black text-[9px] text-[#003087] font-mono" title="PayPal Verified">
              Paypal
            </div>
            {/* Visa Badge */}
            <div className="px-2.5 py-1 bg-[#1c2e3d]/40 border border-white/10 rounded font-bold text-[9px] text-[#2563eb] font-mono" title="Visa Cards Approved">
              VISA
            </div>
            {/* Mastercard */}
            <div className="px-2.5 py-1 bg-[#2e261f]/40 border border-white/10 rounded font-bold text-[9px] text-amber-500 font-mono" title="Mastercard approved">
              MASTERCARD
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
