import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IBN Larosh Enterprises",
    short_name: "IBN Larosh",
    description:
      "Quality Hausa caps in Ilorin — Tajia, kaftan caps, fancy weaves and custom orders. Order on WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF4E1",
    theme_color: "#0A3B22",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
