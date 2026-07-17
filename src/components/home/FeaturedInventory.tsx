import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export function FeaturedInventory({
  vehicles,
  locale = "en",
}: {
  vehicles: Vehicle[];
  locale?: Locale;
}) {
  const t = getDictionary(locale);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
              {t.featured.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t.featured.title}
            </h2>
          </div>
          <Link
            href={localizedHref(locale, "/inventory")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green transition-colors hover:text-green-bright"
          >
            {t.featured.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
