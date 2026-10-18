import type { Metadata } from "next";
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
import { ButtonAnchor, ButtonLink } from "@/components/ui-kit/button";
import { CapGrid, HScroll } from "@/components/ui-kit/catalog";
import { Banner, LocationCard, Page, Section } from "@/components/ui-kit/layout";
import { HeroSlider } from "@/components/hero-slider";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CATEGORIES, SITE } from "@/lib/site";
import { getCaps } from "@/lib/caps";
import { ORDER_STEPS } from "@/lib/steps";
import { wa } from "@/lib/whatsapp";
import type { CategoryKey } from "@/lib/types";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

export default async function HomePage() {
  const caps = await getCaps();
  // Hero advertises breadth; the featured grid owns the curated picks and
  // skips the hero caps, so the first screenful never repeats an image.
  const slides = caps.filter((cap) => !cap.featured).slice(0, 3);
  const slideIds = new Set(slides.map((cap) => cap.id));
  const featured = [
    ...caps.filter((cap) => cap.featured),
    ...caps.filter((cap) => !cap.featured && !slideIds.has(cap.id)),
  ].slice(0, 6);

  return (
    <>
      <section className="rounded-b-[28px] bg-g9 bg-[image:var(--hero-glow)] px-4 pt-8 pb-10 text-white min-[900px]:px-6 min-[900px]:pt-19 min-[900px]:pb-20">
        <div className="mx-auto grid max-w-[1100px] gap-7 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-center min-[900px]:gap-14">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-gold-l uppercase [&_.ic]:size-3.5">
              <MapPin className="ic" aria-hidden="true" /> {SITE.city} · {SITE.region}
            </span>
            <h1 className="my-2 mb-2.5 text-[clamp(34px,9vw,56px)]">
              Quality <em className="not-italic text-gold-l">Caps</em>,<br />
              woven to fit.
            </h1>
            <p className="max-w-[42ch] text-white/78">
              Quality and fancy Hausa caps in every size, colour and design. Pick a cap that
              suits your style and your kaftan.
            </p>
            <div className="mt-4.5 flex flex-wrap gap-2.5">
              <ButtonLink variant="gold" href="/caps">
                <LayoutGrid className="ic" aria-hidden="true" /> Browse caps
              </ButtonLink>
              <ButtonAnchor
                variant="wa"
                href={wa("Assalamu alaikum, I'd like to order a cap.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="ic wa" /> Order
              </ButtonAnchor>
            </div>
          </div>
          <HeroSlider slides={slides} />
        </div>
      </section>

      <div className="mx-auto flex max-w-[1100px] gap-2.5 overflow-x-auto px-3.5 pt-5.5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PERKS.map((perk) => (
          <span
            className="flex flex-none items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2.25 text-[13px] font-semibold text-g9 [&_.ic]:size-[17px] [&_.ic]:text-gold"
            key={perk.label}
          >
            <perk.icon className="ic" aria-hidden="true" /> {perk.label}
          </span>
        ))}
      </div>

      <Page>
        <Section>
          <SectionHead title="Shop by type" />
          <HScroll label="Shop by type">
            {(Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).map(
              ([key, category]) => {
                const Icon = CATEGORY_ICONS[key];
                return (
                  <Link
                    className="flex w-[132px] flex-col gap-3 rounded-[18px] border border-line bg-paper p-4.5 text-left"
                    href={key === "custom" ? "/custom" : `/caps?cat=${key}`}
                    key={key}
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-g9 text-gold-l">
                      <Icon className="ic" aria-hidden="true" />
                    </span>
                    <b className="font-heading text-[15px] font-semibold text-g9">
                      {category.label}
                    </b>
                    <small className="-mt-2 text-xs text-mut">{category.desc}</small>
                  </Link>
                );
              }
            )}
          </HScroll>
        </Section>

        <Section>
          <SectionHead title="Featured caps" href="/caps" linkLabel="See all" />
          <CapGrid>
            {featured.map((cap, index) => (
              <CapCard cap={cap} key={cap.id} priority={index < 4} />
            ))}
          </CapGrid>
        </Section>

        <Section>
          <SectionHead title="How to order" />
          <Steps steps={ORDER_STEPS} />
        </Section>

        <Section>
          <Banner
            title="Weaving of any cap design of your choice"
            action={
              <ButtonLink variant="gold" href="/custom">
                <Scissors className="ic" aria-hidden="true" /> Start a custom order
              </ButtonLink>
            }
          >
            Tell us the colours, pattern and size. We weave it for you. Bulk orders welcome.
          </Banner>
        </Section>

        <Section>
          <SectionHead title="Find us" />
          <div className="grid gap-3 min-[900px]:grid-cols-2">
            <LocationCard
              icon={<Store className="ic" aria-hidden="true" />}
              title={`${SITE.city} (shop)`}
              detail={SITE.address}
            />
            {SITE.otherLocations.map((location) => (
              <LocationCard
                key={location}
                icon={<MapPin className="ic" aria-hidden="true" />}
                title={location}
                detail="Available"
              />
            ))}
          </div>
        </Section>
      </Page>
    </>
  );
}
