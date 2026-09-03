/**
 * Build locale-specific TypeDoc output.
 *
 * EN API docs are generated directly by TypeDoc to `docs/api/`.
 * Every other locale's API docs are cloned to `docs/<locale>/api/` and localized with the configured
 * adapter (see `.vitepress/i18n.ts`'s `NON_ROOT_LOCALES`). Markdown files and sidebars are processed
 * one at a time with real-time per-file progress logging to avoid silently translating thousands
 * of strings before showing any feedback.
 *
 * Logs incremental per-file progress by phase and locale:
 *   📋 Building locale-specific API docs
 *   🔨 Generating EN API docs
 *     ✓ TypeDoc output
 *     ✓ API badge styling
 *     ✓ Overview cards
 *   🔨 Generating CSS API docs
 *     ✓ CSS API reference
 *   🔄 ar: translating...
 *     docs/api/classes/Alert.md: 12 prose, 3 glossary (8 cached, 7 translated)
 *     docs/api/classes/Button.md: 18 prose, 5 glossary (15 cached, 8 translated)
 *     docs/api/classes/Modal.md: 25 prose, 4 glossary (20 cached, 9 translated)
 *     docs/api/typedoc-sidebar.json: 87 labels (65 cached, 22 translated)
 *     📄 Summary: 1,450 prose blocks, 445 glossary terms (1,200 cached, 1,347 translated)
 *     📋 Summary: 87 labels (65 cached, 22 translated)
 *   ✓ ar: rendered in docs/ar/api (3,534 translated, 1,265 cached)
 *   ✨ All API locales complete!
 */
