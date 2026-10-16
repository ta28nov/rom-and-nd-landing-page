'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value, onChange, min = 1, max = 10 }: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-[#241B15]/20 bg-white/70 px-3 py-1.5 shadow-sm">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="p-1 text-[#241B15] hover:text-[#D64B3A] disabled:opacity-30 transition-colors"
        aria-label="Giảm số lượng"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-8 text-center font-mono text-xs font-semibold text-[#241B15]">{value}</span>
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="p-1 text-[#241B15] hover:text-[#D64B3A] disabled:opacity-30 transition-colors"
        aria-label="Tăng số lượng"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

