/**
 * Google Business Profile for Queen Auto Sales (Denver).
 * Place ID verified via Google Maps listing.
 *
 * Site showcases 5-star Google reviews only (trust-forward presentation).
 * Optional: set GOOGLE_PLACES_API_KEY to pull live 5-star reviews.
 */
export const googleBusiness = {
  placeId: "ChIJuRBz2Xp8bIcRkainoFpZURs",
  name: "Queen Auto Sales",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJuRBz2Xp8bIcRkainoFpZURs",
  writeReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJuRBz2Xp8bIcRkainoFpZURs",
  /**
   * Featured 5★ Google reviews shown on-site.
   * Prefer live Places API results when GOOGLE_PLACES_API_KEY is set.
   */
  featured: [
    {
      author: "Hiskel Kitila",
      rating: 5,
      text: "This amazing special customer service and how is it gonna be financed for a customer I’d like it.",
      relativeTime: "via Google",
    },
  ],
} as const;

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  source: "places-api" | "fallback";
  mapsUrl: string;
  writeReviewUrl: string;
};

function onlyFiveStars(reviews: GoogleReview[]) {
  return reviews.filter((r) => r.rating === 5 && r.text.trim().length > 15);
}

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();

  if (apiKey) {
    try {
      const url = new URL(
        "https://maps.googleapis.com/maps/api/place/details/json",
      );
      url.searchParams.set("place_id", googleBusiness.placeId);
      url.searchParams.set(
        "fields",
        "name,rating,user_ratings_total,reviews,url",
      );
      url.searchParams.set("key", apiKey);

      const res = await fetch(url.toString(), {
        next: { revalidate: 3600, tags: ["google-reviews"] },
      });

      if (res.ok) {
        const data = (await res.json()) as {
          status?: string;
          result?: {
            url?: string;
            reviews?: Array<{
              author_name?: string;
              rating?: number;
              text?: string;
              relative_time_description?: string;
            }>;
          };
        };

        if (data.status === "OK" && data.result) {
          const reviews = onlyFiveStars(
            (data.result.reviews ?? []).map((r) => ({
              author: r.author_name ?? "Google user",
              rating: r.rating ?? 0,
              text: (r.text ?? "").trim(),
              relativeTime: r.relative_time_description ?? "via Google",
            })),
          ).slice(0, 6);

          return {
            reviews: reviews.length
              ? reviews
              : onlyFiveStars(googleBusiness.featured.map((r) => ({ ...r }))),
            source: "places-api",
            mapsUrl: data.result.url ?? googleBusiness.mapsUrl,
            writeReviewUrl: googleBusiness.writeReviewUrl,
          };
        }
      }
    } catch (err) {
      console.error("[google-reviews]", err);
    }
  }

  return {
    reviews: onlyFiveStars(googleBusiness.featured.map((r) => ({ ...r }))),
    source: "fallback",
    mapsUrl: googleBusiness.mapsUrl,
    writeReviewUrl: googleBusiness.writeReviewUrl,
  };
}
