import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ButtonAnchor } from "@/components/ui-kit/button";
import { askLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about ordering Hausa caps, custom designs, bulk orders, sizes and delivery in Ilorin.",
};

const QUESTIONS = [
  {
    q: "Where do you deliver?",
    a: "We deliver within Ilorin only. You can also pick up at our shop beside Tipper Garage, Okolowo Area.",
  },
  {
    q: "How do I order?",
    a: "Tap Order on any cap. WhatsApp opens with the cap name, size and reference filled in. We confirm the rest with you.",
  },
  {
    q: "Can you make a custom design?",
    a: "Yes. We weave any cap design of your choice. Use the Custom order page and send a reference photo on WhatsApp.",
  },
  {
    q: "Do you take bulk orders?",
    a: "Yes. Bulk orders are available. Tell us the quantity, sizes and designs.",
  },
  {
    q: "Which size should I pick?",
    a: "Measure around your head just above the eyebrows and ears. See the Size guide for the chart.",
  },
  {
    q: "Where else are your caps available?",
    a: "Bama, Maiduguri and Bangwal, as well as our shop in Ilorin.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="page">
      <div className="ttl">
        <h1>FAQ</h1>
        <p>Quick answers.</p>
      </div>

      {QUESTIONS.map((item, index) => (
        <details key={item.q} open={index === 0}>
          <summary>
            {item.q}
            <ChevronDown className="ic" aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}

      <section className="sec">
        <ButtonAnchor
          variant="wa"
          block
          href={askLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="ic wa" /> Still have a question?
        </ButtonAnchor>
      </section>
    </div>
  );
}
