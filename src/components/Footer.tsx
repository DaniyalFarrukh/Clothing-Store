import Link from "next/link";
import { brandConfig } from "@/config/brand";

export function Footer() {
  return (
    <footer className="border-t border-black bg-white pb-20 pt-12 text-black md:pb-12">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-4 sm:px-8 lg:grid-cols-4">
        <div className="col-span-2 space-y-3 lg:col-span-1">
          <p className="font-display text-2xl tracking-[0.22em]">
            {brandConfig.brand.name}
          </p>
          <p className="text-xs font-light leading-relaxed text-[var(--muted-fg)]">
            {brandConfig.brand.tagline}
          </p>
        </div>

        <div className="space-y-2 text-[11px] font-light uppercase tracking-[0.18em]">
          <p className="font-medium text-black">SHOP</p>
          <ul className="space-y-2 pt-1 text-[var(--muted-fg)]">
            {brandConfig.categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/shop?category=${cat.id}`} className="hover:text-black">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-[11px] font-light uppercase tracking-[0.18em]">
          <p className="font-medium text-black">CLIENT CARE</p>
          <ul className="space-y-2 pt-1 text-[var(--muted-fg)]">
            <li>
              <Link href="/size-guide" className="hover:text-black">
                SIZE GUIDE
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-black">
                RETURNS & EXCHANGES
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-black">
                ACCOUNT
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2 text-[11px] font-light uppercase tracking-[0.18em]">
          <p className="font-medium text-black">FOLLOW</p>
          <ul className="space-y-2 pt-1 text-[var(--muted-fg)]">
            {brandConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-2 border-t border-black/15 px-4 pt-6 text-[10px] font-light uppercase tracking-[0.2em] text-[var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          © {new Date().getFullYear()} {brandConfig.brand.name} · {brandConfig.brand.city}
        </span>
        <span>{brandConfig.brand.email}</span>
      </div>
    </footer>
  );
}
