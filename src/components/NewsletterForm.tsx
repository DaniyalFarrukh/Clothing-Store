"use client";

import * as React from "react";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, turnstileToken }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMsg(json.error ?? "Unable to subscribe.");
        return;
      }
      setStatus("success");
      setEmail("");
      setMsg("You are on the list.");
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3">
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
      <div className="flex border border-black">
        <input
          type="email"
          required
          maxLength={120}
          placeholder="ENTER YOUR EMAIL"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-[44px] flex-1 bg-white px-4 text-[11px] font-light tracking-[0.14em] outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-[44px] border-l border-black bg-black px-6 text-[11px] font-light uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black disabled:opacity-50"
        >
          {status === "submitting" ? "..." : "JOIN"}
        </button>
      </div>
      <TurnstileWidget onVerify={setTurnstileToken} />
      {msg && (
        <p
          role={status === "error" ? "alert" : "status"}
          className={`text-[11px] font-light uppercase tracking-[0.16em] ${
            status === "error" ? "text-red-700" : "text-[var(--muted-fg)]"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
