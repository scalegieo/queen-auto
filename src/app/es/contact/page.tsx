import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/LeadForms";
import { dealership, telHref } from "@/lib/dealership";

export const metadata: Metadata = {
  title: `Contacto | ${dealership.name}`,
  description: `Visítanos en ${dealership.addressFull}. Llama al ${dealership.phoneEsDisplay}.`,
};

export default async function SpanishContactPage({
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
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            Contacto
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Hablemos
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Llama, visita o envía un mensaje — respondemos rápido. Se habla Español.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <Phone className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Llamar</h2>
              <a href={telHref(dealership.phoneEs)} className="mt-2 block text-lg text-green">
                {dealership.phoneEsDisplay}
              </a>
              <a href={telHref()} className="mt-1 block text-sm text-muted">
                EN: {dealership.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <MapPin className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Visítanos</h2>
              <p className="mt-2 text-sm text-muted">{dealership.addressFull}</p>
              <a
                href={dealership.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-green"
              >
                Cómo llegar →
              </a>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
            <Clock className="h-5 w-5 shrink-0 text-green" />
            <div>
              <h2 className="font-semibold">Horario</h2>
              <p className="mt-2 text-sm text-muted">Lun–Sáb 9:30 AM – 6:00 PM · Dom Cerrado</p>
            </div>
          </div>

          <div className="aspect-[16/11] overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Mapa Queen Auto Sales"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(dealership.addressFull)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {intent === "test-drive" ? "Agendar Prueba de Manejo" : "Formulario de Contacto"}
          </h2>
          <div className="mt-8">
            <ContactForm vehicleSlug={vehicle} intent={intent} />
          </div>
        </div>
      </div>
    </div>
  );
}
