/**
 * Validate locale content parity for docs.
 *
 * Ensures every non-root locale's guide pages and demo snippets mirror the root's, its generated API
 * tree mirrors the root API tree page-for-page, required locale files exist, and the localized home
 * page keeps the same hero actions as the root. These catch English-only additions that never reached
 * the translation layer.
 *
 * Parity is structural, not linguistic — every gap here is filled by re-running a generator, no AI
 * translation pass needed — so `i18n.config.json` blocks on surface `docs.parity` for every locale by
 * default. It's still routed through the shared policy so it can be loosened like any other surface.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { DriftReporter } from "@pantoken/translation-adapters";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const docsRoot = join(import.meta.dirname, "..");
const rootGuideDir = join(docsRoot, "guide");
const rootApiDir = join(docsRoot, "api");
const rootDemoDir = join(docsRoot, "demos");
const rootIndex = join(docsRoot, "index.md");

/** A locale directory that hasn't been generated yet reports as zero pages, not a crash. */
const listBasenames = (dir: string, extension: string): Set<string> => {
  if (!existsSync(dir)) return new Set();
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(extension))
    .map((name) => name.slice(0, -extension.length));
  return new Set(names);
};

const listDemoNames = (dir: string): Set<string> =>
  new Set(
    readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );

/** Every `.md` file under `dir`, as paths relative to `dir` (so the two locale trees compare directly). */
const listMarkdownTree = (dir: string): Set<string> => {
  const out = new Set<string>();
  const walk = (current: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) out.add(relative(dir, full));
    }
  };
  if (existsSync(dir)) walk(dir);
  return out;
};

/** Count hero `actions` entries in a home page's frontmatter (each starts with `- theme:`). */
const countHeroActions = (filePath: string): number =>
  (readFileSync(filePath, "utf8").match(/^\s*- theme:/gm) ?? []).length;

const reporter = new DriftReporter({
  label: "@pantoken/docs locale parity",
  fixCommand: "vp run docs:api:locales && vp run docs:demos:locales",
});

/** Record one parity gap. `items` are docs-relative paths; only the first few are shown per gap. */
const fail = (
  locale: string,
  file: string,
  detail: string,
  items: readonly string[] = [],
): void => {
  const shown = items.slice(0, 5).join(", ");
  const more = items.length > 5 ? ` …and ${items.length - 5} more` : "";
  reporter.add({
    surface: "docs.parity",
    locale,
    file: `docs/${file}`,
    detail: items.length > 0 ? `${detail}: ${shown}${more}` : detail,
  });
};

const rootPages = listBasenames(rootGuideDir, ".md");
const rootApi = listMarkdownTree(rootApiDir);
const rootDemos = listDemoNames(rootDemoDir);

if (!existsSync(rootIndex)) {
  fail("en", "index.md", "Missing required root locale file");
}

for (const locale of NON_ROOT_LOCALES) {
  const guideDir = join(docsRoot, locale, "guide");
  const apiDir = join(docsRoot, locale, "api");
  const localeIndex = join(docsRoot, locale, "index.md");

  // Only `api/typedoc-sidebar.json` is auto-generated for every locale; the localized home page
  // (`<locale>/index.md`) is hand-authored (like `hu/index.md`) and optional until someone writes it.
  const missingRequired = [join(docsRoot, locale, "api/typedoc-sidebar.json")].filter(
    (filePath) => !existsSync(filePath),
  );
  if (missingRequired.length > 0) {
    fail(
      locale,
      `${locale}/api/typedoc-sidebar.json`,
      "Missing required locale files",
      missingRequired.map((f) => relative(docsRoot, f)),
    );
  }

  const localePages = listBasenames(guideDir, ".md");
  const missingInLocale = [...rootPages].filter((page) => !localePages.has(page));
  const extraInLocale = [...localePages].filter((page) => !rootPages.has(page));
  if (missingInLocale.length > 0) {
    fail(
      locale,
      `${locale}/guide`,
      "Missing guide pages",
      missingInLocale.map((p) => `${p}.md`),
    );
  }
  if (extraInLocale.length > 0) {
    fail(
      locale,
      `${locale}/guide`,
      "Locale-only guide pages without a root equivalent",
      extraInLocale.map((p) => `${p}.md`),
    );
  }

  // The locale demo snippets mirror the root demos 1:1 (translated prose, same markup) so a
  // `demo:self:<name>` fence never 404s under a locale route. See translate-demos.ts.
  const localeDemos = listBasenames(join(docsRoot, locale, "demos"), ".html");
  const missingDemos = [...rootDemos].filter((name) => !localeDemos.has(name));
  const extraDemos = [...localeDemos].filter((name) => !rootDemos.has(name));
  if (missingDemos.length > 0) {
    fail(
      locale,
      `${locale}/demos`,
      "Missing demo snippets; re-run docs:demos:locales",
      missingDemos.map((p) => `${p}.html`),
    );
  }
  if (extraDemos.length > 0) {
    fail(
      locale,
      `${locale}/demos`,
      "Locale-only demo snippets with no root equivalent",
      extraDemos.map((p) => `${p}.html`),
    );
  }

  // The locale API tree is a translated clone of the root API tree, so its page set must match exactly.
  const localeApi = listMarkdownTree(apiDir);
  const missingApi = [...rootApi].filter((page) => !localeApi.has(page));
  const extraApi = [...localeApi].filter((page) => !rootApi.has(page));
  if (missingApi.length > 0) {
    fail(
      locale,
      `${locale}/api`,
      `Missing ${missingApi.length} API page(s); re-run docs:api:locales`,
      missingApi,
    );
  }
  if (extraApi.length > 0) {
    fail(
      locale,
      `${locale}/api`,
      `Stale ${extraApi.length} API page(s) with no root equivalent; re-run docs:api:locales`,
      extraApi,
    );
  }

  // The localized home page must offer the same set of hero actions as the root.
  if (existsSync(rootIndex) && existsSync(localeIndex)) {
    const rootActions = countHeroActions(rootIndex);
    const localeActions = countHeroActions(localeIndex);
    if (rootActions !== localeActions) {
      fail(
        locale,
        `${locale}/index.md`,
        `Home page hero actions out of sync: index.md has ${rootActions}, this locale has ${localeActions}`,
      );
    }
  }
}

if (!reporter.blocking) {
  console.log(
    `Locale parity: ${rootPages.size} guide pages and ${rootApi.size} API pages checked across ` +
      `${NON_ROOT_LOCALES.length} locales.`,
  );
}
process.exitCode = reporter.report();
