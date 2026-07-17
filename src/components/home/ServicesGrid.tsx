import Link from "next/link";
import { ArrowRight, Car, CircleDollarSign, Handshake, RefreshCw } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";

const icons = [Car, CircleDollarSign, Handshake, RefreshCw];

export function ServicesGrid({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="section-soft border-b border-border py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
          {t.services.eyebrow}
        </p>
        <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t.services.title}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? Car;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="lift-card group rounded-2xl border border-border bg-white p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-dim text-green">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
