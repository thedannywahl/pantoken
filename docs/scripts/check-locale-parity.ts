/**
 * Validate locale content parity for docs.
 *
 * Ensures every non-root locale's guide pages and demo snippets mirror the root's, its generated API
 * tree mirrors the root API tree page-for-page, required locale files exist, and the localized home
 * page keeps the same hero actions as the root. These catch English-only additions that never reached
 * the translation layer.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const docsRoot = join(import.meta.dirname, "..");
const rootGuideDir = join(docsRoot, "guide");
const rootApiDir = join(docsRoot, "api");
const rootDemoDir = join(docsRoot, "demos");
const rootIndex = join(docsRoot, "index.md");

const listBasenames = (dir: string, extension: string): Set<string> => {
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(extension))
    .map((name) => name.slice(0, -extension.length));
  return new Set(names);
};

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

const errors: string[] = [];
const rootPages = listBasenames(rootGuideDir, ".md");
const rootApi = listMarkdownTree(rootApiDir);
const rootDemos = listBasenames(rootDemoDir, ".html");

if (!existsSync(rootIndex)) {
  errors.push("Missing required locale file:", `- ${rootIndex}`);
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
    errors.push(
      `Missing required '${locale}' locale files:`,
      ...missingRequired.map((f) => `- ${f}`),
    );
  }

  const localePages = listBasenames(guideDir, ".md");
  const missingInLocale = [...rootPages].filter((page) => !localePages.has(page));
  const extraInLocale = [...localePages].filter((page) => !rootPages.has(page));
  if (missingInLocale.length > 0) {
    errors.push(
      `Missing '${locale}' guide pages:`,
      ...missingInLocale.map((p) => `- ${locale}/guide/${p}.md`),
    );
  }
  if (extraInLocale.length > 0) {
    errors.push(
      `'${locale}'-only guide pages without root equivalent:`,
      ...extraInLocale.map((p) => `- ${locale}/guide/${p}.md`),
    );
  }

  // The locale demo snippets mirror the root demos 1:1 (translated prose, same markup) so a
  // `demo:self:<name>` fence never 404s under a locale route. See translate-demos.ts.
  const localeDemos = listBasenames(join(docsRoot, locale, "demos"), ".html");
  const missingDemos = [...rootDemos].filter((name) => !localeDemos.has(name));
  const extraDemos = [...localeDemos].filter((name) => !rootDemos.has(name));
  if (missingDemos.length > 0) {
    errors.push(
      `Missing '${locale}' demo snippets; re-run docs:demos:locales:`,
      ...missingDemos.map((p) => `- ${locale}/demos/${p}.html`),
    );
  }
  if (extraDemos.length > 0) {
    errors.push(
      `'${locale}'-only demo snippets with no root equivalent:`,
      ...extraDemos.map((p) => `- ${locale}/demos/${p}.html`),
    );
  }

  // The locale API tree is a translated clone of the root API tree, so its page set must match exactly.
  const localeApi = listMarkdownTree(apiDir);
  const missingApi = [...rootApi].filter((page) => !localeApi.has(page));
  const extraApi = [...localeApi].filter((page) => !rootApi.has(page));
  if (missingApi.length > 0) {
    errors.push(
      `Missing '${locale}' API pages (${missingApi.length}); re-run docs:api:locales:`,
      ...missingApi.slice(0, 20).map((p) => `- ${locale}/api/${p}`),
      ...(missingApi.length > 20 ? [`  …and ${missingApi.length - 20} more`] : []),
    );
  }
  if (extraApi.length > 0) {
    errors.push(
      `Stale '${locale}' API pages with no root equivalent (${extraApi.length}); re-run docs:api:locales:`,
      ...extraApi.slice(0, 20).map((p) => `- ${locale}/api/${p}`),
      ...(extraApi.length > 20 ? [`  …and ${extraApi.length - 20} more`] : []),
    );
  }

  // The localized home page must offer the same set of hero actions as the root.
  if (existsSync(rootIndex) && existsSync(localeIndex)) {
    const rootActions = countHeroActions(rootIndex);
    const localeActions = countHeroActions(localeIndex);
    if (rootActions !== localeActions) {
      errors.push(
        `Home page hero actions out of sync: index.md has ${rootActions}, ` +
          `${locale}/index.md has ${localeActions}.`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Locale parity check failed.");
  for (const line of errors) console.error(line);
  process.exit(1);
}

console.log(
  `Locale parity OK: ${rootPages.size} guide pages and ${rootApi.size} API pages matched across ` +
    `${NON_ROOT_LOCALES.length} locales, required locale files present, hero actions in sync.`,
);
