# portfoliomanager: landing page

Marketing site for [portfoliomanager](https://portfolio.starpedia.pl), a free, non-profit portfolio tracker for XTB accounts.
English at `/`, Polish at `/pl/`. Static [Astro](https://astro.build) site, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

```bash
npm ci
npm run dev      # http://localhost:4321/landingpage/
npm run build    # astro check + static build into dist/
```

## Structure

| Path | What |
|---|---|
| `src/content/copy.ts` | Home page and shared UI copy, both languages |
| `src/content/pages.ts` | Feature pages (dividends, PIT-38, benchmarks, public page, privacy), both languages |
| `src/lib/site.ts` | Routes (one key per page, EN and PL path), URL helpers, number formatting, SVG path helpers |
| `src/layouts/Base.astro` | `<head>`: title, description, canonical, hreflang (en, pl, x-default), Open Graph, JSON-LD |
| `src/components/HeroDemo.astro` | The animated app demo (dashboard, import, benchmarks, dividends, alerts) |
| `src/scripts/motion.ts` | Reveal on scroll, count-ups, demo tabs, simulated quote ticks; honours `prefers-reduced-motion` |
| `src/pages/sitemap.xml.ts`, `robots.txt.ts` | Sitemap with language alternates, robots |
| `src/data/demo.json` | Demo portfolio numbers |
| `public/img/` | Screenshots of the real app running on the demo portfolio |

Adding a page: add its key to `ROUTES` in `src/lib/site.ts`, its copy to `src/content/pages.ts`, and a page file for each
language under `src/pages/` and `src/pages/pl/`. Canonical, hreflang and sitemap entries follow from `ROUTES`.

## Demo data and screenshots

`src/data/demo.json` and the screenshots come from the app repository: the demo XTB portfolio (three accounts, PLN, USD and
IKE, January 2023 to today, simulated prices) is imported through the app's own XTB parser and valued with its analytics
engine, so every number on the site is one the app would show for those exports.

## Domain

The site builds for `https://p14s3k.github.io/landingpage/` by default. To move it to a custom domain, set the repository
variables `SITE_URL` and `BASE_PATH` (Settings → Secrets and variables → Actions → Variables), add the domain in Settings →
Pages and create the DNS record GitHub shows there.

On the default project-site address, `robots.txt` lives under `/landingpage/`, where crawlers do not look for it; submit
`sitemap.xml` in Google Search Console instead. With a custom domain at the root both work as they are.
