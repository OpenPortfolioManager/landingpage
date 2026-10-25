// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Where the site is served. GitHub Pages project site by default; for a custom domain set SITE_URL
// (e.g. https://example.pl) and BASE_PATH=/ in the deploy workflow. Canonical and hreflang URLs follow.
const site = process.env.SITE_URL ?? "https://p14s3k.github.io";
const base = process.env.BASE_PATH ?? "/landingpage";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
});
