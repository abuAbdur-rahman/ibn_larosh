import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeadProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

/** Section heading with an optional "See all →" link. */
export function SectionHead({ title, href, linkLabel = "See all" }: SectionHeadProps) {
  return (
    <div className="sh">
      <h2>{title}</h2>
      {href ? (
        <Link href={href}>
          {linkLabel} <ChevronRight className="ic" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
