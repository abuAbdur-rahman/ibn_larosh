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
    ]
      .filter(Boolean)
      .join("\n")
  );

export const enquiryLink = (item?: string) =>
  wa(item
    ? `Assalamu alaikum, I'd like to ask about ${item}. Please confirm availability and price.`
    : "Assalamu alaikum, I'd like to make an enquiry.");

export const askLink = () => wa("Assalamu alaikum, I have a question.");
