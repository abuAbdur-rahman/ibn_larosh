import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { AdminCapRow } from "@/components/admin/cap-row";
import { getDb } from "@/lib/db";
import { caps as capsTable } from "@/lib/db/schema";
import { rowToCap } from "@/lib/caps";
import type { Cap } from "@/lib/types";

export const metadata: Metadata = {
  title: "Catalog · Admin",
  robots: { index: false, follow: false },
};

const NOTICES: Record<string, string> = {
  created: "Cap added. It is live on the site.",
  updated: "Cap updated.",
  deleted: "Cap deleted.",
};

type AdminPageProps = {
  searchParams: Promise<{ notice?: string }>;
};

async function loadCaps(): Promise<{ caps: Cap[]; dbFailed: boolean }> {
  try {
    const rows = await getDb()
      .select()
      .from(capsTable)
      .orderBy(desc(capsTable.createdAt));
    return { caps: rows.map(rowToCap), dbFailed: false };
  } catch (error) {
    console.error("Admin catalog read failed:", error);
    return { caps: [], dbFailed: true };
  }
}

function Notice({ notice }: { notice?: string }) {
  const message = notice ? NOTICES[notice] : undefined;
  if (!message) return null;
  return (
    <div className="note" role="status">
      {message}
    </div>
  );
}

export default async function AdminCatalogPage({ searchParams }: AdminPageProps) {
  const { notice } = await searchParams;
  const { caps, dbFailed } = await loadCaps();

  const available = caps.filter((cap) => cap.available).length;
  const featured = caps.filter((cap) => cap.featured).length;

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Catalog</h1>
          <p className="admin-sub">Add caps, change prices, hide sold-out designs.</p>
        </div>
        <Link className="btn green" href="/admin/caps/new">
          <Plus className="ic" aria-hidden="true" /> New cap
        </Link>
      </div>

      <Notice notice={notice} />

      {dbFailed ? (
        <div className="note" role="alert">
          Could not reach the database. Check <code>DATABASE_URL</code> and try again.
        </div>
      ) : null}

      <div className="admin-stats">
        <div className="admin-stat">
          <b>{caps.length}</b>
          <span>Caps</span>
        </div>
        <div className="admin-stat">
          <b>{available}</b>
          <span>Available</span>
        </div>
        <div className="admin-stat">
          <b>{featured}</b>
          <span>Featured</span>
        </div>
      </div>

      {caps.length === 0 && !dbFailed ? (
        <div className="panel admin-empty">
          <p>No caps yet. Add your first cap to start the catalog.</p>
          <Link className="btn green" href="/admin/caps/new">
            Add a cap
          </Link>
        </div>
      ) : null}

      {caps.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Cap</th>
                <th scope="col">Type</th>
                <th scope="col">Sizes</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {caps.map((cap) => (
                <AdminCapRow cap={cap} key={cap.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
