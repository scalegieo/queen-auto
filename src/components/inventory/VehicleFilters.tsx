"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface Props {
  makes: string[];
  models: string[];
  bodyTypes: string[];
  yearRange: { min: number; max: number };
  priceRange: { min: number; max: number };
  basePath?: string;
}

export function VehicleFilters({
  makes,
  models,
  bodyTypes,
  yearRange,
  priceRange,
  basePath = "/inventory",
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      startTransition(() => {
        router.push(`${basePath}?${next.toString()}`, { scroll: false });
      });
    },
    [params, router, basePath],
  );

  const clear = () => {
    startTransition(() => router.push(basePath));
  };

  return (
    <form
      className={`grid gap-4 rounded-2xl border border-border bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 ${pending ? "opacity-70" : ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="label" htmlFor="make">
          Make
        </label>
        <select
          id="make"
          className="input-field"
          value={params.get("make") ?? ""}
          onChange={(e) => update("make", e.target.value)}
        >
          <option value="">All Makes</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="model">
          Model
        </label>
        <select
          id="model"
          className="input-field"
          value={params.get("model") ?? ""}
          onChange={(e) => update("model", e.target.value)}
        >
          <option value="">All Models</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="bodyType">
          Body Type
        </label>
        <select
          id="bodyType"
          className="input-field"
          value={params.get("bodyType") ?? ""}
          onChange={(e) => update("bodyType", e.target.value)}
        >
          <option value="">All Types</option>
          {bodyTypes.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="maxPrice">
          Max Price
        </label>
        <select
          id="maxPrice"
          className="input-field"
          value={params.get("maxPrice") ?? ""}
          onChange={(e) => update("maxPrice", e.target.value)}
        >
          <option value="">Any Price</option>
          {[15000, 25000, 35000, 45000, 60000, 80000, 100000]
            .filter((p) => p >= priceRange.min)
            .map((p) => (
              <option key={p} value={p}>
                Under ${p.toLocaleString()}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="minYear">
          Min Year
        </label>
        <select
          id="minYear"
          className="input-field"
          value={params.get("minYear") ?? ""}
          onChange={(e) => update("minYear", e.target.value)}
        >
          <option value="">Any Year</option>
          {Array.from(
            { length: yearRange.max - yearRange.min + 1 },
            (_, i) => yearRange.max - i,
          ).map((y) => (
            <option key={y} value={y}>
              {y}+
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button type="button" onClick={clear} className="btn-ghost w-full">
          Clear Filters
        </button>
      </div>
    </form>
  );
}
