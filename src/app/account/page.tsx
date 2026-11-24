"use client";

import * as React from "react";
import { brandConfig } from "@/config/brand";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";

export default function AccountPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website, turnstileToken }),
      });
      const json = (await res.json()) as { ticket?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(json.error ?? "Unable to send inquiry.");
        return;
      }
      setStatus("success");
      setFeedback(`Inquiry received · ${json.ticket}`);
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-8">
      <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
        {brandConfig.brand.name} · CLIENT PORTAL
      </p>
      <h1 className="mt-2 font-display text-4xl font-normal tracking-tight">
        Account & Concierge
      </h1>
      <p className="mt-3 text-xs font-light leading-relaxed text-[var(--muted-fg)]">
        Guest checkout is enabled for all Cash on Delivery orders. Need assistance with an existing order or sizing? Message our studio below.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-h-[44px] w-full border border-black/25 px-3 text-xs outline-none focus:border-black"
        />
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
        <textarea
          required
          rows={4}
          maxLength={500}
          placeholder="ORDER REFERENCE OR INQUIRY"
          aria-label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-black/25 p-3 text-xs outline-none focus:border-black"
        />
        <TurnstileWidget onVerify={setTurnstileToken} />
        {feedback && (
          <p
            role={status === "error" ? "alert" : "status"}
            className={`text-xs ${status === "error" ? "text-red-700" : "text-black"}`}
          >
            {feedback}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-[48px] w-full border border-black bg-black text-[11px] font-light uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black disabled:opacity-50"
        >
          {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>
    </div>
  );
}
