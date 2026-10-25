import type { APIRoute } from "astro";
import { absolute, ROUTES } from "../lib/site";

// Every page with its language alternates, so search engines pair /x/ with /pl/y/.
export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(ROUTES).flatMap((r) =>
    (["en", "pl"] as const).map(
      (lang) => `  <url>
    <loc>${absolute(r[lang])}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(r.en)}"/>
    <xhtml:link rel="alternate" hreflang="pl" href="${absolute(r.pl)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(r.en)}"/>
  </url>`,
    ),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
