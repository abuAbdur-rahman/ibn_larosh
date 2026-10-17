import { boolean, index, jsonb, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/* Single table by design: catalog only. Ordering is WhatsApp-only, so there
   are no carts, orders, or audit tables (PLAN.md §4). */

export const CATEGORY_VALUES = ["tajia", "kaftan", "fancy", "custom"] as const;

export const caps = pgTable(
  "caps",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category", { enum: CATEGORY_VALUES }).notNull(),
    sizes: jsonb("sizes").$type<number[]>().notNull().default([]),
    colors: jsonb("colors").$type<string[]>().notNull().default([]),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    /** R2 object keys (not URLs); the data layer maps them to /api/media/<key>. */
    images: jsonb("images").$type<string[]>().notNull().default([]),
    /** NGN; null → "Price on request". */
    price: numeric("price", { precision: 10, scale: 2 }),
    description: text("description"),
    available: boolean("available").notNull().default(true),
    featured: boolean("featured").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("caps_created_at_idx").on(table.createdAt)]
);
