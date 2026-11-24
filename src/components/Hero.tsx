"use client";

import Link from "next/link";
import ClothingRailHero, { type RailGarment } from "@/components/ui/product-rail-gallery";
import { brandConfig } from "@/config/brand";

const HERO_PIECES: RailGarment[] = [
  {
    id: "ivory-raw-silk-kurta",
    name: "Ivory Raw Silk Kurta",
    kind: "shirt",
    color: "#EFEBE2",
    description: "Hand-loomed ivory raw silk kurta with subtle tonal neckline embroidery.",
    details: ["100% Raw Silk", "Tonal embroidery", "Desi Edit"],
    image: "/rail/kurta-ivory.png",
    sideImage: "/rail/kurta-ivory-side.png",
  },
  {
    id: "heavyweight-boxy-tee",
    name: "Heavyweight Boxy Tee",
    kind: "tee",
    color: "#EFEBE2",
    description: "280 gsm combed Faisalabad organic cotton jersey with dropped shoulders.",
    details: ["100% Organic Cotton", "Chalk"],
    image: "https://cdn.21st.dev/assets/mirror/14/1485bf44725b18fcdba71bfae54d67d648ab3bff4b24215a042c0cc4c895a2e6.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/69/69937e656430ae33d950303e0d53051273e5b02189750ef1e7429ec4bbf95e20.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/83/838468c32f16b4acba62e4601276737411156052444712ff2534fefe994a7bed.webp",
  },
  {
    id: "black-jamawar-sherwani",
    name: "Black Jamawar Sherwani",
    kind: "coat",
    color: "#111111",
    description: "Structured Pakistani jamawar sherwani coat with mandarin collar and tonal buttons.",
    details: ["Jamawar Silk", "Tailored fit", "Desi Edit"],
    image: "/rail/sherwani-black.png",
    sideImage: "/rail/sherwani-black-side.png",
  },
  {
    id: "poplin-architectural-shirt",
    name: "Poplin Architectural Shirt",
    kind: "shirt",
    color: "#A3D3EB",
    description: "Crisp high-density cotton poplin shirt with elongated cuffs.",
    details: ["100% Supima Cotton", "Slate"],
    image: "https://cdn.21st.dev/assets/mirror/47/470a7723cef068f81e8a4c09d1ab3f8630c61b734c2168b10f3858e45efbf31f.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/9b/9be14e5dce879756775677e2d82dadc2ad9a1690b7df2f82de360cb3600d0ee5.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/59/5984d5ca60fd1aeee7e688ec33c2219a1c537fcde90d2accab813c13985f8632.webp",
  },
  {
    id: "emerald-velvet-kurta",
    name: "Emerald Velvet Kurta",
    kind: "coat",
    color: "#185B37",
    description: "Deep emerald micro-velvet kurta with delicate antique gold zardozi detailing.",
    details: ["Silk Velvet", "Hand-finished", "Desi Edit"],
    image: "/rail/kurta-emerald.png",
    sideImage: "/rail/kurta-emerald-side.png",
  },
  {
    id: "cashmere-blend-cardigan",
    name: "Cashmere Blend Cardigan",
    kind: "knit",
    color: "#758151",
    description: "Relaxed V-neck cardigan finished with tonal mother-of-pearl buttons.",
    details: ["90% Merino, 10% Cashmere", "Olive"],
    image: "https://cdn.21st.dev/assets/mirror/58/581b13c5ca241c653dc94d2c8048c92a60f022cfbaaf153261076d3a6655827e.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/d9/d9178d906d37268565cf10af3431aee543aacfc73610f7fa7b0fa4758c498cb3.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/de/dee1c529600e0460413f1a9b07a29bedb7ea7dc96181fce5d9d6501231e6e45d.webp",
  },
  {
    id: "washed-fleece-hoodie",
    name: "Washed Heavy Fleece Hoodie",
    kind: "hoodie",
    color: "#A0A5AB",
    description: "460 gsm garment-dyed loopback fleece hoodie with double-layered hood.",
    details: ["100% Cotton Fleece", "Ash"],
    image: "https://cdn.21st.dev/assets/mirror/51/51750ba098dd622df46695bca781b3f0ec336a36b93b070e638cc04455def6d6.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/e7/e75c4ac8fb7f14caae756338a31f81f1437bb312b78e0d7d906e9f956e7968fa.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/a2/a2eb2463d52146c341ede6bb9f6067e917a23eb29b7b1d1d4c40ac084a01c7ce.webp",
  },
  {
    id: "merino-ribbed-mockneck",
    name: "Merino Ribbed Mockneck",
    kind: "knit",
    color: "#CCB2E0",
    description: "Fine-gauge architectural rib knit designed for effortless layering.",
    details: ["85% Merino, 15% Cashmere", "Lilac"],
    image: "https://cdn.21st.dev/assets/mirror/8e/8e38660e2add9637c27846d9b8d620f2abb228a5a153ccfd7b1c808b6845e1f8.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/b9/b9214a6e009ce4b3044595a51ea010c299135bab5b26775c43d7175c86e77898.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/59/591872e42b483c43c1cd08a3ac4d7d40c0b5fa2bc585a36096faded2e696e84e.webp",
  },
  {
    id: "relaxed-oxford-overshirt",
    name: "Relaxed Oxford Overshirt",
    kind: "tee",
    color: "#185B37",
    description: "Box-cut heavyweight piqué polo with tonal collar.",
    details: ["100% Cotton Piqué", "Forest"],
    image: "https://cdn.21st.dev/assets/mirror/19/19fe43cb681195ae227e3164088d86a07a1b6e33cc54c6e35637374736a16894.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/e0/e095182b1a7f04e600c5662aa871b4c055c294b152586817d84e312c22f744cf.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/00/005a8e10be234bc40917f3153208b8196ba1610c53c987e39942da1f4a7cd808.webp",
  },
  {
    id: "henley-long-sleeve",
    name: "Slub Cotton Henley",
    kind: "knit",
    color: "#B05139",
    description: "Breathable slub cotton henley with three-button placket.",
    details: ["100% Slub Cotton", "Brick"],
    image: "https://cdn.21st.dev/assets/mirror/84/84aa4b0e21ed11fcbc083647a607b94ee3a6c21cb66c114cfb1dad0792c15499.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/01/01c299df56a29afca8dad4a64858bd506667338bfbd0435118e6c3698c7881b3.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/9c/9ca38eeb156aae7d199d3c1ffb7947e395f77d1f094eea006c1b5fbb22352b4e.webp",
  },
  {
    id: "breton-long-sleeve",
    name: "Breton Striped Knit",
    kind: "knit",
    color: "#E4DFD3",
    description: "Classic ink-and-bone Breton stripe with boat neck.",
    details: ["220 gsm Cotton", "Bone"],
    image: "https://cdn.21st.dev/assets/mirror/09/096002a95aba7de9c197de4cb5c78cbbe17c1677b19c547cc20c6dbef47a899c.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/74/74408a7dbb4f4fc6761ebb8d6ed93187248cddf75e1c2e70d38d04dfdd328776.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/ed/eda3afca537071a80d7d82b3f0d1055b56f1f3263c20772224bae6660bf4072c.webp",
  },
  {
    id: "oversized-ochre-tee",
    name: "Oversized Studio Tee",
    kind: "tee",
    color: "#DE9C31",
    description: "Boxy dropped-shoulder tee in garment-washed ochre.",
    details: ["240 gsm Cotton", "Ochre"],
    image: "https://cdn.21st.dev/assets/mirror/72/7208c811f54e123dd7b1a5c1c3926f43ca832f6c4c20c45de10671ffd544409d.webp",
    backImage: "https://cdn.21st.dev/assets/mirror/d3/d356989b7bc741c5cfc934cac34983dfb24d5d6a6b6e7b8b7f6b27cd3eceae69.webp",
    sideImage: "https://cdn.21st.dev/assets/mirror/bf/bf94beeafb21f9cb21aa45057a67dc8a2e23ba95c7ac0f79dd27ba3ce4a1230c.webp",
  },
];

export function Hero() {
  return (
    <div
      className="border-b border-black pt-14"
      style={{
        background:
          "linear-gradient(105deg, #E5DED4 0%, #E5DED4 46%, #B0A293 62%, #978879 100%)",
      }}
    >
      <ClothingRailHero
        items={HERO_PIECES}
        hanger="none"
        autoplay
        interval={3200}
        className="!bg-transparent"
        eyebrow={brandConfig.hero.eyebrow}
        heading={brandConfig.hero.heading}
        caption={brandConfig.hero.caption}
        labels={{
          front: "FRONT",
          back: "BACK",
          close: "CLOSE",
          show: "VIEW PIECE",
        }}
        action={
          <Link
            href={brandConfig.hero.ctaHref}
            className="inline-flex min-h-[44px] items-center justify-center border border-black bg-black px-8 py-3 text-[11px] font-light uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {brandConfig.hero.ctaLabel}
          </Link>
        }
      />
    </div>
  );
}
