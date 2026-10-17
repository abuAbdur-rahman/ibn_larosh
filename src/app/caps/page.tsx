import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCaps } from "@/lib/caps";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Browse caps",
  description:
    "Browse quality Hausa caps — Tajia, kaftan caps, fancy weaves and custom designs. Filter by type and size, then order on WhatsApp.",
};

export default async function CatalogPage() {
  const caps = await getCaps();

  return (
    <Suspense
      fallback={
        <div className="page">
          <div className="ttl">
            <h1>Browse caps</h1>
            <p>Loading caps…</p>
          </div>
        </div>
      }
    >
      <CatalogBrowser caps={caps} />
    </Suspense>
  );
}
