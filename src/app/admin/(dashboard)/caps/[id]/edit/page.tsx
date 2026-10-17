import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { CapForm } from "@/components/admin/cap-form";
import { getDb } from "@/lib/db";
import { caps as capsTable } from "@/lib/db/schema";
import { rowToCap } from "@/lib/caps";
import { updateCapAction } from "../../actions";

export const metadata: Metadata = {
  title: "Edit cap · Admin",
  robots: { index: false, follow: false },
};

type EditCapPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCapPage({ params }: EditCapPageProps) {
  const { id } = await params;

  const [row] = await getDb()
    .select()
    .from(capsTable)
    .where(eq(capsTable.id, id));

  if (!row) notFound();

  const cap = rowToCap(row);
  const images = row.images.map((key, index) => ({
    key,
    url: cap.images[index] ?? `/api/media/${key}`,
  }));

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Edit cap</h1>
          <p className="admin-sub">{cap.name}</p>
        </div>
      </div>
      <CapForm
        action={updateCapAction}
        submitLabel="Save changes"
        capId={row.id}
        images={images}
        initial={{
          name: row.name,
          category: row.category,
          sizes: row.sizes.join(", "),
          colors: row.colors.join(", "),
          tags: row.tags.join(", "),
          price: row.price ?? "",
          description: row.description ?? "",
          available: row.available,
          featured: row.featured,
        }}
      />
    </>
  );
}
