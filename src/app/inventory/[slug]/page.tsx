import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCarousel } from "@/components/vehicle/ImageCarousel";
import { StickySidebar } from "@/components/vehicle/StickySidebar";
import { SpecsTable } from "@/components/vehicle/SpecsTable";
import { CarfaxSection } from "@/components/vehicle/CarfaxSection";
import { TradeInForm, PreApprovalForm } from "@/components/forms/LeadForms";
import { VehicleJsonLd } from "@/components/seo/JsonLd";
import { getAllVehicles, getVehicleBySlug } from "@/lib/inventory";
import { dealership } from "@/lib/dealership";
import { formatMileage } from "@/lib/format";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const vehicles = await getAllVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  return {
    title: `${vehicle.title} for Sale in ${dealership.city}`,
    description: `${vehicle.title} — ${formatMileage(vehicle.mileage)}. Available at ${dealership.name}. Financing available.`,
    alternates: {
      canonical: `${dealership.siteUrl}/inventory/${vehicle.slug}`,
    },
    openGraph: {
      title: vehicle.title,
      description: vehicle.description,
      images: vehicle.images[0] ? [vehicle.images[0]] : undefined,
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <div className="pt-[var(--header-h)]">
      <VehicleJsonLd vehicle={vehicle} />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <nav className="mb-6 text-xs uppercase tracking-[0.12em] text-muted">
          <Link href="/inventory" className="hover:text-gold">
            Inventory
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text/80">{vehicle.title}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {vehicle.title}
          </h1>
          <p className="mt-3 text-muted">
            {formatMileage(vehicle.mileage)} · {vehicle.bodyType}
            {vehicle.exteriorColor ? ` · ${vehicle.exteriorColor}` : ""}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-12">
            <ImageCarousel images={vehicle.images} alt={vehicle.title} />

            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Overview
              </h2>
              <p className="mt-4 leading-relaxed text-text/85">
                {vehicle.description}
              </p>
              {vehicle.features.length > 0 && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {vehicle.features.map((f) => (
                    <li
                      key={f}
                      className="border border-border bg-surface px-4 py-3 text-sm"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <SpecsTable vehicle={vehicle} />
            <CarfaxSection vehicle={vehicle} />

            <section className="border border-border bg-bg-elevated p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Get Financed on This Vehicle
              </h2>
              <p className="mt-2 text-sm text-muted">
                Pre-approval is fast. Bad credit? No problem — we can help.
              </p>
              <div className="mt-6">
                <PreApprovalForm vehicleSlug={vehicle.slug} />
              </div>
            </section>

            <section className="border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Trade-In Your Current Vehicle
              </h2>
              <p className="mt-2 text-sm text-muted">
                Get an instant appraisal request — we want your vehicle.
              </p>
              <div className="mt-6">
                <TradeInForm />
              </div>
            </section>
          </div>

          <StickySidebar vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}
