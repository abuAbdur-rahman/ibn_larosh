import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Package, Ruler, Wallet } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Panel } from "@/components/ui-kit/field";
import { Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Shop modest wear, fragrances, Islamic books and essentials from IBN Larosh Enterprises in Ilorin, Kwara State.",
};

const VALUES = [
  { icon: BadgeCheck, label: "Quality" },
  { icon: Wallet, label: "Affordable" },
  { icon: Ruler, label: "Custom sizes" },
  { icon: Package, label: "Bulk orders" },
] as const;

export default function AboutPage() {
  return (
    <Page>
      <PageTitle title="About us" />

      <Panel className="text-center">
        <Image
          className="mx-auto h-auto w-[min(320px,80%)] rounded-[16px]"
          src="/brand/logo.png"
          alt={`${SITE.name} — ${SITE.tagline}`}
          width={1536}
          height={1024}
          sizes="(max-width: 640px) 80vw, 320px"
        />
      </Panel>

      <Section>
        <Panel className="grid gap-4">
          <p className="max-w-[68ch]">
            <b>{SITE.name}</b> is a shop in Okolowo, Ilorin, offering clothing, fragrances,
            Islamic books and essentials. We also weave Hausa caps to order and welcome bulk
            orders for caps.
          </p>
          <p className="text-[13px] text-mut">BN No. {SITE.bnNo}</p>
        </Panel>
      </Section>

      <Section>
        <SectionHead title="What you get" />
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-4 min-[900px]:gap-6">
          {VALUES.map((value) => (
            <Panel key={value.label}>
              <value.icon className="ic text-gold" aria-hidden="true" />
              <p className="mt-1.5">
                <b>{value.label}</b>
              </p>
            </Panel>
          ))}
        </div>
      </Section>
    </Page>
  );
}
