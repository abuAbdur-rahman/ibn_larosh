import type { Metadata } from "next";
import { MapPin, Truck } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { Banner, LocationCard, Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { SITE } from "@/lib/site";
import { DELIVERY_STEPS } from "@/lib/steps";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "We deliver within Ilorin, Kwara State. Order on WhatsApp, we confirm price and availability, then deliver to your location.",
};

export default function DeliveryPage() {
  return (
    <Page>
      <PageTitle title="Delivery" lead="Fast and simple, right to your door." />

      <Banner
        title="We deliver within Ilorin"
        eyebrow={
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-l [&_.ic]:size-3.5">
            <Truck className="ic" aria-hidden="true" /> Ilorin only
          </span>
        }
      >
        Order on WhatsApp and we&apos;ll arrange delivery to you in Ilorin. You can also visit
        the shop.
      </Banner>

      <Section>
        <SectionHead title="How it works" />
        <Steps steps={DELIVERY_STEPS} />
      </Section>

      <Section>
        <SectionHead title="Visit the shop" />
        <LocationCard
          icon={<MapPin className="ic" aria-hidden="true" />}
          title={SITE.name}
          detail={SITE.address}
        />
      </Section>
    </Page>
  );
}
