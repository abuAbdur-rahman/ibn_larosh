import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-[clamp(48px,6vw,72px)] bg-g9 px-4 py-[clamp(36px,5vw,48px)] text-center text-[13px] leading-[1.9] text-[#d8e3d6]">
      <b className="font-heading text-base text-gold-l">{SITE.name}</b>
      <br />
      {SITE.tagline}
      <br />
      {SITE.address}
      <br />
      BN No. {SITE.bnNo} ·{" "}
      <a className="underline underline-offset-[3px] hover:text-white" href={`tel:+${SITE.phoneIntl}`}>
        {SITE.phoneDisplay}
      </a>
      <br />
      <Link className="underline underline-offset-[3px] hover:text-white" href="/contact">
        Contact &amp; delivery
      </Link>
    </footer>
  );
}
