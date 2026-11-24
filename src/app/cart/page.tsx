"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { brandConfig, getProductBySlug } from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { formatPkr } from "@/lib/utils";

export default function CartPage() {
  const { entries, updateQty } = useCartStore();

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

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-8">
      <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
        {brandConfig.brand.name} · BAG
      </p>
      <h1 className="mt-2 font-display text-4xl font-normal tracking-tight sm:text-5xl">
        Shopping Bag
      </h1>

      {lines.length === 0 ? (
        <div className="mt-12 border border-black/15 p-12 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
            YOUR SHOPPING BAG IS EMPTY.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-[44px] items-center border border-black bg-black px-8 text-[11px] font-light uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_20rem]">
          <ul className="divide-y divide-black/15 border-y border-black/15">
            {lines.map((line) => (
              <li
                key={`${line.slug}-${line.size}-${line.color}`}
                className="flex gap-4 py-5"
              >
                <div className="relative aspect-[3/4] w-20 shrink-0 bg-[var(--muted)]">
                  <Image
                    src={line.product.images[0] ?? ""}
                    alt={line.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${line.slug}`}
                        className="text-xs font-light uppercase tracking-[0.16em] hover:underline"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-[11px] font-light uppercase tracking-[0.16em] text-[var(--muted-fg)]">
                        {line.size} · {line.color}
                      </p>
                    </div>
                    <span className="font-mono text-xs">
                      {formatPkr(line.product.pricePkr * line.quantity)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => updateQty(line.slug, line.size, line.color, -1)}
                      aria-label={`Decrease ${line.product.name}`}
                      className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center border border-black/25 hover:border-black"
                    >
                      <Minus className="size-3.5" aria-hidden="true" />
                    </button>
                    <span className="font-mono text-xs">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(line.slug, line.size, line.color, 1)}
                      aria-label={`Increase ${line.product.name}`}
                      className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center border border-black/25 hover:border-black"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit border border-black p-6">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em]">ORDER SUMMARY</h2>
            <div className="mt-4 space-y-2 text-xs">
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
              <div className="flex justify-between border-t border-black/15 pt-3 font-medium">
                <span>TOTAL</span>
                <span className="font-mono">{formatPkr(totalPkr)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center border border-black bg-black text-[11px] font-light uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
