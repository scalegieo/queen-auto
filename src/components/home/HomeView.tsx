import { ExternalLink, Star } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { BodyStyles } from "@/components/home/BodyStyles";
import { FeaturedInventory } from "@/components/home/FeaturedInventory";
import { QuickLead } from "@/components/home/QuickLead";
import { FinancingCTA } from "@/components/home/FinancingCTA";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { VisitUs } from "@/components/home/VisitUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { getFeaturedVehicles } from "@/lib/inventory";
import { getGoogleReviews } from "@/lib/google-reviews";
import type { Locale } from "@/lib/i18n";

export async function HomeView({ locale = "en" }: { locale?: Locale }) {
  const [featured, reviews] = await Promise.all([
    getFeaturedVehicles(6),
    getGoogleReviews(),
  ]);

  const isEs = locale === "es";

  return (
    <>
      <OrganizationJsonLd />
      <Hero locale={locale} />
      <TrustBar locale={locale} />
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl justify-center px-5 py-4 lg:px-8">
          <a
            href={reviews.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-sm transition hover:border-green"
          >
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]"
                />
              ))}
            </span>
            <span className="font-semibold text-text">
              {isEs
                ? "La confianza de familias"
                : "Trusted by families"}
            </span>
            <span className="text-muted">
              {isEs ? "· Reseñas 5★" : "· 5★ Google reviews"}
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-muted" />
          </a>
        </div>
      </div>
      <ServicesGrid locale={locale} />
      <BodyStyles locale={locale} />
      <FeaturedInventory vehicles={featured} locale={locale} />
      <QuickLead locale={locale} />
      <FinancingCTA locale={locale} />
      <WhyChooseUs locale={locale} />
      <VisitUs locale={locale} />
      <ReviewsSection locale={locale} data={reviews} />
      <PopularCategories locale={locale} />
    </>
  );
}
