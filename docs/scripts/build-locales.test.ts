import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";

vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["de", "hu"],
  parseRequestedLocales: (requested: string | undefined, fallback: readonly string[]) =>
    requested ? requested.split(",") : fallback,
}));
vi.mock("../../scripts/release/cli.ts", () => ({ runAsMain: () => {} }));

const {
  assertScopedLocaleConfig,
  localeOfPage,
  mergeMove,
  mergeSitemapUrls,
  orderRootLast,
  renderSitemap,
  runPool,
} = await import("./build-locales.ts");

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

let localeDistDir: string | undefined;

afterEach(() => {
  if (localeDistDir) rmSync(localeDistDir, { recursive: true, force: true });
  localeDistDir = undefined;
});

// Mirrors the real build layout: `assetsDir` is `assets/<locale>`, so chunks nest one level below
// `assets/`. A flat fixture here would leave the guard scanning an empty file list and pass always.
const withChunk = (content: string, locale = "hu"): string => {
  localeDistDir = mkdtempSync(join(tmpdir(), "build-locales-test-"));
  const assetsDir = join(localeDistDir, "assets", locale);
  mkdirSync(assetsDir, { recursive: true });
  writeFileSync(join(assetsDir, "app.abc123.js"), content);
  return localeDistDir;
};

test("assertScopedLocaleConfig is a no-op when there's no assets dir", () => {
  const emptyDir = mkdtempSync(join(tmpdir(), "build-locales-test-"));
  localeDistDir = emptyDir;
  expect(() => assertScopedLocaleConfig(emptyDir, "hu")).not.toThrow();
});

test("assertScopedLocaleConfig passes a small, correctly scoped chunk", () => {
  const dir = withChunk('{"locales":{"hu":{"label":"Magyar"}}}');
  expect(() => assertScopedLocaleConfig(dir, "hu")).not.toThrow();
});

test("assertScopedLocaleConfig throws when another locale's nav leaks in", () => {
  const dir = withChunk('{"link":"/de/guide/getting-started"}');
  expect(() => assertScopedLocaleConfig(dir, "hu")).toThrow(/embeds locale "de"/u);
});

test("assertScopedLocaleConfig throws when the shared chunks exceed the byte cap", () => {
  const dir = withChunk("x".repeat(6 * 1024 * 1024));
  expect(() => assertScopedLocaleConfig(dir, "hu")).toThrow(/over the 5 MB cap/u);
});

test("assertScopedLocaleConfig ignores per-page chunks", () => {
  const dir = mkdtempSync(join(tmpdir(), "build-locales-test-"));
  localeDistDir = dir;
  const assetsDir = join(dir, "assets", "hu");
  mkdirSync(assetsDir, { recursive: true });
  writeFileSync(
    join(assetsDir, "de_guide_cli.md.abc123.js"),
    '{"link":"/de/guide/getting-started"}',
  );
  expect(() => assertScopedLocaleConfig(dir, "hu")).not.toThrow();
});

// Regression: the guard used to read `assets/` directly, where the only entry is the locale
// directory itself, so every check matched nothing and passed. Pin the nesting.
test("assertScopedLocaleConfig reads the locale-nested assets dir, not assets/ itself", () => {
  const dir = mkdtempSync(join(tmpdir(), "build-locales-test-"));
  localeDistDir = dir;
  mkdirSync(join(dir, "assets", "hu"), { recursive: true });
  writeFileSync(join(dir, "assets", "app.abc123.js"), '{"link":"/de/guide/getting-started"}');
  expect(() => assertScopedLocaleConfig(dir, "hu")).not.toThrow();
  writeFileSync(join(dir, "assets", "hu", "app.abc123.js"), '{"link":"/de/guide/getting-started"}');
  expect(() => assertScopedLocaleConfig(dir, "hu")).toThrow(/embeds locale "de"/u);
});

let mergeRoot: string | undefined;

afterEach(() => {
  if (mergeRoot) rmSync(mergeRoot, { recursive: true, force: true });
  mergeRoot = undefined;
});

const mergeFixture = (): { from: string; to: string } => {
  mergeRoot = mkdtempSync(join(tmpdir(), "build-locales-merge-"));
  const from = join(mergeRoot, "from");
  const to = join(mergeRoot, "to");
  mkdirSync(from, { recursive: true });
  mkdirSync(to, { recursive: true });
  return { from, to };
};

test("mergeMove relocates a disjoint subtree and leaves nothing behind", () => {
  const { from, to } = mergeFixture();
  mkdirSync(join(from, "hu", "guide"), { recursive: true });
  writeFileSync(join(from, "hu", "guide", "cli.html"), "hu-cli");
  mergeMove(from, to);
  expect(readFileSync(join(to, "hu", "guide", "cli.html"), "utf8")).toBe("hu-cli");
  // The moved subtree is gone; the now-empty source root is left for the caller's rmSync.
  expect(existsSync(join(from, "hu"))).toBe(false);
});

test("mergeMove merges into an existing directory instead of replacing it", () => {
  const { from, to } = mergeFixture();
  mkdirSync(join(to, "assets"), { recursive: true });
  writeFileSync(join(to, "assets", "de.js"), "de");
  mkdirSync(join(from, "assets"), { recursive: true });
  writeFileSync(join(from, "assets", "hu.js"), "hu");
  mergeMove(from, to);
  expect(readFileSync(join(to, "assets", "de.js"), "utf8")).toBe("de");
  expect(readFileSync(join(to, "assets", "hu.js"), "utf8")).toBe("hu");
});

test("mergeMove overwrites a colliding file so the later locale wins", () => {
  const { from, to } = mergeFixture();
  writeFileSync(join(to, "index.html"), "old");
  writeFileSync(join(from, "index.html"), "new");
  mergeMove(from, to);
  expect(readFileSync(join(to, "index.html"), "utf8")).toBe("new");
});

test("mergeMove replaces a file with a directory of the same name", () => {
  const { from, to } = mergeFixture();
  writeFileSync(join(to, "api"), "stale-file");
  mkdirSync(join(from, "api"), { recursive: true });
  writeFileSync(join(from, "api", "index.html"), "page");
  mergeMove(from, to);
  expect(readFileSync(join(to, "api", "index.html"), "utf8")).toBe("page");
});

test("mergeMove is a no-op when the source is missing", () => {
  const { from, to } = mergeFixture();
  rmSync(from, { recursive: true, force: true });
  expect(() => mergeMove(from, to)).not.toThrow();
});

test("runPool never exceeds the concurrency limit", async () => {
  let inFlight = 0;
  let peak = 0;
  await runPool(
    Array.from({ length: 12 }, (_, i) => i),
    3,
    async () => {
      inFlight += 1;
      peak = Math.max(peak, inFlight);
      await new Promise((settle) => setTimeout(settle, 1));
      inFlight -= 1;
    },
  );
  expect(peak).toBe(3);
});

test("runPool processes every item exactly once", async () => {
  const seen: number[] = [];
  await runPool(
    Array.from({ length: 10 }, (_, i) => i),
    4,
    async (item) => {
      seen.push(item);
    },
  );
  expect(seen.sort((a, b) => a - b)).toEqual(Array.from({ length: 10 }, (_, i) => i));
});

test("runPool treats a limit below one as serial", async () => {
  let peak = 0;
  let inFlight = 0;
  await runPool([1, 2, 3], 0, async () => {
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await new Promise((settle) => setTimeout(settle, 1));
    inFlight -= 1;
  });
  expect(peak).toBe(1);
});

test("runPool tolerates an empty queue", async () => {
  await expect(runPool([], 4, async () => {})).resolves.toBeUndefined();
});
