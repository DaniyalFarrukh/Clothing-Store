import type { GarmentKind } from "@/components/ui/product-rail-gallery";

export type CategoryId = "new-in" | "women" | "men" | "accessories";
export type ClothingSize = "XS" | "S" | "M" | "L" | "XL" | "ONE SIZE";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  pricePkr: number;
  compareAtPkr?: number;
  isNewIn?: boolean;
  isBestSeller?: boolean;
  garmentKind: GarmentKind;
  colors: ProductColor[];
  stockBySize: Partial<Record<ClothingSize, number>>;
  images: string[];
  description: string;
  composition: string;
  care: string;
}

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  image: string;
}

export const brandConfig = {
  brand: {
    name: "ZAYN STUDIO",
    tagline: "Editorial Ready-to-Wear · Pakistan",
    city: "Karachi · Lahore",
    currency: "PKR",
    locale: "en-PK",
    domain: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    email: "atelier@zaynstudio.pk",
    phone: "+92 21 3583 2210",
  },
  theme: {
    background: "#ffffff",
    foreground: "#000000",
    muted: "#f5f5f5",
    mutedForeground: "#525252",
    border: "#000000",
    borderLight: "#e5e5e5",
  },
  announcement: {
    text: "FREE SHIPPING OVER PKR 6,000 · CASH ON DELIVERY NATIONWIDE · 14-DAY RETURNS",
    href: "/shop",
  },
  shipping: {
    feePkr: 250,
    freeThresholdPkr: 6000,
    deliveryEstimate: "2–4 working days across Pakistan",
  },
  hero: {
    eyebrow: "AUTUMN / WINTER COLLECTION · EDITION 04",
    heading: "Tailored Restraint.",
    caption: "Brush along the rail, slide a piece, or lift to inspect silhouette and fabric.",
    ctaLabel: "SHOP NEW IN",
    ctaHref: "/shop?category=new-in",
  },
  lookbook: {
    eyebrow: "LOOKBOOK 04 · MONOCHROME ARCHIVE",
    heading: "Structured Wool & Raw Cotton",
    ctaLabel: "EXPLORE COLLECTION",
    ctaHref: "/shop",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Editorial monochrome fashion lookbook",
  },
  trustStrip: [
    { label: "NATIONWIDE COD", detail: "Pay cash or card on delivery" },
    { label: "14-DAY RETURNS", detail: "Complimentary courier pickup" },
    { label: "2–4 DAY DISPATCH", detail: "Karachi, Lahore & Islamabad" },
    { label: "SECURE CHECKOUT", detail: "Verified & encrypted orders" },
  ],
  newsletter: {
    eyebrow: "PRIVATE ACCESS",
    heading: "Receive seasonal lookbooks and early capsule releases.",
  },
  categories: [
    {
      id: "new-in",
      label: "New In",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "women",
      label: "Women",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "men",
      label: "Men",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "accessories",
      label: "Accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    },
  ] satisfies CategoryMeta[],
  products: [
    // NEW IN (4)
    {
      id: "p01",
      slug: "double-breasted-wool-trench",
      name: "Double-Breasted Wool Trench",
      category: "new-in",
      pricePkr: 18900,
      compareAtPkr: 22500,
      isNewIn: true,
      isBestSeller: true,
      garmentKind: "coat",
      colors: [
        { name: "Obsidian", hex: "#111111" },
        { name: "Bone", hex: "#EAE6DF" },
      ],
      stockBySize: { XS: 4, S: 8, M: 10, L: 6, XL: 3 },
      images: [
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Longline tailored trench cut in brushed virgin wool blend with storm lapel and concealed horn buttons.",
      composition: "78% Virgin Wool, 22% Polyamide · Lining: 100% Viscose",
      care: "Dry clean only. Do not tumble dry.",
    },
    {
      id: "p02",
      slug: "heavyweight-boxy-tee",
      name: "Heavyweight Boxy Tee",
      category: "new-in",
      pricePkr: 3450,
      isNewIn: true,
      isBestSeller: true,
      garmentKind: "tee",
      colors: [
        { name: "Chalk", hex: "#F4F2EE" },
        { name: "Carbon", hex: "#141414" },
      ],
      stockBySize: { XS: 12, S: 15, M: 20, L: 14, XL: 8 },
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      ],
      description: "280 gsm combed Faisalabad organic cotton jersey with dropped shoulders and high-ribbed collar.",
      composition: "100% Organic Cotton (280 gsm)",
      care: "Machine wash cold at 30°C inside out.",
    },
    {
      id: "p03",
      slug: "merino-ribbed-mockneck",
      name: "Merino Ribbed Mockneck",
      category: "new-in",
      pricePkr: 7900,
      isNewIn: true,
      garmentKind: "knit",
      colors: [
        { name: "Charcoal", hex: "#2A2A2A" },
        { name: "Oat", hex: "#DDD6CC" },
      ],
      stockBySize: { S: 6, M: 9, L: 7, XL: 4 },
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Fine-gauge architectural rib knit designed for effortless layering under tailored outerwear.",
      composition: "85% Extra-Fine Merino Wool, 15% Cashmere",
      care: "Hand wash cold, dry flat.",
    },
    {
      id: "p04",
      slug: "cropped-structured-blazer",
      name: "Cropped Structured Blazer",
      category: "new-in",
      pricePkr: 14500,
      compareAtPkr: 16900,
      isNewIn: true,
      garmentKind: "jacket",
      colors: [{ name: "Ink", hex: "#0E0E0E" }],
      stockBySize: { XS: 3, S: 7, M: 8, L: 5 },
      images: [
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Sharp shoulder-padded cropped blazer with satin-piped interior seams and welt pockets.",
      composition: "65% Polyester, 32% Viscose, 3% Elastane",
      care: "Dry clean only.",
    },
    // WOMEN (4)
    {
      id: "p05",
      slug: "poplin-architectural-shirt",
      name: "Poplin Architectural Shirt",
      category: "women",
      pricePkr: 6450,
      isBestSeller: true,
      garmentKind: "shirt",
      colors: [
        { name: "Optical White", hex: "#FFFFFF" },
        { name: "Slate", hex: "#71767C" },
      ],
      stockBySize: { XS: 5, S: 11, M: 10, L: 6 },
      images: [
        "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Crisp high-density cotton poplin shirt with elongated cuffs and concealed front placket.",
      composition: "100% Supima Cotton Poplin",
      care: "Machine wash cold, warm iron.",
    },
    {
      id: "p06",
      slug: "pleated-wide-trouser",
      name: "Pleated Wide-Leg Trouser",
      category: "women",
      pricePkr: 8200,
      garmentKind: "coat",
      colors: [
        { name: "Black", hex: "#0A0A0A" },
        { name: "Taupe", hex: "#A89F91" },
      ],
      stockBySize: { XS: 6, S: 9, M: 12, L: 8 },
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      ],
      description: "High-waisted double-pleated trouser with full drape and elongated hem.",
      composition: "70% Viscose, 30% Linen",
      care: "Dry clean recommended.",
    },
    {
      id: "p07",
      slug: "cashmere-blend-cardigan",
      name: "Cashmere Blend Cardigan",
      category: "women",
      pricePkr: 9800,
      compareAtPkr: 11500,
      garmentKind: "knit",
      colors: [{ name: "Ecru", hex: "#EDE8DF" }],
      stockBySize: { XS: 4, S: 7, M: 7, L: 4 },
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Relaxed V-neck cardigan finished with tonal mother-of-pearl buttons.",
      composition: "90% Merino Wool, 10% Cashmere",
      care: "Hand wash cold.",
    },
    {
      id: "p08",
      slug: "monochrome-slip-dress",
      name: "Bias-Cut Satin Slip Dress",
      category: "women",
      pricePkr: 11200,
      garmentKind: "coat",
      colors: [{ name: "Noir", hex: "#000000" }],
      stockBySize: { XS: 5, S: 8, M: 6, L: 3 },
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Fluid bias-cut midi dress with rouleau straps and matte-lustre cupro finish.",
      composition: "100% Cupro",
      care: "Dry clean only.",
    },
    // MEN (4)
    {
      id: "p09",
      slug: "washed-fleece-hoodie",
      name: "Washed Heavy Fleece Hoodie",
      category: "men",
      pricePkr: 6950,
      isBestSeller: true,
      garmentKind: "hoodie",
      colors: [
        { name: "Ash", hex: "#A3A5A8" },
        { name: "Pitch", hex: "#141414" },
      ],
      stockBySize: { S: 9, M: 14, L: 12, XL: 7 },
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80",
      ],
      description: "460 gsm garment-dyed loopback fleece hoodie with double-layered hood and zero external branding.",
      composition: "100% Cotton Fleece (460 gsm)",
      care: "Machine wash cold.",
    },
    {
      id: "p10",
      slug: "relaxed-oxford-overshirt",
      name: "Relaxed Oxford Overshirt",
      category: "men",
      pricePkr: 7450,
      garmentKind: "shirt",
      colors: [
        { name: "Chalk", hex: "#F2EFE9" },
        { name: "Olive", hex: "#4D5340" },
      ],
      stockBySize: { S: 7, M: 11, L: 9, XL: 5 },
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Box-cut heavyweight oxford overshirt with twin chest patch pockets.",
      composition: "100% Brushed Cotton Twill",
      care: "Machine wash at 30°C.",
    },
    {
      id: "p11",
      slug: "technical-field-jacket",
      name: "Minimalist Field Jacket",
      category: "men",
      pricePkr: 15800,
      compareAtPkr: 18500,
      garmentKind: "jacket",
      colors: [{ name: "Graphite", hex: "#222426" }],
      stockBySize: { S: 4, M: 8, L: 7, XL: 4 },
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Water-repellent matte nylon field jacket with concealed two-way zip.",
      composition: "100% Recycled Polyamide",
      care: "Wipe clean or gentle cold wash.",
    },
    {
      id: "p12",
      slug: "pleated-wool-trouser-men",
      name: "Tailored Wool Trouser",
      category: "men",
      pricePkr: 9400,
      garmentKind: "coat",
      colors: [{ name: "Black", hex: "#000000" }],
      stockBySize: { S: 5, M: 10, L: 8, XL: 4 },
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Straight-cut tailored trouser in crease-resistant tropical wool.",
      composition: "100% Virgin Tropical Wool",
      care: "Dry clean only.",
    },
    // ACCESSORIES (4)
    {
      id: "p13",
      slug: "structured-leather-tote",
      name: "Structured Leather Tote",
      category: "accessories",
      pricePkr: 16500,
      isBestSeller: true,
      garmentKind: "jacket",
      colors: [{ name: "Black", hex: "#0A0A0A" }],
      stockBySize: { "ONE SIZE": 10 },
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Full-grain Sialkot calfskin architectural tote with interior laptop sleeve.",
      composition: "100% Full-Grain Calfskin Leather",
      care: "Condition with neutral leather balm.",
    },
    {
      id: "p14",
      slug: "acetate-editorial-sunglasses",
      name: "Acetate Frame Sunglasses",
      category: "accessories",
      pricePkr: 5900,
      garmentKind: "tee",
      colors: [{ name: "Tortoise / Black", hex: "#1C1A17" }],
      stockBySize: { "ONE SIZE": 14 },
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Hand-finished Mazzucchelli acetate frames with UV400 tinted nylon lenses.",
      composition: "100% Cellulose Acetate",
      care: "Store in provided rigid case.",
    },
    {
      id: "p15",
      slug: "brushed-wool-scarf",
      name: "Oversized Brushed Wool Scarf",
      category: "accessories",
      pricePkr: 4800,
      compareAtPkr: 5600,
      garmentKind: "knit",
      colors: [
        { name: "Oatmeal", hex: "#E3DDD3" },
        { name: "Black", hex: "#111111" },
      ],
      stockBySize: { "ONE SIZE": 16 },
      images: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80",
      ],
      description: "Generously proportioned brushed wool scarf with raw fringe edges.",
      composition: "100% Lambswool",
      care: "Dry clean only.",
    },
    {
      id: "p16",
      slug: "minimal-buckle-leather-belt",
      name: "Brushed Buckle Leather Belt",
      category: "accessories",
      pricePkr: 3900,
      garmentKind: "shirt",
      colors: [{ name: "Black", hex: "#000000" }],
      stockBySize: { S: 8, M: 10, L: 8 },
      images: [
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      ],
      description: "30mm vegetable-tanned leather belt with solid matte steel pin buckle.",
      composition: "100% Vegetable-Tanned Leather",
      care: "Wipe with dry cloth.",
    },
  ] satisfies Product[],
  socials: [
    { label: "INSTAGRAM", href: "https://instagram.com" },
    { label: "TIKTOK", href: "https://tiktok.com" },
    { label: "WHATSAPP", href: "https://wa.me/923008424410" },
  ],
} as const;

export function getProductBySlug(slug: string): Product | undefined {
  return brandConfig.products.find((p) => p.slug === slug);
}

export function getAvailableSizes(product: Product): ClothingSize[] {
  return (Object.keys(product.stockBySize) as ClothingSize[]).filter(
    (s) => (product.stockBySize[s] ?? 0) > 0,
  );
}
