import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatPrice } from "@/lib/format";
import { FALLBACK_IMAGE } from "@/lib/frazer/mapper";
import { localizedHref, type Locale } from "@/lib/i18n";

export function VehicleCard({
  vehicle,
  locale = "en",
}: {
  vehicle: Vehicle;
  locale?: Locale;
}) {
  const image = vehicle.images[0] || FALLBACK_IMAGE;
  const isSpecial =
    vehicle.originalPrice != null && vehicle.originalPrice > vehicle.price;
  const detailHref = localizedHref(locale, `/inventory/${vehicle.slug}`);
  const applyHref = `${localizedHref(locale, "/financing")}?vehicle=${encodeURIComponent(vehicle.slug)}`;

  return (
    <article className="lift-card group flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
      <Link
        href={detailHref}
        className="relative block aspect-[16/10] overflow-hidden bg-bg-elevated"
      >
        <Image
          src={image}
          alt={vehicle.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="vehicle-card-image object-cover"
          loading="lazy"
        />
        {isSpecial && (
          <span className="absolute left-3 top-3 rounded-full bg-green px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white shadow-md">
            {locale === "es" ? "Oferta" : "Special"}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-baseline gap-2 text-lg font-bold text-green">
          {formatPrice(vehicle.price)}
          {isSpecial && (
            <span className="text-sm font-medium text-muted line-through">
              {formatPrice(vehicle.originalPrice!)}
            </span>
          )}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug tracking-tight">
          <Link href={detailHref} className="hover:text-green">
            {vehicle.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          {vehicle.year} · {formatMileage(vehicle.mileage)} · {vehicle.bodyType}
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <Link href={detailHref} className="btn-ghost flex-1 text-center">
            {locale === "es" ? "Ver Detalles" : "View Details"}
          </Link>
          <Link
            href={applyHref}
            className="btn-primary flex-1 !px-3 !py-2.5 text-center text-xs"
          >
            {locale === "es" ? "Aplicar" : "Apply Now"}
          </Link>
        </div>
      </div>
    </article>
  );
}
