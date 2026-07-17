"use client";

import { FormEvent, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

export function QuickLead({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", locale, ...data }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-y border-border bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-14">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-bright">
            {t.quickLead.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t.quickLead.title}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {locale === "es"
              ? "Te respondemos rápido — usualmente en minutos durante horario."
              : "We respond fast — usually within minutes during business hours."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label !text-white/50" htmlFor="ql-name">
              {t.quickLead.name}
            </label>
            <input
              id="ql-name"
              name="firstName"
              required
              className="input-field !border-white/15 !bg-white/5 !text-white"
            />
          </div>
          <div>
            <label className="label !text-white/50" htmlFor="ql-phone">
              {t.quickLead.phone}
            </label>
            <input
              id="ql-phone"
              name="phone"
              type="tel"
              required
              className="input-field !border-white/15 !bg-white/5 !text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label !text-white/50" htmlFor="ql-interest">
              {t.quickLead.interest}
            </label>
            <select
              id="ql-interest"
              name="message"
              required
              defaultValue=""
              className="input-field !border-white/15 !bg-white/5 !text-white"
            >
              <option value="" disabled>
                {locale === "es" ? "Seleccionar…" : "Select…"}
              </option>
              {t.quickLead.options.map((o) => (
                <option key={o} value={o} className="text-black">
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full sm:w-auto"
            >
              {status === "loading"
                ? locale === "es"
                  ? "Enviando…"
                  : "Sending…"
                : t.quickLead.submit}
            </button>
            {status === "success" && (
              <p className="mt-3 text-sm text-green-bright">{t.quickLead.success}</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-300">
                {locale === "es" ? "Error — intenta de nuevo." : "Error — please try again."}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
