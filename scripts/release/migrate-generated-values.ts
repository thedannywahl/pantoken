import { globSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  parsePo,
  serializePo,
  writeCatalog,
  type PoEntry,
} from "../../tools/i18n-engine/src/po.ts";
import {
  GENERATED_VALUES_MARKER,
  assertGeneratedTranslation,
  generatedMarkdown,
  migrateGeneratedMarkdown,
  restoreGeneratedMarkdown,
  scopeGeneratedMarkdown,
} from "../../tools/translation-adapters/src/generated-values.ts";
import { runAsMain } from "./cli.ts";
import { loadConfig } from "../../tools/i18n-engine/src/config.ts";
import { segmentMarkdown } from "../../docs/scripts/segment-markdown.ts";

/** Prepare one catalog migration atomically. Ambiguous values require a reviewed manual mapping. */
export function migrateGeneratedCatalog(
  entries: readonly PoEntry[],
  namespace: "api" | "guides",
  generatedTemplates?: ReadonlyMap<string, ReadonlySet<string>>,
): PoEntry[] {
  const output = new Map<string, PoEntry>();
  const active = new Set(
    entries
      .filter((entry) => !entry.obsolete)
      .map((entry) => `${entry.msgctxt ?? ""}\0${entry.msgid}`),
  );
  const candidates = entries.flatMap(
    (entry): Array<{ entry: PoEntry; scope?: string; skip?: boolean }> => {
      if (namespace !== "api" || generatedTemplates === undefined) return [{ entry }];
      if (entry.obsolete) {
        if (
          entry.msgctxt !== "docs.api:prose" ||
          entry.fuzzy ||
          entry.msgstr === "" ||
          entry.msgid.includes("{{ptk_code_")
        )
          return [{ entry }];
        const scopes = [...generatedTemplates]
          .filter(([, templates]) => templates.has(entry.msgid))
          .map(([scope]) => scope)
          .filter((scope) => {
            const scoped = scopeGeneratedMarkdown(generatedMarkdown(entry.msgid), scope).template;
            return (
              !active.has(`${entry.msgctxt ?? ""}\0${scoped}`) &&
              !active.has(`${entry.msgctxt ?? ""}\0${entry.msgid}`)
            );
          });
        return [
          { entry },
          ...scopes.map((scope) => ({
            entry: { ...entry, obsolete: false, references: [scope] },
            scope,
          })),
        ];
      }
      if (entry.msgid.startsWith("<!-- pantoken-value-scope:")) {
        if (!entry.fuzzy && entry.msgstr !== "")
          assertGeneratedTranslation(entry.msgid, entry.msgstr);
        return [{ entry, skip: true }];
      }
      const template = entry.msgid.includes("{{ptk_code_")
        ? entry.msgid
        : generatedMarkdown(entry.msgid).template;
      const references = entry.references.flatMap((reference) => reference.split(/\s+/u));
      const matched = references.filter((reference) =>
        generatedTemplates.get(reference)?.has(template),
      );
      if (matched.length === 0) return [{ entry, skip: true }];
      const remaining = references.filter((reference) => !matched.includes(reference));
      return [
        ...matched.map((scope) => ({ entry: { ...entry, references: [scope] }, scope })),
        ...(remaining.length > 0
          ? [{ entry: { ...entry, references: remaining }, skip: true }]
          : []),
      ];
    },
  );
  for (const { entry, scope, skip } of candidates) {
    const compatibility = namespace === "guides" && entry.references.includes("compatibility.md");
    const eligible =
      !skip &&
      !entry.obsolete &&
      (compatibility || (namespace === "api" && entry.msgctxt === "docs.api:prose"));
    let updated = entry;
    if (eligible) {
      try {
        const source = entry.msgid.replace(`${GENERATED_VALUES_MARKER}\n`, "");
        const options = compatibility ? { tables: true, tableValuesOnly: true } : {};
        if (source.includes("{{ptk_code_")) {
          assertGeneratedTranslation(
            source,
            entry.msgstr !== "" && !entry.fuzzy ? entry.msgstr : source,
          );
          updated = entry;
        } else {
          const literal = generatedMarkdown(source, options);
          const generated = scopeGeneratedMarkdown(literal, scope);
          const translation =
            entry.msgstr === "" || entry.fuzzy
              ? entry.msgstr
              : migrateGeneratedMarkdown(source, entry.msgstr, options);
          const prefix = generated.template.slice(
            0,
            generated.template.length - literal.template.length,
          );
          const scopedTranslation =
            translation === "" || entry.fuzzy ? translation : prefix + translation;
          if (entry.msgstr !== "" && !entry.fuzzy)
            restoreGeneratedMarkdown(scopedTranslation, generated);
          updated = { ...entry, msgid: generated.template, msgstr: scopedTranslation };
        }
      } catch (error) {
        throw new Error(
          `${entry.references.join(", ")}: ${entry.msgid.slice(0, 100)}: ${String(error)}`,
          { cause: error },
        );
      }
    }
    const key = `${updated.obsolete}\0${updated.msgctxt ?? ""}\0${updated.msgid}`;
    const existing = output.get(key);
    if (existing && existing.msgstr !== updated.msgstr)
      throw new Error(`Conflicting translations for template: ${updated.msgid.slice(0, 100)}`);
    output.set(
      key,
      existing
        ? { ...existing, references: [...new Set([...existing.references, ...updated.references])] }
        : updated,
    );
  }
  return [...output.values()];
}

