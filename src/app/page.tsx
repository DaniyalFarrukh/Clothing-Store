import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { BLUR_DATA_URL } from "@/lib/utils";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { NewsletterForm } from "@/components/NewsletterForm";
import { MotionReveal } from "@/components/MotionReveal";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Category tiles */}
      <MotionReveal>
        <section aria-labelledby="categories-heading" className="py-12">
          <div className="mx-auto max-w-[1440px] px-4 pb-5 sm:px-8">
            <h2
              id="categories-heading"
              className="text-[11px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]"
            >
              SHOP BY CATEGORY
            </h2>
          </div>
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-1.5 px-1.5 sm:px-4 lg:grid-cols-4 lg:gap-2">
            {brandConfig.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[var(--muted)] focus-visible:outline-2 focus-visible:outline-black"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
                />
                <span className="absolute bottom-4 left-4 text-xs font-light uppercase tracking-[0.22em] text-white transition-transform duration-300 group-hover:translate-x-1">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* New In grid */}
      <MotionReveal>
        <section aria-labelledby="new-in-heading" className="border-t border-black/15 pt-12">
          <div className="mx-auto flex max-w-[1440px] items-baseline justify-between px-4 pb-4 sm:px-8">
            <h2
              id="new-in-heading"
              className="text-[11px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]"
            >
              NEW IN · EDITION 04
            </h2>
            <Link
              href="/shop?category=new-in"
              className="text-[11px] font-light uppercase tracking-[0.2em] underline-offset-4 hover:underline"
            >
              VIEW ALL
            </Link>
          </div>
          <ProductGrid initialCategory="new-in" showFilterBar={false} />
        </section>
      </MotionReveal>

      {/* Editorial lookbook banner */}
      <MotionReveal>
        <section aria-labelledby="lookbook-heading" className="border-y border-black">
          <div className="group relative aspect-[16/9] min-h-[380px] w-full overflow-hidden bg-[var(--muted)]">
            <Image
              src={brandConfig.lookbook.image}
              alt={brandConfig.lookbook.imageAlt}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 text-white sm:px-8 sm:pb-14">
                <p className="text-[10px] font-light uppercase tracking-[0.26em] text-white/80">
                  {brandConfig.lookbook.eyebrow}
                </p>
                <h2
                  id="lookbook-heading"
                  className="mt-2 font-display text-3xl font-normal tracking-tight sm:text-5xl"
                >
                  {brandConfig.lookbook.heading}
                </h2>
                <Link
                  href={brandConfig.lookbook.ctaHref}
                  className="mt-5 inline-flex min-h-[40px] items-center border border-white px-6 text-[10px] font-light uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  {brandConfig.lookbook.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* Best sellers */}
      <MotionReveal>
        <section aria-labelledby="bestsellers-heading" className="pt-12">
          <div className="mx-auto flex max-w-[1440px] items-baseline justify-between px-4 pb-4 sm:px-8">
            <h2
              id="bestsellers-heading"
              className="text-[11px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]"
            >
              BEST SELLERS
            </h2>
            <Link
              href="/shop"
              className="text-[11px] font-light uppercase tracking-[0.2em] underline-offset-4 hover:underline"
            >
              SHOP ALL
            </Link>
          </div>
          <ProductGrid onlyBestSellers showFilterBar={false} />
        </section>
      </MotionReveal>

      {/* Trust strip */}
      <MotionReveal>
        <section aria-label="Store guarantees" className="border-y border-black/15 bg-white">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-black/10 lg:grid-cols-4 lg:divide-y-0">
            {brandConfig.trustStrip.map((item) => (
              <div key={item.label} className="px-4 py-6 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em]">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] font-light text-[var(--muted-fg)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* Newsletter */}
      <MotionReveal>
        <section aria-labelledby="newsletter-heading" className="py-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-8">
            <p className="text-[10px] font-light uppercase tracking-[0.26em] text-[var(--muted-fg)]">
              {brandConfig.newsletter.eyebrow}
            </p>
            <h2
              id="newsletter-heading"
              className="mt-2 font-display text-2xl font-normal tracking-tight sm:text-3xl"
            >
              {brandConfig.newsletter.heading}
            </h2>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </MotionReveal>
    </>
  );
}
