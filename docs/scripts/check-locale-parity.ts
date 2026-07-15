/**
 * Validate locale content parity for docs.
 *
 * Ensures HU guide pages mirror root guide routes, the generated HU API tree mirrors the root API
 * tree page-for-page, required locale files exist, and the localized home page keeps the same hero
 * actions as the root. These catch English-only additions that never reached the translation layer.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const rootGuideDir = join(docsRoot, "guide");
const huGuideDir = join(docsRoot, "hu/guide");
const rootApiDir = join(docsRoot, "api");
const huApiDir = join(docsRoot, "hu/api");
const rootIndex = join(docsRoot, "index.md");
const huIndex = join(docsRoot, "hu/index.md");

const requiredFiles = [
  rootIndex,
  huIndex,
  join(docsRoot, "api/typedoc-sidebar.json"),
  join(docsRoot, "hu/api/typedoc-sidebar.json"),
];

const listMarkdownBasenames = (dir: string): Set<string> => {
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
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

const missingRequired = requiredFiles.filter((filePath) => !existsSync(filePath));
if (missingRequired.length > 0) {
  errors.push("Missing required locale files:", ...missingRequired.map((f) => `- ${f}`));
}

const rootPages = listMarkdownBasenames(rootGuideDir);
const huPages = listMarkdownBasenames(huGuideDir);
const missingInHu = [...rootPages].filter((page) => !huPages.has(page));
const extraInHu = [...huPages].filter((page) => !rootPages.has(page));
if (missingInHu.length > 0) {
  errors.push("Missing Hungarian guide pages:", ...missingInHu.map((p) => `- hu/guide/${p}.md`));
}
if (extraInHu.length > 0) {
  errors.push(
    "Hungarian-only guide pages without root equivalent:",
    ...extraInHu.map((p) => `- hu/guide/${p}.md`),
  );
}

// The HU API tree is a translated clone of the root API tree, so its page set must match exactly.
const rootApi = listMarkdownTree(rootApiDir);
const huApi = listMarkdownTree(huApiDir);
const missingApi = [...rootApi].filter((page) => !huApi.has(page));
const extraApi = [...huApi].filter((page) => !rootApi.has(page));
if (missingApi.length > 0) {
  errors.push(
    `Missing Hungarian API pages (${missingApi.length}); re-run docs:api:locales:`,
    ...missingApi.slice(0, 20).map((p) => `- hu/api/${p}`),
    ...(missingApi.length > 20 ? [`  …and ${missingApi.length - 20} more`] : []),
  );
}
if (extraApi.length > 0) {
  errors.push(
    `Stale Hungarian API pages with no root equivalent (${extraApi.length}); re-run docs:api:locales:`,
    ...extraApi.slice(0, 20).map((p) => `- hu/api/${p}`),
    ...(extraApi.length > 20 ? [`  …and ${extraApi.length - 20} more`] : []),
  );
}

// The localized home page must offer the same set of hero actions as the root.
if (existsSync(rootIndex) && existsSync(huIndex)) {
  const rootActions = countHeroActions(rootIndex);
  const huActions = countHeroActions(huIndex);
  if (rootActions !== huActions) {
    errors.push(
      `Home page hero actions out of sync: index.md has ${rootActions}, hu/index.md has ${huActions}.`,
    );
  }
}

if (errors.length > 0) {
  console.error("Locale parity check failed.");
  for (const line of errors) console.error(line);
  process.exit(1);
}

console.log(
  `Locale parity OK: ${rootPages.size} guide pages and ${rootApi.size} API pages matched, ` +
    `required locale files present, hero actions in sync.`,
);
