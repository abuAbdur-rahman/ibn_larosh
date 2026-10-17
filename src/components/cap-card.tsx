import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CATEGORIES } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import type { Cap } from "@/lib/types";

interface CapCardProps {
  cap: Cap;
  /** Extra class, e.g. "hcard" in horizontal scrollers. */
  className?: string;
  /** Above-the-fold cards should load eagerly (avoids an LCP warning). */
  priority?: boolean;
}

/** Catalog card: photo → name → sizes → View + WhatsApp order. */
export function CapCard({ cap, className = "", priority = false }: CapCardProps) {
  const category = CATEGORIES[cap.category];

  return (
    <article className={`card ${className}`.trim()}>
      <Link className="ph" href={`/caps/${cap.id}`} aria-label={cap.name}>
        <Image
          src={cap.images[0]}
          alt={cap.name}
          fill
          sizes="(max-width: 899px) 50vw, 25vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        <span className="tag">{category.label}</span>
      </Link>
      <div className="cb">
        <h3>
          <Link href={`/caps/${cap.id}`}>{cap.name}</Link>
        </h3>
        <p className="sz">Sizes {cap.sizes.join(" · ")}</p>
        <div className="crow">
          <Link className="v" href={`/caps/${cap.id}`}>
            View
          </Link>
          <a
            className="w"
            href={orderLink(cap)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${cap.name} on WhatsApp`}
          >
            <WhatsAppIcon className="ic wa" />
          </a>
        </div>
      </div>
    </article>
  );
}
