# Al-Hana Taiwan Machinery — website

Bilingual (Arabic / English) static website built with **Astro 5** + **Tailwind CSS 4**, hosted on **Cloudflare Pages**.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve `dist/` **with** the Cloudflare functions (form + language redirect) at http://localhost:8788 |
| `npm run check` | Type-check |

## Structure

```
src/data/          site.ts (company info, WhatsApp, address) · categories.ts · machines.json (21 series, EN/AR) · parts.ts
src/i18n/ui.ts     every UI string in English and Arabic
src/pages/[lang]/  home, machines/, machines/<category>/, machines/<category>/<series>/, parts-maintenance, contact, thank-you
src/components/    Header, Footer, SEO, InquiryForm, Maintenance, PartsGrid, SeriesCard, …
src/assets/img/    source images (resized to WebP at build time)
functions/         Cloudflare Pages Functions: api/inquiry.ts (form → email), index.ts (/ → /ar/ or /en/)
public/            robots.txt, _headers, _redirects, favicon
```

- URLs: `/ar/...` and `/en/...`; `/` redirects by browser language (Arabic by default).
- Machine names and spare-part names stay in English on the Arabic site.
- To add or edit a machine, edit `src/data/machines.json` (and add its image to `src/assets/img/`). Its page, sitemap entry and structured data are generated automatically.

## SEO built in

Per-page title and description in both languages, canonical + `hreflang` (ar / en / x-default), a sitemap with language alternates (`/sitemap-index.xml`), Open Graph tags, and JSON-LD structured data (`Organization`/`LocalBusiness`, `Product` for each series, `BreadcrumbList`). It also includes responsive WebP images and self-hosted fonts.

## Forms & email

Both forms post to `/api/inquiry` (`functions/api/inquiry.ts`), which:
- validates the fields;
- checks a honeypot and Cloudflare Turnstile;
- emails the request to `sales@alhanatrading.com.sa` via [Resend](https://resend.com);
- redirects to `/<lang>/thank-you/`.

Set these in **Cloudflare Pages → Settings → Environment variables**. For local testing, copy `.dev.vars.example` to `.dev.vars` and `.env.example` to `.env`.

| Variable | Where | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | runtime (secret) | Resend API key |
| `MAIL_FROM` | runtime | Sender, e.g. `Al-Hana Website <website@alhanatrading.com.sa>`; the domain must be verified in Resend |
| `MAIL_TO` | runtime | Optional, defaults to `sales@alhanatrading.com.sa` |
| `TURNSTILE_SECRET` | runtime (secret) | Turnstile secret key (anti-spam) |
| `PUBLIC_TURNSTILE_SITE_KEY` | **build** variable | Turnstile site key, shown in the forms |

The Turnstile variables are optional; without them the form is protected by the honeypot only.

## Deploy (Cloudflare Pages)

1. Push this folder to a GitHub/GitLab repository.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings: framework preset *Astro*, build command `npm run build`, output directory `dist`, and the env var `NODE_VERSION=20`.
4. Add the environment variables above, then deploy.
5. Under **Custom domains**, add `www.alhanatrading.com.sa`, and redirect the bare domain to `www`.
6. After launch:
   - submit `https://www.alhanatrading.com.sa/sitemap-index.xml` to Google Search Console and Bing Webmaster Tools;
   - create or claim the Google Business Profile.

## Still needed from the company

These are marked with `[…]` on the site or `TODO` in `src/data/site.ts`:

- WhatsApp number (`site.whatsapp`); the floating WhatsApp button appears once it is set
- Showroom address (`site.address`) and the map location
- Company story (the About section) and service coverage (the Maintenance section)
- CI printing machine specifications (`machines.json`, code `CI`)
- Social media links (`site.social`)
- A native speaker's review of the Arabic wording
