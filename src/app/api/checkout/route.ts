import { NextRequest, NextResponse } from "next/server";
import { brandConfig, getProductBySlug } from "@/config/brand";
import {
  checkRateLimit,
  getClientIp,
  sanitizeText,
  verifyOrigin,
  verifyTurnstile,
} from "@/lib/security";
import { checkoutSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    if (!verifyOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`checkout:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
      );
    }

    const body: unknown = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your delivery details and bag items." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (data.website.length > 0) {
      return NextResponse.json({ error: "Unable to process request." }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Verification failed. Please complete the security check." },
        { status: 400 },
      );
    }

    // Server-side price, stock, and size validation — never trust client prices/totals.
    let subtotalPkr = 0;
    let savingsPkr = 0;
    const verifiedItems: Array<{
      slug: string;
      name: string;
      size: string;
      color: string;
      quantity: number;
      unitPricePkr: number;
    }> = [];

    for (const entry of data.items) {
      const product = getProductBySlug(entry.slug);
      if (!product) {
        return NextResponse.json(
          { error: "One or more selected items are no longer available." },
          { status: 400 },
        );
      }

      const availableStock = product.stockBySize[entry.size] ?? 0;
      if (availableStock < entry.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name} (${entry.size}).` },
          { status: 400 },
        );
      }

      const colorValid = product.colors.some(
        (c) => c.name.toLowerCase() === entry.color.toLowerCase(),
      );
      if (!colorValid) {
        return NextResponse.json(
          { error: `Invalid color selection for ${product.name}.` },
          { status: 400 },
        );
      }

      subtotalPkr += product.pricePkr * entry.quantity;
      if (product.compareAtPkr && product.compareAtPkr > product.pricePkr) {
        savingsPkr += (product.compareAtPkr - product.pricePkr) * entry.quantity;
      }

      verifiedItems.push({
        slug: product.slug,
        name: product.name,
        size: entry.size,
        color: sanitizeText(entry.color),
        quantity: entry.quantity,
        unitPricePkr: product.pricePkr,
      });
    }

    const shippingPkr =
      subtotalPkr >= brandConfig.shipping.freeThresholdPkr
        ? 0
        : brandConfig.shipping.feePkr;
    const totalPkr = subtotalPkr + shippingPkr;
    const reference = `ZS-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

    return NextResponse.json(
      {
        reference,
        customerName: sanitizeText(data.customerName),
        city: sanitizeText(data.city),
        items: verifiedItems,
        subtotalPkr,
        savingsPkr,
        shippingPkr,
        totalPkr,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to place order right now." },
      { status: 500 },
    );
  }
}
