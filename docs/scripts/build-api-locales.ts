/**
 * Build locale-specific TypeDoc output.
 *
 * EN API docs are generated directly by TypeDoc to `docs/api/`.
 * Every other locale's API docs are cloned to `docs/<locale>/api/` and localized with the configured
 * adapter (see `.vitepress/i18n.ts`'s `NON_ROOT_LOCALES`).
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { GlossaryTranslationAdapter, createTranslationAdapter } from "./api-translation.ts";
import { type Resolve, collectUnits, reassemble, segmentMarkdown } from "./segment-markdown.ts";
import {
  type TranslationUnit,
  TranslationMemory,
  keyFor,
  translateUnits,
} from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const enApiDir = join(docsRoot, "api");
const apiDirFor = (locale: string): string => join(docsRoot, locale, "api");

const run = (command: string, args: string[]): void => {
  const result = spawnSync(command, args, {
    cwd: docsRoot,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status ?? -1}`);
  }
};

const walkFiles = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
};

// TypeDoc emits absolute API links as `/api/...`; the cloned tree must point at `/<locale>/api/...` or
// the localized sidebar navigates back into the English pages. Idempotent — never double-prefixes.
const localizeApiLink = (link: string, locale: string): string =>
  /^\/api(\/|$)/.test(link) ? `/${locale}${link}` : link;

// Same rewrite for absolute `/api/...` links inside the cloned markdown (overview cards, CSS
// breadcrumbs). Only touches markdown-link `](…)` and `href="…"` targets, so it leaves relative links
// (`../index.md`) and any prose mentioning `/api` alone.
const localizeMarkdownApiLinks = (markdown: string, locale: string): string =>
  markdown.replace(/(\]\(|href=")\/api(?=[/")])/g, `$1/${locale}/api`);

const translateSidebar = (
  item: SidebarItem,
  translate: (text: string) => string,
  locale: string,
): SidebarItem => {
  const translated: SidebarItem = { ...item };

  if (translated.text) {
    translated.text = translate(translated.text);
  }

  if (translated.link) {
    translated.link = localizeApiLink(translated.link, locale);
  }

  if (translated.items) {
    translated.items = translated.items.map((child) => translateSidebar(child, translate, locale));
  }

  return translated;
};

/** Collect every `text` label in a sidebar tree (for one batched translation pass). */
const collectSidebarText = (items: SidebarItem[], out: string[]): void => {
  for (const item of items) {
    if (item.text) out.push(item.text);
    if (item.items) collectSidebarText(item.items, out);
  }
};

// Translated prose occasionally emits literal HTML tags (for example <dialog>), which Vue markdown
// parsing treats as real elements and can fail on missing end tags. Escape bare tag tokens in prose
// segments while leaving preserved HTML blocks/code fences untouched. A tag with attributes (the
// stability-badge pill's `<span class="...">`) is real generated HTML, not a stray mention — its
// plain closing partner (`</span>`) must stay unescaped too, or the pair goes unbalanced.
const escapeBareHtmlTags = (text: string): string => {
  const attributedTagNames = new Set(
    [...text.matchAll(/<([A-Za-z][\w-]*)\s[^>]*>/g)].map((match) => match[1]),
  );

  return text.replace(/<\/?([A-Za-z][\w-]*)>/g, (match, name: string) => {
    if (attributedTagNames.has(name)) return match;
    return match.startsWith("</") ? `&lt;/${name}&gt;` : `&lt;${name}&gt;`;
  });
};

/**
 * Generate the EN API docs (TypeDoc + badge styling + overview) and the CSS API pages. The CSS pages
 * live under docs/api/css/; they run after TypeDoc (which cleans docs/api) and before the locale clone,
 * so they're cloned + translated for HU for free.
 */
const generateBaseApiDocs = (): void => {
  console.log("Generating EN API docs...");
  run("vp", ["exec", "typedoc", "--options", "typedoc.json", "--out", "api"]);
  run("node", ["scripts/style-api-badges.ts"]);
  run("node", ["scripts/write-api-overview.ts"]);

  console.log("Generating CSS API docs...");
  run("node", ["scripts/build-css-api.ts"]);
};

/** Clone the generated EN API tree into a locale directory. */
const cloneApiForLocale = (localeApiDir: string): void => {
  mkdirSync(dirname(localeApiDir), { recursive: true });
  cpSync(enApiDir, localeApiDir, { recursive: true });
};

/**
 * Segment each cloned HU markdown file into prose / deterministic-glossary / verbatim blocks, then
 * rewrite it translated in place. Prose is batched + cached through the selected adapter; headings,
 * badge pills, and table column labels always go through the glossary (deterministic, keyless, never
 * cached); everything else is kept verbatim. Block-level keys survive the scaffolding churn that busted
 * whole-file keys. Returns the glossary-term and prose-block counts for the summary log.
 */
