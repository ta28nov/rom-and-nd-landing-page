'use client';

import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch, totalCount } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 60) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF3EA]/90 backdrop-blur-md border-b border-[#241B15]/10 py-4 shadow-sm text-[#241B15]'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-6 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-[1850px] items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <a
          href="#hero"
          className={`font-serif text-2xl lg:text-3xl font-semibold tracking-tight transition-colors ${
            isScrolled ? 'text-[#241B15]' : 'text-white'
          }`}
        >
          rom&nd
        </a>

        {/* Minimal Lightweight Shopping Bag Button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none group"
          aria-label="Mở giỏ hàng"
        >
          <ShoppingBag
            className={`w-6 h-6 transition-colors group-hover:text-[#D64B3A] ${
              isScrolled ? 'text-[#241B15]' : 'text-white'
            }`}
            strokeWidth={1.5}
          />
          {totalCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#D64B3A] text-[10px] font-mono font-bold text-white shadow-md">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
