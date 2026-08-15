'use client';

import React from 'react';
import { SHADES } from '@/lib/data';

interface ShadeSwatchesProps {
  selectedShadeId: string;
  onSelectShade: (id: string) => void;
}

export function ShadeSwatches({ selectedShadeId, onSelectShade }: ShadeSwatchesProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {SHADES.map((shade) => {
        const isSelected = shade.id === selectedShadeId;
        return (
          <button
            key={shade.id}
            onClick={() => onSelectShade(shade.id)}
            className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${
              isSelected ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
            }`}
            style={{ backgroundColor: shade.hex }}
            aria-label={`Select shade ${shade.name}`}
          >
            {/* Tooltip */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
              {shade.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
