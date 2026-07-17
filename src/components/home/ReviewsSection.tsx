import { ExternalLink, Star } from "lucide-react";
import type { GoogleReviewsPayload } from "@/lib/google-reviews";
import type { Locale } from "@/lib/i18n";

function FiveStars({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} fill-[#fbbc04] text-[#fbbc04]`} />
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function ReviewsSection({
  locale = "en",
  data,
}: {
  locale?: Locale;
  data: GoogleReviewsPayload;
}) {
  const isEs = locale === "es";

  return (
    <section className="border-t border-border bg-bg-elevated py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <GoogleMark />
              {isEs ? "Reseñas 5★ en Google" : "5★ Google Reviews"}
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {isEs
                ? "La confianza de familias en Denver"
                : "Trusted by families in Denver"}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {isEs
                ? "Destacamos reseñas de 5 estrellas de clientes reales en Google."
                : "We showcase 5-star stories from real Google customers."}
            </p>
            <div className="mt-4">
              <FiveStars />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary on-light !normal-case !tracking-normal"
            >
              {isEs ? "Ver en Google" : "See on Google"}
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={data.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !normal-case !tracking-normal"
            >
              {isEs ? "Escribir reseña" : "Write a review"}
            </a>
          </div>
        </div>

        {data.reviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <blockquote
                key={`${review.author}-${review.text.slice(0, 24)}`}
                className="lift-card flex flex-col rounded-2xl border border-border bg-white p-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <FiveStars size="sm" />
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                    <GoogleMark />
                    Google
                  </span>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-text/90">
                  “{review.text}”
                </p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="mt-0.5 text-xs text-muted">{review.relativeTime}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <p className="text-muted">
              {isEs
                ? "Lee reseñas de 5 estrellas directamente en Google."
                : "Read 5-star customer stories directly on Google."}
            </p>
            <a
              href={data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 inline-flex"
            >
              {isEs ? "Abrir Google Reviews" : "Open Google Reviews"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
