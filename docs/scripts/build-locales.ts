/**
 * Build the docs site one locale at a time, then merge the per-locale outputs into a single
 * deployable directory.
 *
 * Netlify refuses to deploy any directory holding more than 54,000 files. VitePress emits one client
 * chunk per page into a flat `assetsDir`, and the full-locale site is ~41.5k pages — roughly 78,000
 * files in `assets/`. `assetsDir` is baked into the client router as a single build-time constant
 * (`__ASSETS_DIR__`), so the only way to split it is to build each locale separately with its own
 * `assets/<locale>/` and merge the results. Each locale lands near 1,800 files.
 *
 * Builds run serially: VitePress derives its scratch directory from the project root
 * (`.vitepress/.temp`) with no way to override it, so concurrent builds in the same docs root would
 * clobber each other.
 *
 * Env:
 *   DOCS_LOCALES    Restrict the non-root locales (tags, tiers, `-` subtraction). See
 *                   `parseRequestedLocales`. The root locale is always built — it owns the site
 *                   shell, `index.html`, `404.html`, and `llms.txt`.
 *   DOCS_DIST_DIR   Final merged output. Defaults to `.vitepress/dist`.
 *   DOCS_CHANGED_PAGES_FILE
 *                   A partial build: only the locales owning a changed page get built, and the
 *                   result is meant to be overlaid onto the previous complete deploy.
 *   DOCS_BASE_DIST  The previous complete deploy directory. A partial build carries its
 *                   `hashmap.json` and `sitemap.xml` forward, so overlaying the partial output
 *                   doesn't replace a whole-site index with a two-page one.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";
import { runAsMain } from "../../scripts/release/cli.ts";

/** Build order. Root goes last: it owns the shared root-level files, so its copies must win. */
export const orderRootLast = (keys: Iterable<string>): string[] => {
  const set = new Set(keys);
  const nonRoot = NON_ROOT_LOCALES.filter((locale) => set.has(locale));
  return set.has("root") ? [...nonRoot, "root"] : nonRoot;
};

/** The locale owning a docs-relative page path: `hu/guide/cli.md` belongs to `hu`. */
export const localeOfPage = (page: string): string => {
  const segment = page.split(/[\\/]/u)[0] ?? "";
  return NON_ROOT_LOCALES.includes(segment) ? segment : "root";
};

/** Merge `<url>` entries keyed by `<loc>`, so freshly built pages replace carried-forward ones. */
export const mergeSitemapUrls = (documents: readonly string[]): string[] => {
  const byLoc = new Map<string, string>();
  for (const document of documents) {
    for (const url of document.match(/<url>[\s\S]*?<\/url>/gu) ?? []) {
      byLoc.set(url.match(/<loc>([\s\S]*?)<\/loc>/u)?.[1] ?? url, url);
    }
  }
  return [...byLoc.values()];
};

/** Wrap merged `<url>` entries in a sitemap document. */
export const renderSitemap = (urls: readonly string[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

async function main(): Promise<void> {
  const require = createRequire(import.meta.url);
  const vitepressBin = join(
    dirname(require.resolve("vitepress/package.json")),
    "bin",
    "vitepress.js",
  );

  const distDir = resolve(process.env.DOCS_DIST_DIR ?? ".vitepress/dist");
  const stagingDir = resolve(".vitepress/.locales");
  const baseDist = process.env.DOCS_BASE_DIST;
  const changedPagesFile = process.env.DOCS_CHANGED_PAGES_FILE;

  const locales = changedPagesFile
    ? orderRootLast(
        (JSON.parse(readFileSync(changedPagesFile, "utf8")) as string[]).map(localeOfPage),
      )
    : orderRootLast([...parseRequestedLocales(process.env.DOCS_LOCALES, NON_ROOT_LOCALES), "root"]);

  if (locales.length === 0) {
    console.log("No locales to build.");
    return;
  }

  rmSync(stagingDir, { recursive: true, force: true });
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  const plural = (count: number): string => (count === 1 ? "locale" : "locales");
  console.log(`📋 Building ${locales.length} ${plural(locales.length)}`);

  for (const [index, locale] of locales.entries()) {
    const started = Date.now();
    const result = spawnSync(process.execPath, [vitepressBin, "build"], {
      stdio: "inherit",
      env: { ...process.env, DOCS_LOCALE: locale, DOCS_OUT_DIR: join(stagingDir, locale) },
    });
    if (result.status !== 0) {
      console.error(`✗ ${locale}: build failed`);
      process.exit(result.status ?? 1);
    }
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    console.log(`✓ ${locale}: built in ${seconds}s (${index + 1}/${locales.length})`);
  }

  for (const locale of locales) {
    cpSync(join(stagingDir, locale), distDir, { recursive: true });
  }

  const readText = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");
  const readJson = (path: string): object => {
    const text = readText(path);
    return text ? (JSON.parse(text) as object) : {};
  };

  // The client router refetches /hashmap.json when a page module fails to load, so the merged map
  // has to cover every locale. Page keys are locale-prefixed (`hu_guide_cli.md`), so the union is
  // collision-free.
  const hashmap = Object.assign(
    {},
    baseDist ? readJson(join(baseDist, "hashmap.json")) : {},
    ...locales.map((locale) => readJson(join(stagingDir, locale, "hashmap.json"))),
  ) as Record<string, string>;
  writeFileSync(join(distDir, "hashmap.json"), JSON.stringify(hashmap));

  const urls = mergeSitemapUrls([
    ...(baseDist ? [readText(join(baseDist, "sitemap.xml"))] : []),
    ...locales.map((locale) => readText(join(stagingDir, locale, "sitemap.xml"))),
  ]);
  writeFileSync(join(distDir, "sitemap.xml"), renderSitemap(urls));

  rmSync(stagingDir, { recursive: true, force: true });
  console.log(`✨ Merged ${locales.length} ${plural(locales.length)} into ${distDir}`);
  console.log(`   ${Object.keys(hashmap).length} pages, ${urls.length} sitemap entries`);
}

runAsMain(import.meta.url, main);
