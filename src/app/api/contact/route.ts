import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  sanitizeText,
  verifyOrigin,
  verifyTurnstile,
} from "@/lib/security";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    if (!verifyOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
      );
    }

    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your message fields and try again." },
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
        { error: "Verification failed. Please try again." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ticket: `MSG-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
        name: sanitizeText(data.name),
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
