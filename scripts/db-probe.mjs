// DB connectivity probe. Loads .env values in-process; never prints secrets.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const line = readFileSync(".env", "utf8")
  .split("\n")
  .find((l) => l.startsWith("DATABASE_URL="));

let url = line ? line.replace("DATABASE_URL=", "").trim() : "";
url = url.replace(/^["']|["']$/g, "");

if (!url) {
  console.log("DB FAIL: DATABASE_URL empty in .env");
  process.exit(1);
}

try {
  const sql = neon(url);
  const rows = await sql`select 99 + 1 as x`;
  console.log("DB OK: query returned", rows[0]?.x);
} catch (e) {
  console.log("DB FAIL:", e instanceof Error ? e.message.slice(0, 300) : String(e));
  process.exit(1);
}
