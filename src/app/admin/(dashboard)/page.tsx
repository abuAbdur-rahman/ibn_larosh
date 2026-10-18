import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { AdminCapRow } from "@/components/admin/cap-row";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ButtonLink } from "@/components/ui-kit/button";
import { Panel } from "@/components/ui-kit/field";
import { Note } from "@/components/ui-kit/layout";
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
  return <Note tone="status">{message}</Note>;
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-[16px] border border-line bg-paper px-4.5 py-4">
      <b className="block font-heading text-[28px] leading-[1.1] font-bold text-g9">{value}</b>
      <span className="text-[11px] font-semibold tracking-[0.12em] text-mut uppercase">
        {label}
      </span>
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
      <AdminPageHeader
        title="Catalog"
        lead="Add caps, change prices, hide sold-out designs."
        action={
          <ButtonLink variant="green" href="/admin/caps/new">
            <Plus className="ic" aria-hidden="true" /> New cap
          </ButtonLink>
        }
      />

      <Notice notice={notice} />

      {dbFailed ? (
        <Note tone="alert">
          Could not reach the database. Check <code>DATABASE_URL</code> and try again.
        </Note>
      ) : null}

      <div className="my-4.5 mb-5.5 grid grid-cols-3 gap-3">
        <Stat value={caps.length} label="Caps" />
        <Stat value={available} label="Available" />
        <Stat value={featured} label="Featured" />
      </div>

      {caps.length === 0 && !dbFailed ? (
        <Panel className="grid justify-items-start gap-3.5">
          <p>No caps yet. Add your first cap to start the catalog.</p>
          <ButtonLink variant="green" href="/admin/caps/new">
            Add a cap
          </ButtonLink>
        </Panel>
      ) : null}

      {caps.length > 0 ? (
        <div className="overflow-x-auto rounded-[18px] border border-line bg-paper shadow-[0_8px_24px_rgba(10,59,34,0.10)]">
          <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th scope="col" className="border-b border-line px-3.5 py-3 text-left text-[10.5px] tracking-[0.12em] text-mut uppercase">
                  Cap
                </th>
                <th scope="col" className="border-b border-line px-3.5 py-3 text-left text-[10.5px] tracking-[0.12em] text-mut uppercase">
                  Type
                </th>
                <th scope="col" className="border-b border-line px-3.5 py-3 text-left text-[10.5px] tracking-[0.12em] text-mut uppercase">
                  Sizes
                </th>
                <th scope="col" className="border-b border-line px-3.5 py-3 text-left text-[10.5px] tracking-[0.12em] text-mut uppercase">
                  Price
                </th>
                <th scope="col" className="border-b border-line px-3.5 py-3 text-left text-[10.5px] tracking-[0.12em] text-mut uppercase">
                  Status
                </th>
                <th scope="col" className="border-b border-line px-3.5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child_td]:border-b-0">
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
