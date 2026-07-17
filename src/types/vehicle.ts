export type BodyType =
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Coupe"
  | "Van"
  | "Hatchback"
  | "Wagon"
  | "Convertible"
  | "Other";

export interface Vehicle {
  id: string;
  slug: string;
  stockNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  title: string;
  price: number;
  /** Original asking price — when higher than price the vehicle is a special. */
  originalPrice?: number;
  mileage: number;
  bodyType: BodyType;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  drivetrain?: string;
  engine?: string;
  fuelType?: string;
  doors?: number;
  mpgCity?: number;
  mpgHighway?: number;
  description: string;
  features: string[];
  images: string[];
  carfaxUrl?: string;
  status: "available" | "pending" | "sold";
  listedAt: string;
  updatedAt: string;
}

export interface InventoryFilters {
  make?: string;
  model?: string;
  bodyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  q?: string;
}

export type InventorySort =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "mileage-asc"
  | "mileage-desc"
  | "year-desc";

export interface PaginatedInventory {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  makes: string[];
  models: string[];
  bodyTypes: string[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
}

/** Raw Frazer / partner API vehicle shape (flexible mapping) */
export interface FrazerVehicleRaw {
  id?: string | number;
  stock_number?: string;
  stockNumber?: string;
  vin?: string;
  year?: number | string;
  make?: string;
  model?: string;
  trim?: string;
  price?: number | string;
  asking_price?: number | string;
  mileage?: number | string;
  odometer?: number | string;
  body_style?: string;
  bodyType?: string;
  exterior_color?: string;
  interior_color?: string;
  transmission?: string;
  drivetrain?: string;
  engine?: string;
  fuel_type?: string;
  doors?: number | string;
  description?: string;
  comments?: string;
  features?: string[] | string;
  options?: string[] | string;
  images?: string[] | { url: string }[];
  photos?: string[] | { url: string }[];
  photo_urls?: string[];
  carfax_url?: string;
  status?: string;
  date_in_stock?: string;
  updated_at?: string;
  [key: string]: unknown;
}