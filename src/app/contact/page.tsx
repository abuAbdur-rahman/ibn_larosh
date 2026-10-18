import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { ButtonAnchor } from "@/components/ui-kit/button";
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
    <div className="page">
      <div className="ttl">
        <h1>Contact</h1>
        <p>Call or message us any time.</p>
      </div>

      <div className="stack">
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
        <a className="locr" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
          <MapPin className="ic" aria-hidden="true" />
          <div>
            <b>Shop address</b>
            <span>{SITE.address}</span>
          </div>
        </a>
      </div>

      <section className="sec">
        <SectionHead title="Also available in" />
        <div className="loc">
          {SITE.otherLocations.map((location) => (
            <div className="locr" key={location}>
              <MapPin className="ic" aria-hidden="true" />
              <div>
                <b>{location}</b>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
