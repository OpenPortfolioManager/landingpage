# portfoliomanager: landing page

Marketing site for [portfoliomanager](https://portfolio.starpedia.pl), a free, non-profit portfolio tracker for XTB accounts.
English at `/`, Polish at `/pl/`. Static [Astro](https://astro.build) site, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

```bash
npm ci
npm run dev      # http://localhost:4321/
npm run build    # astro check + static build into dist/
```

## Structure

| Path | What |
|---|---|
| `src/content/copy.ts` | Home page and shared UI copy, both languages |
| `src/content/pages.ts` | Feature pages (import guide, dividends, PIT-38, benchmarks, public page, privacy), both languages |
| `src/lib/site.ts` | Routes (one key per page, EN and PL path), URL helpers, number formatting, SVG path helpers |
| `src/layouts/Base.astro` | `<head>`: title, description, canonical, hreflang (en, pl, x-default), Open Graph, JSON-LD |
| `src/components/HeroDemo.astro` | The animated app demo (dashboard, import, benchmarks, dividends, alerts) |
| `src/components/UploadDemo.astro` | Home page: the report `.zip` dropped in and its operations streaming in |
| `src/components/XtbGuide.astro` | Import guide page: animated xStation walk-through for downloading the report `.zip` (after the app's import guide) |
| `src/components/WinRateDemo.astro`, `SpacesDemo.astro`, `AlertChannels.astro` | Win rate counted trade by trade, the spaces switcher, alerts by e-mail / Slack / Discord |
| `src/components/Avatar.astro` | Instrument logo (from `public/logos/`, copied from the app) or a monogram |
| `src/scripts/motion.ts` | Reveal on scroll, count-ups, demo tabs, simulated quote ticks, self-advancing switchers, the guide player; honours `prefers-reduced-motion` |
| `src/pages/sitemap.xml.ts`, `robots.txt.ts` | Sitemap with language alternates, robots |
| `src/data/demo.json` | Demo portfolio numbers |
| `public/img/` | Screenshots of the real app running on the demo portfolio |
| `public/logos/` | Logos the app bundles, only for the instruments the demo portfolio holds or traded (mapped in `src/lib/site.ts`) |

Adding a page: add its key to `ROUTES` in `src/lib/site.ts`, its copy to `src/content/pages.ts`, and a page file for each
language under `src/pages/` and `src/pages/pl/`. Canonical, hreflang and sitemap entries follow from `ROUTES`.

## Demo data and screenshots

`src/data/demo.json` and the screenshots come from the app repository: the demo XTB portfolio (three accounts, PLN, USD and
IKE, January 2023 to today, simulated prices) is imported through the app's own XTB parser and valued with its analytics
engine, so every number on the site is one the app would show for those exports. `closed` holds the demo's closed
positions (XTB profit per lot, account currency) behind the win-rate section, `feed` a varied sample of its cash
operations for the upload animation.

## Domain and SEO

The only public address is **https://starpedia.pl** (`site` in `astro.config.mjs`; custom domain in Settings → Pages, HTTPS
enforced). Every page carries a canonical URL on that host, `hreflang` links to its other-language twin (en, pl, x-default →
en), and appears in `/sitemap.xml` with the same alternates. `robots.txt` points to the sitemap. The GitHub Pages address
redirects to the custom domain and is not referenced anywhere in the code.

The app's demo (`https://portfolio.starpedia.pl/demo`) is linked from here and is `noindex` on purpose.
