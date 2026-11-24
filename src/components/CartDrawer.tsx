"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { brandConfig, getProductBySlug } from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { formatPkr } from "@/lib/utils";

export function CartDrawer() {
  const { entries, isOpen, closeDrawer, updateQty } = useCartStore();

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeDrawer]);

  const lines = entries
    .map((e) => {
      const product = getProductBySlug(e.slug);
      return product ? { ...e, product } : null;
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const subtotalPkr = lines.reduce((sum, l) => sum + l.product.pricePkr * l.quantity, 0);
  const shippingPkr =
    subtotalPkr === 0 || subtotalPkr >= brandConfig.shipping.freeThresholdPkr
      ? 0
      : brandConfig.shipping.feePkr;
  const totalPkr = subtotalPkr + shippingPkr;

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-black bg-white text-black">
        <div className="flex items-center justify-between border-b border-black/15 px-6 py-4">
          <h2 className="text-[11px] font-light uppercase tracking-[0.22em]">
            SHOPPING BAG ({lines.reduce((s, l) => s + l.quantity, 0)})
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close bag"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-end focus-visible:outline-2 focus-visible:outline-black"
          >
            <X className="size-4 stroke-[1.25]" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-[11px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
              YOUR BAG IS EMPTY.
            </p>
          ) : (
            <ul className="divide-y divide-black/10">
              {lines.map((line) => (
                <li
                  key={`${line.slug}-${line.size}-${line.color}`}
                  className="flex gap-4 py-4"
                >
                  <div className="relative aspect-[3/4] w-16 shrink-0 bg-[var(--muted)]">
                    <Image
                      src={line.product.images[0] ?? ""}
                      alt={line.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-light uppercase tracking-[0.14em]">
                          {line.product.name}
                        </p>
                        <p className="mt-1 text-[10px] font-light uppercase tracking-[0.16em] text-[var(--muted-fg)]">
                          {line.size} · {line.color}
                        </p>
                      </div>
                      <span className="font-mono text-[11px]">
                        {formatPkr(line.product.pricePkr * line.quantity)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => updateQty(line.slug, line.size, line.color, -1)}
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-black/20 hover:border-black"
                      >
                        <Minus className="size-3" aria-hidden="true" />
                      </button>
                      <span className="font-mono text-xs">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(line.slug, line.size, line.color, 1)}
                        aria-label={`Increase quantity of ${line.product.name}`}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-black/20 hover:border-black"
                      >
                        <Plus className="size-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-4 border-t border-black/15 p-6">
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-[var(--muted-fg)]">
                <span>SUBTOTAL</span>
                <span className="font-mono">{formatPkr(subtotalPkr)}</span>
              </div>
              <div className="flex justify-between text-[var(--muted-fg)]">
                <span>SHIPPING</span>
                <span className="font-mono">
                  {shippingPkr === 0 ? "FREE" : formatPkr(shippingPkr)}
                </span>
              </div>
              <div className="flex justify-between pt-1 font-medium">
                <span>ESTIMATED TOTAL</span>
                <span className="font-mono">{formatPkr(totalPkr)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex min-h-[44px] items-center justify-center border border-black bg-white text-[11px] font-light uppercase tracking-[0.2em] hover:bg-black hover:text-white"
              >
                VIEW BAG
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="flex min-h-[44px] items-center justify-center border border-black bg-black text-[11px] font-light uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
