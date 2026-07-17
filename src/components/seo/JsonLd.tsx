import { dealership } from "@/lib/dealership";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: dealership.name,
    url: dealership.siteUrl,
    logo: `${dealership.siteUrl}/images/logo-dark.png`,
    image: `${dealership.siteUrl}/images/og-card.png`,
    slogan: dealership.tagline,
    telephone: dealership.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: dealership.address,
      addressLocality: dealership.city,
      addressRegion: dealership.state,
      postalCode: dealership.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: dealership.hours
      .filter((h) => h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: "09:30",
        closes: "18:00",
      })),
    priceRange: "$$",
    areaServed: `${dealership.city}, ${dealership.state}`,
    sameAs: [dealership.mapLink],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function VehicleJsonLd({
  vehicle,
}: {
  vehicle: {
    title: string;
    description: string;
    price: number;
    mileage: number;
    vin: string;
    year: number;
    make: string;
    model: string;
    images: string[];
    slug: string;
    bodyType: string;
    exteriorColor?: string;
  };
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.title,
    description: vehicle.description,
    vehicleIdentificationNumber: vehicle.vin,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "SMI",
    },
    bodyType: vehicle.bodyType,
    color: vehicle.exteriorColor,
    image: vehicle.images,
    offers: {
      "@type": "Offer",
      url: `${dealership.siteUrl}/inventory/${vehicle.slug}`,
      priceCurrency: "USD",
      price: vehicle.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: dealership.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
