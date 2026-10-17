import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deliberate for v0: cap photos load straight from R2 public URLs whose
  // custom domain isn't finalized yet. Flip to false + remotePatterns once
  // img.ibnlarosh.com (or r2.dev) is locked in. Tracked in PHASE.md.
  images: { unoptimized: true },
};

export default nextConfig;
