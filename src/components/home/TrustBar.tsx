import { BadgeCheck, CreditCard, Languages, Users } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";

export function TrustBar({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const items = [
    { icon: Users, title: t.trust.family, text: t.trust.familyText },
    { icon: CreditCard, title: t.trust.finance, text: t.trust.financeText },
    { icon: BadgeCheck, title: t.trust.bhph, text: t.trust.bhphText },
    { icon: Languages, title: t.trust.spanish, text: t.trust.spanishText },
  ];

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-dim text-green">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
              <p className="mt-0.5 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
