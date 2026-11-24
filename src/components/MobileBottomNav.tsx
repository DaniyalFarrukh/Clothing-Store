"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export function MobileBottomNav() {
  const entries = useCartStore((s) => s.entries);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = entries.reduce((sum, e) => sum + e.quantity, 0);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-black bg-white text-black md:hidden"
    >
      <Link
        href="/"
        className="flex min-h-[48px] items-center justify-center border-r border-black/10 text-[10px] font-light uppercase tracking-[0.16em]"
      >
        HOME
      </Link>
      <Link
        href="/shop"
        className="flex min-h-[48px] items-center justify-center border-r border-black/10 text-[10px] font-light uppercase tracking-[0.16em]"
      >
        SHOP
      </Link>
      <Link
        href="/search"
        className="flex min-h-[48px] items-center justify-center border-r border-black/10 text-[10px] font-light uppercase tracking-[0.16em]"
      >
        SEARCH
      </Link>
      <button
        type="button"
        onClick={openDrawer}
        className="flex min-h-[48px] items-center justify-center border-r border-black/10 text-[10px] font-light uppercase tracking-[0.16em]"
      >
        BAG ({count})
      </button>
      <Link
        href="/account"
        className="flex min-h-[48px] items-center justify-center text-[10px] font-light uppercase tracking-[0.16em]"
      >
        ACCOUNT
      </Link>
    </nav>
  );
}
