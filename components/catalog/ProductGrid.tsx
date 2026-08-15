'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { OTHER_PRODUCTS } from '@/lib/data';

export function ProductGrid() {
  // Show only 4 calm items to avoid distracting from Juicy Lasting Tint
  const calmProducts = OTHER_PRODUCTS.slice(0, 4);

  return (
    <section id="shop" className="bg-[#FAF3EA] py-20 lg:py-28 border-t border-[#241B15]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#241B15]/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest text-[#8B8078] uppercase">
              DELIBERATELY CALM SELECTION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#241B15] font-normal">
              Complementary Formulas
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8B8078]">
            4 Essential Companions
          </span>
        </div>

        {/* 4-Item Quiet Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {calmProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group space-y-3"
            >
              {/* Quiet Thumbnail */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/15 border border-[#241B15]/5">
                {product.imageSrc && (
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>

              {/* Minimal Text Info */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-widest text-[#8B8078] uppercase">
                  {product.category}
                </span>
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-serif text-sm font-medium text-[#241B15] group-hover:text-[#D64B3A] transition-colors leading-snug">
                    {product.name}
                  </h4>
                  <span className="font-mono text-xs font-medium text-[#241B15]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
