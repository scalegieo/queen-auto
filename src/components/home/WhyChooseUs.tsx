import { Check } from "lucide-react";
import { dealership } from "@/lib/dealership";
import { getDictionary, type Locale } from "@/lib/i18n";

export function WhyChooseUs({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const reasons =
    locale === "es"
      ? [
          "Opciones de aprobación de crédito garantizada",
          "Financiamiento Compra Aquí Paga Aquí",
          "Trato real: transparente y sin presión",
          "Personal que habla español",
          "Precios competitivos en autos de calidad",
          `Concesionario local en ${dealership.city} de confianza real`,
        ]
      : [
          "Guaranteed credit approval options",
          "Buy Here Pay Here financing",
          "The royal treatment: transparent, no pressure",
          "Spanish-speaking staff available",
          "Competitive pricing on quality vehicles",
          `Denver's home of royal trust since ${dealership.foundedYear}`,
        ];

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            {t.why.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t.why.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {locale === "es"
              ? `Por más de dos décadas, ${dealership.name} ha tratado a cada cliente como realeza — el vehículo ideal con financiamiento que funciona.`
              : `For more than two decades, ${dealership.name} has treated every customer like royalty — the right vehicle with financing that fits.`}
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="flex gap-3 rounded-2xl border border-border bg-white p-4"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <span className="text-sm leading-relaxed">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
