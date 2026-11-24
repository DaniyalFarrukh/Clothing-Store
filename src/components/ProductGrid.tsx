"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { brandConfig, type CategoryId } from "@/config/brand";
import { ProductCard } from "@/components/ProductCard";
import { FilterDrawer, type FilterState } from "@/components/FilterDrawer";

export type CategoryTabValue = "all" | CategoryId;

interface ProductGridProps {
  initialCategory?: CategoryTabValue;
  showFilterBar?: boolean;
  onlyBestSellers?: boolean;
}

const TABS: Array<{ id: CategoryTabValue; label: string }> = [
  { id: "all", label: "ALL" },
  ...brandConfig.categories.map((c) => ({
    id: c.id as CategoryTabValue,
    label: c.label.toUpperCase(),
  })),
];

export function ProductGrid({
  initialCategory = "all",
  showFilterBar = true,
  onlyBestSellers = false,
}: ProductGridProps) {
  const [category, setCategory] = React.useState<CategoryTabValue>(initialCategory);
  const [cols, setCols] = React.useState<2 | 4 | 6>(4);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>({
    size: "ALL",
    sort: "featured",
    onlySale: false,
  });

  React.useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const items = React.useMemo(() => {
    let list = [...brandConfig.products];
    if (onlyBestSellers) {
      return list.filter((p) => p.isBestSeller);
    }
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (filters.size !== "ALL") {
      list = list.filter((p) => (p.stockBySize[filters.size as keyof typeof p.stockBySize] ?? 0) > 0);
    }
    if (filters.onlySale) {
      list = list.filter((p) => Boolean(p.compareAtPkr && p.compareAtPkr > p.pricePkr));
    }
    if (filters.sort === "price-asc") {
      list.sort((a, b) => a.pricePkr - b.pricePkr);
    } else if (filters.sort === "price-desc") {
      list.sort((a, b) => b.pricePkr - a.pricePkr);
    }
    return list;
  }, [category, filters, onlyBestSellers]);

  const gridColsClass =
    cols === 2
      ? "grid-cols-2 lg:grid-cols-2"
      : cols === 6
        ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div>
      {showFilterBar && !onlyBestSellers && (
        <div className="sticky top-14 z-20 border-y border-black/15 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
            <div
              role="tablist"
              aria-label="Product categories"
              className="flex items-center gap-5 overflow-x-auto"
            >
              {TABS.map((tab) => {
                const selected = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setCategory(tab.id)}
                    className={`relative min-h-[44px] shrink-0 py-3 text-[11px] font-light uppercase tracking-[0.2em] outline-none focus-visible:outline-2 focus-visible:outline-black ${
                      selected ? "text-black" : "text-[var(--muted-fg)] hover:text-black"
                    }`}
                  >
                    {tab.label}
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-black"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden items-center gap-2 text-[10px] font-light uppercase tracking-[0.18em] lg:flex">
                <span className="text-[var(--muted-fg)]">VIEW</span>
                {([2, 4, 6] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCols(n)}
                    aria-pressed={cols === n}
                    className={`min-h-[32px] min-w-[24px] px-1 ${
                      cols === n ? "font-medium underline underline-offset-4" : "text-[var(--muted-fg)]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 text-[11px] font-light uppercase tracking-[0.18em] hover:underline focus-visible:outline-2 focus-visible:outline-black"
              >
                <SlidersHorizontal className="size-3.5 stroke-[1.25]" aria-hidden="true" />
                <span>FILTER & SORT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto grid max-w-[1440px] gap-x-1.5 gap-y-8 px-1.5 py-6 sm:px-4 lg:gap-x-2 lg:gap-y-12 ${gridColsClass}`}
      >
        {items.length === 0 ? (
          <p className="col-span-full py-16 text-center text-xs font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
            NO PIECES MATCH THE SELECTED FILTERS.
          </p>
        ) : (
          items.map((product, idx) => (
            <ProductCard key={product.slug} product={product} priority={idx < 4} />
          ))
        )}
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </div>
  );
}
