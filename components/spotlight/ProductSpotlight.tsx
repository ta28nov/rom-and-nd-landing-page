'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, ShoppingBag } from 'lucide-react';
import { HERO_PRODUCT, SHADES, SPOTLIGHT_BULLETS } from '@/lib/data';
import { useCart } from '@/components/cart/CartProvider';
import { formatVND } from '@/lib/utils';
import { QuantityStepper } from './QuantityStepper';

interface ProductSpotlightProps {
  selectedShadeId: string;
  onSelectShade: (id: string) => void;
}

export function ProductSpotlight({ selectedShadeId, onSelectShade }: ProductSpotlightProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentShade = SHADES.find((s) => s.id === selectedShadeId) || SHADES[0];

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

    setToastMessage(`Đã thêm ${quantity}x Juicy Lasting Tint (${currentShade.name}) vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="spotlight" className="relative bg-[#FAF3EA] py-24 lg:py-36 border-t border-[#241B15]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Section Title Eyebrow */}
        <div className="mb-12 text-center lg:text-left space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#D64B3A] uppercase font-semibold">
            DÒNG SON CHỦ ĐẠO
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#241B15]">
            Juicy Lasting Tint
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Sticky Image Column (Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#E8B4A6]/20 shadow-xl border border-[#241B15]/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShade.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentShade.imageSrc}
                    alt={`rom&nd Juicy Lasting Tint tone ${currentShade.name}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Shade Badge Overlay */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-mono text-[#241B15] shadow-lg border border-[#241B15]/10">
                <span
                  className="h-3.5 w-3.5 rounded-full shadow-inner"
                  style={{ backgroundColor: currentShade.hex }}
                />
                <span className="font-semibold">{currentShade.name}</span>
              </div>
            </div>
          </div>

          {/* Copy & Consolidated Purchase Flow Column */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#241B15] font-medium">
                  {HERO_PRODUCT.name}
                </h3>
                <span className="font-serif text-3xl font-semibold text-[#D64B3A]">
                  {formatVND(HERO_PRODUCT.price)}
                </span>
              </div>
            </div>

            <p className="text-base text-[#241B15]/80 font-sans leading-relaxed">
              {HERO_PRODUCT.description}
            </p>

            {/* Consolidated Shade Switcher Buttons */}
            <div id="shades" className="space-y-3 pt-4 border-t border-[#241B15]/10">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#8B8078] uppercase tracking-wider font-mono">
                  Chọn Tone Màu:
                </span>
                <span className="font-semibold text-[#241B15]">{currentShade.name}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {SHADES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectShade(s.id)}
                    className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-sans transition-all duration-200 border ${
                      s.id === selectedShadeId
                        ? 'border-[#D64B3A] bg-[#E8B4A6]/30 text-[#241B15] font-semibold shadow-sm scale-105'
                        : 'border-[#241B15]/15 bg-white/60 text-[#8B8078] hover:border-[#241B15]/40 hover:text-[#241B15]'
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="space-y-4 pt-4 border-t border-[#241B15]/10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8B8078]">Số lượng:</span>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-[#D64B3A] py-4 text-xs font-sans font-semibold uppercase tracking-widest text-white shadow-xl hover:bg-[#b83b2b] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                Thêm Vào Giỏ — {formatVND(HERO_PRODUCT.price * quantity)}
              </button>
            </div>

            {/* 4 Staggered Benefit Bullets */}
            <div className="pt-8 border-t border-[#241B15]/10 space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#8B8078]">
                Đặc Trưng Công Thức Nổi Bật
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SPOTLIGHT_BULLETS.map((bullet, idx) => (
                  <motion.div
                    key={bullet.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="space-y-2 p-5 rounded-2xl bg-white/50 border border-[#241B15]/5 shadow-sm"
                  >
                    <h5 className="font-serif text-lg font-medium text-[#241B15]">{bullet.title}</h5>
                    <p className="text-xs text-[#8B8078] leading-relaxed font-sans">{bullet.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast Confirmation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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

