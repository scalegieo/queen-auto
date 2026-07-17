import type { Metadata } from "next";
import { SpecialsView } from "@/components/specials/SpecialsView";
import { dealership } from "@/lib/dealership";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Car Specials & Deals in ${dealership.city}`,
  description: `Special deals on quality used cars at ${dealership.name} in ${dealership.city}, ${dealership.state}. Marked-down pricing, easy financing, bad credit welcome.`,
  alternates: { canonical: `${dealership.siteUrl}/specials` },
};

export default function SpecialsPage() {
  return <SpecialsView locale="en" />;
}
