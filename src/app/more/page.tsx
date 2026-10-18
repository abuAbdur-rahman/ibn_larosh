import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CircleHelp, Info, Phone, Ruler, Truck } from "lucide-react";
import { Page, PageTitle } from "@/components/ui-kit/layout";

export const metadata: Metadata = {
  title: "More",
  description: "Size guide, delivery, FAQ, about us and contact details.",
};

const ITEMS = [
  { href: "/sizes", icon: Ruler, label: "Size guide" },
  { href: "/delivery", icon: Truck, label: "Delivery (Ilorin)" },
  { href: "/faq", icon: CircleHelp, label: "FAQ" },
  { href: "/about", icon: Info, label: "About us" },
  { href: "/contact", icon: Phone, label: "Contact" },
] as const;

export default function MorePage() {
  return (
    <Page>
      <PageTitle title="More" />

      <nav className="grid gap-3" aria-label="More pages">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 rounded-[16px] border border-line bg-paper px-4.5 py-4.25 font-semibold transition-colors hover:bg-[#FAF6E8]"
          >
            <span className="grid size-[38px] flex-none place-items-center rounded-[11px] bg-g9 text-gold-l">
              <item.icon className="ic" aria-hidden="true" />
            </span>
            {item.label}
            <span className="ml-auto text-mut">
              <ChevronRight className="ic" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>
    </Page>
  );
}
