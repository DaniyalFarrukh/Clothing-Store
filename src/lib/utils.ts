import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { brandConfig } from "@/config/brand";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPkr(amount: number): string {
  return `${brandConfig.brand.currency} ${amount.toLocaleString(brandConfig.brand.locale)}`;
}

export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjQiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=";
