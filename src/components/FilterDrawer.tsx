"use client";

import * as React from "react";
import { X } from "lucide-react";
import type { ClothingSize } from "@/config/brand";

export type SortOption = "featured" | "price-asc" | "price-desc";

export interface FilterState {
  size: ClothingSize | "ALL";
  sort: SortOption;
  onlySale: boolean;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

const SIZES: Array<ClothingSize | "ALL"> = ["ALL", "XS", "S", "M", "L", "XL", "ONE SIZE"];

export function FilterDrawer({ open, onClose, filters, onChange }: FilterDrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filter and sort products"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />
      <aside className="relative z-10 flex h-full w-full max-w-sm flex-col justify-between border-l border-black bg-white p-6 text-black">
        <div>
          <div className="flex items-center justify-between border-b border-black/15 pb-4">
            <h2 className="text-xs font-light uppercase tracking-[0.22em]">
              FILTER & SORT
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-end focus-visible:outline-2 focus-visible:outline-black"
            >
              <X className="size-4 stroke-[1.25]" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 space-y-8">
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em]">SORT BY</p>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { id: "featured", label: "FEATURED" },
                    { id: "price-asc", label: "PRICE: LOW TO HIGH" },
                    { id: "price-desc", label: "PRICE: HIGH TO LOW" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange({ ...filters, sort: opt.id })}
                    className={`min-h-[40px] border px-3 text-left text-[11px] font-light uppercase tracking-[0.18em] ${
                      filters.sort === opt.id
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em]">SIZE</p>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onChange({ ...filters, size: sz })}
                    className={`min-h-[40px] border px-3 text-[11px] font-light uppercase tracking-[0.16em] ${
                      filters.size === sz
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex min-h-[44px] cursor-pointer items-center justify-between border-t border-black/15 pt-4">
              <span className="text-[11px] font-light uppercase tracking-[0.18em]">
                SALE ITEMS ONLY
              </span>
              <input
                type="checkbox"
                checked={filters.onlySale}
                onChange={(e) => onChange({ ...filters, onlySale: e.target.checked })}
                className="size-4 accent-black"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-black/15 pt-4">
          <button
            type="button"
            onClick={() => onChange({ size: "ALL", sort: "featured", onlySale: false })}
            className="min-h-[44px] border border-black bg-white text-[11px] font-light uppercase tracking-[0.2em]"
          >
            RESET
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] border border-black bg-black text-[11px] font-light uppercase tracking-[0.2em] text-white"
          >
            APPLY
          </button>
        </div>
      </aside>
    </div>
  );
}
