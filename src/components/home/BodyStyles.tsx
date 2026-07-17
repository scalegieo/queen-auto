import Link from "next/link";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

const styles = [
  { key: "SUV", label: { en: "SUVs", es: "SUVs" }, q: "SUV" },
  { key: "Sedan", label: { en: "Sedans", es: "Sedanes" }, q: "Sedan" },
  { key: "Truck", label: { en: "Trucks", es: "Camionetas" }, q: "Truck" },
  { key: "Coupe", label: { en: "Coupes", es: "Coupés" }, q: "Coupe" },
];

export function BodyStyles({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
          {t.bodyStyles.eyebrow}
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t.bodyStyles.title}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {styles.map((s) => (
            <Link
              key={s.key}
              href={`${localizedHref(locale, "/inventory")}?bodyType=${s.q}`}
              className="lift-card rounded-2xl border border-border bg-white px-4 py-6 text-center font-semibold hover:text-green"
            >
              {s.label[locale]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
