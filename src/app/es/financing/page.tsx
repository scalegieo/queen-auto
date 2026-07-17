import type { Metadata } from "next";
import { BadgeCheck, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { PreApprovalForm } from "@/components/forms/LeadForms";
import { dealership } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Financiamiento Automotriz en ${dealership.city}`,
  description: `Pre-aprobación en ${dealership.name}. Aprobación garantizada, Compra Aquí Paga Aquí.`,
};

const benefits = [
  {
    icon: BadgeCheck,
    title: "Opciones de Aprobación",
    text: "Cuando otros dicen no, buscamos un camino para aprobarte.",
  },
  {
    icon: Clock,
    title: "Pre-Aprobación Rápida",
    text: "Aplicación simple. Respuesta rápida. Maneja pronto.",
  },
  {
    icon: ShieldCheck,
    title: "Términos Claros",
    text: "Pagos transparentes y guía sin presión.",
  },
  {
    icon: Sparkles,
    title: "Compra Aquí Paga Aquí",
    text: "Financiamiento interno disponible.",
  },
];

export default async function SpanishFinancingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const vehicle = Array.isArray(sp.vehicle) ? sp.vehicle[0] : sp.vehicle;

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Financiamiento
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Obtén Pre-Aprobación Hoy
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Autos premium. Financiamiento fácil. Mal crédito bienvenido.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Beneficios de financiar aquí
          </h2>
          <ul className="mt-8 space-y-5">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-dim text-green">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Formulario de Pre-Aprobación
          </h2>
          <p className="mt-2 text-sm text-muted">
            Confidencial. Revisado por nuestros especialistas.
          </p>
          <div className="mt-8">
            <PreApprovalForm vehicleSlug={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
}
