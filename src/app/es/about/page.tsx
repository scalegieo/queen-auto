import type { Metadata } from "next";
import Link from "next/link";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { dealership } from "@/lib/dealership";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: `Sobre ${dealership.name}`,
  description: `Conoce por qué conductores en ${dealership.city} confían en ${dealership.name}. Negocio familiar desde ${dealership.foundedYear}.`,
};

export default async function SpanishAboutPage() {
  const reviews = await getGoogleReviews();

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Nosotros
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Negocio familiar. Enfocados en tu aprobación.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Desde {dealership.foundedYear}, {dealership.name} ha ayudado a
            conductores en {dealership.city} a encontrar vehículos de calidad
            con financiamiento que funciona. Se habla Español.
          </p>
        </div>
      </div>

      <WhyChooseUs locale="es" />
      <div className="pb-10 text-center">
        <Link href="/es/inventory" className="btn-primary">
          Ver Inventario
        </Link>
      </div>
      <ReviewsSection locale="es" data={reviews} />
    </div>
  );
}
