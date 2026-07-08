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
import { createTranslationAdapter } from "./api-translation.ts";
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
  run("pnpm", ["exec", "typedoc", "--options", "typedoc.json", "--out", "api"]);

  // The CSS API pages live under docs/api/css/; generate them after TypeDoc (which cleans docs/api) and
  // before the locale clone, so they're cloned + translated for HU for free.
  console.log("Generating CSS API docs...");
  run("node", ["scripts/build-css-api.ts"]);

  console.log("Cloning API docs for HU locale...");
  mkdirSync(dirname(huApiDir), { recursive: true });
  cpSync(enApiDir, huApiDir, { recursive: true });

  const files = walkFiles(huApiDir);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));
  // Both the TypeDoc sidebar and the CSS API sidebar (from build-css-api.ts) carry translatable labels.
  const sidebarFiles = files.filter((f) => /(?:typedoc|css)-sidebar\.json$/u.test(f));

  // 1. Markdown: diff each file against the memory; only misses reach the adapter.
  const markdownUnits: (TranslationUnit & { filePath: string })[] = markdownFiles.map(
    (filePath) => ({
      kind: "markdown",
      source: readFileSync(filePath, "utf8"),
      filePath,
    }),
  );
  const markdownTranslations = translateUnits(adapter, memory, markdownUnits, { autosave: true });
  for (const unit of markdownUnits) {
    writeFileSync(
      unit.filePath,
      markdownTranslations.get(keyFor("markdown", unit.source)) ?? unit.source,
    );
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
  console.log(
    `Localized ${markdownFiles.length} API markdown files + ${labels.length} sidebar labels for HU ` +
      `via '${adapter.name}' (${memory.misses} translated, ${memory.hits} cached) in ${relative(docsRoot, huApiDir)}`,
  );
};

build();
