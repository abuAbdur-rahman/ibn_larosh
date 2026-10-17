import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IBN Larosh Enterprises",
    short_name: "IBN Larosh",
    description: "Quality Hausa caps in Ilorin — order on WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF4E1",
    theme_color: "#0A3B22",
    icons: [
      {
        src: "/brand/emblem.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
