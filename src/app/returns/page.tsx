import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: `14-day return and exchange policy for ${brandConfig.brand.name}.`,
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 pb-24 pt-28 sm:px-8">
      <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
        {brandConfig.brand.name} · CLIENT CARE
      </p>
      <h1 className="font-display text-4xl font-normal tracking-tight">
        Returns & Exchanges
      </h1>
      <p className="text-sm font-light leading-relaxed text-[var(--muted-fg)]">
        Unworn garments with original tags attached may be returned or exchanged within 14 days of delivery anywhere in Pakistan.
      </p>
      <div className="border-t border-black/15 pt-6 text-xs font-light leading-relaxed text-[var(--muted-fg)]">
        <p>1. Email {brandConfig.brand.email} with your order reference.</p>
        <p className="mt-2">2. Our courier collects the parcel from your doorstep within 48 hours.</p>
        <p className="mt-2">3. Refunds for Cash on Delivery orders are issued via IBFT bank transfer within 5 working days.</p>
      </div>
    </div>
  );
}
