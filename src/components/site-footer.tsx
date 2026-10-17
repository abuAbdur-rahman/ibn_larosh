import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <b>{SITE.name}</b>
      <br />
      {SITE.tagline}
      <br />
      {SITE.address}
      <br />
      BN No. {SITE.bnNo} ·{" "}
      <a href={`tel:${SITE.phoneDisplay}`}>{SITE.phoneDisplay}</a>
      <br />
      <Link href="/contact">Contact &amp; delivery</Link>
    </footer>
  );
}
