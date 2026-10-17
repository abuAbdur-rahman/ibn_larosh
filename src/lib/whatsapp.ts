import type { Cap } from "./types";
import { SITE } from "./site";

/* WhatsApp deep links — the app's order channel. No cart, no payment. */

export const wa = (message: string) =>
  `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(message)}`;

export const orderLink = (cap: Cap, size?: number, color?: string) =>
  wa(
    [
      "Assalamu alaikum, I'd like to order this cap:",
      `Name: ${cap.name}`,
      size ? `Size: ${size}` : null,
      color ? `Colour: ${color}` : null,
      `Ref: ${cap.id}`,
      "Delivery: Ilorin",
    ]
      .filter(Boolean)
      .join("\n")
  );

export const askLink = () => wa("Assalamu alaikum, I have a question.");
