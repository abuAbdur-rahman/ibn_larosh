/* Public site constants. NOT secrets — safe to import from client components.
   Server-only values (admin creds, DB, R2) stay in process.env. */
import type { CategoryKey } from "./types";

export const SITE = {
  name: "IBN Larosh Enterprises",
  wordmark: "IBN LAROSH",
  smallWordmark: "ENTERPRISES",
  tagline: "Values You Trust, Quality You Deserve",
  bnNo: "9882187",
  address: "Beside Tipper Garage, Okolowo Area, Ilorin, Kwara State",
  city: "Ilorin",
  region: "Kwara State",
  phoneDisplay: "08109080076",
  phoneIntl: "2348109080076", // wa.me expects 2348…
  otherLocations: ["Bama", "Maiduguri", "Bangwal"], // stock, not delivery
} as const;

export type { CategoryKey };

export const CATEGORIES: Record<
  CategoryKey,
  { label: string; desc: string; icon: string }
> = {
  tajia: { label: "Tajia", icon: "crown", desc: "Classic Hausa caps" },
  kaftan: { label: "Kaftan caps", icon: "shirt", desc: "Match your kaftan" },
  fancy: { label: "Fancy", icon: "sparkles", desc: "Bold woven designs" },
  custom: { label: "Custom weave", icon: "scissors", desc: "Any design you like" },
};

/* Size guide: 21 → 24 in .5 steps; cm = inches × 2.54 */
export const SIZE_TABLE = [21, 21.5, 22, 22.5, 23, 23.5, 24].map((inches) => ({
  inches,
  cm: (inches * 2.54).toFixed(1),
}));
