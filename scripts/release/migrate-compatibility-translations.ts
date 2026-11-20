import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NON_ROOT_LOCALES } from "../../docs/.vitepress/i18n.ts";
import {
  parsePo,
  serializePo,
  writeCatalog,
  type PoEntry,
} from "../../tools/i18n-engine/src/po.ts";
import { generatedFileMarkdown } from "../../tools/translation-adapters/src/generated-values.ts";
import {
  compatibilityMarkdown,
  compatibilityUnits,
  migrateCompatibilityTranslation,
  renderCompatibility,
  reuseCompatibilityRows,
} from "../../tools/translation-adapters/src/compatibility-markdown.ts";
import { runAsMain } from "./cli.ts";

const root = join(import.meta.dirname, "../..");

/** Prepare new row entries without modifying existing catalog records. */
export function migrateCompatibilityCatalog(
  catalog: string,
  source: string,
  legacy?: { source: string; catalog: string },
): { catalog: string; missing: number } {
  const entries = parsePo(catalog);
  const page = compatibilityMarkdown(source);
  const translations = new Map(
    entries
      .filter((entry) => !entry.obsolete && !entry.fuzzy && entry.msgstr !== "")
      .map((entry) => [entry.msgid, entry.msgstr]),
  );
  const addReviewed = (oldSource: string, oldEntries: readonly PoEntry[]): void => {
    const template = generatedFileMarkdown(oldSource).template;
    const entry = oldEntries.find(
      (item) => !item.obsolete && !item.fuzzy && item.msgid === template && item.msgstr !== "",
    );
    if (!entry) return;
    for (const [key, value] of migrateCompatibilityTranslation(oldSource, entry.msgstr)) {
      if (!translations.has(key)) translations.set(key, value);
    }
  };
  addReviewed(source, entries);
  if (legacy) addReviewed(legacy.source, parsePo(legacy.catalog));
  reuseCompatibilityRows(page, translations);
  const active = new Map(
    entries.filter((entry) => !entry.obsolete).map((entry) => [entry.msgid, entry]),
  );
  const additions: PoEntry[] = [];
  let missing = 0;
  for (const key of new Set(compatibilityUnits(page))) {
    const existing = active.get(key);
    if (existing) {
      if (existing.fuzzy || existing.msgstr === "") missing++;
      continue;
    }
    const msgstr = translations.get(key);
    if (msgstr === undefined) {
      missing++;
      continue;
    }
    additions.push({
      msgid: key,
      msgstr,
      references: ["compatibility.md"],
      flags: ["no-c-format"],
      fuzzy: false,
      obsolete: false,
    });
  }
  if (missing === 0)
    renderCompatibility(page, (unit) => {
      const translation = translations.get(unit);
      if (translation === undefined) throw new Error("Missing compatibility translation");
      return translation;
    });
  if (additions.length === 0) return { catalog, missing };
  const separator = catalog.endsWith("\n\n") ? "" : catalog.endsWith("\n") ? "\n" : "\n\n";
  return {
    catalog: catalog + separator + serializePo(additions).split("\n\n").slice(1).join("\n\n"),
    missing,
  };
}

runAsMain(import.meta.url, async () => {
  const args = process.argv.slice(2);
  if (
    !["--check", "--write"].includes(args[0] ?? "") ||
    (args.length !== 1 && (args.length !== 3 || !args[1] || !args[2]))
  )
    throw new Error(
      "Usage: migrate-compatibility-translations.ts --check|--write [source-ref catalog-ref]",
    );
  const source = readFileSync(join(root, "docs/compatibility.md"), "utf8");
  const legacySource = args[1]
    ? execFileSync("git", ["show", `${args[1]}:docs/compatibility.md`], {
        cwd: root,
        encoding: "utf8",
      })
    : undefined;
  const pending: Array<{ path: string; content: string }> = [];
  const incomplete: string[] = [];
  for (const locale of NON_ROOT_LOCALES) {
    const path = join(root, "l10n", locale, "docs.guides.po");
    const catalog = readFileSync(path, "utf8");
    const legacy = legacySource
      ? {
          source: legacySource,
          catalog: execFileSync("git", ["show", `${args[2]}:l10n/${locale}/docs.guides.po`], {
            cwd: root,
            encoding: "utf8",
            maxBuffer: 20_000_000,
          }),
        }
      : undefined;
    const result = migrateCompatibilityCatalog(catalog, source, legacy);
    if (result.missing) incomplete.push(`${locale}: ${result.missing} unit(s)`);
    if (result.catalog !== catalog) pending.push({ path, content: result.catalog });
  }
  if (incomplete.length)
    throw new Error(`Missing reviewed compatibility translations:\n${incomplete.join("\n")}`);
  if (args[0] === "--write") for (const file of pending) writeCatalog(file.path, file.content);
  console.log(
    `Compatibility migration: ${pending.length} catalog(s) ${args[0] === "--write" ? "updated" : "need updating"}`,
  );
  if (args[0] === "--check" && pending.length) process.exitCode = 1;
});
