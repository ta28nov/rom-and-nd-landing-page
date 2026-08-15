'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, ShoppingBag } from 'lucide-react';
import { HERO_PRODUCT, SHADES, OTHER_PRODUCTS, SPOTLIGHT_BULLETS } from '@/lib/data';
import { useCart } from '@/components/cart/CartProvider';
import { QuantityStepper } from '@/components/spotlight/QuantityStepper';

interface BentoGridProps {
  selectedShadeId: string;
  onSelectShade: (id: string) => void;
}

export function BentoGrid({ selectedShadeId, onSelectShade }: BentoGridProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentShade = SHADES.find((s) => s.id === selectedShadeId) || SHADES[0];
  const calmProducts = OTHER_PRODUCTS.slice(0, 4);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        productId: HERO_PRODUCT.id,
        productName: HERO_PRODUCT.name,
        shadeName: currentShade.name,
        price: HERO_PRODUCT.price,
        quantity: quantity,
        imageSrc: currentShade.imageSrc,
      },
    });

    setToastMessage(`Added ${quantity}x Juicy Lasting Tint (${currentShade.name}) to bag!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="spotlight" className="relative w-full bg-[#FAF3EA] py-16 sm:py-20 lg:py-28 border-t border-[#241B15]/10 overflow-hidden">
      
      {/* Full-Width Responsive Container */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-8 lg:space-y-12">
        
        {/* ROW 1: Flagship Spotlight & Texture Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Cell 1: Main Product Spotlight & Interactive Shade Selector (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white/90 border border-[#241B15]/10 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8 backdrop-blur-sm"
          >
            {/* Header Info */}
            <div className="flex items-baseline justify-between border-b border-[#241B15]/10 pb-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D64B3A] uppercase">
                  FLAGSHIP COLLECTION
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#241B15] font-normal leading-tight">
                  {HERO_PRODUCT.name}
                </h2>
              </div>
              <span className="font-serif text-2xl sm:text-4xl font-semibold text-[#D64B3A]">
                ${HERO_PRODUCT.price.toFixed(2)}
              </span>
            </div>

            {/* Massive Interactive Image Container with Smooth Crossfade */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 border border-[#241B15]/5 shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShade.id}
                  initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentShade.imageSrc}
                    alt={`rom&nd Juicy Lasting Tint in ${currentShade.name}`}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Ambient Glow corresponding to Shade Hex */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${currentShade.hex} 0%, transparent 70%)`,
                }}
              />
            </div>

            {/* Shade Selection Swatches */}
            <div id="shades" className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#8B8078] uppercase tracking-wider font-mono">
                  Select Shade:
                </span>
                <span className="font-semibold text-[#241B15] font-serif text-sm">{currentShade.name}</span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {SHADES.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectShade(s.id)}
                    className={`flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs font-sans transition-all duration-300 border ${
                      s.id === selectedShadeId
                        ? 'border-[#D64B3A] bg-[#E8B4A6]/30 text-[#241B15] font-semibold shadow-sm ring-2 ring-[#D64B3A]/30'
                        : 'border-[#241B15]/15 bg-white/80 text-[#8B8078] hover:border-[#241B15]/40 hover:text-[#241B15]'
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full shadow-inner" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stepper & Add to Bag Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#241B15]/10">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 w-full flex items-center justify-center gap-3 rounded-full bg-[#D64B3A] py-4 text-xs font-sans font-semibold uppercase tracking-widest text-white shadow-xl hover:bg-[#b83b2b] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag — ${(HERO_PRODUCT.price * quantity).toFixed(2)}
              </motion.button>
            </div>

          </motion.div>

          {/* Cell 2: Large Texture Showcase & Formulation Highlights (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white/90 border border-[#241B15]/10 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="space-y-1 border-b border-[#241B15]/10 pb-4">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D64B3A] uppercase">
                FORMULA HIGHLIGHTS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#241B15]">
                Glass Shine & All-Day Stain
              </h3>
            </div>

            {/* Big Texture Feature Image with Zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 border border-[#241B15]/5 shadow-sm group">
              <Image
                src="https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg"
                alt="rom&nd Texture Formula"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Formulation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {SPOTLIGHT_BULLETS.map((bullet, idx) => (
                <motion.div
                  key={bullet.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="p-4 rounded-2xl bg-[#FAF3EA]/80 border border-[#241B15]/5 space-y-1 hover:border-[#241B15]/20 transition-colors"
                >
                  <h4 className="font-serif text-sm font-medium text-[#241B15]">{bullet.title}</h4>
                  <p className="text-[11px] text-[#8B8078] leading-relaxed font-sans">{bullet.description}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* ROW 2: Lifestyle Feature & Quiet Companion Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Cell 3: Grand Lifestyle Editorial Feature (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-[#241B15] text-white p-8 sm:p-12 flex flex-col justify-end min-h-[420px] shadow-sm border border-[#241B15]/10 group"
          >
            <Image
              src="https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle_BareGrape.png"
              alt="rom&nd Editorial Lifestyle"
              fill
              className="object-cover opacity-60 group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="relative z-10 space-y-3 max-w-lg">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E8B4A6] uppercase">
                EDITORIAL ESSENCE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF3EA] leading-tight font-normal">
                Luminous, glass-like finish with zero weight.
              </h3>
            </div>
          </motion.div>

          {/* Cell 4: Quiet 4-Item Companion Catalog (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white/90 border border-[#241B15]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-baseline justify-between border-b border-[#241B15]/10 pb-3">
              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8B8078] uppercase">
                  COMPANION CATALOG
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#241B15] font-normal">
                  Quiet Daily Essentials
                </h3>
              </div>
            </div>

            {/* 4 Large Clean Square Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {calmProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="group space-y-2 cursor-pointer"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 border border-[#241B15]/5">
                    {p.imageSrc && (
                      <Image
                        src={p.imageSrc}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-serif text-sm font-medium text-[#241B15] group-hover:text-[#D64B3A] transition-colors truncate">
                      {p.name}
                    </h4>
                    <span className="font-mono text-xs text-[#241B15]">${p.price.toFixed(2)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full bg-[#241B15] text-[#FAF3EA] px-6 py-3.5 text-xs font-sans shadow-2xl border border-white/20"
          >
            <Check className="w-4 h-4 text-[#D64B3A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
