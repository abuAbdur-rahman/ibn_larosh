import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Card } from "./ui-kit/catalog";
import { CATEGORIES } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import type { Cap } from "@/lib/types";

interface CapCardProps {
  cap: Cap;
  /** Extra class, e.g. `hCardClass` in horizontal scrollers. */
  className?: string;
  /** Above-the-fold cards should load eagerly (avoids an LCP warning). */
  priority?: boolean;
}

/** Catalog card: photo → name → sizes → View + WhatsApp order. */
export function CapCard({ cap, className, priority = false }: CapCardProps) {
  const category = CATEGORIES[cap.category];

  return (
    <Card className={className}>
      <Link
        className="group/ph relative block aspect-square overflow-hidden bg-[#efe4bd] [&:active_img]:scale-[1.04] min-[900px]:hover:[&_img]:scale-[1.04]"
        href={`/caps/${cap.id}`}
        aria-label={cap.name}
      >
        <Image
          src={cap.images[0]}
          alt={cap.name}
          fill
          sizes="(max-width: 899px) 50vw, 25vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-350"
        />
        <span className="absolute top-2 left-2 rounded-full bg-g9/88 px-2.25 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-white">
          {category.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-3.5 pt-3.5 pb-4">
        <h3 className="font-heading text-[15px] leading-[1.25] font-semibold text-g9">
          <Link href={`/caps/${cap.id}`}>{cap.name}</Link>
        </h3>
        <p className="text-xs text-mut">Sizes {cap.sizes.join(" · ")}</p>

        <div className="mt-auto flex gap-2 pt-3">
          <Link
            href={`/caps/${cap.id}`}
            className="grid h-11 flex-1 place-items-center rounded-full border-[1.5px] border-g9 text-[13.5px] font-semibold text-g9 transition-colors hover:bg-g9/[0.06]"
          >
            View
          </Link>
          <a
            href={orderLink(cap)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${cap.name} on WhatsApp`}
            className="grid size-11 flex-none place-items-center rounded-full bg-wa-solid text-white transition-colors hover:bg-wa-solid-hover"
          >
            <WhatsAppIcon className="ic wa" />
          </a>
        </div>
      </div>
    </Card>
  );
}