/** Preserve catalog headers, comments, wrapping, and obsolete history outside changed entries. */
export function migrateGeneratedCatalogText(
  source: string,
  namespace: "api" | "guides",
  templates?: ReadonlyMap<string, ReadonlySet<string>>,
): string {
  const migratedCatalog = migrateGeneratedCatalog(parsePo(source), namespace, templates);
  const emitted = new Set<string>();
  const key = (entry: PoEntry): string => `${entry.msgctxt ?? ""}\0${entry.msgid}`;
  const catalog = source
    .split(/(\n{2,})/u)
    .map((block) => {
      const entries = parsePo(block);
      if (entries.length === 0) return block;
      if (entries.length !== 1) throw new Error("Expected one catalog entry per paragraph");
      if (entries[0].obsolete) return block;
      const migrated = migrateGeneratedCatalog(entries, namespace, templates);
      for (const entry of migrated) emitted.add(key(entry));
      if (JSON.stringify(migrated) === JSON.stringify(entries)) return block;
      const comments = block
        .split("\n")
        .filter((line) => line.startsWith("#") && !line.startsWith("#:") && !line.startsWith("#,"));
      const rendered = migrated
        .map((entry) => {
          const serialized = serializePo([entry]).split("\n\n").slice(1).join("\n\n").trimEnd();
          return [...comments, serialized].join("\n");
        })
        .join("\n\n");
      return rendered + (block.endsWith("\n") ? "\n" : "");
    })
    .join("");
  const revived = migratedCatalog.filter((entry) => !entry.obsolete && !emitted.has(key(entry)));
  if (revived.length === 0) return catalog;
  const separator = catalog.endsWith("\n\n") ? "" : catalog.endsWith("\n") ? "\n" : "\n\n";
  return catalog + separator + serializePo(revived).split("\n\n").slice(1).join("\n\n");
}

/** Discover only generator-marked prose; authored JSDoc/code examples keep their existing keys. */
export function generatedApiTemplates(root: string): ReadonlyMap<string, ReadonlySet<string>> {
  const generatedTemplates = new Map<string, Set<string>>();
  for (const file of globSync("docs/api/**/*.md", { cwd: root })) {
    const templates = new Set<string>();
    for (const segment of segmentMarkdown(readFileSync(join(root, file), "utf8"))) {
      if (segment.kind === "callout") {
        templates.add(generatedMarkdown(segment.note).template);
        templates.add(segment.note);
      }
      if (segment.kind === "prose" && segment.generatedValues) {
        templates.add(generatedMarkdown(segment.text).template);
        templates.add(segment.text);
      }
    }
    if (templates.size > 0) generatedTemplates.set(file.slice("docs/api/".length), templates);
  }
  return generatedTemplates;
}

runAsMain(import.meta.url, async () => {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args[0] !== "--check" && args[0] !== "--write"))
    throw new Error("Usage: migrate-generated-values.ts --check|--write");
  const l10n = join(import.meta.dirname, "../../l10n");
  const root = join(import.meta.dirname, "../..");
  const config = loadConfig(join(root, "i18n.config.json"));
  const generatedTemplates = generatedApiTemplates(root);
  if (generatedTemplates.size === 0)
    throw new Error("Generate English API documentation before migrating value bindings");
  const pending: Array<{ path: string; catalog: string }> = [];
  const incomplete: string[] = [];
  const failures: string[] = [];
  const directories = [
    "",
    ...readdirSync(l10n, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== config.source)
      .map((entry) => entry.name),
  ];
  for (const directory of directories) {
    for (const namespace of ["api", "guides"] as const) {
      const path = join(l10n, directory, `docs.${namespace}.${directory ? "po" : "pot"}`);
      try {
        const source = readFileSync(path, "utf8");
        const catalog = migrateGeneratedCatalogText(source, namespace, generatedTemplates);
        pending.push({
          path,
          catalog,
        });
        if (directory) {
          for (const entry of parsePo(catalog)) {
            if (
              !entry.obsolete &&
              entry.msgid.includes("{{ptk_code_") &&
              (entry.fuzzy || entry.msgstr === "")
            )
              incomplete.push(`${directory}/docs.${namespace}.po: ${entry.references.join(", ")}`);
          }
        }
      } catch (error) {
        failures.push(`${path}: ${String(error)}`);
      }
    }
  }
  if (failures.length > 0) throw new Error(`No catalogs changed:\n${failures.join("\n")}`);
  if (args[0] === "--write") for (const file of pending) writeCatalog(file.path, file.catalog);
  console.log(
    `Generated-value migration: ${pending.length} catalogs ${args[0] === "--write" ? "written" : "validated"}`,
  );
  if (incomplete.length > 0)
    console.warn(
      `Manual review still required for ${incomplete.length} generated translations:\n${incomplete.join("\n")}`,
    );
});
