import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { dealership, telHref } from "@/lib/dealership";
import { estimateMonthlyPayment, formatPrice } from "@/lib/format";

export function StickySidebar({ vehicle }: { vehicle: Vehicle }) {
  const monthly = estimateMonthlyPayment(vehicle.price);

  return (
    <aside className="rounded-2xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Asking Price
      </p>
      <p className="mt-2 font-display text-4xl font-bold tracking-tight text-green">
        {formatPrice(vehicle.price)}
      </p>
      <p className="mt-2 text-sm text-muted">
        Est. {formatPrice(monthly)}/mo{" "}
        <span className="text-xs">(illustrative)</span>
      </p>

      <div className="mt-7 flex flex-col gap-2.5">
        <Link
          href={`/financing?vehicle=${encodeURIComponent(vehicle.slug)}`}
          className="btn-primary w-full"
        >
          Apply Now
        </Link>
        <Link
          href={`/contact?intent=test-drive&vehicle=${encodeURIComponent(vehicle.slug)}`}
          className="btn-secondary on-light w-full"
        >
          <Calendar className="h-4 w-4" />
          Schedule Test Drive
        </Link>
        <a href={telHref()} className="btn-ghost w-full">
          <Phone className="h-4 w-4" />
          Call {dealership.phoneDisplay}
        </a>
      </div>

      <div className="accent-line my-6" />

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Stock #</dt>
          <dd className="font-medium">{vehicle.stockNumber}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">VIN</dt>
          <dd className="truncate font-mono text-xs">{vehicle.vin}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Status</dt>
          <dd className="capitalize text-green">{vehicle.status}</dd>
        </div>
      </dl>
    </aside>
  );
}
