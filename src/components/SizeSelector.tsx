"use client";

import type { ClothingSize, Product } from "@/config/brand";

interface SizeSelectorProps {
  product: Product;
  selected: ClothingSize | null;
  onSelect: (size: ClothingSize) => void;
  compact?: boolean;
}

export function SizeSelector({
  product,
  selected,
  onSelect,
  compact = false,
}: SizeSelectorProps) {
  const sizes = Object.keys(product.stockBySize) as ClothingSize[];

  return (
    <div role="radiogroup" aria-label="Select size" className="flex flex-wrap gap-1.5">
      {sizes.map((size) => {
        const stock = product.stockBySize[size] ?? 0;
        const disabled = stock <= 0;
        const isSelected = selected === size;

        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect(size)}
            className={`border text-[10px] font-light uppercase tracking-[0.16em] outline-none transition-colors focus-visible:outline-2 focus-visible:outline-black ${
              compact ? "min-h-[34px] min-w-[34px] px-2" : "min-h-[44px] min-w-[48px] px-3"
            } ${
              disabled
                ? "cursor-not-allowed border-black/10 text-black/30 line-through"
                : isSelected
                  ? "border-black bg-black text-white"
                  : "border-black/25 bg-white text-black hover:border-black"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
