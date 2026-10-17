import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  CircleHelp,
  Info,
  Phone,
  Ruler,
  Truck,
} from "lucide-react";

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
    <div className="page">
      <div className="ttl">
        <h1>More</h1>
      </div>

      <div className="menu">
        {ITEMS.map((item) => (
          <Link href={item.href} key={item.href}>
            <span className="bub">
              <item.icon className="ic" aria-hidden="true" />
            </span>
            {item.label}
            <span className="go">
              <ChevronRight className="ic" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
