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

const translateSidebar = (item: SidebarItem, translate: (text: string) => string): SidebarItem => {
  const translated: SidebarItem = { ...item };

  if (translated.text) {
    translated.text = translate(translated.text);
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

const build = (): void => {
  const adapter = createTranslationAdapter();
  const memory = TranslationMemory.load("hu", "api");

  rmSync(enApiDir, { recursive: true, force: true });
  rmSync(huApiDir, { recursive: true, force: true });

  console.log("Generating EN API docs...");
  run("vp", ["exec", "typedoc", "--options", "typedoc.json", "--out", "api"]);
  run("node", ["scripts/style-api-badges.ts"]);
  run("node", ["scripts/write-api-overview.ts"]);

  // The CSS API pages live under docs/api/css/; generate them after TypeDoc (which cleans docs/api) and
  // before the locale clone, so they're cloned + translated for HU for free.
  console.log("Generating CSS API docs...");
  run("node", ["scripts/build-css-api.ts"]);

  console.log("Cloning API docs for HU locale...");
  mkdirSync(dirname(huApiDir), { recursive: true });
  cpSync(enApiDir, huApiDir, { recursive: true });

  const files = walkFiles(huApiDir);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));
  // The TypeDoc sidebar carries the CSS section too (merged by @cssdoc/typedoc), so its labels cover
  // both the TS API and the CSS reference.
  const sidebarFiles = files.filter((f) => f.endsWith("typedoc-sidebar.json"));

  // 1. Markdown: segment each file into prose / deterministic-glossary / verbatim blocks. Prose is
  //    batched + cached through the selected adapter; headings, badge pills, and table column labels
  //    always go through the glossary (deterministic, keyless, never cached); everything else is kept
  //    verbatim. Block-level keys survive the scaffolding churn that busted whole-file keys.
  const glossary = new GlossaryTranslationAdapter();
  const segmented = markdownFiles.map((filePath) => ({
    filePath,
    segments: segmentMarkdown(readFileSync(filePath, "utf8")),
  }));
  const units = segmented.flatMap(({ segments }) => collectUnits(segments));

  const glossaryText = new Map<string, string>();
  for (const unit of units) {
    if (unit.kind === "glossary" && !glossaryText.has(unit.text)) {
      glossaryText.set(unit.text, glossary.translateText(unit.text));
    }
  }
  const proseUnits: TranslationUnit[] = units
    .filter((unit) => unit.kind === "prose")
    .map((unit) => ({ kind: "prose", source: unit.text }));
  const proseTranslations = translateUnits(adapter, memory, proseUnits, { autosave: true });

  const resolve: Resolve = (text, kind) =>
    kind === "glossary"
      ? (glossaryText.get(text) ?? text)
      : (proseTranslations.get(keyFor("prose", text)) ?? text);
  for (const { filePath, segments } of segmented) {
    writeFileSync(filePath, reassemble(segments, resolve));
  }

  // 2. Sidebars: collect every label across all trees, translate the misses in one batched pass,
  //    then rebuild each tree from the results.
  const sidebars = sidebarFiles.map((filePath) => ({
    filePath,
    tree: JSON.parse(readFileSync(filePath, "utf8")) as SidebarItem[],
  }));
  const labels: string[] = [];
  for (const { tree } of sidebars) collectSidebarText(tree, labels);
  const labelTranslations = translateUnits(
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

  memory.save();
  const proseBlocks = new Set(proseUnits.map((u) => u.source)).size;
  console.log(
    `Localized ${markdownFiles.length} API markdown files for HU via '${adapter.name}': ` +
      `${glossaryText.size} glossary terms, ${proseBlocks} prose blocks, ${labels.length} sidebar labels ` +
      `(${memory.misses} translated, ${memory.hits} cached) in ${relative(docsRoot, huApiDir)}`,
  );
};

build();
