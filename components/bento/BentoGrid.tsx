'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, ShoppingBag, Plus } from 'lucide-react';
import { HERO_PRODUCT, SHADES, OTHER_PRODUCTS, SPOTLIGHT_BULLETS } from '@/lib/data';
import { useCart } from '@/components/cart/CartProvider';
import { QuantityStepper } from '@/components/spotlight/QuantityStepper';
import { formatVND } from '@/lib/utils';


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

    setToastMessage(`Đã thêm ${quantity}x Juicy Lasting Tint (${currentShade.name}) vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddCompanionProduct = (p: (typeof OTHER_PRODUCTS)[0]) => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        productId: p.id,
        productName: p.name,
        price: p.price,
        quantity: 1,
        imageSrc: p.imageSrc,
      },
    });

    setToastMessage(`Đã thêm 1x ${p.name} vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="spotlight" className="relative w-full bg-[#FAF3EA] py-16 sm:py-20 lg:py-28 border-t border-[#241B15]/10 overflow-hidden">
      
      {/* Full-Width Responsive Container */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 lg:space-y-16">
        
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
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D64B3A] uppercase font-semibold">
                  DÒNG SON BIỂU TƯỢNG • BEST SELLER
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#241B15] font-normal leading-tight">
                  {HERO_PRODUCT.name}
                </h2>
              </div>
              <span className="font-serif text-2xl sm:text-4xl font-semibold text-[#D64B3A]">
                {formatVND(HERO_PRODUCT.price)}
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
                    alt={`rom&nd Juicy Lasting Tint tone ${currentShade.name}`}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Ambient Glow corresponding to Shade Hex */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${currentShade.hex} 0%, transparent 70%)`,
                }}
              />

              {/* Selected Shade Overlay Tag */}
              <div className="absolute top-4 left-4 bg-[#241B15]/80 backdrop-blur-md text-[#FAF3EA] px-3.5 py-1.5 rounded-full text-xs font-sans flex items-center gap-2 border border-white/10 shadow-md">
                <span className="h-2.5 w-2.5 rounded-full shadow-inner" style={{ backgroundColor: currentShade.hex }} />
                <span>{currentShade.name}</span>
              </div>
            </div>

            {/* Shade Selection Swatches */}
            <div id="shades" className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#8B8078] uppercase tracking-wider font-mono font-medium">
                  Chọn Tone Màu Yêu Thích:
                </span>
                <span className="font-semibold text-[#241B15] font-serif text-sm">{currentShade.name}</span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {SHADES.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
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
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-sans text-[#8B8078] hidden sm:inline">Số lượng:</span>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 w-full flex items-center justify-center gap-3 rounded-full bg-[#D64B3A] py-4 text-xs font-sans font-semibold uppercase tracking-widest text-white shadow-xl hover:bg-[#b83b2b] transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Thêm Vào Giỏ Hàng — {formatVND(HERO_PRODUCT.price * quantity)}
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
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D64B3A] uppercase font-semibold">
                ĐẶC TRƯNG CÔNG THỨC
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#241B15]">
                Bóng Gương Căng Mọng & Lớp Tint Bền Màu
              </h3>
            </div>

            {/* Big Texture Feature Image with Zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 border border-[#241B15]/5 shadow-sm group">
              <Image
                src="https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg"
                alt="Chất son bóng gương rom&nd Juicy Lasting Tint"
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
                  <h4 className="font-serif text-sm font-semibold text-[#241B15]">{bullet.title}</h4>
                  <p className="text-[11px] text-[#8B8078] leading-relaxed font-sans">{bullet.description}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* ROW 2: Lifestyle Feature & Companion Catalog with Quick Buy */}
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
              alt="Phong cách trang điểm tự nhiên Hàn Quốc rom&nd"
              fill
              className="object-cover opacity-60 group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="relative z-10 space-y-3 max-w-lg">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E8B4A6] uppercase font-semibold">
                CẢM HỨNG NGHỆ THUẬT SEOUL
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF3EA] leading-tight font-normal">
                Hiệu ứng bóng trong veo, nhẹ tênh tựa làn sương.
              </h3>
              <p className="text-sm font-sans text-white/80 leading-relaxed font-light">
                Tôn vinh vẻ đẹp tự nhiên, ngọt ngào thuần khiết của bờ môi châu Á qua từng lớp màu mỏng nhẹ.
              </p>
            </div>
          </motion.div>

          {/* Cell 4: Companion Catalog with Quick-Add (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white/90 border border-[#241B15]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-baseline justify-between border-b border-[#241B15]/10 pb-3">
              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8B8078] uppercase font-semibold">
                  GỢI Ý KẾT HỢP HOÀN HẢO
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#241B15] font-normal">
                  Món Đồ Trang Điểm Mỗi Ngày
                </h3>
              </div>
              <span className="text-xs font-sans text-[#8B8078] hidden sm:inline">
                Nhấn (+) để thêm nhanh
              </span>
            </div>

            {/* 4 Clean Square Cards with Quick-Add Action */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {calmProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative space-y-2 rounded-2xl p-2 transition-all hover:bg-[#FAF3EA]/80"
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

                    {/* Quick Add Button */}
                    <button
                      onClick={() => handleAddCompanionProduct(p)}
                      className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#D64B3A] text-white shadow-lg opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
                      aria-label={`Thêm ${p.name} vào giỏ hàng`}
                      title="Thêm vào giỏ"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#8B8078] uppercase">{p.category}</span>
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-serif text-sm font-medium text-[#241B15] group-hover:text-[#D64B3A] transition-colors truncate">
                        {p.name}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-[#241B15] whitespace-nowrap">
                        {formatVND(p.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>

      {/* Toast Notification with View Cart Action */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3.5 rounded-full bg-[#241B15] text-[#FAF3EA] px-6 py-4 text-xs font-sans shadow-2xl border border-white/20"
          >
            <Check className="w-4 h-4 text-[#D64B3A]" />
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => dispatch({ type: 'SET_CART_OPEN', open: true })}
              className="ml-2 underline text-[#E8B4A6] hover:text-white font-semibold whitespace-nowrap"
            >
              Xem giỏ hàng
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


