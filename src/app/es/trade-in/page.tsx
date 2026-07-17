import type { Metadata } from "next";
import { TradeInForm } from "@/components/forms/LeadForms";
import { dealership } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Valora tu Auto | ${dealership.city}`,
  description: `Obtén el mejor valor por tu cambio en ${dealership.name}.`,
};

export default function SpanishTradeInPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Cambio / Trade-In
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Queremos tu vehículo
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Solicita una valuación. Ofertas justas y rápidas.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Formulario de Valuación
          </h2>
          <div className="mt-8">
            <TradeInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
