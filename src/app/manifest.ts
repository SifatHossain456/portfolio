import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.title}`,
    short_name: profile.name,
    description: profile.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: profile.avatar, sizes: "192x192", type: "image/png" },
      { src: profile.avatar, sizes: "512x512", type: "image/png" },
    ],
  };
}