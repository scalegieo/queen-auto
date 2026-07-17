import { dealership } from "@/lib/dealership";
import { formatMileage, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function matchVehicles(query: string, vehicles: Vehicle[]) {
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  const scored = vehicles
    .map((v) => {
      const hay =
        `${v.year} ${v.make} ${v.model} ${v.trim ?? ""} ${v.bodyType} ${v.title}`.toLowerCase();
      let score = 0;
      for (const t of tokens) {
        if (hay.includes(t)) score += 2;
      }
      if (q.includes("suv") && v.bodyType === "SUV") score += 3;
      if (q.includes("truck") && v.bodyType === "Truck") score += 3;
      if (q.includes("sedan") && v.bodyType === "Sedan") score += 3;
      if (q.includes("cheap") || q.includes("budget") || q.includes("under")) {
        if (v.price < 40000) score += 1;
      }
      if (/\b(bmw|mercedes|audi|toyota|ford|lexus|tesla|porsche|honda)\b/.test(q)) {
        const makeToken = q.match(
          /\b(bmw|mercedes|audi|toyota|ford|lexus|tesla|porsche|honda)\b/,
        )?.[1];
        if (makeToken && v.make.toLowerCase().includes(makeToken)) score += 4;
      }
      return { v, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.v.price - b.v.price);

  return scored.slice(0, 3).map((x) => x.v);
}

function vehicleBlurb(v: Vehicle) {
  return `• **${v.title}** — ${formatPrice(v.price)}, ${formatMileage(v.mileage)} → /inventory/${v.slug}`;
}

function extractBudget(q: string): number | null {
  const under = q.match(/under\s*\$?\s*([\d,]+)/i);
  if (under) return Number(under[1].replace(/,/g, ""));
  const max = q.match(/\$\s*([\d,]+)/);
  if (max && /under|below|max|budget|less/i.test(q)) {
    return Number(max[1].replace(/,/g, ""));
  }
  return null;
}

/**
 * Conversion-focused sales agent. Works without an LLM key.
 * Optional OPENAI_API_KEY upgrades replies when configured.
 */
export async function generateSalesReply(
  messages: ChatMessage[],
  vehicles: Vehicle[],
): Promise<{ reply: string; cta?: { label: string; href: string } }> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const q = normalize(lastUser?.content ?? "");

  if (!q) {
    return {
      reply: `Welcome to ${dealership.name} — you get the royal treatment here. I can help you find a car, check financing, or schedule a visit. What are you looking for?`,
      cta: { label: "Browse inventory", href: "/inventory" },
    };
  }

  // Prefer OpenAI when available
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (apiKey) {
    try {
      const inventorySummary = vehicles
        .slice(0, 20)
        .map(
          (v) =>
            `${v.title} | ${formatPrice(v.price)} | ${formatMileage(v.mileage)} | ${v.bodyType} | /inventory/${v.slug}`,
        )
        .join("\n");

      const system = `You are Queen AI, a friendly, concise sales assistant for ${dealership.name} in ${dealership.city}, ${dealership.state}.
Phone: ${dealership.phoneDisplay}. Hours: Mon–Sat 9:30 AM–6:00 PM. Address: ${dealership.addressFull}.
Goals: help shoppers find vehicles, push pre-approval, schedule test drives, and capture interest. Keep replies under 120 words. Use plain language. Mention financing is available even with bad/no credit and Buy Here Pay Here. Se habla Español.
Current inventory (title | price | mileage | type | path):
${inventorySummary}
When recommending cars, include the path like /inventory/slug. Always end with a clear next step.`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          temperature: 0.5,
          messages: [
            { role: "system", content: system },
            ...messages.slice(-8).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return {
            reply,
            cta: { label: "Get Pre-Approved", href: "/financing" },
          };
        }
      }
    } catch (err) {
      console.error("[sales-agent] OpenAI fallback", err);
    }
  }

  // Rule-based conversion engine
  if (
    /\b(hola|español|espanol|spanish)\b/.test(q) ||
    q.includes("se habla")
  ) {
    return {
      reply: `¡Sí! Se habla Español. Llámanos al ${dealership.phoneEsDisplay} o escribe qué carro buscas y te ayudo.`,
      cta: { label: "Ver inventario", href: "/inventory" },
    };
  }

  if (/\b(hour|open|close|location|address|where|map)\b/.test(q)) {
    return {
      reply: `We’re at ${dealership.addressFull}. Open Mon–Sat 9:30 AM – 6:00 PM (closed Sunday). Call ${dealership.phoneDisplay} anytime during business hours.`,
      cta: { label: "Get directions", href: "/contact" },
    };
  }

  if (
    /\b(finance|financing|pre-?approv|credit|loan|payment|bhph|buy here|approved|approval)\b/.test(
      q,
    )
  ) {
    return {
      reply: `Great news — we specialize in getting people approved. Bad credit, no credit, and Buy Here Pay Here options are available. Pre-approval takes a few minutes and doesn’t obligate you to buy.`,
      cta: { label: "Get Pre-Approved", href: "/financing" },
    };
  }

  if (/\b(trade|trade-?in|appraisal|sell my)\b/.test(q)) {
    return {
      reply: `We want your trade-in. Share year/make/model/mileage and we’ll start an appraisal — or use our quick trade-in form.`,
      cta: { label: "Value my trade-in", href: "/trade-in" },
    };
  }

  if (/\b(test drive|visit|appointment|come in|schedule)\b/.test(q)) {
    return {
      reply: `Happy to set up a test drive. Tell me which vehicle you’re interested in, or pick one from inventory and we’ll lock a time.`,
      cta: { label: "Schedule visit", href: "/contact?intent=test-drive" },
    };
  }

  if (/\b(call|phone|human|person|salesperson|talk to)\b/.test(q)) {
    return {
      reply: `Absolutely — talk to our team at ${dealership.phoneDisplay}. Prefer Spanish? Call ${dealership.phoneEsDisplay}.`,
      cta: { label: "Contact us", href: "/contact" },
    };
  }

  const budget = extractBudget(q);
  let pool = vehicles;
  if (budget != null) {
    pool = vehicles.filter((v) => v.price <= budget);
  }

  const matches = matchVehicles(q, pool.length ? pool : vehicles);

  if (matches.length || /\b(suv|truck|sedan|car|vehicle|inventory|looking|need|want|show|find)\b/.test(q)) {
    const list = (matches.length ? matches : [...vehicles].sort((a, b) => a.price - b.price).slice(0, 3))
      .map(vehicleBlurb)
      .join("\n");

    const intro =
      budget != null
        ? `Here are strong options${matches.length ? "" : " near"} your budget:`
        : matches.length
          ? `I found these matches for you:`
          : `Here are popular picks from our lot right now:`;

    return {
      reply: `${intro}\n${list}\n\nWant me to check if you can get pre-approved on one of these today?`,
      cta: { label: "Get Pre-Approved", href: "/financing" },
    };
  }

  return {
    reply: `I can help you find a car, get pre-approved, value a trade-in, or schedule a visit. Try “SUVs under $40k” or “I need financing.”`,
    cta: { label: "Browse inventory", href: "/inventory" },
  };
}
