import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Scissors, Store, Truck } from "lucide-react";
import { CapCard } from "@/components/cap-card";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { ButtonAnchor, ButtonLink } from "@/components/ui-kit/button";
import { CapGrid } from "@/components/ui-kit/catalog";
import { Banner, LocationCard, Page, Section } from "@/components/ui-kit/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { getCaps } from "@/lib/caps";
import { COLLECTIONS, shopHref } from "@/lib/collections";
import { SITE } from "@/lib/site";
import { ORDER_STEPS } from "@/lib/steps";
import { enquiryLink } from "@/lib/whatsapp";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const availableCaps = (await getCaps()).filter((cap) => cap.available);
  const featured = [
    ...availableCaps.filter((cap) => cap.featured),
    ...availableCaps.filter((cap) => !cap.featured),
  ].slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[28px] bg-g9 bg-[image:var(--hero-glow)] px-3.5 pt-8 pb-7 text-white sm:px-6 min-[900px]:py-12">
        <div className="mx-auto grid max-w-[1072px] items-center gap-6 min-[900px]:grid-cols-[1.08fr_0.92fr] min-[900px]:gap-12">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-gold-l uppercase">
              <MapPin className="size-4 shrink-0" aria-hidden="true" /> {SITE.city}, {SITE.region}
            </p>
            <h1 className="mt-3 max-w-[16ch] text-[clamp(35px,7vw,61px)]">
              Modest style. <span className="text-gold-l">Everyday essentials.</span>
            </h1>
            <p className="mt-3 max-w-[48ch] text-white/85">
              From woven Tajia caps and Agbada to attars, Islamic books and prayer essentials.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <ButtonLink variant="gold" href="/shop">
                Shop collections <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </ButtonLink>
              <ButtonAnchor
                variant="wa"
                href={enquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="ic wa" /> Chat on WhatsApp
              </ButtonAnchor>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[22px] border border-gold-l/35 bg-[#433223] shadow-[0_16px_36px_rgba(0,0,0,.22)]">
            <div className="relative aspect-[2/1] min-[900px]:aspect-[4/3]">
              <Image
                src="/collections/storefront.webp"
                alt="Kaftans, woven caps and Islamic books from the IBN Larosh flyer"
                fill
                preload
                sizes="(max-width: 899px) 95vw, 500px"
                className="object-cover object-[center_48%]"
              />
            </div>
            <div className="woven-trim h-1.5" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Page>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-b border-line pb-3 text-[13px] font-semibold text-g9 sm:mt-5">
          <Link href="/delivery" className="inline-flex min-h-11 items-center gap-2 hover:underline">
            <Truck className="size-4 shrink-0" aria-hidden="true" /> Nationwide delivery
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 hover:underline">
            <Store className="size-4 shrink-0" aria-hidden="true" /> Pickup in Okolowo, Ilorin
          </Link>
        </div>

        <Section aria-labelledby="shop-by-collection">
          <h2 id="shop-by-collection" className="mb-4 text-[clamp(25px,4vw,34px)] text-g9">Shop by collection</h2>
          <div className="grid gap-3.5 sm:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.id}
                href={shopHref(collection.id)}
                className="group grid min-h-[125px] grid-cols-[minmax(0,1fr)_7rem] overflow-hidden rounded-[19px] border border-line bg-paper shadow-[0_5px_16px_rgba(10,59,34,.06)] transition-shadow hover:shadow-[0_8px_22px_rgba(10,59,34,.14)] sm:flex sm:flex-col"
              >
                <div className="flex flex-col justify-center gap-1.5 p-3.5 sm:order-2 sm:flex-1 sm:p-4">
                  <h3 className="text-lg text-g9 sm:text-xl">{collection.name}</h3>
                  <p className="text-xs leading-relaxed text-mut sm:text-sm">{collection.description}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-g7 sm:mt-auto sm:pt-2">
                    Browse <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative min-h-full overflow-hidden bg-line sm:aspect-[2/1] sm:min-h-0">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 112px, (max-width: 1100px) 33vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: collection.imagePosition }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {featured.length > 0 && (
          <Section>
            <SectionHead title="Featured Hausa caps" href="/caps" linkLabel="Browse caps" />
            <CapGrid>
              {featured.map((cap) => <CapCard cap={cap} key={cap.id} />)}
            </CapGrid>
          </Section>
        )}

        <Section>
          <SectionHead title="How to order" />
          <Steps steps={ORDER_STEPS} />
        </Section>

        <Section>
          <Banner
            title="Have a cap design in mind?"
            action={
              <ButtonLink variant="gold" href="/custom">
                <Scissors className="ic" aria-hidden="true" /> Request a custom cap
              </ButtonLink>
            }
          >
            Send us your preferred pattern, colours and size. Bulk orders are welcome.
          </Banner>
        </Section>

        <Section>
          <SectionHead title="Visit our Ilorin shop" href="/contact" linkLabel="Get directions" />
          <LocationCard icon={<Store className="ic" aria-hidden="true" />} title={SITE.name} detail={SITE.address} />
        </Section>
      </Page>
    </>
  );
}
