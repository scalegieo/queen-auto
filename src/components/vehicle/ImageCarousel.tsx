"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FALLBACK_IMAGE } from "@/lib/frazer/mapper";
import { cn } from "@/lib/format";

export function ImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const slides = images.length ? images : [FALLBACK_IMAGE];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const src = failed[index] ? FALLBACK_IMAGE : slides[index];

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
        <Image
          key={src}
          src={src}
          alt={`${alt} — image ${index + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="animate-fade-in object-cover"
          onError={() => setFailed((f) => ({ ...f, [index]: true }))}
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-gold hover:text-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-gold hover:text-gold"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {slides.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden border transition",
                i === index ? "border-gold" : "border-border opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={failed[i] ? FALLBACK_IMAGE : img}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
