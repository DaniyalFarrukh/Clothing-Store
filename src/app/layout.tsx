import type { Metadata } from "next";
import { Bodoni_Moda, Jost, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { brandConfig } from "@/config/brand";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.brand.domain),
  title: {
    default: `${brandConfig.brand.name} · ${brandConfig.brand.tagline}`,
    template: `%s | ${brandConfig.brand.name}`,
  },
  description: brandConfig.lookbook.heading,
  openGraph: {
    type: "website",
    locale: "en_PK",
    title: `${brandConfig.brand.name} — ${brandConfig.brand.tagline}`,
    description: brandConfig.lookbook.heading,
    images: [
      {
        url: brandConfig.lookbook.image,
        width: 1600,
        height: 900,
        alt: brandConfig.brand.name,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.brand.name,
    url: brandConfig.brand.domain,
    email: brandConfig.brand.email,
    telephone: brandConfig.brand.phone,
    sameAs: brandConfig.socials.map((s) => s.href),
  };

  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-black">
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <MotionConfig reducedMotion="user">
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBottomNav />
        </MotionConfig>
      </body>
    </html>
  );
}
