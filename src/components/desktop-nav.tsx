"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/caps", label: "Caps" },
  { href: "/custom", label: "Custom order" },
  { href: "/sizes", label: "Size guide" },
  { href: "/delivery", label: "Delivery" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Desktop pill navigation with active-route state. */
export function DesktopNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="hidden min-[900px]:ml-4.5 min-[900px]:flex min-[900px]:gap-1" aria-label="Main">
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={cn(
            "rounded-full px-3 py-2 text-sm font-medium opacity-85 transition-colors hover:bg-white/12 hover:opacity-100",
            "aria-[current=page]:bg-white/12 aria-[current=page]:opacity-100"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
