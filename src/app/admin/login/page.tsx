import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { Panel } from "@/components/ui-kit/field";
import { hasSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await hasSession()) redirect("/admin");

  return (
    <div
      className="mx-auto max-w-[420px] px-3.5 py-[clamp(32px,8vw,72px)]"
      data-admin
    >
      <Panel>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-g7 uppercase">
          IBN Larosh · Admin
        </span>
        <h1 className="my-1.5 mb-2 text-[30px] text-g9">Sign in</h1>
        <p className="mt-1 text-sm text-mut">
          Manage the catalog. Only the shop owner should have these credentials.
        </p>
        <LoginForm />
        <p className="mt-4.5 text-[13px]">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-g7"
          >
            <ChevronLeft className="ic" aria-hidden="true" /> Back to the shop
          </Link>
        </p>
      </Panel>
    </div>
  );
}
