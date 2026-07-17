export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMileage(miles: number) {
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function vehicleSlug(parts: {
  year: number;
  make: string;
  model: string;
  vin: string;
}) {
  const base = slugify(`${parts.year}-${parts.make}-${parts.model}`);
  const vinTail = parts.vin.slice(-6).toLowerCase();
  return `${base}-${vinTail}`;
}

/** Simple monthly payment estimate (not a formal quote) */
export function estimateMonthlyPayment(
  price: number,
  opts?: { downPayment?: number; apr?: number; termMonths?: number },
) {
  const down = opts?.downPayment ?? Math.round(price * 0.1);
  const principal = Math.max(price - down, 0);
  const apr = opts?.apr ?? 0.079;
  const term = opts?.termMonths ?? 72;
  const r = apr / 12;
  if (principal === 0) return 0;
  if (r === 0) return Math.round(principal / term);
  const payment =
    (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  return Math.round(payment);
}