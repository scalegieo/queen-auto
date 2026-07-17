import type { MetadataRoute } from "next";
import { dealership } from "@/lib/dealership";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: dealership.name,
    short_name: "Queen Auto",
    description: `Get treated like a queen at ${dealership.name} — quality used cars and easy financing in ${dealership.city}, ${dealership.state}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a6b3a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
