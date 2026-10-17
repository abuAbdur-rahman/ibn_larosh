import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cap photos are served same-origin by /api/media/<key>, so Next can optimise
  // and resize them (WebP/AVIF, per-breakpoint srcset) without a remote pattern.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  experimental: {
    serverActions: {
      // Admin uploads allow 5 MB photos; multipart framing adds ~20 KB.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
