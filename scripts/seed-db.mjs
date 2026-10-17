/* Upsert the Phase-1 catalog into Neon. Idempotent: safe to re-run.
   Loads .env in-process; never prints secrets. */
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { getSeedCaps } from "../src/lib/seed.ts";

function envValue(name) {
  const line = readFileSync(".env", "utf8")
    .split("\n")
    .find((entry) => entry.startsWith(`${name}=`));
  if (!line) return "";
  return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "");
}

const url = envValue("DATABASE_URL");
if (!url) {
  console.log("SEED FAIL: DATABASE_URL empty in .env");
  process.exit(1);
}

const sql = neon(url);
const caps = getSeedCaps();

try {
  for (const cap of caps) {
    const keys = cap.images.map((image) => image.replace(/^\/api\/media\//, ""));

    await sql`
      insert into caps (
        id, name, category, sizes, colors, tags, images,
        price, description, available, featured, created_at
      ) values (
        ${cap.id}, ${cap.name}, ${cap.category},
        ${JSON.stringify(cap.sizes)}::jsonb,
        ${JSON.stringify(cap.colors)}::jsonb,
        ${JSON.stringify(cap.tags)}::jsonb,
        ${JSON.stringify(keys)}::jsonb,
        ${cap.price ?? null}, ${cap.description ?? null},
        ${cap.available}, ${cap.featured}, ${cap.createdAt}
      )
      on conflict (id) do update set
        name = excluded.name,
        category = excluded.category,
        sizes = excluded.sizes,
        colors = excluded.colors,
        tags = excluded.tags,
        images = excluded.images,
        price = excluded.price,
        description = excluded.description,
        available = excluded.available,
        featured = excluded.featured
    `;
  }

  const [{ count }] = await sql`select count(*)::int as count from caps`;
  console.log(`SEED OK: ${caps.length} caps upserted (table now has ${count})`);
} catch (error) {
  console.log("SEED FAIL:", error instanceof Error ? error.message.slice(0, 300) : String(error));
  process.exit(1);
}
