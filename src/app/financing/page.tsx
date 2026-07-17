import type { Metadata } from "next";
import { BadgeCheck, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { PreApprovalForm } from "@/components/forms/LeadForms";
import { dealership } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Auto Financing in ${dealership.city}`,
  description: `Get pre-approved for auto financing at ${dealership.name}. Guaranteed credit approval, Buy Here Pay Here, and flexible options for every credit situation.`,
  alternates: { canonical: `${dealership.siteUrl}/financing` },
};

const benefits = [
  {
    icon: BadgeCheck,
    title: "Guaranteed Approval Options",
    text: "When others say no, we work to find a path that gets you approved.",
  },
  {
    icon: Clock,
    title: "Fast Pre-Approval",
    text: "Simple application. Quick response. Drive sooner.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Terms",
    text: "Clear payments and no-pressure guidance from our team.",
  },
  {
    icon: Sparkles,
    title: "Buy Here Pay Here",
    text: "In-house financing available for qualified buyers.",
  },
];

export default async function FinancingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const vehicle = Array.isArray(sp.vehicle) ? sp.vehicle[0] : sp.vehicle;

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Financing
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Get Pre-Approved Today
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Bad credit, no credit, or rebuilding — everyone gets the royal
            treatment at {dealership.name}. Get approved and on the road.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Why finance here
          </h2>
          <ul className="mt-6 space-y-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-5"
              >
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

          <div className="mt-8 flex flex-wrap gap-2">
            {["Buy Here Pay Here", "Se Habla Español", "Family Owned", "Since 1999"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-muted"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Pre-Approval Form
          </h2>
          <p className="mt-2 text-sm text-muted">
            Takes a few minutes. Our team follows up quickly.
          </p>
          <div className="mt-8">
            <PreApprovalForm vehicleSlug={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
}
