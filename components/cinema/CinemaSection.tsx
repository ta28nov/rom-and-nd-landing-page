'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CINEMA_IMAGES = [
  {
    id: "lifestyle-1",
    title: "Chất Son Mọng Nước & Ánh Bóng Gương",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg",
    span: "col-span-1 md:col-span-2 lg:col-span-8",
    aspect: "aspect-[16/9]",
  },
  {
    id: "shade-baregrape",
    title: "Bare Grape — Hồng Nho MLBB Thời Thượng",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/25_BARE_GRAPE_4.jpg",
    span: "col-span-1 md:col-span-1 lg:col-span-4",
    aspect: "aspect-square",
  },
  {
    id: "shade-jujube",
    title: "Jujube — Đỏ Táo Ngọt Ngào Ấm Áp",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/07_JUJUBE_4.jpg",
    span: "col-span-1 md:col-span-1 lg:col-span-4",
    aspect: "aspect-square",
  },
  {
    id: "lifestyle-2",
    title: "Chiến Dịch Nghệ Thuật rom&nd Seoul",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png",
    span: "col-span-1 md:col-span-2 lg:col-span-8",
    aspect: "aspect-[16/9]",
  },
];

export function CinemaSection() {
  return (
    <section id="cinema" className="relative w-full bg-[#241B15] text-[#FAF3EA] py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-white/10">
      
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 lg:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#E8B4A6] uppercase">
              TRẢI NGHIỆM ĐIỆN ẢNH
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF3EA]">
              Thước Phim Chuyển Động & Sắc Màu
            </h2>
          </div>
          <p className="text-xs font-sans tracking-wide text-white/70 max-w-sm leading-relaxed">
            Thước phim nghệ thuật lưu giữ trọn vẹn từng vệt son căng mọng và phản chiếu ánh sáng tự nhiên trên bờ môi.
          </p>
        </div>

        {/* Video Player Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl group bg-black"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle_BareGrape.png"
            className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
          >
            <source
              src="https://qwl6dynsdlyndcro.public.blob.vercel-storage.com/hf_20260815_172911_20ade74a-0e39-49b8-8545-1ee56b808a3b.mp4"
              type="video/mp4"
            />
          </video>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 font-mono text-xs text-white/90 uppercase tracking-widest bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
            Thước Phim II — Rom&nd Juicy Lasting Tint
          </div>
        </motion.div>

        {/* Framer Motion CDN Gallery Grid */}
        <div className="space-y-4 pt-8">
          <span className="text-xs font-mono tracking-widest text-[#E8B4A6] uppercase">
            BỘ SƯU TẬP HÌNH ẢNH NGHỆ THUẬT
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {CINEMA_IMAGES.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${item.span} relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-lg group cursor-pointer`}
              >
                <div className={`relative w-full ${item.aspect}`}>
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-95"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <span className="font-serif text-lg sm:text-xl text-[#FAF3EA] font-normal tracking-wide">
                      {item.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

