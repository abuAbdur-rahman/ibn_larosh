import type { MetadataRoute } from "next";
import { getSeedCaps } from "@/lib/seed";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES = [
  "",
  "/caps",
  "/custom",
  "/sizes",
  "/delivery",
  "/faq",
  "/about",
  "/contact",
  "/more",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const capEntries = getSeedCaps().map((cap) => ({
    url: `${base}/caps/${cap.id}`,
    lastModified: new Date(cap.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...capEntries];
}
