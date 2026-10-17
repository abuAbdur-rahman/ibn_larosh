import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/* Lazy Neon connection: missing DATABASE_URL (CI builds) must not throw at
   import time — the catalog falls back to seed data in that case. */

let instance: NeonHttpDatabase<typeof schema> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (instance) return instance;

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  instance = drizzle(neon(url), { schema });
  return instance;
}
