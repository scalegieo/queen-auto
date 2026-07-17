import { NextResponse } from "next/server";
import { getInventory } from "@/lib/inventory";
import type { InventorySort } from "@/types/vehicle";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? "12") || 12;
  const sort = (searchParams.get("sort") as InventorySort) || "newest";

  const inventory = await getInventory({
    page,
    pageSize,
    sort,
    filters: {
      make: searchParams.get("make") ?? undefined,
      model: searchParams.get("model") ?? undefined,
      bodyType: searchParams.get("bodyType") ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      minYear: searchParams.get("minYear")
        ? Number(searchParams.get("minYear"))
        : undefined,
      maxYear: searchParams.get("maxYear")
        ? Number(searchParams.get("maxYear"))
        : undefined,
      maxMileage: searchParams.get("maxMileage")
        ? Number(searchParams.get("maxMileage"))
        : undefined,
      q: searchParams.get("q") ?? undefined,
    },
  });

  return NextResponse.json(inventory, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
