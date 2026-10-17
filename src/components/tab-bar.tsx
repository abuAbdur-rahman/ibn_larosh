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
    <Link href={href} aria-current={active ? "page" : undefined}>
      <span className="pill">{children}</span>
      {label}
    </Link>
  );
}

/** Mobile bottom tab bar. The middle tab is the WhatsApp chat action. */
export function TabBar() {
  const active = resolveTab(usePathname());

  return (
    <nav className="tabbar" aria-label="Main">
      <Tab href="/" label="Home" active={active === "home"}>
        <House className="ic" />
      </Tab>
      <Tab href="/caps" label="Caps" active={active === "caps"}>
        <LayoutGrid className="ic" />
      </Tab>
      <a
        className="chat"
        href={CHAT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="pill">
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
