import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/custom-order-form";
import { Panel } from "@/components/ui-kit/field";
import { Note, Page, PageTitle, Section } from "@/components/ui-kit/layout";

export const metadata: Metadata = {
  title: "Custom order",
  description:
    "Order a custom woven Hausa cap — choose the type, size, colours and pattern. We weave any design you like and confirm on WhatsApp.",
};

export default function CustomPage() {
  return (
    <Page>
      <PageTitle
        title="Custom order"
        lead="We weave any cap design of your choice. Fill this in and we'll continue on WhatsApp."
      />

      <Panel>
        <CustomOrderForm />
      </Panel>

      <Section>
        <Note>Tip: after WhatsApp opens, attach a photo of the design you want.</Note>
      </Section>
    </Page>
  );
}
