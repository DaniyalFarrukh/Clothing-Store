"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAvailableSizes, type ClothingSize, type Product } from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { BLUR_DATA_URL, formatPkr } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const availableSizes = React.useMemo(() => getAvailableSizes(product), [product]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.name ?? "");
  const [showSizes, setShowSizes] = React.useState(false);

  const primaryImage = product.images[0] ?? "";
  const hoverImage = product.images[1] ?? primaryImage;
  const hasSale = Boolean(product.compareAtPkr && product.compareAtPkr > product.pricePkr);

  function handleQuickAdd(size: ClothingSize) {
    addItem(product.slug, size, selectedColor);
    setShowSizes(false);
  }

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--muted)]">
        <Link
          href={`/product/${product.slug}`}
          className="block size-full focus-visible:outline-2 focus-visible:outline-black"
        >
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={hoverImage}
            alt=""
            aria-hidden="true"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        {hasSale && (
          <span className="pointer-events-none absolute left-2 top-2 bg-black px-2 py-0.5 text-[9px] font-light uppercase tracking-[0.2em] text-white">
            SALE
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
          {showSizes ? (
            <div className="border-t border-black/15 bg-white/95 p-2">
              <div className="flex flex-wrap justify-center gap-1">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => handleQuickAdd(sz)}
                    className="min-h-[36px] min-w-[36px] border border-black/20 px-2 text-[10px] font-light uppercase tracking-[0.14em] hover:border-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-black"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (availableSizes.length === 1 && availableSizes[0]) {
                  handleQuickAdd(availableSizes[0]);
                } else {
                  setShowSizes(true);
                }
              }}
              aria-label={`Quick add ${product.name}`}
              className="flex min-h-[40px] w-full items-center justify-center border-t border-black/15 bg-white/95 text-[10px] font-light uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-black"
            >
              ADD +
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="truncate text-[11px] font-light uppercase tracking-[0.12em] text-black hover:underline"
          >
            {product.name}
          </Link>
          <div className="flex shrink-0 items-baseline gap-1.5 font-mono text-[11px]">
            {hasSale && product.compareAtPkr && (
              <span className="text-[10px] text-[var(--muted-fg)] line-through">
                {formatPkr(product.compareAtPkr)}
              </span>
            )}
            <span className="text-black">{formatPkr(product.pricePkr)}</span>
          </div>
        </div>

        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5" role="group" aria-label="Colors">
            {product.colors.map((c) => {
              const active = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={`Select color ${c.name}`}
                  aria-pressed={active}
                  onClick={() => setSelectedColor(c.name)}
                  className={`size-3 border ${
                    active ? "border-black ring-1 ring-black ring-offset-1" : "border-black/25"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
