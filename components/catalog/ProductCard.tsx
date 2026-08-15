'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group space-y-3 cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 border border-[#241B15]/5">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FAF3EA] text-xs font-mono text-[#8B8078]">
            {product.name}
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-[#8B8078] uppercase">
          {product.category}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-serif text-base font-medium text-[#241B15] group-hover:text-[#D64B3A] transition-colors leading-snug">
            {product.name}
          </h4>
          <span className="font-mono text-xs font-semibold text-[#D64B3A]">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
