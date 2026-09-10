/**
 * Resolve whether a docs deploy can build a changed-page subset.
 *
 * The deploy workflow uses this as a conservative gate: known page-scoped changes become an
 * allowlist for partial rendering, while global docs inputs, deletions, or unclassified changes fall
 * back to the full docs build.
 *
 * @module
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { parsePo } from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { runAsMain } from "../../scripts/release/cli.ts";

/** A docs deploy scope: full build, partial page subset, or no docs build. */
export type DocsChangeScope = "all" | "subset" | "none";

/** One changed git path with its name-status status code. */
export interface ChangedPath {
  status: string;
  path: string;
}

/** Result of resolving docs changes into a deploy/build scope. */
export interface ChangedDocsResult {
  scope: DocsChangeScope;
  pages: string[];
  surfaces: string[];
  fallbackReason?: string;
}

/** Inputs that can affect every rendered page or shared deploy artifact. */
const GLOBAL_PATTERNS = [
  /^package\.json$/u,
  /^pnpm-lock\.yaml$/u,
  /^pnpm-workspace\.yaml$/u,
  /^vite\.config\.ts$/u,
  /^tsconfig(?:\.base)?\.json$/u,
  /^docs\/package\.json$/u,
  /^docs\/.vitepress\//u,
  /^docs\/public\//u,
  /^docs\/scripts\//u,
  /^docs\/assets\//u,
  /^formats\/(?:components|css|tokens)\//u,
  /^plugins\/pantoken\//u,
  /^renderers\/(?:vitepress|web-components)\//u,
  /^tools\/i18n-engine\//u,
  /^tools\/translation-adapters\//u,
  /^i18n\.config\.json$/u,
  /^cssdoc\.jsonc$/u,
];

const CATALOG_SURFACES = new Map([
  ["l10n/docs.api.pot", "docs.api"],
  ["l10n/docs.guides.pot", "docs.guides"],
  ["l10n/docs.home.pot", "docs.home"],
]);

const LOCALE_CATALOG = /^l10n\/([^/]+)\/(docs\.(?:api|guides|home))\.po$/u;

const toPosix = (value: string): string => value.split("\\").join("/");

function normalizePage(page: string): string {
  return toPosix(page).replace(/^docs\//u, "");
}

function addPage(pages: Set<string>, page: string): void {
  const normalized = normalizePage(page);
  if (normalized.endsWith(".md")) pages.add(normalized);
}

function addLocalizedPage(pages: Set<string>, page: string, locales: readonly string[]): void {
  const normalized = normalizePage(page);
  addPage(pages, normalized);
  for (const locale of locales) addPage(pages, `${locale}/${normalized}`);
}

function addGuidePage(pages: Set<string>, path: string, locales: readonly string[]): void {
  addLocalizedPage(pages, path, locales);
}

function addApiPage(pages: Set<string>, path: string, locales: readonly string[]): void {
  addLocalizedPage(pages, path, locales);
}

function addHomePage(pages: Set<string>, locales: readonly string[]): void {
  addPage(pages, "index.md");
  for (const locale of locales) addPage(pages, `${locale}/index.md`);
}

function addSurface(surfaces: Set<string>, surface: string): void {
  surfaces.add(surface);
}

function catalogEntryKey(entry: ReturnType<typeof parsePo>[number]): string {
  return `${entry.msgctxt ?? ""}\0${entry.msgid}`;
}

/** Return source files referenced by changed PO/POT entries. */
export function referencesForChangedCatalogEntries(before: string, after: string): string[] {
  const previous = new Map(parsePo(before).map((entry) => [catalogEntryKey(entry), entry]));
  const references = new Set<string>();

  for (const entry of parsePo(after)) {
    const old = previous.get(catalogEntryKey(entry));
    if (
      !old ||
      old.msgstr !== entry.msgstr ||
      old.fuzzy !== entry.fuzzy ||
      old.obsolete !== entry.obsolete ||
      old.references.join("\n") !== entry.references.join("\n")
    ) {
      for (const reference of entry.references) references.add(reference.replace(/:\d+$/u, ""));
    }
  }

  return [...references].sort();
}

function currentFile(path: string, repoRoot: string): string | undefined {
  const fullPath = join(repoRoot, path);
  return existsSync(fullPath) ? readFileSync(fullPath, "utf8") : undefined;
}

function gitShow(base: string | undefined, path: string, repoRoot: string): string | undefined {
  if (!base) return undefined;
  const result = spawnSync("git", ["show", `${base}:${path}`], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
  });
  return result.status === 0 ? result.stdout : undefined;
}

