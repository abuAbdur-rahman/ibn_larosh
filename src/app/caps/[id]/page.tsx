import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapDetail } from "@/components/cap-detail";
import { getSeedCap, getSeedCaps } from "@/lib/seed";

type CapPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getSeedCaps().map((cap) => ({ id: cap.id }));
}

export async function generateMetadata({ params }: CapPageProps): Promise<Metadata> {
  const { id } = await params;
  const cap = getSeedCap(id);

  if (!cap) return { title: "Cap not found" };

  return {
    title: cap.name,
    description: cap.description,
    openGraph: { images: [cap.images[0]] },
  };
}

export default async function CapPage({ params }: CapPageProps) {
  const { id } = await params;
  const cap = getSeedCap(id);

  if (!cap) notFound();

  const more = getSeedCaps()
    .filter((other) => other.id !== cap.id)
    .sort(
      (a, b) =>
        Number(b.category === cap.category) - Number(a.category === cap.category)
    )
    .slice(0, 6);

  return <CapDetail key={cap.id} cap={cap} more={more} />;
}
