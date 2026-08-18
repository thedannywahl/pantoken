/**
 * Build locale-specific TypeDoc output.
 *
 * EN API docs are generated directly by TypeDoc to `docs/api/`.
 * HU API docs are cloned to `docs/hu/api/` and then localized with the configured adapter.
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
const huApiDir = join(docsRoot, "hu/api");

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

// TypeDoc emits absolute API links as `/api/...`; the cloned HU tree must point at `/hu/api/...` or the
// Hungarian sidebar navigates back into the English pages. Idempotent — never double-prefixes.
const localizeApiLink = (link: string): string => (/^\/api(\/|$)/.test(link) ? `/hu${link}` : link);

// Same rewrite for absolute `/api/...` links inside the cloned markdown (overview cards, CSS
// breadcrumbs). Only touches markdown-link `](…)` and `href="…"` targets, so it leaves relative links
// (`../index.md`) and any prose mentioning `/api` alone.
const localizeMarkdownApiLinks = (markdown: string): string =>
  markdown.replace(/(\]\(|href=")\/api(?=[/")])/g, "$1/hu/api");

const translateSidebar = (item: SidebarItem, translate: (text: string) => string): SidebarItem => {
  const translated: SidebarItem = { ...item };

  if (translated.text) {
    translated.text = translate(translated.text);
  }

  if (translated.link) {
    translated.link = localizeApiLink(translated.link);
  }

  if (translated.items) {
    translated.items = translated.items.map((child) => translateSidebar(child, translate));
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

/** Clone the generated EN API tree into the HU locale directory. */
const cloneApiForHu = (): void => {
  console.log("Cloning API docs for HU locale...");
  mkdirSync(dirname(huApiDir), { recursive: true });
  cpSync(enApiDir, huApiDir, { recursive: true });
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
): Promise<{ glossaryTerms: number; proseBlocks: number }> => {
  const glossary = new GlossaryTranslationAdapter();
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
  const proseTranslations = await translateUnits(adapter, memory, proseUnits, { autosave: true });

  const resolve: Resolve = (text, kind) => {
    if (kind === "glossary") {
      return glossaryText.get(text) ?? text;
    }

    const translated = proseTranslations.get(keyFor("prose", text)) ?? text;
    return escapeBareHtmlTags(translated);
  };
  for (const { filePath, segments } of segmented) {
    writeFileSync(filePath, localizeMarkdownApiLinks(reassemble(segments, resolve)));
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
  );
  const translateLabel = (text: string): string =>
    labelTranslations.get(keyFor("text", text)) ?? text;
  for (const { filePath, tree } of sidebars) {
    const translated = tree.map((item) => translateSidebar(item, translateLabel));
    writeFileSync(filePath, `${JSON.stringify(translated, null, 2)}\n`);
  }
  return labels.length;
};

const build = async (): Promise<void> => {
  const adapter = createTranslationAdapter();
  const memory = TranslationMemory.load("hu", "api");

  rmSync(enApiDir, { recursive: true, force: true });
  rmSync(huApiDir, { recursive: true, force: true });

  generateBaseApiDocs();
  cloneApiForHu();

  const files = walkFiles(huApiDir);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));
  // The TypeDoc sidebar carries the CSS section too (merged by @cssdoc/typedoc), so its labels cover
  // both the TS API and the CSS reference.
  const sidebarFiles = files.filter((f) => f.endsWith("typedoc-sidebar.json"));

  // 1. Markdown blocks, then 2. sidebar labels — markdown first so both passes share the same memory.
  const { glossaryTerms, proseBlocks } = await translateMarkdownFiles(
    markdownFiles,
    adapter,
    memory,
  );
  const labelCount = await translateSidebars(sidebarFiles, adapter, memory);

  memory.save();
  console.log(
    `Localized ${markdownFiles.length} API markdown files for HU via '${adapter.name}': ` +
      `${glossaryTerms} glossary terms, ${proseBlocks} prose blocks, ${labelCount} sidebar labels ` +
      `(${memory.misses} translated, ${memory.hits} cached) in ${relative(docsRoot, huApiDir)}`,
  );
};

build().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
