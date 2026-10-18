/* Admin form parsing. Raw FormData → validated CapFields (Zod). */

import {
  CAP_CATEGORIES,
  capFieldsSchema,
  type CapFields,
} from "./cap-schema";

export { CAP_CATEGORIES };
export type { CapFields };

export type CapFieldsResult =
  | { ok: true; fields: CapFields }
  | { ok: false; problems: string[] };

function text(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

function splitList(raw: string): string[] {
  return [...new Set(raw.split(/[,;]/).map((item) => item.trim()).filter(Boolean))];
}

export function parseCapFields(data: FormData): CapFieldsResult {
  const sizeValues = splitList(text(data, "sizes")).map(Number);
  if (sizeValues.some((size) => Number.isNaN(size))) {
    return { ok: false, problems: ["Sizes must be numbers, e.g. 21.5, 22, 23."] };
  }

  const priceRaw = text(data, "price");
  const price = priceRaw ? Number(priceRaw) : null;
  if (price !== null && !Number.isFinite(price)) {
    return { ok: false, problems: ["Price must be a number."] };
  }

  const parsed = capFieldsSchema.safeParse({
    name: text(data, "name"),
    category: text(data, "category"),
    sizes: [...new Set(sizeValues)].sort((a, b) => a - b),
    colors: splitList(text(data, "colors")),
    tags: splitList(text(data, "tags")),
    price,
    description: text(data, "description") || null,
    available: data.get("available") === "on",
    featured: data.get("featured") === "on",
  });

  if (!parsed.success) {
    return {
      ok: false,
      problems: [...new Set(parsed.error.issues.map((issue) => issue.message))],
    };
  }

  return { ok: true, fields: parsed.data };
}
