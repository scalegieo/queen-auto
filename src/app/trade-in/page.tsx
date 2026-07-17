import type { Metadata } from "next";
import { TradeInForm } from "@/components/forms/LeadForms";
import { dealership } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Trade-In Valuation | ${dealership.city}`,
  description: `Get the best value for your trade-in at ${dealership.name}. Request an appraisal — we want your vehicle.`,
  alternates: { canonical: `${dealership.siteUrl}/trade-in` },
};

export default function TradeInPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Trade-In
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            We want your vehicle
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Request an appraisal. Fair offers, fast turnaround — applied toward
            your next ride.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Trade-In Valuation Form
          </h2>
          <p className="mt-2 text-sm text-muted">
            Tell us about your vehicle and we’ll follow up quickly.
          </p>
          <div className="mt-8">
            <TradeInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
