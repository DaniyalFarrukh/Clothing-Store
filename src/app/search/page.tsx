"use client";

import * as React from "react";
import { brandConfig } from "@/config/brand";
import { ProductCard } from "@/components/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brandConfig.products;
    return brandConfig.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-2xl pb-10">
        <label htmlFor="store-search" className="sr-only">
          Search products
        </label>
        <input
          id="store-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH FOR TRENCH, POPLIN, MERINO, TOTE..."
          className="min-h-[48px] w-full border-b border-black bg-white text-sm font-light uppercase tracking-[0.18em] outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-8 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
