"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductBySlug, type ClothingSize } from "@/config/brand";

export interface CartEntry {
  slug: string;
  size: ClothingSize;
  color: string;
  quantity: number;
}

interface CartStore {
  entries: CartEntry[];
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (slug: string, size: ClothingSize, color: string) => void;
  updateQty: (slug: string, size: ClothingSize, color: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      entries: [],
      isOpen: false,
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      addItem: (slug, size, color) => {
        const product = getProductBySlug(slug);
        if (!product) return;
        const maxStock = product.stockBySize[size] ?? 0;
        if (maxStock <= 0) return;

        set((state) => {
          const idx = state.entries.findIndex(
            (e) => e.slug === slug && e.size === size && e.color === color,
          );
          if (idx >= 0) {
            const next = [...state.entries];
            const current = next[idx];
            if (current) {
              next[idx] = {
                ...current,
                quantity: Math.min(maxStock, current.quantity + 1),
              };
            }
            return { entries: next, isOpen: true };
          }
          return {
            entries: [...state.entries, { slug, size, color, quantity: 1 }],
            isOpen: true,
          };
        });
      },
      updateQty: (slug, size, color, delta) =>
        set((state) => ({
          entries: state.entries
            .map((e) =>
              e.slug === slug && e.size === size && e.color === color
                ? { ...e, quantity: Math.min(20, e.quantity + delta) }
                : e,
            )
            .filter((e) => e.quantity > 0),
        })),
      clearCart: () => set({ entries: [] }),
    }),
    {
      name: "zayn_cart_v1",
      partialize: (state) => ({ entries: state.entries }),
    },
  ),
);
