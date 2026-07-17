import type { MetadataRoute } from "next";
import { dealership } from "@/lib/dealership";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${dealership.siteUrl}/sitemap.xml`,
  };
}
