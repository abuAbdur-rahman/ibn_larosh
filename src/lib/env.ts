/* Server-only env access. Never import from client components.
   Reading process.env directly is fine; these helpers add trimming +
   explicit failure messages instead of silent undefined. */

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function requireEnv(name: string): string {
  const value = env(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** All R2 settings in one place; the browser never receives these. */
export function r2Config() {
  return {
    accountId: requireEnv("CLOUDFLARE_ACCOUNT_ID"),
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    bucket: requireEnv("R2_BUCKET"),
  };
}
