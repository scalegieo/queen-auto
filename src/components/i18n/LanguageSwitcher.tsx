"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/format";

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border border-border text-xs font-semibold",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Link
        href={switchLocalePath(pathname, "en")}
        className={cn(
          "px-2.5 py-1.5 transition-colors",
          locale === "en" ? "bg-green text-white" : "bg-white text-muted hover:text-text",
        )}
      >
        EN
      </Link>
      <Link
        href={switchLocalePath(pathname, "es")}
        className={cn(
          "px-2.5 py-1.5 transition-colors",
          locale === "es" ? "bg-green text-white" : "bg-white text-muted hover:text-text",
        )}
      >
        ES
      </Link>
    </div>
  );
}
