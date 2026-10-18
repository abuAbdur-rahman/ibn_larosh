import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeadProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

/** Section heading with an optional "See all →" link (Tailwind utilities). */
export function SectionHead({ title, href, linkLabel = "See all" }: SectionHeadProps) {
  return (
    <div className="mb-4.5 flex items-end justify-between gap-4">
      <h2 className="text-[clamp(23px,2.6vw,28px)] text-g9">{title}</h2>
      {href ? (
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-0.5 pl-2 text-[13px] font-semibold text-g7 [&_.ic]:size-4"
        >
          {linkLabel} <ChevronRight className="ic" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
