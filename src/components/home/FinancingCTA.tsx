import Link from "next/link";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export function FinancingCTA({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-green-bright">
          {t.financingCta.eyebrow}
        </p>
        <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t.financingCta.title}
        </h2>
        <p className="mt-4 max-w-lg text-white/65">{t.financingCta.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={localizedHref(locale, "/financing")} className="btn-primary">
            {t.financingCta.apply}
          </Link>
          <Link href={localizedHref(locale, "/trade-in")} className="btn-secondary">
            {t.financingCta.trade}
          </Link>
        </div>
      </div>
    </section>
  );
}
