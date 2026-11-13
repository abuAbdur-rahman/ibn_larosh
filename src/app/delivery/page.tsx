import type { Metadata } from "next";
import { MapPin, Truck } from "lucide-react";
import { ButtonAnchor } from "@/components/ui-kit/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { Banner, LocationCard, Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { SITE } from "@/lib/site";
import { wa } from "@/lib/whatsapp";
import { DELIVERY_STEPS } from "@/lib/steps";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "Delivery across Nigeria and pickup in Okolowo, Ilorin. Ask on WhatsApp for the cost and estimated delivery time.",
};

export default function DeliveryPage() {
  return (
    <Page>
      <PageTitle title="Delivery" lead="Delivery across Nigeria and pickup in Ilorin." />

      <Banner
        title="We deliver across Nigeria"
        eyebrow={
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-l [&_.ic]:size-3.5">
            <Truck className="ic" aria-hidden="true" /> Nationwide delivery
          </span>
        }
        action={
          <ButtonAnchor
            variant="wa"
            href={wa("Assalamu alaikum, could you confirm delivery cost and timing to my location?")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="ic wa" /> Ask about delivery
          </ButtonAnchor>
        }
      >
        Tell us your town and state on WhatsApp. We&apos;ll confirm the delivery cost and
        estimated arrival before you order.
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
