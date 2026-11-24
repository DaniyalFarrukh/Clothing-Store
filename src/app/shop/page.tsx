import type { Metadata } from "next";
import { brandConfig, type CategoryId } from "@/config/brand";
import { ProductGrid, type CategoryTabValue } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse ${brandConfig.brand.name} collections — New In, Women, Men, and Accessories.`,
};

const VALID_CATS = new Set<string>(brandConfig.categories.map((c) => c.id));

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory: CategoryTabValue =
    params.category && VALID_CATS.has(params.category)
      ? (params.category as CategoryId)
      : "all";

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-8">
        <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
          {brandConfig.brand.name} · COLLECTION 04
        </p>
        <h1 className="mt-2 font-display text-4xl font-normal tracking-tight sm:text-5xl">
          All Pieces
        </h1>
      </div>
      <ProductGrid initialCategory={initialCategory} />
    </div>
  );
}
