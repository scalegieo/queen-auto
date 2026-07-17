"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { InventorySort } from "@/types/vehicle";

const options: { value: InventorySort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "year-desc", label: "Year: Newest" },
];

export function SortSelect({ basePath = "/inventory" }: { basePath?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const current = (params.get("sort") as InventorySort) || "newest";

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-xs uppercase tracking-[0.12em] text-muted">
        Sort
      </label>
      <select
        id="sort"
        className="input-field !w-auto min-w-[11rem]"
        value={current}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          next.set("sort", e.target.value);
          next.delete("page");
          startTransition(() => {
            router.push(`${basePath}?${next.toString()}`, { scroll: false });
          });
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
