import type { MetadataRoute } from "next";
import { getCaps } from "@/lib/caps";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, "");
  const caps = await getCaps();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const capEntries = caps.map((cap) => ({
    url: `${base}/caps/${cap.id}`,
    lastModified: new Date(cap.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...capEntries];
}
