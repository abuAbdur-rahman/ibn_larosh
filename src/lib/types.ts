/* Shared shape for every cap across seed → DB → R2.
   Public components always receive image URLs, never storage keys;
   the Phase-2 data layer maps R2 keys → URLs before rendering. */

export type CategoryKey = "tajia" | "kaftan" | "fancy" | "custom";

export interface Cap {
  id: string;
  name: string;
  category: CategoryKey;
  sizes: number[];
  colors: string[];
  tags: string[];
  /** Public image URLs, first = card/hero, ordered. */
  images: string[];
  price?: number; // NGN; undefined → "Ask on WhatsApp"
  description?: string;
  available: boolean;
  featured: boolean;
  createdAt: string; // ISO timestamp
}
