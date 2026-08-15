'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/nav/SiteHeader';
import { Hero } from '@/components/hero/Hero';
import { BentoGrid } from '@/components/bento/BentoGrid';
import { SiteFooter } from '@/components/footer/SiteFooter';
import { CartSheet } from '@/components/cart/CartSheet';

export function RomandPage() {
  const [selectedShadeId, setSelectedShadeId] = useState<string>('jujube');

  return (
    <div className="relative min-h-screen bg-[#FAF3EA] text-[#241B15] font-sans antialiased selection:bg-[#E8B4A6] selection:text-[#241B15]">
      {/* Fixed Header */}
      <SiteHeader />

      <main id="main-content">
        {/* Video Hero Section */}
        <Hero
          selectedShadeId={selectedShadeId}
          onSelectShade={setSelectedShadeId}
          heroVideoSrc="https://qwl6dynsdlyndcro.public.blob.vercel-storage.com/hf_20260815_165543_9d7552d7-8916-443f-b84e-d86494c6223e-vmll0Bj2faGuKbNtDAtKS7KJNOkURS.mp4"
        />

        {/* Japanese Minimalist Bento Grid Section (Starts right below Video Hero) */}
        <BentoGrid
          selectedShadeId={selectedShadeId}
          onSelectShade={setSelectedShadeId}
        />
      </main>

      {/* Minimal Brand Footer */}
      <SiteFooter />

      {/* Cart Sheet Drawer */}
      <CartSheet />
    </div>
  );
}
