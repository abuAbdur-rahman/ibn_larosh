import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import { logoutAction } from "../login/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV_LINK =
  "inline-flex min-h-10 items-center rounded-full bg-white/10 px-3.5 text-[13.5px] font-semibold text-white hover:bg-white/18";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  await requireSession();

  return (
    <div className="admin" data-admin>
      <div className="bg-g9 text-white shadow-[0_1px_0_rgba(232,200,119,0.35)]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-3.5 px-3.5 py-2.5">
          <Link className="font-heading text-[17px] font-bold tracking-[0.04em]" href="/admin">
            IBN Larosh{" "}
            <span className="ml-2 inline-block font-sans text-[9.5px] font-semibold tracking-[0.2em] text-gold-l uppercase">
              Admin
            </span>
          </Link>
          <nav className="ml-auto flex gap-1" aria-label="Admin">
            <Link className={NAV_LINK} href="/admin">
              Catalog
            </Link>
            <Link className={NAV_LINK} href="/admin/caps/new">
              New cap
            </Link>
            <Link className={NAV_LINK} href="/">
              View site
            </Link>
          </nav>
          <form action={logoutAction}>
            <button className={NAV_LINK} type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-3.5 pt-6.5 pb-18">{children}</div>
    </div>
  );
}
