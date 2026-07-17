import type { FrazerVehicleRaw, Vehicle } from "@/types/vehicle";
import { vehicleSlug } from "@/lib/format";

const FALLBACK_IMAGE = "/images/vehicle-fallback.svg";

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v : String(v)))
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[|,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function extractImages(raw: FrazerVehicleRaw): string[] {
  const candidates = [
    raw.images,
    raw.photos,
    raw.photo_urls,
  ].filter(Boolean);

  for (const source of candidates) {
    if (!source) continue;
    if (Array.isArray(source)) {
      const urls = source
        .map((item) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object" && "url" in item) {
            return String((item as { url: string }).url);
          }
          return "";
        })
        .filter((url) => /^https?:\/\//i.test(url) || url.startsWith("/"));
      if (urls.length) return urls;
    }
  }
  return [FALLBACK_IMAGE];
}

function normalizeBodyType(value?: string): Vehicle["bodyType"] {
  const v = (value ?? "").toLowerCase();
  if (v.includes("suv") || v.includes("crossover")) return "SUV";
  if (v.includes("truck") || v.includes("pickup")) return "Truck";
  if (v.includes("coupe")) return "Coupe";
  if (v.includes("van") || v.includes("minivan")) return "Van";
  if (v.includes("hatch")) return "Hatchback";
  if (v.includes("wagon")) return "Wagon";
  if (v.includes("convert")) return "Convertible";
  if (v.includes("sedan") || v.includes("car")) return "Sedan";
  return "Other";
}

function normalizeStatus(value?: string): Vehicle["status"] {
  const v = (value ?? "available").toLowerCase();
  if (v.includes("sold")) return "sold";
  if (v.includes("pending") || v.includes("hold")) return "pending";
  return "available";
}

export function mapFrazerVehicle(raw: FrazerVehicleRaw): Vehicle | null {
  const year = toNumber(raw.year);
  const make = String(raw.make ?? "").trim();
  const model = String(raw.model ?? "").trim();
  const vin = String(raw.vin ?? "").trim().toUpperCase();

  if (!year || !make || !model) return null;

  const trim = raw.trim ? String(raw.trim).trim() : undefined;
  const title = [year, make, model, trim].filter(Boolean).join(" ");
  const id = String(raw.id ?? vin ?? `${year}-${make}-${model}`);
  const stockNumber = String(
    raw.stock_number ?? raw.stockNumber ?? id,
  ).trim();
  const price = toNumber(raw.price ?? raw.asking_price);
  const askingPrice = toNumber(raw.asking_price);
  const originalPrice = askingPrice > price ? askingPrice : undefined;
  const mileage = toNumber(raw.mileage ?? raw.odometer);
  const images = extractImages(raw);
  const features = toStringList(raw.features ?? raw.options);
  const description =
    String(raw.description ?? raw.comments ?? "").trim() ||
    `${title} available now at Queen Auto Sales in Denver, CO.`;

  const listedAt =
    raw.date_in_stock ?? raw.updated_at ?? new Date().toISOString();
  const updatedAt = raw.updated_at ?? listedAt;

  return {
    id,
    slug: vehicleSlug({ year, make, model, vin: vin || id }),
    stockNumber,
    vin: vin || "PENDINGVIN",
    year,
    make,
    model,
    trim,
    title,
    price,
    originalPrice,
    mileage,
    bodyType: normalizeBodyType(
      String(raw.body_style ?? raw.bodyType ?? ""),
    ),
    exteriorColor: raw.exterior_color
      ? String(raw.exterior_color)
      : undefined,
    interiorColor: raw.interior_color
      ? String(raw.interior_color)
      : undefined,
    transmission: raw.transmission ? String(raw.transmission) : undefined,
    drivetrain: raw.drivetrain ? String(raw.drivetrain) : undefined,
    engine: raw.engine ? String(raw.engine) : undefined,
    fuelType: raw.fuel_type ? String(raw.fuel_type) : undefined,
    doors: raw.doors ? toNumber(raw.doors) : undefined,
    description,
    features,
    images,
    carfaxUrl: raw.carfax_url ? String(raw.carfax_url) : undefined,
    status: normalizeStatus(raw.status),
    listedAt,
    updatedAt,
  };
}

export { FALLBACK_IMAGE };