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
 * Locales can build concurrently. VitePress 2.0.0-alpha.20 keeps no per-root scratch directory that
 * two builds would fight over — verified by diffing two concurrent locale builds against the same
 * pair built serially, byte for byte. Concurrency stays opt-in via the env var below because the
 * ceiling is memory, not correctness: each build inherits the deploy job's heap ceiling.
 *
 * Env:
 *   DOCS_LOCALES    Restrict the non-root locales (tags, tiers, `-` subtraction). See
 *                   `parseRequestedLocales`. The root locale is always built — it owns the site
 *                   shell, `index.html`, `404.html`, and `llms.txt`.
 *   DOCS_BUILD_LOCALE_CONCURRENCY
 *                   How many locales to build at once. Defaults to 1 (serial).
 *   DOCS_DIST_DIR   Final merged output. Defaults to `.vitepress/dist`.
 *   DOCS_CHANGED_PAGES_FILE
 *                   A partial build: only the locales owning a changed page get built, and the
 *                   result is meant to be overlaid onto the previous complete deploy.
 *   DOCS_BASE_DIST  The previous complete deploy directory. A partial build carries its
 *                   `hashmap.json` and `sitemap.xml` forward, so overlaying the partial output
 *                   doesn't replace a whole-site index with a two-page one.
 */
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";
import { runAsMain } from "../../scripts/release/cli.ts";

// The shared site-data chunk (the app bundle every page loads) should hold only the locale being
// built — see `isActiveLocale` in `.vitepress/config.ts`. A regression there re-embeds every other
// locale's nav/sidebar, so guard both a byte ceiling (well above one locale's own footprint, far
// below the ~30 MB an unscoped config produces) and a direct content check for another locale's
// guide link. Per-page `*.md.<hash>.js` chunks are excluded — those scale with page count for an
// unrelated, accepted reason.
const SHARED_CHUNK_MAX_BYTES = 5 * 1024 * 1024;
const isPageChunk = (name: string): boolean => /\.md\.[^./]+\.(lean\.)?js$/u.test(name);

/** Throws if a locale's shared site-data chunks embed another locale's nav or exceed the size cap. */
export function assertScopedLocaleConfig(localeDistDir: string, locale: string): void {
  // `assetsDir` is `assets/<locale>` (see config.ts), so the chunks sit one level below `assets/`.
  // Reading `assets/` directly only ever returned the locale directory name, which made every
  // filter below match nothing and the guard silently pass.
  const assetsDir = join(localeDistDir, "assets", locale);
  if (!existsSync(assetsDir)) return;
  const sharedChunkNames = readdirSync(assetsDir).filter(
    (name) => name.endsWith(".js") && !isPageChunk(name),
  );
  const otherLocales = NON_ROOT_LOCALES.filter((other) => other !== locale);
  let totalBytes = 0;
  for (const name of sharedChunkNames) {
    const chunkPath = join(assetsDir, name);
    // Read once and derive both the size and the content check from the same buffer — a separate
    // `statSync` + `readFileSync` pair would race if the file changed between the two calls.
    const buffer = readFileSync(chunkPath);
    totalBytes += buffer.length;
    const content = buffer.toString("utf8");
    const leaked = otherLocales.find((other) => content.includes(`/${other}/guide/`));
    if (leaked) {
      throw new Error(
        `${locale}: shared chunk ${name} embeds locale "${leaked}"'s nav — check the ` +
          `\`isActiveLocale\` scoping in docs/.vitepress/config.ts`,
      );
    }
  }
  if (totalBytes > SHARED_CHUNK_MAX_BYTES) {
    throw new Error(
      `${locale}: shared site-data chunks total ${(totalBytes / 1024 / 1024).toFixed(1)} MB, over ` +
        `the ${(SHARED_CHUNK_MAX_BYTES / 1024 / 1024).toFixed(0)} MB cap — check the ` +
        `\`isActiveLocale\` scoping in docs/.vitepress/config.ts`,
    );
  }
}

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

/**
 * A failed locale build, carrying the child's exit code. Thrown rather than exiting inside the
 * child's `close` handler: that runs outside the awaited chain, so exiting there escapes as an
 * uncaught exception instead of a rejection the caller can act on.
 *
 * Fields are declared and assigned explicitly — these scripts run under `node script.ts`, whose
 * strip-only type removal rejects TypeScript parameter properties.
 */
class LocaleBuildError extends Error {
  readonly locale: string;
  readonly code: number;

  constructor(locale: string, code: number) {
    super(`${locale}: build failed`);
    this.locale = locale;
    this.code = code;
    this.name = "LocaleBuildError";
  }
}

/** Run `work` over `items`, keeping at most `limit` in flight. */
export async function runPool<T>(
  items: readonly T[],
  limit: number,
  work: (item: T) => Promise<void>,
): Promise<void> {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(Math.max(limit, 1), queue.length) }, async () => {
    for (let next = queue.shift(); next !== undefined; next = queue.shift()) await work(next);
  });
  await Promise.all(workers);
}

