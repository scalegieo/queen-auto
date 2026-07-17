import { fetchFrazerInventory } from "@/lib/frazer/client";
import type {
  InventoryFilters,
  InventorySort,
  PaginatedInventory,
  Vehicle,
} from "@/types/vehicle";

export async function getAllVehicles(): Promise<Vehicle[]> {
  return fetchFrazerInventory();
}

export async function getVehicleBySlug(
  slug: string,
): Promise<Vehicle | undefined> {
  const vehicles = await getAllVehicles();
  return vehicles.find((v) => v.slug === slug || v.id === slug);
}

export async function getSpecialVehicles(): Promise<Vehicle[]> {
  const vehicles = await getAllVehicles();
  return vehicles
    .filter(
      (v) =>
        v.status === "available" &&
        v.originalPrice != null &&
        v.originalPrice > v.price,
    )
    .sort(
      (a, b) =>
        (b.originalPrice ?? b.price) - b.price - ((a.originalPrice ?? a.price) - a.price),
    );
}

export type PopularCategories = {
  bodyTypes: Array<{ label: string; count: number }>;
  makes: Array<{ label: string; count: number }>;
  models: Array<{ make: string; model: string; count: number }>;
};

export async function getPopularCategories(): Promise<PopularCategories> {
  const vehicles = await getAllVehicles();

  const countBy = (values: string[]) => {
    const map = new Map<string, number>();
    for (const value of values) {
      map.set(value, (map.get(value) ?? 0) + 1);
    }
    return map;
  };

  const bodyTypes = [...countBy(vehicles.map((v) => v.bodyType)).entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const makes = [...countBy(vehicles.map((v) => v.make)).entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const models = [
    ...countBy(vehicles.map((v) => `${v.make}\u0000${v.model}`)).entries(),
  ]
    .map(([key, count]) => {
      const [make, model] = key.split("\u0000");
      return { make, model, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 24);

  return { bodyTypes, makes, models };
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const vehicles = await getAllVehicles();
  return [...vehicles]
    .sort((a, b) => b.listedAt.localeCompare(a.listedAt))
    .slice(0, limit);
}

function applyFilters(vehicles: Vehicle[], filters: InventoryFilters) {
  return vehicles.filter((v) => {
    if (filters.make && v.make.toLowerCase() !== filters.make.toLowerCase()) {
      return false;
    }
    if (
      filters.model &&
      v.model.toLowerCase() !== filters.model.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.bodyType &&
      v.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()
    ) {
      return false;
    }
    if (filters.minPrice != null && v.price < filters.minPrice) return false;
    if (filters.maxPrice != null && v.price > filters.maxPrice) return false;
    if (filters.minYear != null && v.year < filters.minYear) return false;
    if (filters.maxYear != null && v.year > filters.maxYear) return false;
    if (filters.maxMileage != null && v.mileage > filters.maxMileage) {
      return false;
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const hay = `${v.title} ${v.make} ${v.model} ${v.vin} ${v.stockNumber}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function applySort(vehicles: Vehicle[], sort: InventorySort) {
  const list = [...vehicles];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "mileage-asc":
      return list.sort((a, b) => a.mileage - b.mileage);
    case "mileage-desc":
      return list.sort((a, b) => b.mileage - a.mileage);
    case "year-desc":
      return list.sort((a, b) => b.year - a.year);
    case "newest":
    default:
      return list.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  }
}

export async function getInventory(options: {
  filters?: InventoryFilters;
  sort?: InventorySort;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedInventory> {
  const all = await getAllVehicles();
  const filters = options.filters ?? {};
  const sort = options.sort ?? "newest";
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(48, Math.max(1, options.pageSize ?? 12));

  const filtered = applyFilters(all, filters);
  const sorted = applySort(filtered, sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const vehicles = sorted.slice(start, start + pageSize);

  const makes = [...new Set(all.map((v) => v.make))].sort();
  const models = [...new Set(all.map((v) => v.model))].sort();
  const bodyTypes = [...new Set(all.map((v) => v.bodyType))].sort();
  const prices = all.map((v) => v.price);
  const years = all.map((v) => v.year);

  return {
    vehicles,
    total,
    page: safePage,
    pageSize,
    totalPages,
    makes,
    models,
    bodyTypes,
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
    yearRange: {
      min: years.length ? Math.min(...years) : 2000,
      max: years.length ? Math.max(...years) : new Date().getFullYear(),
    },
  };
}