import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Size Guide",
  description: `Garment measurement guide for ${brandConfig.brand.name}.`,
};

const ROWS = [
  { size: "XS", chest: "34–36 in", waist: "26–28 in", hip: "35–37 in" },
  { size: "S", chest: "36–38 in", waist: "28–30 in", hip: "37–39 in" },
  { size: "M", chest: "38–40 in", waist: "31–33 in", hip: "39–41 in" },
  { size: "L", chest: "41–43 in", waist: "34–36 in", hip: "42–44 in" },
  { size: "XL", chest: "44–46 in", waist: "37–39 in", hip: "45–47 in" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-8">
      <p className="text-[10px] font-light uppercase tracking-[0.24em] text-[var(--muted-fg)]">
        {brandConfig.brand.name} · FIT & MEASUREMENTS
      </p>
      <h1 className="mt-2 font-display text-4xl font-normal tracking-tight">Size Guide</h1>
      <div className="mt-8 overflow-x-auto border border-black">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-black bg-[var(--muted)] text-[10px] font-medium uppercase tracking-[0.2em]">
            <tr>
              <th className="px-4 py-3">SIZE</th>
              <th className="px-4 py-3">CHEST</th>
              <th className="px-4 py-3">WAIST</th>
              <th className="px-4 py-3">HIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/15 font-mono">
            {ROWS.map((r) => (
              <tr key={r.size}>
                <td className="px-4 py-3 font-sans font-medium">{r.size}</td>
                <td className="px-4 py-3">{r.chest}</td>
                <td className="px-4 py-3">{r.waist}</td>
                <td className="px-4 py-3">{r.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