/**
 * Merge `from` into `to` by moving, not copying. Staging and dist share a filesystem and staging is
 * discarded straight after, so copying ~170k files writes every byte twice and then deletes it.
 * Whole subtrees rename in one operation whenever the destination is free, which is the common case
 * — locales own disjoint `<locale>/` and `assets/<locale>/` trees and only collide at the root.
 */
export function mergeMove(from: string, to: string): void {
  if (!existsSync(from)) return;
  if (!existsSync(to)) {
    mkdirSync(dirname(to), { recursive: true });
    renameSync(from, to);
    return;
  }
  if (!statSync(to).isDirectory() || !statSync(from).isDirectory()) {
    rmSync(to, { recursive: true, force: true });
    renameSync(from, to);
    return;
  }
  for (const entry of readdirSync(from)) mergeMove(join(from, entry), join(to, entry));
}

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
  const concurrency = Math.max(1, Number(process.env.DOCS_BUILD_LOCALE_CONCURRENCY) || 1);
  console.log(
    `📋 Building ${locales.length} ${plural(locales.length)} (concurrency ${concurrency})`,
  );

  const timings: { locale: string; seconds: number }[] = [];
  const buildsStarted = Date.now();
  let completed = 0;

  const buildLocale = (locale: string): Promise<void> =>
    new Promise((settle, fail) => {
      const started = Date.now();
      const child = spawn(process.execPath, [vitepressBin, "build"], {
        stdio: "inherit",
        env: { ...process.env, DOCS_LOCALE: locale, DOCS_OUT_DIR: join(stagingDir, locale) },
      });
      child.on("error", fail);
      child.on("close", (code) => {
        if (code !== 0) {
          fail(new LocaleBuildError(locale, code ?? 1));
          return;
        }
        assertScopedLocaleConfig(join(stagingDir, locale), locale);
        const elapsed = (Date.now() - started) / 1000;
        timings.push({ locale, seconds: Number(elapsed.toFixed(1)) });
        completed += 1;
        console.log(
          `✓ ${locale}: built in ${elapsed.toFixed(1)}s (${completed}/${locales.length})`,
        );
        settle();
      });
    });

  // `orderRootLast` already puts root at the end; draining before it keeps the one build that loads
  // the llms plugin — and is reliably the slowest — off a shared runner with anything else.
  try {
    await runPool(
      locales.filter((locale) => locale !== "root"),
      concurrency,
      buildLocale,
    );
    if (locales.includes("root")) await buildLocale("root");
  } catch (error) {
    if (!(error instanceof LocaleBuildError)) throw error;
    console.error(`✗ ${error.locale}: build failed`);
    process.exit(error.code);
  }

  const readText = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");
  const readJson = (path: string): object => {
    const text = readText(path);
    return text ? (JSON.parse(text) as object) : {};
  };

  // Read both root-level artifacts out of staging BEFORE merging — the merge moves those files, so
  // reading after it would find nothing and silently emit an empty hashmap and a bare sitemap.
  //
  // The client router refetches /hashmap.json when a page module fails to load, so the merged map
  // has to cover every locale. Page keys are locale-prefixed (`hu_guide_cli.md`), so the union is
  // collision-free.
  const hashmap = Object.assign(
    {},
    baseDist ? readJson(join(baseDist, "hashmap.json")) : {},
    ...locales.map((locale) => readJson(join(stagingDir, locale, "hashmap.json"))),
  ) as Record<string, string>;

  const urls = mergeSitemapUrls([
    ...(baseDist ? [readText(join(baseDist, "sitemap.xml"))] : []),
    ...locales.map((locale) => readText(join(stagingDir, locale, "sitemap.xml"))),
  ]);

  const mergeStarted = Date.now();
  for (const locale of locales) {
    mergeMove(join(stagingDir, locale), distDir);
  }

  writeFileSync(join(distDir, "hashmap.json"), JSON.stringify(hashmap));
  writeFileSync(join(distDir, "sitemap.xml"), renderSitemap(urls));

  rmSync(stagingDir, { recursive: true, force: true });
  const mergeSeconds = (Date.now() - mergeStarted) / 1000;
  console.log(
    `✨ Merged ${locales.length} ${plural(locales.length)} into ${distDir} in ${mergeSeconds.toFixed(1)}s`,
  );
  console.log(`   ${Object.keys(hashmap).length} pages, ${urls.length} sitemap entries`);

  // CI uploads this as an artifact so locale build times can be compared across deploys — the
  // per-locale spread is what decides whether parallelising the loop is worth the complexity.
  writeFileSync(
    resolve(".vitepress/build-timings.json"),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalSeconds: Number(((Date.now() - buildsStarted) / 1000).toFixed(1)),
        mergeSeconds: Number(mergeSeconds.toFixed(1)),
        locales: timings,
      },
      null,
      2,
    )}\n`,
  );
}

runAsMain(import.meta.url, main);