import {
  cpSync,
  existsSync,
  globSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { refreshCoverageReports, serializePot } from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { GlossaryTranslationAdapter, createTranslationAdapter } from "./api-translation.ts";
import { type Resolve, collectUnits, reassemble, segmentMarkdown } from "./segment-markdown.ts";
import {
  type TranslationUnit,
  TranslationMemory,
  keyFor,
  translateUnits,
} from "./translation-memory.ts";
import { GLOSSARY_TERMS } from "./glossary.ts";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const enApiDir = join(docsRoot, "api");
const apiDirFor = (locale: string): string => join(docsRoot, locale, "api");
const requestedLocale = process.env.DOCS_TRANSLATION_LOCALE;
const locales = requestedLocale ? [requestedLocale] : NON_ROOT_LOCALES;
const GLOSSARY_TEXT = new Set(GLOSSARY_TERMS.map(({ term }) => term));

/**
 * API identifiers, literal URLs, declarations, and other code-shaped fragments must remain English.
 * Mark them as required verbatim so the translation memory records the deliberate passthrough instead
 * of asking the model to translate them on every build.
 */
export const isRequiredVerbatimApiUnit = (source: string): boolean => {
  const text = source.trim();
  const withoutListMarker = text.replace(/^(?:-|\*)\s+/u, "");
  const unwrapped = withoutListMarker.replace(/^\*\*(.+)\*\*$/u, "$1");
  if (unwrapped === "Token") return true;
  if (/^(?:https?:\/\/|www\.)\S+$/iu.test(unwrapped)) return true;
  if (/^\*\*Source:\*\*\s+\[[^\]]+\]\(https?:\/\//u.test(text)) return true;
  if (/^@(?:import|supports|media|scope)\b/u.test(unwrapped)) return true;
  if (/^(?:--[a-z][\w-]*|[a-z-]+):\s*[^\n]+\.?$/iu.test(unwrapped)) return true;
  if (/^readonly\s+`[^`]+`(?:\[\])?$/u.test(unwrapped)) return true;

  return (
    !GLOSSARY_TEXT.has(unwrapped) &&
    /^[A-Za-z_$][\w$]*(?:[.-][A-Za-z0-9_$-]+)*(?:\(\))?\??$/u.test(unwrapped)
  );
};

const requiredVerbatimSources = (units: readonly TranslationUnit[]): ReadonlySet<string> =>
  new Set(
    units.filter(({ source }) => isRequiredVerbatimApiUnit(source)).map(({ source }) => source),
  );

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
  console.log(`🔨 Generating EN API docs`);
  run("vp", ["exec", "typedoc", "--options", "typedoc.json", "--out", "api"]);
  console.log(`  ✓ TypeDoc output`);
  run("node", ["scripts/style-api-badges.ts"]);
  console.log(`  ✓ API badge styling`);
  run("node", ["scripts/write-api-overview.ts"]);
  console.log(`  ✓ Overview cards`);

  console.log(`🔨 Generating CSS API docs`);
  run("node", ["scripts/build-css-api.ts"]);
  console.log(`  ✓ CSS API reference\n`);
};

/**
 * Rebuild `l10n/docs.api.pot` from the EN API tree this run just generated and refresh the coverage
 * reports off it. Keeps the coverage denominator in sync with the content being translated below —
 * `docs:api:en` regenerates the same catalog independently, so a coverage report run against a build
 * that only ran `docs:api:locales` would otherwise compare stale POT keys to fresh PO entries.
 */
const refreshApiPot = (): void => {
  const units = globSync("**/*.md", { cwd: enApiDir })
    .sort()
    .flatMap((file) =>
      collectUnits(segmentMarkdown(readFileSync(join(enApiDir, file), "utf8")))
        // Glossary units are deterministically substituted and never written to the PO catalog
        // (see segment-markdown.ts) — including them here would make 100% coverage unreachable.
        .filter((unit) => unit.kind === "prose")
        .map((unit) => ({
          msgid: unit.text,
          msgctxt: `docs.api:${unit.kind}`,
          reference: relative(enApiDir, join(enApiDir, file)),
          translate: "always" as const,
        })),
    );
  writeFileSync(join(repoRoot, "l10n", "docs.api.pot"), serializePot(units, ["no-c-format"]));
  refreshCoverageReports(join(repoRoot, "i18n.config.json"));
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
 * whole-file keys. Logs per-file progress incrementally. Returns glossary-term, prose-block, and
 * cache/miss counts aggregated across all files.
 */
const translateMarkdownFiles = async (
  markdownFiles: string[],
  adapter: ReturnType<typeof createTranslationAdapter>,
  memory: TranslationMemory,
  locale: string,
): Promise<{
  glossaryTerms: number;
  proseBlocks: number;
  proseTranslated: number;
  proseCached: number;
}> => {
  const glossary = new GlossaryTranslationAdapter(locale);
  const segmented = markdownFiles.map((filePath) => ({
    filePath,
    segments: segmentMarkdown(readFileSync(filePath, "utf8")),
  }));

  let totalGlossaryTerms = 0;
  let totalProseBlocks = 0;
  let totalProseTranslated = 0;
  let totalProseCached = 0;

  for (const { filePath, segments } of segmented) {
    const fileUnits = collectUnits(segments);

    // Translate glossary terms for this file
    const glossaryText = new Map<string, string>();
    for (const unit of fileUnits) {
      if (unit.kind === "glossary" && !glossaryText.has(unit.text)) {
        glossaryText.set(unit.text, await glossary.translateText(unit.text));
      }
    }
    totalGlossaryTerms += glossaryText.size;

    // Translate prose units for this file
    const proseUnits: TranslationUnit[] = fileUnits
      .filter((unit) => unit.kind === "prose")
      .map((unit) => ({ kind: "prose", source: unit.text }));

    const beforeMisses = memory.misses;
    const beforeHits = memory.hits;

    const proseTranslations = await translateUnits(adapter, memory, proseUnits, {
      autosave: true,
      locale,
      defaultVerbatim: { allow: ["en*"] },
      requiredVerbatimSources: requiredVerbatimSources(proseUnits),
    });

    const fileProseTranslated = memory.misses - beforeMisses;
    const fileProseCached = memory.hits - beforeHits;
    totalProseTranslated += fileProseTranslated;
    totalProseCached += fileProseCached;

    const proseBlockCount = new Set(proseUnits.map((u) => u.source)).size;
    totalProseBlocks += proseBlockCount;

    // Resolve and write the file
    const resolve: Resolve = (text, kind) => {
      if (kind === "glossary") {
        return glossaryText.get(text) ?? text;
      }
      const translated = proseTranslations.get(keyFor("prose", text)) ?? text;
      return escapeBareHtmlTags(translated);
    };
    writeFileSync(filePath, localizeMarkdownApiLinks(reassemble(segments, resolve), locale));

    // Log per-file progress
    const relPath = relative(docsRoot, filePath);
    if (proseBlockCount > 0 || glossaryText.size > 0) {
      const fileCounts = [
        glossaryText.size > 0 && `${glossaryText.size} glossary`,
        proseBlockCount > 0 && `${proseBlockCount} prose`,
      ]
        .filter(Boolean)
        .join(", ");
      console.log(
        `    ${relPath}: ${fileCounts} (${fileProseCached} cached, ${fileProseTranslated} translated)`,
      );
    }
  }

  return {
    glossaryTerms: totalGlossaryTerms,
    proseBlocks: totalProseBlocks,
    proseTranslated: totalProseTranslated,
    proseCached: totalProseCached,
  };
};

/**
 * Collect every sidebar label across all trees, translate them with incremental per-file feedback,
 * then rebuild and rewrite each tree from the results. Logs per-file label counts and cache/miss stats.
 * Returns aggregated label count and cache/miss stats for the summary log.
 */
const translateSidebars = async (
  sidebarFiles: string[],
  adapter: ReturnType<typeof createTranslationAdapter>,
  memory: TranslationMemory,
  locale: string,
): Promise<{ labelCount: number; labelTranslated: number; labelCached: number }> => {
  const sidebars = sidebarFiles.map((filePath) => ({
    filePath,
    tree: JSON.parse(readFileSync(filePath, "utf8")) as SidebarItem[],
  }));

  let totalLabelCount = 0;
  let totalLabelTranslated = 0;
  let totalLabelCached = 0;

  for (const { filePath, tree } of sidebars) {
    const fileLabels: string[] = [];
    collectSidebarText(tree, fileLabels);

    const beforeMisses = memory.misses;
    const beforeHits = memory.hits;

    const labelTranslations = await translateUnits(
      adapter,
      memory,
      fileLabels.map((source) => ({ kind: "text", source })),
      {
        locale,
        defaultVerbatim: { allow: ["en*"] },
        requiredVerbatimSources: requiredVerbatimSources(
          fileLabels.map((source) => ({ kind: "text", source })),
        ),
      },
    );
    const translateLabel = (text: string): string =>
      labelTranslations.get(keyFor("text", text)) ?? text;

    const translated = tree.map((item) => translateSidebar(item, translateLabel, locale));
    writeFileSync(filePath, `${JSON.stringify(translated, null, 2)}\n`);

    const fileLabelTranslated = memory.misses - beforeMisses;
    const fileLabelCached = memory.hits - beforeHits;
    totalLabelTranslated += fileLabelTranslated;
    totalLabelCached += fileLabelCached;
    totalLabelCount += fileLabels.length;

    // Log per-file progress
    const relPath = relative(docsRoot, filePath);
    console.log(
      `    ${relPath}: ${fileLabels.length} label${fileLabels.length === 1 ? "" : "s"} (${fileLabelCached} cached, ${fileLabelTranslated} translated)`,
    );
  }

  return {
    labelCount: totalLabelCount,
    labelTranslated: totalLabelTranslated,
    labelCached: totalLabelCached,
  };
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

  console.log(`🔄 ${locale}: translating...`);

  // 1. Markdown blocks (logs per-file progress internally)
  const { glossaryTerms, proseBlocks, proseTranslated, proseCached } = await translateMarkdownFiles(
    markdownFiles,
    adapter,
    memory,
    locale,
  );

  console.log(
    `  📄 Summary: ${proseBlocks} prose block${proseBlocks === 1 ? "" : "s"}, ` +
      `${glossaryTerms} glossary term${glossaryTerms === 1 ? "" : "s"} ` +
      `(${proseCached} cached, ${proseTranslated} translated)`,
  );

  // 2. Sidebar labels (logs per-file progress internally)
  const { labelCount, labelTranslated, labelCached } = await translateSidebars(
    sidebarFiles,
    adapter,
    memory,
    locale,
  );

  console.log(
    `  📋 Summary: ${labelCount} label${labelCount === 1 ? "" : "s"} ` +
      `(${labelCached} cached, ${labelTranslated} translated)`,
  );

  memory.save();
  const totalTranslated = proseTranslated + labelTranslated;
  const totalCached = proseCached + labelCached;
  console.log(
    `✓ ${locale}: rendered in ${relative(docsRoot, localeApiDir)} ` +
      `(${totalTranslated} translated, ${totalCached} cached)\n`,
  );
};

const build = async (): Promise<void> => {
  console.log(`📋 Building locale-specific API docs\n`);

  rmSync(enApiDir, { recursive: true, force: true });
  for (const locale of locales) {
    rmSync(apiDirFor(locale), { recursive: true, force: true });
  }

  generateBaseApiDocs();
  refreshApiPot();

  for (const locale of locales) {
    await buildLocale(locale);
  }

  console.log(`✨ API locale build complete for ${locales.join(", ")}`);
};

build().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
