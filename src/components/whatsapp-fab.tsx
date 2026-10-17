"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./whatsapp-icon";
import { wa } from "@/lib/whatsapp";

const CHAT_LINK = wa("Assalamu alaikum, I'd like to order a cap.");

/** Floating WhatsApp button. Hidden on detail pages, which have a sticky order bar. */
export function WhatsAppFab() {
  const pathname = usePathname();
  const isDetail = /^\/caps\/[^/]+$/.test(pathname);

  if (isDetail) return null;

  return (
    <a
      className="fab"
      href={CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="ic wa" />
    </a>
  );
}
