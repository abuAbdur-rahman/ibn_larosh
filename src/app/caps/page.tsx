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
        <div className="mx-auto max-w-[1100px] px-3.5">
          <div className="pt-[clamp(32px,5vw,48px)] pb-4.5">
            <h1 className="text-[clamp(30px,4vw,40px)] text-g9">Browse caps</h1>
            <p className="mt-2 text-[15px] text-mut">Loading caps…</p>
          </div>
        </div>
      }
    >
      <CatalogBrowser caps={caps} />
    </Suspense>
  );
}
