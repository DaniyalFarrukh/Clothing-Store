"use client";

import * as React from "react";
import Link from "next/link";
import { brandConfig, getProductBySlug } from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { formatPkr } from "@/lib/utils";

export default function CheckoutPage() {
  const { entries, clearCart } = useCartStore();
  const [customerName, setCustomerName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("Lahore");
  const [website, setWebsite] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [orderResult, setOrderResult] = React.useState<{
    reference: string;
    totalPkr: number;
  } | null>(null);

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          address,
          city,
          paymentMethod: "cod",
          items: entries.map((item) => ({
            slug: item.slug,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          })),
          website,
          turnstileToken,
        }),
      });
      const json = (await res.json()) as {
        reference?: string;
        totalPkr?: number;
        error?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Unable to place order.");
        return;
      }
      setOrderResult({
        reference: json.reference ?? "",
        totalPkr: json.totalPkr ?? totalPkr,
      });
      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-8">
      <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
        CASH ON DELIVERY · PAKISTAN
      </p>
      <h1 className="mt-2 font-display text-4xl font-normal tracking-tight sm:text-5xl">
        Checkout
      </h1>

      {status === "success" && orderResult ? (
        <div className="mt-10 border border-black p-8">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--muted-fg)]">
            ORDER CONFIRMED · {orderResult.reference}
          </p>
          <h2 className="mt-3 font-display text-3xl">Thank you, {customerName}.</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--muted-fg)]">
            Total payable on delivery: {formatPkr(orderResult.totalPkr)}.{" "}
            {brandConfig.shipping.deliveryEstimate}.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-[44px] items-center border border-black bg-black px-8 text-[11px] font-light uppercase tracking-[0.2em] text-white"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : lines.length === 0 ? (
        <div className="mt-10 border border-black/15 p-10 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)]">
            YOUR BAG IS EMPTY.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-[44px] items-center border border-black bg-black px-8 text-[11px] font-light uppercase tracking-[0.2em] text-white"
          >
            SHOP COLLECTION
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_20rem]">
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <input
              type="text"
              required
              maxLength={80}
              placeholder="FULL NAME"
              aria-label="Full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="email"
                required
                maxLength={120}
                placeholder="EMAIL"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
              />
              <input
                type="tel"
                required
                maxLength={24}
                placeholder="PHONE (+92 3XX XXXXXXX)"
                aria-label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
              />
            </div>
            <input
              type="text"
              required
              maxLength={220}
              placeholder="STREET ADDRESS"
              aria-label="Street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
            />
            <input
              type="text"
              required
              maxLength={60}
              placeholder="CITY (E.G. LAHORE, KARACHI, ISLAMABAD)"
              aria-label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
            />

            <div className="border border-black bg-[var(--muted)] p-4 text-[11px] font-light uppercase tracking-[0.16em]">
              PAYMENT METHOD: CASH ON DELIVERY (COD)
            </div>

            <TurnstileWidget onVerify={setTurnstileToken} />

            {errorMsg && (
              <p role="alert" className="text-xs text-red-700">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-[48px] w-full border border-black bg-black text-[11px] font-light uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black disabled:opacity-50"
            >
              {status === "submitting" ? "CONFIRMING..." : "PLACE ORDER (COD)"}
            </button>
          </form>

          <div className="h-fit border border-black p-6">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em]">SUMMARY</h2>
            <ul className="mt-4 space-y-2 border-b border-black/15 pb-4 text-[11px]">
              {lines.map((l) => (
                <li
                  key={`${l.slug}-${l.size}-${l.color}`}
                  className="flex justify-between gap-2 text-[var(--muted-fg)]"
                >
                  <span className="truncate">
                    {l.quantity}× {l.product.name} ({l.size})
                  </span>
                  <span className="font-mono">
                    {formatPkr(l.product.pricePkr * l.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5 text-xs">
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
              <div className="flex justify-between pt-2 font-medium">
                <span>TOTAL</span>
                <span className="font-mono">{formatPkr(totalPkr)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
