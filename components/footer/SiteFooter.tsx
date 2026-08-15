'use client';

import React from 'react';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="bg-[#241B15] text-[#FAF3EA] py-16 border-t border-white/10 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center justify-center space-y-6">
        
        {/* Brand Image / Product Banner */}
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-[#E8B4A6]/30 shadow-lg">
          <Image
            src="https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png"
            alt="rom&nd Brand Logo"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Brand Name Wordmark */}
        <h3 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#FAF3EA]">
          rom&nd
        </h3>

        {/* Subtle Copyright */}
        <p className="font-mono text-xs text-white/40 tracking-widest uppercase">
          © {new Date().getFullYear()} rom&nd. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
