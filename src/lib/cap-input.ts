/* Admin form parsing/validation. Kept pure (types only) so the rules are
   readable and testable without a request. */

export const CAP_CATEGORIES = ["tajia", "kaftan", "fancy", "custom"] as const;
export type CapCategory = (typeof CAP_CATEGORIES)[number];

const MIN_SIZE = 18;
const MAX_SIZE = 26;
const MAX_PRICE = 10_000_000;
const MAX_NAME = 80;
const MAX_DESCRIPTION = 600;

export interface CapFields {
  name: string;
  category: CapCategory;
  sizes: number[];
  colors: string[];
  tags: string[];
  price: number | null;
  description: string | null;
  available: boolean;
  featured: boolean;
}

export type CapFieldsResult =
  | { ok: true; fields: CapFields }
  | { ok: false; problems: string[] };

function text(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

function splitList(raw: string): string[] {
  return [...new Set(raw.split(/[,;]/).map((item) => item.trim()).filter(Boolean))];
}

function parseSizes(raw: string): { sizes: number[]; problem: string | null } {
  const values = splitList(raw).map(Number);
  if (values.length === 0) {
    return { sizes: [], problem: "Add at least one size (e.g. 21.5, 22, 23)." };
  }

  const invalid = values.some(
    (size) =>
      !Number.isFinite(size) ||
      size < MIN_SIZE ||
      size > MAX_SIZE ||
      !Number.isInteger(size * 2)
  );
  if (invalid) {
    return {
      sizes: [],
      problem: `Sizes must be ${MIN_SIZE}–${MAX_SIZE} inches in half-inch steps.`,
    };
  }

  return { sizes: [...new Set(values)].sort((a, b) => a - b), problem: null };
}

function parsePrice(raw: string): { price: number | null; problem: string | null } {
  if (!raw) return { price: null, problem: null };
  const price = Number(raw);
  if (!Number.isFinite(price) || price < 0 || price > MAX_PRICE) {
    return { price: null, problem: "Price must be between 0 and 10,000,000." };
  }
  return { price, problem: null };
}

export function parseCapFields(data: FormData): CapFieldsResult {
  const name = text(data, "name");
  const category = text(data, "category");
  const sizeResult = parseSizes(text(data, "sizes"));
  const priceResult = parsePrice(text(data, "price"));
  const description = text(data, "description");

  const problems = [
    name.length < 2 ? "Enter a cap name." : null,
    name.length > MAX_NAME ? `Name must be under ${MAX_NAME} characters.` : null,
    (CAP_CATEGORIES as readonly string[]).includes(category)
      ? null
      : "Choose a valid cap type.",
    sizeResult.problem,
    priceResult.problem,
    description.length > MAX_DESCRIPTION
      ? `Description must be under ${MAX_DESCRIPTION} characters.`
      : null,
  ].filter((problem): problem is string => problem !== null);

  if (problems.length > 0) return { ok: false, problems };

  return {
    ok: true,
    fields: {
      name,
      category: category as CapCategory,
      sizes: sizeResult.sizes,
      colors: splitList(text(data, "colors")),
      tags: splitList(text(data, "tags")),
      price: priceResult.price,
      description: description || null,
      available: data.get("available") === "on",
      featured: data.get("featured") === "on",
    },
  };
}
