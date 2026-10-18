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
      href={CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fab fixed right-4 bottom-[calc(var(--tab)+var(--safe)+16px)] z-[58] grid size-13 place-items-center rounded-full bg-wa-solid text-white shadow-[0_8px_22px_rgba(10,59,34,0.28)] transition-transform hover:scale-105 min-[900px]:right-6 min-[900px]:bottom-6"
    >
      <WhatsAppIcon className="ic wa" />
    </a>
  );
}
