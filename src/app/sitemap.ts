import type { MetadataRoute } from "next";
import { dealership } from "@/lib/dealership";
import { getAllVehicles } from "@/lib/inventory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = dealership.siteUrl;
  const vehicles = await getAllVehicles();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/inventory",
    "/specials",
    "/financing",
    "/trade-in",
    "/about",
    "/contact",
    "/es",
    "/es/inventory",
    "/es/specials",
    "/es/financing",
    "/es/trade-in",
    "/es/about",
    "/es/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("inventory") ? "daily" : "weekly",
    priority: path === "" || path === "/es" ? 1 : 0.8,
  }));

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${base}/inventory/${v.slug}`,
    lastModified: new Date(v.updatedAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticPages, ...vehiclePages];
}
