import type { Metadata } from "next";
import { CapForm } from "@/components/admin/cap-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { createCapAction } from "../actions";

export const metadata: Metadata = {
  title: "New cap · Admin",
  robots: { index: false, follow: false },
};

export default function NewCapPage() {
  return (
    <>
      <AdminPageHeader title="New cap" lead="Upload a photo and fill in the details." />
      <CapForm action={createCapAction} submitLabel="Save cap" />
    </>
  );
}