function addCatalogPages(params: {
  pages: Set<string>;
  surfaces: Set<string>;
  surface: string;
  path: string;
  before: string | undefined;
  after: string | undefined;
  locales: readonly string[];
}): string | undefined {
  const { after, before, locales, pages, path, surface, surfaces } = params;
  if (!after || !before) return `Unable to compare ${path}; running full docs build.`;
  addSurface(surfaces, surface);
  for (const reference of referencesForChangedCatalogEntries(before, after)) {
    if (surface === "docs.api" && reference.startsWith("api/"))
      addApiPage(pages, reference, locales);
    else if (surface === "docs.guides" && reference.startsWith("guide/")) {
      addGuidePage(pages, reference, locales);
    } else if (surface === "docs.home" && reference === "index.md") addHomePage(pages, locales);
    else return `Catalog ${path} changed non-page reference ${reference}; running full docs build.`;
  }
  return undefined;
}

/** Resolve changed git paths into docs pages that can be built independently. */
export function resolveChangedDocs(
  changedPaths: readonly ChangedPath[],
  options: { base?: string; repoRoot?: string; locales?: readonly string[] } = {},
): ChangedDocsResult {
  const repoRoot = options.repoRoot ?? join(import.meta.dirname, "..", "..");
  const locales = options.locales ?? NON_ROOT_LOCALES;
  const pages = new Set<string>();
  const surfaces = new Set<string>();

  for (const changed of changedPaths) {
    const path = toPosix(changed.path);
    if (changed.status.startsWith("D")) {
      return { scope: "all", pages: [], surfaces: [], fallbackReason: `${path} was deleted.` };
    }
    if (GLOBAL_PATTERNS.some((pattern) => pattern.test(path))) {
      return {
        scope: "all",
        pages: [],
        surfaces: [],
        fallbackReason: `${path} can affect shared docs output.`,
      };
    }

    if (/^docs\/guide\/.+\.md$/u.test(path)) {
      addSurface(surfaces, "docs.guides");
      addGuidePage(pages, path, locales);
      continue;
    }
    if (path === "docs/index.md") {
      addSurface(surfaces, "docs.home");
      addHomePage(pages, locales);
      continue;
    }
    if (/^docs\/api\/.+\.md$/u.test(path)) {
      addSurface(surfaces, "docs.api");
      addApiPage(pages, path, locales);
      continue;
    }

    const catalogSurface = CATALOG_SURFACES.get(path);
    if (catalogSurface) {
      const reason = addCatalogPages({
        pages,
        surfaces,
        surface: catalogSurface,
        path,
        before: gitShow(options.base, path, repoRoot),
        after: currentFile(path, repoRoot),
        locales,
      });
      if (reason) return { scope: "all", pages: [], surfaces: [], fallbackReason: reason };
      continue;
    }

    const localeCatalog = LOCALE_CATALOG.exec(path);
    if (localeCatalog) {
      const [, locale, surface] = localeCatalog;
      const reason = addCatalogPages({
        pages,
        surfaces,
        surface,
        path,
        before: gitShow(options.base, path, repoRoot),
        after: currentFile(path, repoRoot),
        locales: [locale],
      });
      if (reason) return { scope: "all", pages: [], surfaces: [], fallbackReason: reason };
      continue;
    }

    if (/^(?:docs|l10n)\//u.test(path)) {
      return {
        scope: "all",
        pages: [],
        surfaces: [],
        fallbackReason: `${path} is not page-scoped yet.`,
      };
    }
  }

  const sortedPages = [...pages].sort();
  return sortedPages.length === 0
    ? { scope: "none", pages: [], surfaces: [...surfaces].sort() }
    : { scope: "subset", pages: sortedPages, surfaces: [...surfaces].sort() };
}

function readArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

function gitDiffPaths(base: string | undefined, repoRoot: string): ChangedPath[] | undefined {
  if (!base || /^0+$/u.test(base)) return undefined;
  const result = spawnSync("git", ["diff", "--name-status", `${base}...HEAD`], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) return undefined;
  return result.stdout
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, ...parts] = line.split("\t");
      return { status, path: parts.at(-1) ?? "" };
    })
    .filter(({ path }) => path.length > 0);
}

async function main(): Promise<void> {
  const repoRoot = join(import.meta.dirname, "..", "..");
  const base = readArg("--base") ?? process.env.CHANGED_BASE;
  const out = readArg("--out") ?? process.env.DOCS_CHANGED_PAGES_FILE;
  const changedPaths = gitDiffPaths(base, repoRoot);
  const result = changedPaths
    ? resolveChangedDocs(changedPaths, { base, repoRoot })
    : {
        scope: "all" as const,
        pages: [],
        surfaces: [],
        fallbackReason: "No usable diff base was provided.",
      };

  if (out && result.scope === "subset") {
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, `${JSON.stringify(result.pages, null, 2)}\n`);
  }

  if (process.env.GITHUB_OUTPUT) {
    const pagesFile = out && result.scope === "subset" ? relative(repoRoot, out) : "";
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `scope=${result.scope}\npage_count=${result.pages.length}\npages_file=${pagesFile}\nsurfaces=${result.surfaces.join(",")}\nfallback_reason=${result.fallbackReason ?? ""}\n`,
    );
  }

  process.stdout.write(`${JSON.stringify(result)}\n`);
}

runAsMain(import.meta.url, main);
