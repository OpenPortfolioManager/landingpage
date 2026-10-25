// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// The one public address of the site. Canonical, hreflang, Open Graph and sitemap URLs are built from it,
// so a single canonical host exists for every page.
export default defineConfig({
  site: "https://starpedia.pl",
  base: "/",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
});
