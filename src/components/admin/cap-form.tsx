"use client";

import Image from "next/image";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { Button, ButtonLink } from "@/components/ui-kit/button";
import { fileInputClass, inputClass, textareaClass, fieldRowClass } from "@/components/ui-kit/field";
import { Note } from "@/components/ui-kit/layout";
import { formClass } from "@/components/ui-kit/field";
import type { ActionState } from "@/lib/admin-types";
import { CAP_CATEGORIES } from "@/lib/cap-input";
import { CATEGORIES } from "@/lib/site";

const initialState: ActionState = {};

interface CapFormInitial {
  name: string;
  category: string;
  sizes: string;
  colors: string;
  tags: string;
  price: string;
  description: string;
  available: boolean;
  featured: boolean;
}

interface ExistingImage {
  key: string;
  url: string;
}

interface CapFormProps {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  capId?: string;
  initial?: CapFormInitial;
  images?: ExistingImage[];
}

const EMPTY: CapFormInitial = {
  name: "",
  category: "tajia",
  sizes: "",
  colors: "",
  tags: "",
  price: "",
  description: "",
  available: true,
  featured: false,
};

interface PhotoFieldProps {
  capId?: string;
  preview: string | null;
  onPick: (event: ChangeEvent<HTMLInputElement>) => void;
}

function PhotoField({ capId, preview, onPick }: PhotoFieldProps) {
  return (
    <>
      <label htmlFor="cap-photo">
        {capId ? "Add another photo (optional)" : "Cap photo"}
        <input
          className={fileInputClass}
          id="cap-photo"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onPick}
        />
        <span className="block text-xs font-medium text-mut">JPEG, PNG or WebP · up to 5 MB</span>
      </label>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element -- local blob preview, never optimised
        <img
          className="size-40 rounded-[14px] border border-line object-cover"
          src={preview}
          alt="Selected photo preview"
        />
      ) : null}
    </>
  );
}

function ExistingImages({ images }: { images: ExistingImage[] }) {
  if (images.length === 0) return null;

  return (
    <div>
      <span className="block text-xs font-medium text-mut">
        Current photos — tick to remove on save
      </span>
      <div className="mt-2 flex flex-wrap gap-3">
        {images.map((image) => (
          <label
            className="grid justify-items-center gap-1.5 text-xs font-semibold text-mut [&_img]:size-24 [&_img]:rounded-xl [&_img]:border [&_img]:border-line [&_img]:object-cover"
            key={image.key}
          >
            <Image src={image.url} alt="" width={96} height={96} />
            <span className="inline-flex items-center gap-1.5">
              <input type="checkbox" name="removeImage" value={image.key} /> Remove
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function CapForm({ action, submitLabel, capId, initial, images = [] }: CapFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const values = initial ?? EMPTY;

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <form className={`${formClass} max-w-[760px]`} action={formAction}>
      {capId ? <input type="hidden" name="id" value={capId} /> : null}

      {state.error ? <Note tone="alert">{state.error}</Note> : null}

      <label htmlFor="cap-name">
        Cap name
        <input
          className={inputClass}
          id="cap-name"
          name="name"
          defaultValue={values.name}
          maxLength={80}
          required
          placeholder="Royal Blue Geometric Tajia"
        />
      </label>

      <div className={fieldRowClass}>
        <label htmlFor="cap-category">
          Cap type
          <select className={inputClass} id="cap-category" name="category" defaultValue={values.category}>
            {CAP_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORIES[category].label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="cap-sizes">
          Sizes (inches)
          <input
            className={inputClass}
            id="cap-sizes"
            name="sizes"
            defaultValue={values.sizes}
            placeholder="21.5, 22, 23"
            required
          />
        </label>
      </div>

      <div className={fieldRowClass}>
        <label htmlFor="cap-colors">
          Colours
          <input
            className={inputClass}
            id="cap-colors"
            name="colors"
            defaultValue={values.colors}
            placeholder="Blue, Gold, Silver"
          />
        </label>
        <label htmlFor="cap-tags">
          Tags
          <input
            className={inputClass}
            id="cap-tags"
            name="tags"
            defaultValue={values.tags}
            placeholder="geometric, woven"
          />
        </label>
      </div>

      <div className={fieldRowClass}>
        <label htmlFor="cap-price">
          Price (₦, optional)
          <input
            className={inputClass}
            id="cap-price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            defaultValue={values.price}
            placeholder="Ask on WhatsApp if empty"
          />
        </label>
        <div className="grid content-center gap-2.5 pt-1.5">
          <label className="flex min-h-8 items-center gap-2.5 text-[13.5px] font-semibold">
            <input
              className="size-[18px] accent-g9"
              type="checkbox"
              name="available"
              defaultChecked={values.available}
            />
            Available for order
          </label>
          <label className="flex min-h-8 items-center gap-2.5 text-[13.5px] font-semibold">
            <input
              className="size-[18px] accent-g9"
              type="checkbox"
              name="featured"
              defaultChecked={values.featured}
            />
            Featured on the homepage
          </label>
        </div>
      </div>

      <label htmlFor="cap-description">
        Description
        <textarea
          className={textareaClass}
          id="cap-description"
          name="description"
          defaultValue={values.description}
          maxLength={600}
          placeholder="Structured cap with gold geometric embroidery…"
        />
      </label>

      <PhotoField capId={capId} preview={preview} onPick={handleFile} />
      <ExistingImages images={images} />

      <div className="flex flex-wrap gap-2.5">
        <Button variant="green" type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <ButtonLink variant="line" href="/admin">
          Cancel
        </ButtonLink>
      </div>
    </form>
  );
}
