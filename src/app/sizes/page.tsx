import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { ButtonAnchor } from "@/components/ui-kit/button";
import { Panel } from "@/components/ui-kit/field";
import { Banner, Page, PageTitle, Section } from "@/components/ui-kit/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SIZE_TABLE } from "@/lib/site";
import { MEASURE_STEPS } from "@/lib/steps";
import { wa } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "Hausa cap size chart in inches and centimetres, plus how to measure your head for the right fit. Custom sizes available.",
};

const TH = "border-b border-line pb-2.5 text-[11px] font-normal tracking-[0.12em] uppercase text-mut";
const TD = "border-b border-line py-2.5 text-[14px]";

export default function SizesPage() {
  return (
    <Page>
      <PageTitle title="Size guide" lead="Cap sizes are head circumference in inches." />

      <Steps steps={MEASURE_STEPS} />

      <Section>
        <SectionHead title="Size chart" />
        <Panel>
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th scope="col" className={`${TH} text-left`}>
                  Cap size (in)
                </th>
                <th scope="col" className={`${TH} text-left`}>
                  Head (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row) => (
                <tr key={row.inches}>
                  <td className={`${TD} tabular-nums`}>
                    <b>{row.inches}</b>
                  </td>
                  <td className={`${TD} tabular-nums`}>{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Section>

      <Section>
        <Banner
          title="Between sizes?"
          action={
            <ButtonAnchor
              variant="wa"
              href={wa("Assalamu alaikum, my head measures ___ inches. Which size should I get?")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="ic wa" /> Ask about size
            </ButtonAnchor>
          }
        >
          Send us your measurement on WhatsApp and we&apos;ll advise. Custom sizes are
          available.
        </Banner>
      </Section>
    </Page>
  );
}
