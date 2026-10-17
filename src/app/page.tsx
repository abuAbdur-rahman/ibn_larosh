import Link from "next/link";
import {
  BadgeCheck,
  Crown,
  LayoutGrid,
  MapPin,
  Package,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { CapCard } from "@/components/cap-card";
import { HeroSlider } from "@/components/hero-slider";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CATEGORIES, SITE } from "@/lib/site";
import { getSeedCaps } from "@/lib/seed";
import { ORDER_STEPS } from "@/lib/steps";
import { wa } from "@/lib/whatsapp";
import type { CategoryKey } from "@/lib/types";

const CATEGORY_ICONS: Record<CategoryKey, typeof Crown> = {
  tajia: Crown,
  kaftan: Shirt,
  fancy: Sparkles,
  custom: Scissors,
};

const PERKS = [
  { icon: Truck, label: "Delivery in Ilorin" },
  { icon: Ruler, label: "Custom sizes" },
  { icon: Package, label: "Bulk orders" },
  { icon: Scissors, label: "Any design woven" },
  { icon: BadgeCheck, label: "Affordable" },
] as const;

export default function HomePage() {
  const caps = getSeedCaps();
  // Hero advertises breadth; the featured grid owns the curated picks, so the
  // first screenful never repeats an image.
  const slides = caps.filter((cap) => !cap.featured).slice(0, 3);
  const featured = [
    ...caps.filter((cap) => cap.featured),
    ...caps.filter((cap) => !cap.featured),
  ].slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hin">
          <div>
            <span className="eye">
              <MapPin className="ic" aria-hidden="true" /> {SITE.city} · {SITE.region}
            </span>
            <h1>
              Quality <em>Caps</em>,<br />
              woven to fit.
            </h1>
            <p>
              Quality and fancy Hausa caps in every size, colour and design. Pick a cap that
              suits your style and your kaftan.
            </p>
            <div className="cta">
              <Link className="btn gold" href="/caps">
                <LayoutGrid className="ic" aria-hidden="true" /> Browse caps
              </Link>
              <a
                className="btn wa"
                href={wa("Assalamu alaikum, I'd like to order a cap.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="ic wa" /> Order
              </a>
            </div>
          </div>
          <HeroSlider slides={slides} />
        </div>
      </section>

      <div className="perks">
        {PERKS.map((perk) => (
          <span className="perk" key={perk.label}>
            <perk.icon className="ic" aria-hidden="true" /> {perk.label}
          </span>
        ))}
      </div>

      <div className="page">
        <section className="sec">
          <SectionHead title="Shop by type" />
          <div className="hscroll">
            {(Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).map(
              ([key, category]) => {
                const Icon = CATEGORY_ICONS[key];
                return (
                  <Link
                    className="cat"
                    href={key === "custom" ? "/custom" : `/caps?cat=${key}`}
                    key={key}
                  >
                    <span className="bub">
                      <Icon className="ic" aria-hidden="true" />
                    </span>
                    <b>{category.label}</b>
                    <small>{category.desc}</small>
                  </Link>
                );
              }
            )}
          </div>
        </section>

        <section className="sec">
          <SectionHead title="Featured caps" href="/caps" linkLabel="See all" />
          <div className="cap-grid">
            {featured.map((cap) => (
              <CapCard cap={cap} key={cap.id} />
            ))}
          </div>
        </section>

        <section className="sec">
          <SectionHead title="How to order" />
          <Steps steps={ORDER_STEPS} />
        </section>

        <section className="sec">
          <div className="banner">
            <h2>Weaving of any cap design of your choice</h2>
            <p>
              Tell us the colours, pattern and size. We weave it for you. Bulk orders welcome.
            </p>
            <div>
              <Link className="btn gold" href="/custom">
                <Scissors className="ic" aria-hidden="true" /> Start a custom order
              </Link>
            </div>
          </div>
        </section>

        <section className="sec">
          <SectionHead title="Find us" />
          <div className="loc">
            <div className="locr">
              <Store className="ic" aria-hidden="true" />
              <div>
                <b>{SITE.city} (shop)</b>
                <span>{SITE.address}</span>
              </div>
            </div>
            {SITE.otherLocations.map((location) => (
              <div className="locr" key={location}>
                <MapPin className="ic" aria-hidden="true" />
                <div>
                  <b>{location}</b>
                  <span>Available</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
