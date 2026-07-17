import Link from "next/link";
import Image from "next/image";
import { Crown, Phone } from "lucide-react";
import { dealership, telHref } from "@/lib/dealership";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const phone = locale === "es" ? dealership.phoneEs : dealership.phone;
  const phoneDisplay =
    locale === "es" ? dealership.phoneEsDisplay : dealership.phoneDisplay;

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lot.png"
          alt="Queen Auto Sales lot at 7405 E Colfax Ave, Denver"
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-14 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8 lg:pb-20">
        <div>
          <p className="animate-fade-up mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
            <Crown className="h-4 w-4 text-green-bright" />
            {t.hero.eyebrow}
          </p>
          <h1 className="animate-fade-up animate-delay-1 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.hero.title}
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-5 max-w-lg text-base text-white/80 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="animate-fade-up animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={localizedHref(locale, "/inventory")} className="btn-primary">
              {t.hero.viewInventory}
            </Link>
            <Link href={localizedHref(locale, "/financing")} className="btn-secondary">
              {t.hero.getApproved}
            </Link>
            <a href={telHref(phone)} className="btn-secondary inline-flex">
              <Phone className="h-4 w-4" />
              {t.nav.callNow}: {phoneDisplay}
            </a>
          </div>
        </div>

        <div className="glass-panel animate-fade-up animate-delay-3 rounded-3xl p-5 sm:p-6">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-green-bright">
            <Crown className="h-3.5 w-3.5" />
            {locale === "es" ? "Trato real garantizado" : "The Royal Treatment"}
          </p>
          <p className="mt-3 font-display text-2xl font-bold text-white">
            {locale === "es"
              ? "¿Mal crédito? Aquí eres realeza."
              : "Bad credit? You're still royalty here."}
          </p>
          <p className="mt-2 text-sm text-white/65">
            {locale === "es"
              ? "Compra Aquí Paga Aquí · Pre-aprobación rápida · Se habla Español"
              : "Buy Here Pay Here · Fast pre-approval · Se habla Español"}
          </p>
          <Link
            href={localizedHref(locale, "/financing")}
            className="btn-primary mt-5 w-full"
          >
            {t.nav.preApprove}
          </Link>
        </div>
      </div>
    </section>
  );
}
