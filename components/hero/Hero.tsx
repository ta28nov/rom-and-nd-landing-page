'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  heroVideoSrc?: string;
  selectedShadeId?: string;
  onSelectShade?: (id: string) => void;
}

export function Hero({ heroVideoSrc }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax scale & fade effects on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#241B15] flex flex-col justify-end text-white pt-20"
    >
      {/* Background Video / Poster with Parallax Scale */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0 origin-center">
        {heroVideoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png"
            className="h-full w-full object-cover object-center"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src="https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png"
            alt="rom&nd Juicy Lasting Tint Hero"
            fill
            priority
            className="object-cover object-center filter brightness-90"
            sizes="100vw"
          />
        )}

        {/* Gradient Overlay across bottom 60% for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241B15] via-[#241B15]/50 to-black/30" />
      </motion.div>

      {/* Content Container (Headline + Subline with Parallax & Fade) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1850px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24"
      >
        <div className="max-w-3xl space-y-6">
          {/* Fluid Fraunces Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-[#FAF3EA]"
          >
            Sắc môi căng mọng <br />
            <em className="font-italic text-[#E8B4A6]">bền màu suốt ngày dài.</em>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-sm sm:text-base md:text-lg font-sans text-white/80 leading-relaxed font-light"
          >
            Sắc màu trái cây tự nhiên kết hợp hiệu ứng bóng gương trong veo, nhẹ tênh trên bờ môi. Tinh tế từ Seoul, bền màu và càng thêm đằm thắm theo thời gian.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Cuộn</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}


