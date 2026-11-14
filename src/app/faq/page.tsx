import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ButtonAnchor } from "@/components/ui-kit/button";
import { Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { askLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about ordering, nationwide delivery, Ilorin pickup, cap sizes and custom designs.",
};

const QUESTIONS = [
  {
    q: "Where do you deliver?",
    a: "We deliver across Nigeria. Share your location on WhatsApp for the delivery fee and timing. You can also collect from our shop beside Tipper Garage, Okolowo, Ilorin.",
  },
  {
    q: "How do I order?",
    a: "Browse the shop and tap the WhatsApp icon next to an item. For caps, pick a design and size to include them in your message. We’ll confirm the price and availability.",
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
    <Page>
      <PageTitle title="FAQ" lead="Quick answers." />

      <div className="space-y-2.5">
        {QUESTIONS.map((item, index) => (
          <details
            key={item.q}
            open={index === 0}
            className="group rounded-[14px] border border-line bg-paper px-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.75 font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className="ic text-mut transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-[68ch] pb-3.75 text-mut">{item.a}</p>
          </details>
        ))}
      </div>

      <Section>
        <ButtonAnchor
          variant="wa"
          block
          href={askLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="ic wa" /> Still have a question?
        </ButtonAnchor>
      </Section>
    </Page>
  );
}
