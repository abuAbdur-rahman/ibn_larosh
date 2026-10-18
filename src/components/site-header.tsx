import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { DesktopNav } from "./desktop-nav";
import { WhatsAppIcon } from "./whatsapp-icon";
import { SITE } from "@/lib/site";
import { wa } from "@/lib/whatsapp";

const HEADER_CHAT = wa("Assalamu alaikum, I'd like to order a cap.");

const ICON_BTN =
  "grid size-11 place-items-center rounded-full bg-white/10 transition-transform active:scale-[0.94]";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-g9 text-white shadow-[0_1px_0_rgba(232,200,119,0.35)]">
      <div className="mx-auto flex h-[58px] max-w-[1100px] items-center gap-2.5 px-3.5">
        <Link className="flex min-w-0 items-center gap-2.5" href="/" aria-label="IBN Larosh home">
          <span className="grid size-10 flex-none place-items-center overflow-hidden rounded-xl bg-cream">
            <Image
              src="/brand/emblem.png"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col">
            <b className="font-heading text-[17px] leading-none font-bold tracking-[0.07em] whitespace-nowrap">
              {SITE.wordmark}
            </b>
            <small className="mt-[5px] text-[8.5px] font-semibold tracking-[0.38em] text-gold-l">
              {SITE.smallWordmark}
            </small>
          </span>
        </Link>

        <DesktopNav />

        <span className="flex-1" />

        <Link className={ICON_BTN} href="/caps" aria-label="Search caps">
          <Search className="ic" />
        </Link>
        <a
          className={`${ICON_BTN} bg-wa-solid hover:bg-wa-solid-hover`}
          href={HEADER_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="ic wa" />
        </a>
      </div>
    </header>
  );
}
