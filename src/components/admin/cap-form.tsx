"use client";

import Image from "next/image";
import { useActionState } from "react";
import { Button, ButtonLink } from "@/components/ui-kit/button";
import { inputClass, textareaClass, fieldRowClass } from "@/components/ui-kit/field";
import { ImageField } from "@/components/admin/image-field";
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
  const values = initial ?? EMPTY;

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

      <label htmlFor="cap-price" className="max-w-[280px]">
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

      <div className="flex flex-wrap content-center items-center gap-x-7 gap-y-3">
        <label className="min-h-8 cursor-pointer">
          <span className="inline-flex items-center gap-2.5">
            <input
              className="peer sr-only"
              type="checkbox"
              role="switch"
              name="available"
              defaultChecked={values.available}
            />
            <span
              aria-hidden="true"
              className="relative h-6 w-11 flex-none rounded-full bg-line transition-colors peer-checked:bg-g7 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-g9 peer-checked:[&>span]:translate-x-5"
            >
              <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(10,59,34,0.25)] transition-transform" />
            </span>
            <span className="text-[13.5px] font-semibold">Available for order</span>
          </span>
        </label>

        <label className="min-h-8 cursor-pointer">
          <span className="inline-flex items-center gap-2.5">
            <input
              className="peer sr-only"
              type="checkbox"
              role="switch"
              name="featured"
              defaultChecked={values.featured}
            />
            <span
              aria-hidden="true"
              className="relative h-6 w-11 flex-none rounded-full bg-line transition-colors peer-checked:bg-g7 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-g9 peer-checked:[&>span]:translate-x-5"
            >
              <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(10,59,34,0.25)] transition-transform" />
            </span>
            <span className="text-[13.5px] font-semibold">Featured on the homepage</span>
          </span>
        </label>
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

      <ImageField capId={capId} />
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
