import { defineConfig } from "drizzle-kit";
import { readFileSync } from "node:fs";

// Load .env manually (no dotenv dep needed); Next.js loads it elsewhere.
try {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)="?([^"]*)"?$/);
    if (m && !process.env[m[1] as string]) process.env[m[1] as string] = m[2] as string;
  }
} catch {
  // fall through — the explicit check below reports it properly
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing — copy .env.example to .env and fill it in.");
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
