"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SalesAgent } from "@/components/agent/SalesAgent";
import type { Locale } from "@/lib/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const locale: Locale = pathname.startsWith("/es") ? "es" : "en";

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <SalesAgent />
    </>
  );
}
