import { Truck, Smartphone, Flame, ShieldCheck, Sparkles } from 'lucide-react';

export default function Ticker() {
  const items = [
    { text: 'FREE COUNTRYWIDE SHIPPING ON COMPASS ORDERS OVER KSH 5,000', icon: Truck },
    { text: 'SECURE CHECKOUT & DEPOSIT INTEGRATION WITH LIPiA NA M-PESA', icon: Smartphone },
    { text: 'NEW APEX-X "NAIROBI EDITION" ACTIVE DROP — ONLY 150 PAIRS MADE', icon: Flame },
    { text: 'EXPRESS NAIROBI SHIPMENT WITHIN 4 HOURS', icon: Sparkles },
    { text: 'VERIFIED 100% ORIGINAL AUTHORIZED PREMIUM DESIGN', icon: ShieldCheck },
  ];

  // Double the list to maintain a seamless continuous scrolling marquee
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div id="promotional-ticker" className="bg-[#0f0f0f] border-b border-white/5 py-2 overflow-hidden w-full relative z-30 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {marqueeItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="inline-flex items-center gap-2.5 mx-8 text-neutral-400 hover:text-white transition-colors">
              <IconComponent className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
