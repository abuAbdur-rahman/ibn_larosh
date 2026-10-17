"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { caps as capsTable } from "@/lib/db/schema";
import { parseCapFields } from "@/lib/cap-input";
import { deleteMediaObject } from "@/lib/r2";
import { requireSession } from "@/lib/session";
import { uploadCapImage } from "@/lib/upload";
import type { ActionState } from "@/lib/admin-types";

type CapRow = typeof capsTable.$inferSelect;
type ToggleField = "available" | "featured";

function priceValue(price: number | null): string | null {
  return price === null ? null : price.toFixed(2);
}

function revalidateCatalog(id?: string): void {
  // Site-wide rule from AGENTS.md: every mutation invalidates everything.
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/caps/${id}`);
}

async function findCap(id: string): Promise<CapRow | undefined> {
  const [row] = await getDb().select().from(capsTable).where(eq(capsTable.id, id));
  return row;
}

/** Apply "remove photo" ticks and an optional new upload. Null = no photos left. */
async function resolveImages(
  id: string,
  existing: string[],
  formData: FormData
): Promise<{ images: string[]; removed: string[] } | null> {
  const requested = new Set(formData.getAll("removeImage").map(String));
  // Only keys actually owned by this cap may be deleted.
  const removed = existing.filter((key) => requested.has(key));
  const images = existing.filter((key) => !requested.has(key));

  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    images.push(await uploadCapImage(file, id));
  }

  if (images.length === 0) return null;
  return { images, removed };
}

function parseToggle(formData: FormData): { id: string; field: ToggleField } | null {
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  if (!id) return null;
  if (field !== "available" && field !== "featured") return null;
  return { id, field };
}

export async function createCapAction(
  _previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireSession();

  const parsed = parseCapFields(formData);
  if (!parsed.ok) return { error: parsed.problems.join(" ") };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Add a cap photo." };
  }

  const id = randomUUID();

  try {
    const key = await uploadCapImage(file, id);
    await getDb()
      .insert(capsTable)
      .values({
        id,
        name: parsed.fields.name,
        category: parsed.fields.category,
        sizes: parsed.fields.sizes,
        colors: parsed.fields.colors,
        tags: parsed.fields.tags,
        images: [key],
        price: priceValue(parsed.fields.price),
        description: parsed.fields.description,
        available: parsed.fields.available,
        featured: parsed.fields.featured,
      });
  } catch (error) {
    console.error("Create cap failed:", error);
    return { error: "Could not save the cap. Please try again." };
  }

  revalidateCatalog(id);
  redirect("/admin?notice=created");
}

export async function updateCapAction(
  _previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing cap id." };

  const parsed = parseCapFields(formData);
  if (!parsed.ok) return { error: parsed.problems.join(" ") };

  const existing = await findCap(id);
  if (!existing) return { error: "Cap not found." };

  try {
    const resolved = await resolveImages(id, existing.images, formData);
    if (!resolved) return { error: "Keep at least one photo." };

    await getDb()
      .update(capsTable)
      .set({
        name: parsed.fields.name,
        category: parsed.fields.category,
        sizes: parsed.fields.sizes,
        colors: parsed.fields.colors,
        tags: parsed.fields.tags,
        images: resolved.images,
        price: priceValue(parsed.fields.price),
        description: parsed.fields.description,
        available: parsed.fields.available,
        featured: parsed.fields.featured,
      })
      .where(eq(capsTable.id, id));

    // Only after the row is safely updated.
    await Promise.all(resolved.removed.map(deleteMediaObject));
  } catch (error) {
    console.error("Update cap failed:", error);
    return { error: "Could not update the cap. Please try again." };
  }

  revalidateCatalog(id);
  redirect("/admin?notice=updated");
}

export async function toggleCapAction(formData: FormData): Promise<void> {
  await requireSession();

  const toggle = parseToggle(formData);
  if (!toggle) redirect("/admin");

  const existing = await findCap(toggle.id);
  if (!existing) redirect("/admin");

  const next = !existing[toggle.field];
  await getDb()
    .update(capsTable)
    .set(toggle.field === "available" ? { available: next } : { featured: next })
    .where(eq(capsTable.id, toggle.id));

  revalidateCatalog(toggle.id);
  redirect("/admin");
}

export async function deleteCapAction(formData: FormData): Promise<void> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin");

  const existing = await findCap(id);

  if (existing) {
    await getDb().delete(capsTable).where(eq(capsTable.id, id));
    await Promise.all(existing.images.map(deleteMediaObject));
  }

  revalidateCatalog(id);
  redirect("/admin?notice=deleted");
}
