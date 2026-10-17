import type { Metadata } from "next";
import { CapForm } from "@/components/admin/cap-form";
import { createCapAction } from "../actions";

export const metadata: Metadata = {
  title: "New cap · Admin",
  robots: { index: false, follow: false },
};

export default function NewCapPage() {
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">New cap</h1>
          <p className="admin-sub">Upload a photo and fill in the details.</p>
        </div>
      </div>
      <CapForm action={createCapAction} submitLabel="Save cap" />
    </>
  );
}
