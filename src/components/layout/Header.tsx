"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { dealership, telHref } from "@/lib/dealership";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function Header({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale);

  const nav = [
    { href: localizedHref(locale, "/inventory"), label: t.nav.inventory },
    { href: localizedHref(locale, "/specials"), label: t.nav.specials },
    { href: localizedHref(locale, "/financing"), label: t.nav.financing },
    { href: localizedHref(locale, "/trade-in"), label: t.nav.tradeIn },
    { href: localizedHref(locale, "/about"), label: t.nav.about },
    { href: localizedHref(locale, "/contact"), label: t.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phone = locale === "es" ? dealership.phoneEs : dealership.phone;
  const phoneDisplay =
    locale === "es" ? dealership.phoneEsDisplay : dealership.phoneDisplay;

  return (
    <>
      <header className="glass-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
          <Link
            href={localizedHref(locale, "/")}
            className="relative z-10 flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">{dealership.name}</span>
            <Image
              src="/images/logo-light.png"
              alt={dealership.name}
              width={120}
              height={42}
              className="h-6 w-auto object-contain sm:h-7"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-text/75 transition-colors hover:text-green"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} />
            <a
              href={telHref(phone)}
              className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-green"
            >
              <Phone className="h-4 w-4 text-green" />
              {phoneDisplay}
            </a>
            <Link
              href={localizedHref(locale, "/financing")}
              className="btn-primary !px-4 !py-2.5 text-xs"
            >
              {t.nav.preApprove}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher locale={locale} />
            <button
              type="button"
              className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside glass-header: backdrop-filter traps fixed children inside the header bar */}
      {open ? (
        <div
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-[#e8f3eb] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex min-h-full flex-col gap-1 px-6 py-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-green/15 py-4 font-display text-2xl font-semibold tracking-tight text-text"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={telHref(phone)}
              className="mt-6 inline-flex items-center gap-2 text-lg font-medium text-green"
            >
              <Phone className="h-5 w-5" />
              {phoneDisplay}
            </a>
            <Link
              href={localizedHref(locale, "/financing")}
              onClick={() => setOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              {t.nav.preApprove}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
