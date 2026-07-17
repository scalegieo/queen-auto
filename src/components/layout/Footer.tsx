import Link from "next/link";
import Image from "next/image";
import { dealership, telHref } from "@/lib/dealership";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const year = new Date().getFullYear();
  const t = getDictionary(locale);

  const links = [
    { href: localizedHref(locale, "/inventory"), label: t.nav.inventory },
    { href: localizedHref(locale, "/specials"), label: t.nav.specials },
    { href: localizedHref(locale, "/financing"), label: t.nav.financing },
    { href: localizedHref(locale, "/trade-in"), label: t.nav.tradeIn },
    { href: localizedHref(locale, "/about"), label: t.nav.about },
    { href: localizedHref(locale, "/contact"), label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Image
            src="/images/logo-dark.png"
            alt={dealership.name}
            width={190}
            height={66}
            className="mb-5 h-10 w-auto object-contain"
          />
          <p className="max-w-md text-sm leading-relaxed text-white/65">
            {t.footer.tagline}{" "}
            {locale === "en"
              ? `Serving the community since ${dealership.foundedYear}.`
              : `Sirviendo a la comunidad desde ${dealership.foundedYear}.`}
          </p>
          <p className="mt-3 text-sm text-green-bright">{t.visit.spanishLine}</p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {t.footer.explore}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {t.footer.visit}
          </h3>
          <address className="space-y-3 text-sm not-italic text-white/80">
            <p>{dealership.addressFull}</p>
            <p>
              <a href={telHref()} className="hover:text-white">
                {dealership.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={telHref(dealership.phoneEs)} className="hover:text-white">
                ES: {dealership.phoneEsDisplay}
              </a>
            </p>
            <p className="text-white/50">Mon–Sat 9:30 AM – 6:00 PM</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/40 sm:flex-row sm:justify-between lg:px-8">
          <p>
            © {year} {dealership.name}. All rights reserved.
          </p>
          <p>
            {dealership.city} Used Cars · Financing · Trade-Ins
          </p>
        </div>
      </div>
    </footer>
  );
}
