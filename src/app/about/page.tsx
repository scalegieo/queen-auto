import type { Metadata } from "next";
import Link from "next/link";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { dealership } from "@/lib/dealership";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: `About ${dealership.name}`,
  description: `Learn why ${dealership.city} drivers choose ${dealership.name}. Family owned since ${dealership.foundedYear} — quality vehicles, easy financing, and Se Habla Español.`,
  alternates: { canonical: `${dealership.siteUrl}/about` },
};

export default async function AboutPage() {
  const reviews = await getGoogleReviews();

  return (
    <div className="pt-[var(--header-h)]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green">
            About Us
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Family owned. Treating Denver like royalty.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Since {dealership.foundedYear}, {dealership.name} has given
            drivers across {dealership.city} the royal treatment — quality
            vehicles with financing that works, including Buy Here Pay Here and
            Spanish-speaking support.
          </p>
        </div>
      </div>

      <WhyChooseUs />

      <section className="border-t border-border py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Our Promise",
                text: "Clear pricing, inspected inventory, and guidance that puts you first.",
              },
              {
                title: "Our Difference",
                text: "Guaranteed credit approval options and Buy Here Pay Here when others say no.",
              },
              {
                title: "Our Community",
                text: `Proudly serving ${dealership.city}, ${dealership.stateFull}. Se habla Español.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h2 className="font-display text-xl font-semibold tracking-tight text-green">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/inventory" className="btn-primary">
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>

      <ReviewsSection data={reviews} />
    </div>
  );
}
