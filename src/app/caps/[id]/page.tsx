import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CapDetail } from "@/components/cap-detail";
import { getCapById, getCaps } from "@/lib/caps";

export const revalidate = 300;

type CapPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const caps = await getCaps();
  return caps.map((cap) => ({ id: cap.id }));
}

export async function generateMetadata(
  { params }: CapPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const cap = await getCapById(id);

  if (!cap) return { title: "Cap not found" };

  return {
    title: cap.name,
    description: cap.description,
    openGraph: {
      // openGraph is shallow-merged: spread the layout's fields (siteName,
      // locale, type) before overriding the cap-specific ones.
      ...(await parent).openGraph,
      title: cap.name,
      description: cap.description,
      url: `/caps/${cap.id}`,
      images: [{ url: cap.images[0], alt: cap.name }],
    },
  };
}

export default async function CapPage({ params }: CapPageProps) {
  const { id } = await params;
  const cap = await getCapById(id);
  const caps = await getCaps();

  if (!cap) notFound();

  const more = caps
    .filter((other) => other.id !== cap.id)
    .sort(
      (a, b) =>
        Number(b.category === cap.category) - Number(a.category === cap.category)
    )
    .slice(0, 6);

  return <CapDetail key={cap.id} cap={cap} more={more} />;
}
