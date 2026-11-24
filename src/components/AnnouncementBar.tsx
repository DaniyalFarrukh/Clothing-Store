import Link from "next/link";
import { brandConfig } from "@/config/brand";

export function AnnouncementBar() {
  return (
    <div className="relative z-40 border-b border-black/15 bg-black text-white">
      <Link
        href={brandConfig.announcement.href}
        className="flex min-h-[36px] items-center justify-center px-4 py-2 text-center text-[10px] font-light uppercase tracking-[0.22em] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        {brandConfig.announcement.text}
      </Link>
    </div>
  );
}
