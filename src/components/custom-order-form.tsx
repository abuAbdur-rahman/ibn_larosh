"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui-kit/button";
import { formClass, inputClass, textareaClass, fieldRowClass } from "./ui-kit/field";
import { Note } from "./ui-kit/layout";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CATEGORIES } from "@/lib/site";
import { buildCustomOrder, MAX_NOTES } from "@/lib/custom-order";
import { wa } from "@/lib/whatsapp";

/** Custom-order form → builds a pre-filled WhatsApp message (no server write). */
export function CustomOrderForm() {
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { problems, message } = buildCustomOrder(new FormData(event.currentTarget));
    setErrors(problems);

    if (problems.length === 0) {
      window.open(wa(message), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form className={formClass} onSubmit={handleSubmit} noValidate>
      {errors.length > 0 ? (
        <Note tone="alert">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {errors.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </Note>
      ) : null}

      <label htmlFor="order-name">
        Your name
        <input
          className={inputClass}
          id="order-name"
          name="name"
          placeholder="e.g. Abdullahi"
          autoComplete="name"
          maxLength={80}
          required
        />
      </label>

      <div className={fieldRowClass}>
        <label htmlFor="order-type">
          Cap type
          <select className={inputClass} id="order-type" name="type" defaultValue={CATEGORIES.tajia.label}>
            {Object.values(CATEGORIES).map((category) => (
              <option key={category.label} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="order-size">
          Size (inches)
          <input
            className={inputClass}
            id="order-size"
            name="size"
            inputMode="decimal"
            placeholder="e.g. 22"
            min={18}
            max={26}
            step={0.5}
            type="number"
          />
        </label>
      </div>

      <div className={fieldRowClass}>
        <label htmlFor="order-qty">
          Quantity
          <input
            className={inputClass}
            id="order-qty"
            name="qty"
            type="number"
            min={1}
            max={500}
            step={1}
            defaultValue={1}
            required
          />
        </label>
        <label htmlFor="order-colors">
          Colours
          <input
            className={inputClass}
            id="order-colors"
            name="colors"
            placeholder="e.g. Navy and gold"
            maxLength={120}
          />
        </label>
      </div>

      <label htmlFor="order-notes">
        Design notes
        <textarea
          className={textareaClass}
          id="order-notes"
          name="notes"
          maxLength={MAX_NOTES}
          placeholder="Describe the pattern. You can send a reference photo in the chat."
        />
      </label>

      <Button variant="wa" block type="submit">
        <WhatsAppIcon className="ic wa" /> Send on WhatsApp
      </Button>
    </form>
  );
}
