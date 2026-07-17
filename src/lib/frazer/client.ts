import type { FrazerVehicleRaw } from "@/types/vehicle";
import { mapFrazerVehicle } from "@/lib/frazer/mapper";
import type { Vehicle } from "@/types/vehicle";
import { mockVehicles } from "@/lib/mock-inventory";

const DEFAULT_API_URL = "https://api.frazer.example.com/v1";

export function isFrazerConfigured() {
  return Boolean(process.env.FRAZER_API_KEY?.trim());
}

/**
 * Fetch inventory from Frazer DMS (or Frazer partner API).
 * Expects FRAZER_API_KEY and optional FRAZER_API_URL.
 *
 * Supported response shapes:
 * - { vehicles: [...] }
 * - { data: [...] }
 * - [...]
 */
export async function fetchFrazerInventory(): Promise<Vehicle[]> {
  const apiKey = process.env.FRAZER_API_KEY?.trim();
  if (!apiKey) {
    return mockVehicles;
  }

  const baseUrl = (
    process.env.FRAZER_API_URL?.trim() || DEFAULT_API_URL
  ).replace(/\/$/, "");
  const dealerId = process.env.FRAZER_DEALER_ID?.trim();
  const url = new URL(`${baseUrl}/vehicles`);
  if (dealerId) url.searchParams.set("dealerId", dealerId);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "X-API-Key": apiKey,
      Accept: "application/json",
    },
    next: { revalidate: 3600, tags: ["inventory"] },
  });

  if (!res.ok) {
    console.error(
      `[Frazer] Inventory fetch failed: ${res.status} ${res.statusText}`,
    );
    // Soft-fail to last-known mock so the site stays online
    return mockVehicles;
  }

  const payload = (await res.json()) as
    | FrazerVehicleRaw[]
    | { vehicles?: FrazerVehicleRaw[]; data?: FrazerVehicleRaw[] };

  const rawList: FrazerVehicleRaw[] = Array.isArray(payload)
    ? payload
    : (payload.vehicles ?? payload.data ?? []);

  const mapped = rawList
    .map(mapFrazerVehicle)
    .filter((v): v is Vehicle => Boolean(v))
    .filter((v) => v.status !== "sold");

  return mapped.length ? mapped : mockVehicles;
}

export async function syncFrazerInventory(): Promise<{
  count: number;
  source: "frazer" | "mock";
}> {
  const vehicles = await fetchFrazerInventory();
  return {
    count: vehicles.length,
    source: isFrazerConfigured() ? "frazer" : "mock",
  };
}