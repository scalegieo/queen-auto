# Queen Auto Sales

Premium, ultra-modern dealership website for [Queen Auto Sales](https://www.queenautosales.com) (Denver, CO) — dark luxury design, high-conversion layouts, and Frazer DMS inventory integration.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Frazer DMS API** (env-secured key) with mock inventory fallback
- Daily inventory sync via Vercel Cron (`/api/cron/sync-inventory`)

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Frazer API setup

1. Copy `.env.example` → `.env.local`
2. Set your key:

```env
FRAZER_API_KEY=your_secure_api_key_here
FRAZER_API_URL=https://your-frazer-partner-api.example.com/v1
FRAZER_DEALER_ID=optional_dealer_id
CRON_SECRET=long_random_string
```

3. The client calls `GET {FRAZER_API_URL}/vehicles` with:
   - `Authorization: Bearer {FRAZER_API_KEY}`
   - `X-API-Key: {FRAZER_API_KEY}`

4. Responses are mapped to:

| Site field   | Common Frazer / partner fields      |
|-------------|--------------------------------------|
| Title       | year + make + model + trim           |
| Price       | `price`, `asking_price`              |
| Mileage     | `mileage`, `odometer`                |
| VIN         | `vin`                                |
| Images      | `images`, `photos`, `photo_urls`     |
| Description | `description`, `comments`            |
| Features    | `features`, `options`                |

5. Dynamic routes: `/inventory/[slug]`
6. Missing photos fall back to `/images/vehicle-fallback.svg`
7. Daily sync: Vercel Cron at 06:00 UTC (see `vercel.json`). Protect with `CRON_SECRET`.

> **Note:** Frazer’s native dealer feed is typically FTP/CSV to partners. This project expects a REST inventory endpoint (partner API or middleware such as Supergood). Until `FRAZER_API_KEY` is set, curated demo inventory is shown.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Cinematic hero, featured inventory, trust, financing CTA |
| `/inventory` | Filters, sort, pagination |
| `/inventory/[slug]` | Detail page with sticky CTAs, Carfax, financing & trade-in |
| `/financing` | Pre-approval form + trust badges |
| `/trade-in` | Appraisal request form |
| `/about` | Story, why choose us, reviews |
| `/contact` | Click-to-call, map, hours, form |

## SEO

- Meta titles oriented around **Denver Used Cars**
- Vehicle & AutoDealer JSON-LD schema
- `sitemap.xml` + `robots.txt`
- Image optimization (AVIF/WebP) + lazy loading

## Lead capture

`POST /api/leads` logs submissions. Connect this route to your CRM, email, or Frazer customer create endpoint for production.

## Deploy

Deploy to Vercel (CDN + Cron). Add env vars in the project settings. Never commit `.env.local`.
