import type { Metadata } from "next";
import { MapPin, Truck } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { SITE } from "@/lib/site";
import { DELIVERY_STEPS } from "@/lib/steps";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "We deliver within Ilorin, Kwara State. Order on WhatsApp, we confirm price and availability, then deliver to your location.",
};

export default function DeliveryPage() {
  return (
    <div className="page">
      <div className="ttl">
        <h1>Delivery</h1>
        <p>Fast and simple, right to your door.</p>
      </div>

      <div className="banner">
        <span className="eye">
          <Truck className="ic" aria-hidden="true" /> Ilorin only
        </span>
        <h2>We deliver within Ilorin</h2>
        <p>
          Order on WhatsApp and we&apos;ll arrange delivery to you in Ilorin. You can also
          visit the shop.
        </p>
      </div>

      <section className="sec">
        <SectionHead title="How it works" />
        <Steps steps={DELIVERY_STEPS} />
      </section>

      <section className="sec">
        <SectionHead title="Visit the shop" />
        <div className="locr">
          <MapPin className="ic" aria-hidden="true" />
          <div>
            <b>{SITE.name}</b>
            <span>{SITE.address}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
