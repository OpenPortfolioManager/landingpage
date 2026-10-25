export type Lang = "en" | "pl";

export const APP_URL = "https://portfolio.starpedia.pl";
export const APP_LOGIN = `${APP_URL}/login`;
export const REPO_URL = "https://github.com/P14S3K/landingpage";

/** Every page exists in both languages; the key pairs them for canonical and hreflang links. */
export const ROUTES = {
  home: { en: "/", pl: "/pl/" },
  dividends: { en: "/xtb-dividend-tracker/", pl: "/pl/dywidendy-xtb/" },
  tax: { en: "/xtb-pit-38-tax-calculator/", pl: "/pl/kalkulator-pit-38-xtb/" },
  benchmark: { en: "/compare-portfolio-with-sp500/", pl: "/pl/porownanie-portfela-z-sp500/" },
  public: { en: "/public-portfolio-page/", pl: "/pl/publiczny-portfel/" },
  privacy: { en: "/privacy/", pl: "/pl/prywatnosc/" },
} as const;
export type RouteKey = keyof typeof ROUTES;

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Site-relative link that respects the deploy base path. */
export const href = (path: string) => `${base}${path}`;
export const route = (key: RouteKey, lang: Lang) => href(ROUTES[key][lang]);
/** Absolute URL for canonical / hreflang / sitemap / Open Graph. */
export const absolute = (path: string) => new URL(href(path), import.meta.env.SITE).toString();

// ---- number formatting (the demo speaks the page language)

const LOCALE: Record<Lang, string> = { en: "en-GB", pl: "pl-PL" };

export const money = (x: number, lang: Lang, digits = 0, ccy = "PLN") =>
  new Intl.NumberFormat(LOCALE[lang], { style: "currency", currency: ccy, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(x);

export const signedMoney = (x: number, lang: Lang, digits = 0, ccy = "PLN") => `${x >= 0 ? "+" : "−"}${money(Math.abs(x), lang, digits, ccy)}`;

export const pct = (x: number, lang: Lang, digits = 2) =>
  new Intl.NumberFormat(LOCALE[lang], { style: "percent", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(x);

export const signedPct = (x: number, lang: Lang, digits = 2) => `${x >= 0 ? "+" : "−"}${pct(Math.abs(x), lang, digits)}`;

export const num = (x: number, lang: Lang, digits = 2) =>
  new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(x);

export const locale = (lang: Lang) => LOCALE[lang];

// ---- tiny SVG chart helpers (paths are computed at build time)

export interface Box {
  w: number;
  h: number;
  pad?: number;
}

export const scale = (values: number[], { w, h, pad = 4 }: Box, min = Math.min(...values), max = Math.max(...values)) => {
  const span = max - min || 1;
  return values.map((v, i) => [(i / Math.max(1, values.length - 1)) * w, pad + (1 - (v - min) / span) * (h - pad * 2)] as const);
};

/** Keep at most `max` evenly spaced points (always the first and the last): a weekly series drawn ~600px wide needs no more. */
export const thin = <T,>(xs: T[], max = 110): T[] => {
  if (xs.length <= max) return xs;
  const step = (xs.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => xs[Math.round(i * step)]);
};

/** Smooth line (Catmull-Rom converted to cubic Béziers). */
export const linePath = (pts: ReadonlyArray<readonly [number, number]>) => {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
};

export const areaPath = (pts: ReadonlyArray<readonly [number, number]>, h: number) =>
  `${linePath(pts)} L${pts[pts.length - 1][0].toFixed(1)},${h} L${pts[0][0].toFixed(1)},${h} Z`;

/** Deterministic monogram colour for a ticker (decoration; the ticker text carries identity). */
export const tickerHue = (ticker: string) => [...ticker.replace(/\..*$/, "")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 360;
export const tickerStyle = (ticker: string, size = 36) => {
  const hue = tickerHue(ticker);
  return `width:${size}px;height:${size}px;font-size:${Math.round(size * 0.31)}px;background:linear-gradient(145deg, oklch(0.72 0.14 ${hue}), oklch(0.5 0.15 ${(hue + 30) % 360}))`;
};
export const tickerShort = (ticker: string) => {
  const sym = ticker.replace(/\..*$/, "");
  return sym.slice(0, sym.length > 4 ? 3 : 4);
};
