"use client";

import { useState, type FormEvent } from "react";
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
    <form className="site-form" onSubmit={handleSubmit} noValidate>
      {errors.length > 0 ? (
        <div className="note" role="alert">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {errors.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <label>
        Your name
        <input
          className="input"
          name="name"
          placeholder="e.g. Abdullahi"
          autoComplete="name"
          maxLength={80}
          required
        />
      </label>

      <div className="field-row">
        <label>
          Cap type
          <select className="input" name="type" defaultValue={CATEGORIES.tajia.label}>
            {Object.values(CATEGORIES).map((category) => (
              <option key={category.label} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Size (inches)
          <input
            className="input"
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

      <div className="field-row">
        <label>
          Quantity
          <input
            className="input"
            name="qty"
            type="number"
            min={1}
            max={500}
            step={1}
            defaultValue={1}
            required
          />
        </label>
        <label>
          Colours
          <input
            className="input"
            name="colors"
            placeholder="e.g. Navy and gold"
            maxLength={120}
          />
        </label>
      </div>

      <label>
        Design notes
        <textarea
          className="input"
          name="notes"
          maxLength={MAX_NOTES}
          placeholder="Describe the pattern. You can send a reference photo in the chat."
        />
      </label>

      <button className="btn wa block" type="submit">
        <WhatsAppIcon className="ic wa" /> Send on WhatsApp
      </button>
    </form>
  );
}
