import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Package, Ruler, Wallet } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { Panel } from "@/components/ui-kit/field";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "IBN Larosh Enterprises sells quality and fancy Hausa caps, weaves any design you like and takes bulk orders. Ilorin, Kwara State. BN No. 9882187.",
};

const VALUES = [
  { icon: BadgeCheck, label: "Quality" },
  { icon: Wallet, label: "Affordable" },
  { icon: Ruler, label: "Custom sizes" },
  { icon: Package, label: "Bulk orders" },
] as const;

export default function AboutPage() {
  return (
    <div className="page">
      <div className="ttl">
        <h1>About us</h1>
      </div>

      <Panel className="text-center">
        <Image
          className="logo-full"
          src="/brand/logo.png"
          alt={`${SITE.name} — ${SITE.tagline}`}
          width={1536}
          height={1024}
          sizes="(max-width: 640px) 80vw, 320px"
        />
      </Panel>

      <section className="sec">
        <Panel className="stack">
          <p className="max-w-[68ch]">
            <b>{SITE.name}</b> sells all kinds of quality and fancy Hausa caps, including
            Tajia and caps to match your kaftan. We weave any design of your choice and take
            bulk orders.
          </p>
          <p className="text-[13px] text-mut">BN No. {SITE.bnNo}</p>
        </Panel>
      </section>

      <section className="sec">
        <SectionHead title="What you get" />
        <div className="cap-grid">
          {VALUES.map((value) => (
            <Panel key={value.label}>
              <value.icon className="ic text-gold" aria-hidden="true" />
              <p className="mt-1.5">
                <b>{value.label}</b>
              </p>
            </Panel>
          ))}
        </div>
      </section>
    </div>
  );
}
