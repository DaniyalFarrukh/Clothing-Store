import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandConfig, getAvailableSizes, getProductBySlug } from "@/config/brand";
import { ProductDetailClient } from "@/components/ProductDetailClient";

export async function generateStaticParams() {
  return brandConfig.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] ?? "", alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const inStock = getAvailableSizes(product).length > 0;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: brandConfig.brand.name },
    offers: {
      "@type": "Offer",
      price: product.pricePkr,
      priceCurrency: brandConfig.brand.currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      <ProductDetailClient product={product} />
    </>
  );
}
