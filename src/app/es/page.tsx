import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";
import { dealership } from "@/lib/dealership";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Autos Usados en ${dealership.city} | Financiamiento Fácil`,
  description: `${dealership.name} — autos usados en ${dealership.city}. Financiamiento fácil, aprobación garantizada, Compra Aquí Paga Aquí. Se habla Español.`,
  alternates: {
    canonical: `${dealership.siteUrl}/es`,
    languages: {
      en: dealership.siteUrl,
      es: `${dealership.siteUrl}/es`,
    },
  },
};

export default async function SpanishHome() {
  return <HomeView locale="es" />;
}
