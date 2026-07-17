import type { Metadata } from "next";
import { SpecialsView } from "@/components/specials/SpecialsView";
import { dealership } from "@/lib/dealership";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Ofertas de Autos en ${dealership.city}`,
  description: `Ofertas especiales en autos usados de calidad en ${dealership.name}. Precios rebajados, financiamiento fácil, mal crédito bienvenido.`,
};

export default function SpanishSpecialsPage() {
  return <SpecialsView locale="es" />;
}
