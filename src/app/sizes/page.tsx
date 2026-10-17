import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { Steps } from "@/components/steps";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SIZE_TABLE } from "@/lib/site";
import { MEASURE_STEPS } from "@/lib/steps";
import { wa } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "Hausa cap size chart in inches and centimetres, plus how to measure your head for the right fit. Custom sizes available.",
};

export default function SizesPage() {
  return (
    <div className="page">
      <div className="ttl">
        <h1>Size guide</h1>
        <p>Cap sizes are head circumference in inches.</p>
      </div>

      <Steps steps={MEASURE_STEPS} />

      <section className="sec">
        <SectionHead title="Size chart" />
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th scope="col">Cap size (in)</th>
                <th scope="col">Head (cm)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row) => (
                <tr key={row.inches}>
                  <td>
                    <b>{row.inches}</b>
                  </td>
                  <td>{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sec">
        <div className="banner">
          <h2>Between sizes?</h2>
          <p>
            Send us your measurement on WhatsApp and we&apos;ll advise. Custom sizes are
            available.
          </p>
          <div>
            <a
              className="btn wa"
              href={wa("Assalamu alaikum, my head measures ___ inches. Which size should I get?")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="ic wa" /> Ask about size
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
