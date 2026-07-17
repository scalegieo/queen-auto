import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/LeadForms";
import { dealership, telHref } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Contact ${dealership.name} in ${dealership.city}`,
  description: `Visit ${dealership.name} at ${dealership.addressFull}. Call ${dealership.phoneDisplay}. Mon–Sat 9:30 AM – 6:00 PM.`,
  alternates: { canonical: `${dealership.siteUrl}/contact` },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const vehicle = Array.isArray(sp.vehicle) ? sp.vehicle[0] : sp.vehicle;
  const intent = Array.isArray(sp.intent) ? sp.intent[0] : sp.intent;

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let’s get you driving
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Call, visit, or send a message — our team responds quickly.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <Phone className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Click to Call</h2>
              <a
                href={telHref()}
                className="mt-2 block text-lg text-green hover:text-green-bright"
              >
                {dealership.phoneDisplay}
              </a>
              <a
                href={telHref(dealership.phoneEs)}
                className="mt-1 block text-sm text-muted hover:text-green"
              >
                Español: {dealership.phoneEsDisplay}
              </a>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <MapPin className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Visit Us</h2>
              <p className="mt-2 text-sm text-muted">{dealership.addressFull}</p>
              <a
                href={dealership.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-green hover:text-green-bright"
              >
                Get Directions →
              </a>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <Clock className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Business Hours</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {dealership.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span>{h.close ? `${h.open} – ${h.close}` : h.open}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="aspect-[16/11] overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Queen Auto Sales map"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Queen Auto Sales, 7405 E Colfax Ave, Denver, CO 80220")}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {intent === "test-drive" ? "Schedule a Test Drive" : "Contact Form"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            We’ll get back to you as soon as possible.
          </p>
          <div className="mt-8">
            <ContactForm vehicleSlug={vehicle} intent={intent} />
          </div>
        </div>
      </div>
    </div>
  );
}
