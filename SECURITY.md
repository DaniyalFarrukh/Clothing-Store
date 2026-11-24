# Security Checklist

- [x] **Content Security Policy (CSP)**: Per-request cryptographic nonce via `src/proxy.ts` (`strict-dynamic`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`).
- [x] **Security Headers**: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` configured in `next.config.ts`.
- [x] **Input Validation & Sanitization**: All API routes (`/api/checkout`, `/api/newsletter`, `/api/contact`) validate payloads with strict `zod` schemas, enforce length limits, and sanitize user-supplied text server-side.
- [x] **Bot & Abuse Protection**: Hidden honeypot field (`website`), Cloudflare Turnstile verification (`TURNSTILE_SECRET_KEY`), and IP-based sliding-window rate limiting on all endpoints.
- [x] **Server-Side Price & Stock Integrity**: Prices, discounts, shipping thresholds, totals, size availability, and stock counts are recalculated and validated on the server from `src/config/brand.ts`; client-submitted prices or totals are never trusted.
- [x] **CSRF Protection**: Same-origin `Origin` / `Host` header validation on all state-changing `POST` endpoints.
- [x] **XSS Prevention**: Zero `dangerouslySetInnerHTML` usage; all external links use `rel="noopener noreferrer"`.
- [x] **Secrets Hygiene**: Server secrets (`TURNSTILE_SECRET_KEY`) are read from `process.env` only on the server and never prefixed with `NEXT_PUBLIC_`.
- [x] **Image Allowlist**: `next/image` `remotePatterns` explicitly restricted to `https://images.unsplash.com/**`.
- [x] **Error Handling & Dependencies**: Generic error responses with no stack traces; dependency versions pinned in `package.json` and audited via `npm audit`.
