import { FileSearch } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

export function CarfaxSection({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-dim text-green">
            <FileSearch className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Vehicle History Report
            </h2>
            <p className="mt-1 text-sm text-muted">
              Request a Carfax report for VIN {vehicle.vin}.
            </p>
          </div>
        </div>
        {vehicle.carfaxUrl ? (
          <a
            href={vehicle.carfaxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary on-light shrink-0"
          >
            View Carfax
          </a>
        ) : (
          <a href="/contact?intent=carfax" className="btn-secondary on-light shrink-0">
            Request Carfax
          </a>
        )}
      </div>
    </section>
  );
}
