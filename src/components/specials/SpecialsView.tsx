import Link from "next/link";
import { BadgePercent, Crown, Phone } from "lucide-react";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { getSpecialVehicles } from "@/lib/inventory";
import { dealership, telHref } from "@/lib/dealership";
import { formatPrice } from "@/lib/format";
import { localizedHref, type Locale } from "@/lib/i18n";

export async function SpecialsView({ locale = "en" }: { locale?: Locale }) {
  const specials = await getSpecialVehicles();
  const isEs = locale === "es";
  const totalSavings = specials.reduce(
    (sum, v) => sum + ((v.originalPrice ?? v.price) - v.price),
    0,
  );

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-bright">
            <Crown className="h-4 w-4" />
            {isEs ? "Ofertas Reales" : "Royal Specials"}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {isEs
              ? "Ofertas especiales dignas de una reina"
              : "Special deals fit for a queen"}
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            {isEs
              ? "Precios rebajados en vehículos seleccionados — inspeccionados, listos para manejar y con financiamiento fácil. Cuando se van, se van."
              : "Marked-down pricing on select vehicles — inspected, road-ready, and easy to finance. When they're gone, they're gone."}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizedHref(locale, "/financing")}
              className="btn-primary"
            >
              {isEs ? "Pre-Aprobación" : "Get Pre-Approved"}
            </Link>
            <a href={telHref()} className="btn-secondary inline-flex">
              <Phone className="h-4 w-4" />
              {dealership.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {specials.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-12 text-center">
            <BadgePercent className="mx-auto h-10 w-10 text-green" />
            <p className="mt-4 font-display text-xl font-semibold">
              {isEs
                ? "Nuevas ofertas muy pronto."
                : "New specials are on the way."}
            </p>
            <p className="mt-2 text-sm text-muted">
              {isEs
                ? `Llámanos al ${dealership.phoneDisplay} para conocer los precios especiales de esta semana.`
                : `Call us at ${dealership.phoneDisplay} to hear this week's special pricing before it hits the site.`}
            </p>
            <Link
              href={localizedHref(locale, "/inventory")}
              className="btn-primary mt-6 inline-flex"
            >
              {isEs ? "Ver Inventario" : "Browse Inventory"}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm text-muted">
                {isEs ? (
                  <>
                    <span className="font-semibold text-text">
                      {specials.length}
                    </span>{" "}
                    vehículos en oferta ·{" "}
                    <span className="font-semibold text-green">
                      {formatPrice(totalSavings)}
                    </span>{" "}
                    en ahorros totales
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-text">
                      {specials.length}
                    </span>{" "}
                    vehicles on special ·{" "}
                    <span className="font-semibold text-green">
                      {formatPrice(totalSavings)}
                    </span>{" "}
                    in total savings
                  </>
                )}
              </p>
              <Link
                href={localizedHref(locale, "/inventory")}
                className="text-sm font-semibold text-green hover:underline"
              >
                {isEs ? "Ver todo el inventario →" : "View full inventory →"}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specials.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 rounded-2xl border border-border bg-bg-elevated p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {isEs
              ? "¿Mal crédito? Estas ofertas también son para ti."
              : "Bad credit? These deals are for you too."}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            {isEs
              ? "Cada oferta califica para nuestro financiamiento con aprobación garantizada y Compra Aquí Paga Aquí."
              : "Every special qualifies for our guaranteed-approval financing and Buy Here Pay Here program."}
          </p>
          <Link
            href={localizedHref(locale, "/financing")}
            className="btn-primary mt-6 inline-flex"
          >
            {isEs ? "Aplicar Ahora" : "Apply Now"}
          </Link>
        </div>
      </div>
    </div>
  );
}
