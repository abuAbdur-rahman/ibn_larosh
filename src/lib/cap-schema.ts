import { z } from "zod";

/* Single source of truth for admin cap input. Shared by the server action
   and the form UI (categories), and unit-testable without a request. */

export const CAP_CATEGORIES = ["tajia", "kaftan", "fancy", "custom"] as const;

const SIZE_MESSAGE = "Sizes must be between 18 and 26 inches.";
const PRICE_MESSAGE = "Price must be between 0 and 10,000,000.";

const isHalfInch = (value: number) => Number.isInteger(value * 2);

export const capFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter a cap name.")
    .max(80, "Name must be under 80 characters."),
  category: z.enum(CAP_CATEGORIES, { message: "Choose a valid cap type." }),
  sizes: z
    .array(
      z
        .number({ message: "Sizes must be numbers, e.g. 21.5, 22, 23." })
        .min(18, SIZE_MESSAGE)
        .max(26, SIZE_MESSAGE)
        .refine(isHalfInch, "Sizes must be in half-inch steps.")
    )
    .min(1, "Add at least one size.")
    .max(12, "Add at most 12 sizes."),
  colors: z
    .array(z.string().max(40, "Colour names must be short."))
    .max(20, "Add at most 20 colours."),
  tags: z.array(z.string().max(40, "Tags must be short.")).max(20, "Add at most 20 tags."),
  price: z.number().min(0, PRICE_MESSAGE).max(10_000_000, PRICE_MESSAGE).nullable(),
  description: z
    .string()
    .max(600, "Description must be under 600 characters.")
    .nullable(),
  available: z.boolean(),
  featured: z.boolean(),
});

export type CapFields = z.infer<typeof capFieldsSchema>;
