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

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  await requireSession();

  return (
    <div className="admin">
      <div className="admin-bar">
        <div className="admin-bar-inner">
          <Link className="admin-brand" href="/admin">
            IBN Larosh <span>Admin</span>
          </Link>
          <nav className="admin-nav" aria-label="Admin">
            <Link href="/admin">Catalog</Link>
            <Link href="/admin/caps/new">New cap</Link>
            <Link href="/">View site</Link>
          </nav>
          <form action={logoutAction}>
            <button className="admin-signout" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="admin-body">{children}</div>
    </div>
  );
}
