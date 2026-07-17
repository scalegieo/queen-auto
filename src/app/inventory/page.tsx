import type { Metadata } from "next";
import { Suspense } from "react";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { VehicleFilters } from "@/components/inventory/VehicleFilters";
import { SortSelect } from "@/components/inventory/SortSelect";
import { Pagination } from "@/components/inventory/Pagination";
import { getInventory } from "@/lib/inventory";
import { dealership } from "@/lib/dealership";
import type { InventorySort } from "@/types/vehicle";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${dealership.city} Used Cars for Sale`,
  description: `Browse premium used cars, SUVs, and trucks at ${dealership.name} in ${dealership.city}, ${dealership.state}. Filter by make, model, price, and year. Financing available.`,
  alternates: { canonical: `${dealership.siteUrl}/inventory` },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = Number(first(sp.page) ?? "1") || 1;
  const sort = (first(sp.sort) as InventorySort) || "newest";
  const filters = {
    make: first(sp.make),
    model: first(sp.model),
    bodyType: first(sp.bodyType),
    maxPrice: first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined,
    minYear: first(sp.minYear) ? Number(first(sp.minYear)) : undefined,
    q: first(sp.q),
  };

  const inventory = await getInventory({ filters, sort, page, pageSize: 12 });

  const filterParams = {
    make: filters.make,
    model: filters.model,
    bodyType: filters.bodyType,
    maxPrice: first(sp.maxPrice),
    minYear: first(sp.minYear),
    sort,
    q: filters.q,
  };

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Inventory
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {dealership.city} Used Cars
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Filter by make, model, price, and year — then apply for financing in minutes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Suspense fallback={<div className="h-40 border border-border bg-surface" />}>
          <VehicleFilters
            makes={inventory.makes}
            models={inventory.models}
            bodyTypes={inventory.bodyTypes}
            yearRange={inventory.yearRange}
            priceRange={inventory.priceRange}
          />
        </Suspense>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Showing{" "}
            <span className="text-text">
              {inventory.vehicles.length}
            </span>{" "}
            of {inventory.total} vehicles
          </p>
          <Suspense>
            <SortSelect />
          </Suspense>
        </div>

        {inventory.vehicles.length === 0 ? (
          <div className="mt-12 border border-border bg-surface p-12 text-center">
            <p className="font-display text-xl">No vehicles match your filters.</p>
            <p className="mt-2 text-sm text-muted">
              Try clearing filters or call us for incoming inventory.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inventory.vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        <Pagination
          page={inventory.page}
          totalPages={inventory.totalPages}
          searchParams={filterParams}
        />
      </div>
    </div>
  );
}
