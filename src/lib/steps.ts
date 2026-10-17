/* Copy for the numbered "how it works" sections (home, delivery, size guide). */

export interface Step {
  n: number;
  title: string;
  body: string;
}

export const ORDER_STEPS: readonly Step[] = [
  { n: 1, title: "Pick a cap", body: "Browse designs and choose your size." },
  {
    n: 2,
    title: "Tap Order",
    body: "WhatsApp opens with your cap details filled in.",
  },
  {
    n: 3,
    title: "Confirm and receive",
    body: "We confirm price and arrange delivery within Ilorin.",
  },
];

export const DELIVERY_STEPS: readonly Step[] = [
  {
    n: 1,
    title: "Order on WhatsApp",
    body: "Share the cap, size and your area in Ilorin.",
  },
  { n: 2, title: "We confirm", body: "Price, availability and delivery details." },
  {
    n: 3,
    title: "Receive your cap",
    body: "Delivered to your location in Ilorin.",
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
