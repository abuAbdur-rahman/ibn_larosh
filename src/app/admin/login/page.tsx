import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { hasSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await hasSession()) redirect("/admin");

  return (
    <div className="page">
      <div className="admin-login">
        <div className="panel">
          <span className="eye admin-eyebrow">IBN Larosh · Admin</span>
          <h1>Sign in</h1>
          <p className="admin-sub">
            Manage the catalog. Only the shop owner should have these credentials.
          </p>
          <LoginForm />
          <p className="admin-back">
            <Link href="/">
              <ChevronLeft className="ic" aria-hidden="true" /> Back to the shop
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
