import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { DesktopNav } from "./desktop-nav";
import { WhatsAppIcon } from "./whatsapp-icon";
import { SITE } from "@/lib/site";
import { wa } from "@/lib/whatsapp";

const HEADER_CHAT = wa("Assalamu alaikum, I'd like to order a cap.");

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="IBN Larosh home">
          <span className="mark">
            <Image
              src="/brand/emblem.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="wm">
            <b>{SITE.wordmark}</b>
            <small>{SITE.smallWordmark}</small>
          </span>
        </Link>

        <DesktopNav />

        <span className="header-spacer" />

        <Link className="icon-btn" href="/caps" aria-label="Search caps">
          <Search className="ic" />
        </Link>
        <a
          className="icon-btn wa"
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
