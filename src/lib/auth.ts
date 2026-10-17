import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/* Auth primitives only — no Next imports, so they can be unit-tested
   outside a request. Session cookies live in ./session. */

export const SESSION_COOKIE = "ibn_admin";
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;
const SESSION_SUBJECT = "admin";

function secret(): string {
  const value = process.env.SESSION_SECRET?.trim();
  if (!value) {
    throw new Error("SESSION_SECRET is not set");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function digestsMatch(a: string, b: string): boolean {
  // Hash first so lengths always match and comparison time is constant.
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

/** Compare submitted credentials with env values (constant time). */
export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) return false;

  // Evaluate both to avoid short-circuiting on the username.
  const userOk = digestsMatch(username, expectedUser);
  const passOk = digestsMatch(password, expectedPass);
  return userOk && passOk;
}

function isExpired(expires: number, now: number): boolean {
  return !Number.isFinite(expires) || expires <= now;
}

export function createSessionToken(now = Date.now()): string {
  const expires = now + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${SESSION_SUBJECT}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [subject, expiresRaw, signature] = parts;
  if (subject !== SESSION_SUBJECT || isExpired(Number(expiresRaw), now)) return false;

  return digestsMatch(signature, sign(`${subject}.${expiresRaw}`));
}
