import type { Cap } from "./types";

/* Phase-1 catalog seed — the 10 real caps already in R2 (bucket bn-laroosh),
   streamed through /api/media/<key>. Names, colours, and categories were
   derived from the actual photos; sizes are sensible defaults pending owner
   confirmation. Phase 2 replaces this with the Neon + Drizzle data layer.
   See docs/tasks/phase-1.md → "seed metadata". */

const media = (key: string) => `/api/media/${key}`;

const SEED_CAPS: Cap[] = [
  {
    id: "c1",
    name: "Royal Blue Geometric Tajia",
    category: "tajia",
    sizes: [21.5, 22, 23],
    colors: ["Blue", "Gold", "Silver"],
    tags: ["geometric"],
    images: [media("IMG-20260723-WA0007.jpg")],
    featured: true,
    available: true,
    createdAt: "2026-10-10T09:00:00Z",
    description:
      "A structured cap in deep blue with gold and silver geometric embroidery and a classic cylindrical shape.",
  },
  {
    id: "c2",
    name: "Blue Embroidered Tajia",
    category: "tajia",
    sizes: [22, 23],
    colors: ["Blue", "White", "Black"],
    tags: ["embroidered"],
    images: [media("IMG-20260723-WA0008.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-09T09:00:00Z",
    description:
      "Structured traditional cap with intricate blue and white embroidery on a black base.",
  },
  {
    id: "c3",
    name: "Black and Gold Geometric Tajia",
    category: "tajia",
    sizes: [22, 23],
    colors: ["Black", "White", "Gold"],
    tags: ["geometric"],
    images: [media("IMG-20260723-WA0009.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-08T09:00:00Z",
    description:
      "Black base with crisp white and gold geometric embroidery — a sharp choice for Fridays and Eid.",
  },
  {
    id: "c4",
    name: "Black, Green and Orange Tajia",
    category: "tajia",
    sizes: [21.5, 22, 23],
    colors: ["Black", "Green", "Orange"],
    tags: ["geometric"],
    images: [media("IMG-20260723-WA0010.jpg")],
    featured: true,
    available: true,
    createdAt: "2026-10-07T09:00:00Z",
    description:
      "Intricate geometric embroidery in green and orange on a black base.",
  },
  {
    id: "c5",
    name: "Blue and Gold Woven Tajia",
    category: "tajia",
    sizes: [21.5, 22, 23],
    colors: ["Blue", "Gold", "White"],
    tags: ["woven", "geometric"],
    images: [media("IMG-20260723-WA0011.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-06T09:00:00Z",
    description:
      "Structured traditional cap featuring intricate woven gold designs over blue.",
  },
  {
    id: "c6",
    name: "Blue and Gold Diamond Cap",
    category: "tajia",
    sizes: [22, 23, 24],
    colors: ["Blue", "Gold", "Black"],
    tags: ["diamond"],
    images: [media("IMG-20260723-WA0014.jpg")],
    featured: true,
    available: true,
    createdAt: "2026-10-05T09:00:00Z",
    description:
      "A detailed woven diamond pattern in gold on deep blue, finished with black trim.",
  },
  {
    id: "c7",
    name: "White Floral Tajia",
    category: "fancy",
    sizes: [21.5, 22, 23],
    colors: ["White", "Blue", "Red"],
    tags: ["floral"],
    images: [media("IMG-20260723-WA0015.jpg")],
    featured: true,
    available: true,
    createdAt: "2026-10-04T09:00:00Z",
    description:
      "A vibrant red and blue floral pattern on a clean white base — bold for celebrations.",
  },
  {
    id: "c8",
    name: "Brown Diamond Weave Tajia",
    category: "tajia",
    sizes: [22, 23],
    colors: ["Brown", "Gold", "White"],
    tags: ["diamond"],
    images: [media("IMG-20260723-WA0016.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-03T09:00:00Z",
    description:
      "Warm brown base with a distinctive white and gold diamond design.",
  },
  {
    id: "c9",
    name: "Purple Chevron Cap",
    category: "fancy",
    sizes: [21.5, 22, 23],
    colors: ["Purple", "Brown", "Beige"],
    tags: ["chevron"],
    images: [media("IMG-20260723-WA0017.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-02T09:00:00Z",
    description:
      "A distinctive chevron weave blending purple, brown, and beige.",
  },
  {
    id: "c10",
    name: "Olive and Black Geometric Cap",
    category: "tajia",
    sizes: [22, 23, 24],
    colors: ["Olive", "Black", "White"],
    tags: ["geometric"],
    images: [media("IMG-20260723-WA0018.jpg")],
    featured: false,
    available: true,
    createdAt: "2026-10-01T09:00:00Z",
    description:
      "Olive base with a classic black and white geometric weave.",
  },
];

export const getSeedCaps = (): Cap[] => SEED_CAPS;

export const getSeedCap = (id: string): Cap | undefined =>
  SEED_CAPS.find((c) => c.id === id);