const translateMarkdownFiles = async (
  markdownFiles: string[],
  adapter: ReturnType<typeof createTranslationAdapter>,
  memory: TranslationMemory,
  locale: string,
): Promise<{ glossaryTerms: number; proseBlocks: number }> => {
  const glossary = new GlossaryTranslationAdapter(locale);
  const segmented = markdownFiles.map((filePath) => ({
    filePath,
    segments: segmentMarkdown(readFileSync(filePath, "utf8")),
  }));
  const units = segmented.flatMap(({ segments }) => collectUnits(segments));

  const glossaryText = new Map<string, string>();
  for (const unit of units) {
    if (unit.kind === "glossary" && !glossaryText.has(unit.text)) {
      // The glossary is synchronous under the hood; awaiting is just contract plumbing (instant).
      glossaryText.set(unit.text, await glossary.translateText(unit.text));
    }
  }
  const proseUnits: TranslationUnit[] = units
    .filter((unit) => unit.kind === "prose")
    .map((unit) => ({ kind: "prose", source: unit.text }));
  const proseTranslations = await translateUnits(adapter, memory, proseUnits, {
    autosave: true,
    locale,
    defaultVerbatim: { allow: ["en*"] },
  });

  const resolve: Resolve = (text, kind) => {
    if (kind === "glossary") {
      return glossaryText.get(text) ?? text;
    }

    const translated = proseTranslations.get(keyFor("prose", text)) ?? text;
    return escapeBareHtmlTags(translated);
  };
  for (const { filePath, segments } of segmented) {
    writeFileSync(filePath, localizeMarkdownApiLinks(reassemble(segments, resolve), locale));
  }

  const proseBlocks = new Set(proseUnits.map((u) => u.source)).size;
  return { glossaryTerms: glossaryText.size, proseBlocks };
};

/**
 * Collect every sidebar label across all trees, translate the misses in one batched pass, then rebuild
 * and rewrite each tree from the results. Returns the total label count for the summary log.
 */
const translateSidebars = async (
  sidebarFiles: string[],
  adapter: ReturnType<typeof createTranslationAdapter>,
  memory: TranslationMemory,
  locale: string,
): Promise<number> => {
  const sidebars = sidebarFiles.map((filePath) => ({
    filePath,
    tree: JSON.parse(readFileSync(filePath, "utf8")) as SidebarItem[],
  }));
  const labels: string[] = [];
  for (const { tree } of sidebars) collectSidebarText(tree, labels);
  const labelTranslations = await translateUnits(
    adapter,
    memory,
    labels.map((source) => ({ kind: "text", source })),
    { locale, defaultVerbatim: { allow: ["en*"] } },
  );
  const translateLabel = (text: string): string =>
    labelTranslations.get(keyFor("text", text)) ?? text;
  for (const { filePath, tree } of sidebars) {
    const translated = tree.map((item) => translateSidebar(item, translateLabel, locale));
    writeFileSync(filePath, `${JSON.stringify(translated, null, 2)}\n`);
  }
  return labels.length;
};

/** Clone + translate the EN API tree into one locale's directory. */
const buildLocale = async (locale: string): Promise<void> => {
  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "api");
  const localeApiDir = apiDirFor(locale);

  rmSync(localeApiDir, { recursive: true, force: true });
  cloneApiForLocale(localeApiDir);

  const files = walkFiles(localeApiDir);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));
  // The TypeDoc sidebar carries the CSS section too (merged by @cssdoc/typedoc), so its labels cover
  // both the TS API and the CSS reference.
  const sidebarFiles = files.filter((f) => f.endsWith("typedoc-sidebar.json"));

  // 1. Markdown blocks, then 2. sidebar labels — markdown first so both passes share the same memory.
  const { glossaryTerms, proseBlocks } = await translateMarkdownFiles(
    markdownFiles,
    adapter,
    memory,
    locale,
  );
  const labelCount = await translateSidebars(sidebarFiles, adapter, memory, locale);

  memory.save();
  console.log(
    `Localized ${markdownFiles.length} API markdown files for '${locale}' via '${adapter.name}': ` +
      `${glossaryTerms} glossary terms, ${proseBlocks} prose blocks, ${labelCount} sidebar labels ` +
      `(${memory.misses} translated, ${memory.hits} cached) in ${relative(docsRoot, localeApiDir)}`,
  );
};

const build = async (): Promise<void> => {
  rmSync(enApiDir, { recursive: true, force: true });
  for (const locale of NON_ROOT_LOCALES) {
    rmSync(apiDirFor(locale), { recursive: true, force: true });
  }

  generateBaseApiDocs();

  for (const locale of NON_ROOT_LOCALES) {
    await buildLocale(locale);
  }
};

build().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
