'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FEATURES = [
  {
    id: "shine",
    eyebrow: "GLASS-LIKE SHINE",
    headline: "Coat your lips in a luminous, non-sticky mirror finish.",
    description: "Formulated with high-refraction botanical oils that form a protective barrier for lightweight, mirror-like gloss that lasts.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg",
    alt: "rom&nd Juicy Lasting Tint glass shine texture",
  },
  {
    id: "color",
    eyebrow: "MELT-IN COLOR & GLOSS",
    headline: "Vivid fruit-inspired tints that deepen gracefully over time.",
    description: "Unlike ordinary glosses, pigment stains evenly into the lip membrane, maintaining a natural fruit wash even after dining.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle_BareGrape.png",
    alt: "rom&nd Bare Grape shade lifestyle editorial",
  },
  {
    id: "wear",
    eyebrow: "LAYERABLE & NEVER STICKY",
    headline: "Swipe once for a sheer tint, or layer twice for intense drama.",
    description: "Versatile pigmentation allows complete control over your mood, keeping lips plumped, smooth, and nourished all day.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png",
    alt: "rom&nd Juicy Lasting Tint full collection arrangement",
  },
];

export function FeatureRow() {
  return (
    <section id="about" className="bg-[#FAF3EA] py-24 lg:py-36 overflow-hidden border-t border-[#241B15]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-24 lg:space-y-36">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#D64B3A] uppercase">
            EDITORIAL CRAFTSMANSHIP
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#241B15]">
            Designed for effortless daily wear.
          </h2>
        </div>

        {/* Z-Pattern Alternating Rows */}
        {FEATURES.map((feature, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E8B4A6]/20 shadow-lg border border-[#241B15]/5 group">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Copy Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest text-[#D64B3A] uppercase">
                    {feature.eyebrow}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#241B15] leading-tight font-normal">
                    {feature.headline}
                  </h3>
                </div>
                <p className="text-base text-[#8B8078] font-sans leading-relaxed max-w-lg">
                  {feature.description}
                </p>
                <div className="pt-2">
                  <a
                    href="#spotlight"
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-[#241B15] border-b-2 border-[#D64B3A] pb-1 hover:text-[#D64B3A] transition-colors"
                  >
                    Experience The Formula &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
