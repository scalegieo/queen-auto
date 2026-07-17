import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { dealership, telHref } from "@/lib/dealership";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export function VisitUs({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="section-soft border-y border-border py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            {t.visit.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t.visit.title}
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex gap-3 rounded-2xl border border-border bg-white p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green" />
              <div>
                <p className="font-semibold">{dealership.addressFull}</p>
                <a
                  href={dealership.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-green hover:text-green-bright"
                >
                  {t.visit.directions} →
                </a>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-border bg-white p-5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green" />
              <div className="space-y-1 text-sm">
                <a href={telHref()} className="block font-semibold hover:text-green">
                  {dealership.phoneDisplay}
                </a>
                <a
                  href={telHref(dealership.phoneEs)}
                  className="block text-muted hover:text-green"
                >
                  {t.visit.spanishLine}: {dealership.phoneEsDisplay}
                </a>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-border bg-white p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-green" />
              <div>
                <p className="font-semibold">{t.visit.hours}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {dealership.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span>{h.close ? `${h.open} – ${h.close}` : h.open}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href={localizedHref(locale, "/contact")}
            className="btn-primary mt-6 inline-flex"
          >
            {t.nav.contact}
          </Link>
        </div>

        <div className="min-h-[320px] overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Queen Auto Sales map"
            src={`https://www.google.com/maps?q=${encodeURIComponent("Queen Auto Sales, 7405 E Colfax Ave, Denver, CO 80220")}&output=embed`}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
