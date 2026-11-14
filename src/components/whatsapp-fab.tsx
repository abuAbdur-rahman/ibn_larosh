"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./whatsapp-icon";
import { enquiryLink } from "@/lib/whatsapp";

/** Desktop chat shortcut. Mobile uses the tab bar; cap details have an order bar. */
export function WhatsAppFab() {
  const pathname = usePathname();
  const isDetail = /^\/caps\/[^/]+$/.test(pathname);

  if (isDetail) return null;

  return (
    <a
      href={enquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fab fixed right-6 bottom-6 z-[58] hidden size-13 place-items-center rounded-full bg-wa-solid text-white shadow-[0_8px_22px_rgba(10,59,34,0.28)] transition-transform hover:scale-105 min-[900px]:grid"
    >
      <WhatsAppIcon className="ic wa" />
    </a>
  );
}
