"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  brandConfig,
  getAvailableSizes,
  type ClothingSize,
  type Product,
} from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { SizeSelector } from "@/components/SizeSelector";
import { BLUR_DATA_URL, formatPkr } from "@/lib/utils";

export function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const availableSizes = React.useMemo(() => getAvailableSizes(product), [product]);
  const [selectedSize, setSelectedSize] = React.useState<ClothingSize | null>(
    availableSizes[0] ?? null,
  );
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.name ?? "");
  const [openAccordion, setOpenAccordion] = React.useState<string | null>("details");

  const hasSale = Boolean(product.compareAtPkr && product.compareAtPkr > product.pricePkr);

  const accordions = [
    { id: "details", title: "DETAILS", body: product.description },
    { id: "composition", title: "COMPOSITION & CARE", body: `${product.composition}. ${product.care}` },
    {
      id: "shipping",
      title: "SHIPPING & RETURNS",
      body: `${brandConfig.shipping.deliveryEstimate}. Free shipping over ${formatPkr(
        brandConfig.shipping.freeThresholdPkr,
      )}. 14-day courier returns.`,
    },
  ];

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-2 pb-20 pt-24 sm:px-6 lg:grid-cols-[1fr_28rem] lg:gap-12">
      {/* Swipeable on mobile, tall vertical stack on desktop */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto lg:flex-col lg:gap-3 lg:overflow-visible">
        {product.images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-[3/4] w-[85vw] shrink-0 snap-center bg-[var(--muted)] lg:w-full"
          >
            <Image
              src={src}
              alt={`${product.name} view ${idx + 1}`}
              fill
              priority={idx === 0}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 1024px) 85vw, 55vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Sticky details column */}
      <div className="h-fit space-y-6 px-2 lg:sticky lg:top-20 lg:px-0">
        <div className="space-y-2 border-b border-black/15 pb-5">
          <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="font-display text-3xl font-normal tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-3 pt-1 font-mono text-sm">
            {hasSale && product.compareAtPkr && (
              <span className="text-xs text-[var(--muted-fg)] line-through">
                {formatPkr(product.compareAtPkr)}
              </span>
            )}
            <span>{formatPkr(product.pricePkr)}</span>
          </div>
        </div>

        {/* Color swatches */}
        <div className="space-y-2">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
            COLOR: <span className="text-black">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={`Color ${c.name}`}
                aria-pressed={selectedColor === c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`size-6 border ${
                  selectedColor === c.name
                    ? "border-black ring-1 ring-black ring-offset-2"
                    : "border-black/25"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="space-y-2">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
            SIZE
          </p>
          <SizeSelector
            product={product}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
        </div>

        {/* Add to cart */}
        <button
          type="button"
          disabled={!selectedSize}
          onClick={() => {
            if (selectedSize) addItem(product.slug, selectedSize, selectedColor);
          }}
          className="min-h-[48px] w-full border border-black bg-black text-[11px] font-light uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-black disabled:opacity-40"
        >
          {selectedSize ? "ADD TO CART" : "OUT OF STOCK"}
        </button>

        {/* Accordion */}
        <div className="divide-y divide-black/15 border-y border-black/15">
          {accordions.map((acc) => {
            const open = openAccordion === acc.id;
            return (
              <div key={acc.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenAccordion(open ? null : acc.id)}
                  className="flex min-h-[44px] w-full items-center justify-between py-3 text-[11px] font-light uppercase tracking-[0.2em]"
                >
                  <span>{acc.title}</span>
                  <ChevronDown
                    className={`size-4 stroke-[1.25] transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {open && (
                  <p className="pb-4 text-xs font-light leading-relaxed text-[var(--muted-fg)]">
                    {acc.body}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
