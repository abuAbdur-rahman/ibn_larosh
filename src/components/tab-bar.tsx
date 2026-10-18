"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { House, LayoutGrid, Menu, Scissors } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { wa } from "@/lib/whatsapp";

const CHAT_LINK = wa("Assalamu alaikum, I'd like to order a cap.");

type TabKey = "home" | "caps" | "custom" | "more";

function resolveTab(pathname: string): TabKey {
  if (pathname.startsWith("/caps")) return "caps";
  if (pathname.startsWith("/custom")) return "custom";
  if (pathname === "/") return "home";
  return "more";
}

interface TabProps {
  href: string;
  label: string;
  active: boolean;
  children: ReactNode;
}

function Tab({ href, label, active, children }: TabProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
        active ? "text-g9" : "text-mut"
      }`}
    >
      <span
        className={`grid h-7 w-12 place-items-center rounded-[14px] transition-colors ${
          active ? "bg-g9 text-white" : ""
        }`}
      >
        {children}
      </span>
      {label}
    </Link>
  );
}

/** Mobile bottom tab bar. The middle tab is the WhatsApp chat action. */
export function TabBar() {
  const active = resolveTab(usePathname());

  return (
    <nav
      className="tabbar fixed inset-x-0 bottom-0 z-60 grid h-[calc(var(--tab)+var(--safe))] grid-cols-5 border-t border-line bg-paper pb-[var(--safe)] min-[900px]:hidden"
      aria-label="Main"
    >
      <Tab href="/" label="Home" active={active === "home"}>
        <House className="ic" />
      </Tab>
      <Tab href="/caps" label="Caps" active={active === "caps"}>
        <LayoutGrid className="ic" />
      </Tab>
      <a
        href={CHAT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-mut"
      >
        <span className="grid h-[34px] w-13 place-items-center rounded-[17px] bg-wa-solid text-white shadow-[0_4px_12px_rgba(37,211,102,0.4)]">
          <WhatsAppIcon className="ic wa" />
        </span>
        Chat
      </a>
      <Tab href="/custom" label="Custom" active={active === "custom"}>
        <Scissors className="ic" />
      </Tab>
      <Tab href="/more" label="More" active={active === "more"}>
        <Menu className="ic" />
      </Tab>
    </nav>
  );
}
