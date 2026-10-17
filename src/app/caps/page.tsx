import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getSeedCaps } from "@/lib/seed";
import type { CategoryKey } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse caps",
  description:
    "Browse quality Hausa caps — Tajia, kaftan caps, fancy weaves and custom designs. Filter by type and size, then order on WhatsApp.",
};

const CATEGORY_KEYS: CategoryKey[] = ["tajia", "kaftan", "fancy", "custom"];

const isCategory = (value: string | undefined): value is CategoryKey =>
  value !== undefined && CATEGORY_KEYS.includes(value as CategoryKey);

type CatalogPageProps = {
  searchParams: Promise<{ cat?: string }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { cat } = await searchParams;
  const initialCategory = isCategory(cat) ? cat : "all";

  return (
    <CatalogBrowser
      key={initialCategory}
      caps={getSeedCaps()}
      initialCategory={initialCategory}
    />
  );
}
