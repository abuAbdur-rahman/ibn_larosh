/* Copy for the numbered "how it works" sections (home, delivery, size guide). */

export interface Step {
  n: number;
  title: string;
  body: string;
}

export const ORDER_STEPS: readonly Step[] = [
  { n: 1, title: "Find what you need", body: "Browse the collections or pick a cap and choose your size." },
  {
    n: 2,
    title: "Chat on WhatsApp",
    body: "Send your enquiry with the item you’re interested in.",
  },
  {
    n: 3,
    title: "Confirm and receive",
    body: "We confirm the price and arrange nationwide delivery or Ilorin pickup.",
  },
];

export const DELIVERY_STEPS: readonly Step[] = [
  {
    n: 1,
    title: "Order on WhatsApp",
    body: "Share the item and your town or area.",
  },
  { n: 2, title: "We confirm", body: "Price, availability and delivery details." },
  {
    n: 3,
    title: "Receive your order",
    body: "Get it delivered or pick it up in Okolowo, Ilorin.",
  },
];

export const MEASURE_STEPS: readonly Step[] = [
  { n: 1, title: "Get a soft tape", body: "Or use a string and a ruler." },
  {
    n: 2,
    title: "Wrap it around your head",
    body: "Just above the eyebrows and ears.",
  },
  { n: 3, title: "Read the number", body: "Match it to the table below." },
];
