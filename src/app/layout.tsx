import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { dealership } from "@/lib/dealership";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(dealership.siteUrl),
  title: {
    default: `${dealership.name} | ${dealership.city} Used Cars & Financing`,
    template: `%s | ${dealership.name}`,
  },
  description: `Get treated like a queen at ${dealership.name} — quality used cars in ${dealership.city}, ${dealership.state}. Easy financing, guaranteed credit approval, Buy Here Pay Here. Serving ${dealership.city} since ${dealership.foundedYear}.`,
  keywords: [
    `${dealership.city} used cars`,
    `${dealership.city} car dealer`,
    "buy here pay here Denver",
    "auto financing Denver",
    "used SUVs Denver",
    "Queen Auto Sales",
  ],
  applicationName: dealership.name,
  formatDetection: { telephone: true, address: true },
  appleWebApp: {
    capable: true,
    title: dealership.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    url: dealership.siteUrl,
    siteName: dealership.name,
    title: `${dealership.name} | ${dealership.city} Used Cars`,
    description: `Get treated like a queen — quality used cars, easy financing, bad credit welcome. ${dealership.city}, ${dealership.state}.`,
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: `${dealership.name} — ${dealership.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${dealership.name} | ${dealership.city} Used Cars`,
    description: `Get treated like a queen — quality used cars, easy financing, bad credit welcome.`,
    images: ["/images/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: dealership.siteUrl,
    languages: {
      en: dealership.siteUrl,
      es: `${dealership.siteUrl}/es`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a6b3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="site-atmosphere flex min-h-full flex-col antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
