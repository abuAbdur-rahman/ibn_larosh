import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { ButtonAnchor } from "@/components/ui-kit/button";
import { LocationCard, Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SITE } from "@/lib/site";
import { wa } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Chat on WhatsApp, call 08109080076, or visit our shop beside Tipper Garage, Okolowo Area, Ilorin, Kwara State.",
};

const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.address
)}`;

export default function ContactPage() {
  return (
    <Page>
      <PageTitle title="Contact" lead="Call or message us any time." />

      <div className="grid gap-4">
        <ButtonAnchor
          variant="wa"
          block
          href={wa("Assalamu alaikum")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="ic wa" /> Chat on WhatsApp
        </ButtonAnchor>
        <ButtonAnchor variant="line" block href={`tel:+${SITE.phoneIntl}`}>
          <Phone className="ic" aria-hidden="true" /> Call {SITE.phoneDisplay}
        </ButtonAnchor>
        <LocationCard
          href={MAP_LINK}
          icon={<MapPin className="ic" aria-hidden="true" />}
          title="Shop address"
          detail={SITE.address}
        />
      </div>

      <Section>
        <SectionHead title="Also available in" />
        <div className="grid gap-3 min-[900px]:grid-cols-2">
          {SITE.otherLocations.map((location) => (
            <LocationCard
              key={location}
              icon={<MapPin className="ic" aria-hidden="true" />}
              title={location}
            />
          ))}
        </div>
      </Section>
    </Page>
  );
}
