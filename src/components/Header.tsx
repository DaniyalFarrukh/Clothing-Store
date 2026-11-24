"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brandConfig } from "@/config/brand";
import { useCartStore } from "@/store/cart";

export function Header() {
  const entries = useCartStore((s) => s.entries);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const itemCount = entries.reduce((sum, e) => sum + e.quantity, 0);

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 z-30 transition-all duration-300 ${
          scrolled
            ? "top-0 border-b border-black/15 bg-white/95 text-black backdrop-blur-md"
            : "top-9 bg-transparent text-black"
        }`}
      >
        <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-3 items-center px-4 sm:px-8">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-[11px] font-light uppercase tracking-[0.22em] outline-none transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-black"
            >
              <Menu className="size-4 stroke-[1.25]" aria-hidden="true" />
              <span className="hidden sm:inline">MENU</span>
            </button>
          </div>

          <Link
            href="/"
            className="justify-self-center whitespace-nowrap font-display text-xl font-normal tracking-[0.26em] outline-none transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-black sm:text-2xl"
          >
            {brandConfig.brand.name}
          </Link>

          <div className="justify-self-end">
            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex min-h-[44px] items-center px-1 text-[11px] font-light uppercase tracking-[0.22em] outline-none transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-black"
            >
              BAG ({itemCount})
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-white p-6 text-black sm:p-10"
          >
            <div className="flex items-center justify-between border-b border-black/15 pb-4">
              <span className="font-display text-2xl tracking-[0.26em]">
                {brandConfig.brand.name}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-end gap-2 text-[11px] font-light uppercase tracking-[0.22em] focus-visible:outline-2 focus-visible:outline-black"
              >
                <span>CLOSE</span>
                <X className="size-4 stroke-[1.25]" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Categories" className="my-auto grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
                  COLLECTIONS
                </p>
                {brandConfig.categories.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/shop?category=${cat.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl font-normal tracking-tight transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-black sm:text-5xl"
                    >
                      {cat.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col justify-end gap-4 text-xs font-light uppercase tracking-[0.2em]">
                <Link href="/search" onClick={() => setMenuOpen(false)} className="hover:underline">
                  SEARCH
                </Link>
                <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:underline">
                  ACCOUNT
                </Link>
                <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:underline">
                  SHOPPING BAG ({itemCount})
                </Link>
                <Link href="/size-guide" onClick={() => setMenuOpen(false)} className="hover:underline">
                  SIZE GUIDE
                </Link>
                <Link href="/returns" onClick={() => setMenuOpen(false)} className="hover:underline">
                  RETURNS & EXCHANGES
                </Link>
              </div>
            </nav>

            <div className="flex flex-col gap-2 border-t border-black/15 pt-6 text-[11px] font-light uppercase tracking-[0.18em] text-[var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between">
              <span>{brandConfig.brand.city}</span>
              <span>{brandConfig.brand.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
