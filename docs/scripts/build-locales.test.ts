import { expect, test, vi } from "vite-plus/test";

vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["de", "hu"],
  parseRequestedLocales: (requested: string | undefined, fallback: readonly string[]) =>
    requested ? requested.split(",") : fallback,
}));
vi.mock("../../scripts/release/cli.ts", () => ({ runAsMain: () => {} }));

const { localeOfPage, mergeSitemapUrls, orderRootLast, renderSitemap } =
  await import("./build-locales.ts");

test("orderRootLast puts root after every non-root locale", () => {
  expect(orderRootLast(["root", "hu", "de"])).toEqual(["de", "hu", "root"]);
});

test("orderRootLast omits root when it wasn't requested", () => {
  expect(orderRootLast(["hu"])).toEqual(["hu"]);
});

test("localeOfPage maps a locale-prefixed page to its locale", () => {
  expect(localeOfPage("hu/guide/cli.md")).toBe("hu");
  expect(localeOfPage("hu\\guide\\cli.md")).toBe("hu");
});

test("localeOfPage treats unprefixed and unknown-prefix pages as root", () => {
  expect(localeOfPage("guide/cli.md")).toBe("root");
  expect(localeOfPage("index.md")).toBe("root");
  expect(localeOfPage("api/css.md")).toBe("root");
});

const sitemapOf = (...locs: string[]): string =>
  locs.map((loc) => `<url><loc>${loc}</loc></url>`).join("\n");

test("mergeSitemapUrls unions entries across locales", () => {
  const urls = mergeSitemapUrls([sitemapOf("https://x/a"), sitemapOf("https://x/hu/a")]);
  expect(urls).toHaveLength(2);
});

test("mergeSitemapUrls lets a rebuilt entry replace the carried-forward one", () => {
  const urls = mergeSitemapUrls([
    "<url><loc>https://x/a</loc><lastmod>old</lastmod></url>",
    "<url><loc>https://x/a</loc><lastmod>new</lastmod></url>",
  ]);
  expect(urls).toEqual(["<url><loc>https://x/a</loc><lastmod>new</lastmod></url>"]);
});

test("mergeSitemapUrls ignores empty documents", () => {
  expect(mergeSitemapUrls(["", sitemapOf("https://x/a")])).toHaveLength(1);
});

test("renderSitemap emits a well-formed urlset", () => {
  const xml = renderSitemap([sitemapOf("https://x/a")]);
  expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
});
