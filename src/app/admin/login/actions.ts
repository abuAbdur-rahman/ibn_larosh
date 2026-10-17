"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { endSession, startSession } from "@/lib/session";

interface LoginState {
  error?: string;
}

const MAX_ATTEMPTS = 8;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;

/* Best-effort throttle per server instance. Serverless instances are not
   shared, but this still slows credential stuffing meaningfully. */
const attempts = new Map<string, { count: number; resetAt: number }>();

async function clientKey(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for") ?? "local";
  return forwarded.split(",")[0]!.trim();
}

function isThrottled(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= Date.now()) return false;
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export async function loginAction(
  _previous: LoginState,
  formData: FormData
): Promise<LoginState> {
  const key = await clientKey();

  if (isThrottled(key)) {
    return { error: "Too many attempts. Try again in 10 minutes." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(username, password)) {
    recordFailure(key);
    return { error: "Incorrect username or password." };
  }

  attempts.delete(key);
  await startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
