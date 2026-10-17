import { cache } from "react";
import { desc } from "drizzle-orm";
import { getDb } from "./db";
import { caps as capsTable } from "./db/schema";
import { getSeedCaps } from "./seed";
import type { Cap, CategoryKey } from "./types";

/* Catalog reads. Neon rows are mapped to the public `Cap` shape here — the
   rest of the app never sees storage keys or numeric price strings.

   Caching: pages declare `revalidate = 300`; admin mutations (Phase 3) call
   revalidatePath('/', 'layout'). `cache()` dedupes reads within one request. */

const mediaUrl = (key: string) => `/api/media/${key}`;

type CapRow = typeof capsTable.$inferSelect;

function toCap(row: CapRow): Cap {
  return {
    id: row.id,
    name: row.name,
    category: row.category as CategoryKey,
    sizes: row.sizes,
    colors: row.colors,
    tags: row.tags,
    images: row.images.map(mediaUrl),
    price: row.price === null ? undefined : Number(row.price),
    description: row.description ?? undefined,
    available: row.available,
    featured: row.featured,
    createdAt: row.createdAt.toISOString(),
  };
}

function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

async function readCaps(): Promise<Cap[]> {
  // No database configured (e.g. CI build): keep the site buildable.
  if (!hasDatabase()) return getSeedCaps();

  try {
    const rows = await getDb()
      .select()
      .from(capsTable)
      .orderBy(desc(capsTable.createdAt));

    // An empty table (before the seed run) still renders a full catalog.
    return rows.length > 0 ? rows.map(toCap) : getSeedCaps();
  } catch (error) {
    console.error("Catalog DB read failed; serving seed data.", error);
    return getSeedCaps();
  }
}

export const getCaps = cache(readCaps);

export const getCapById = cache(async (id: string): Promise<Cap | undefined> => {
  const caps = await getCaps();
  return caps.find((cap) => cap.id === id);
});
