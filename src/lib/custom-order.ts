/* Custom-order form: parse + validate form data and build the WhatsApp
   message. Kept out of the component so each rule stays small and testable. */

const MAX_NOTES = 600;
const MAX_COLORS = 120;
const MAX_NAME = 80;
const MIN_SIZE = 18;
const MAX_SIZE = 26;
const MAX_QUANTITY = 500;

function field(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

function isBetween(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

function nameProblem(name: string): string | null {
  if (name.length < 2) return "Please enter your name.";
  if (name.length > MAX_NAME) return "That name is too long.";
  return null;
}

function sizeProblem(raw: string): string | null {
  if (!raw) return null;
  if (isBetween(Number(raw), MIN_SIZE, MAX_SIZE)) return null;
  return `Size should be between ${MIN_SIZE} and ${MAX_SIZE} inches.`;
}

function quantityProblem(raw: string): string | null {
  const quantity = Number(raw);
  if (Number.isInteger(quantity) && isBetween(quantity, 1, MAX_QUANTITY)) return null;
  return `Quantity should be a whole number from 1 to ${MAX_QUANTITY}.`;
}

function lengthProblem(label: string, value: string, max: number): string | null {
  if (value.length <= max) return null;
  return `${label} should be under ${max} characters.`;
}

export interface CustomOrderResult {
  problems: string[];
  message: string;
}

export function buildCustomOrder(data: FormData): CustomOrderResult {
  const name = field(data, "name");
  const type = field(data, "type");
  const size = field(data, "size");
  const quantity = field(data, "qty");
  const colors = field(data, "colors");
  const notes = field(data, "notes");

  const problems = [
    nameProblem(name),
    sizeProblem(size),
    quantityProblem(quantity),
    lengthProblem("Colours", colors, MAX_COLORS),
    lengthProblem("Design notes", notes, MAX_NOTES),
  ].filter((problem): problem is string => problem !== null);

  const message = [
    "Assalamu alaikum, I'd like a custom cap.",
    `Name: ${name}`,
    `Type: ${type}`,
    size ? `Size: ${size}` : null,
    `Quantity: ${quantity}`,
    colors ? `Colours: ${colors}` : null,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return { problems, message };
}

export { MAX_NOTES };
