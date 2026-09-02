/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`) and every
 * `templates/<platform>/src/i18n.json` (the template's own runtime UI strings), so all three flow
 * through the same translate/check-drift pipeline as one flat key → value source.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type VerbatimPolicy = "allow" | "required";
type SourceEntry =
  | string
  | { string?: string; message?: string; verbatim?: VerbatimPolicy; translate?: string };

export function flattenSource(raw: Record<string, SourceEntry>): {
  strings: Record<string, string>;
  verbatim: Record<string, VerbatimPolicy>;
} {
  const strings: Record<string, string> = {};
  const verbatim: Record<string, VerbatimPolicy> = {};
  for (const [key, entry] of Object.entries(raw)) {
    if (typeof entry === "string") strings[key] = entry;
    else {
      strings[key] = entry.message ?? entry.string ?? "";
      if (entry.verbatim) verbatim[key] = entry.verbatim;
      else if (entry.translate === "never") verbatim[key] = "required";
    }
  }
  return { strings, verbatim };
}

function mergeScaffoldMetadata(
  metaPath: string,
  prefix: string,
  source: Record<string, string>,
  verbatim: Record<string, VerbatimPolicy>,
): void {
  if (!existsSync(metaPath)) return;
  const meta = JSON.parse(readFileSync(metaPath, "utf8")) as {
    nextSteps?: string[];
    notes?: string;
    caveats?: string;
  };
  for (const [index, step] of (meta.nextSteps ?? []).entries()) {
    const key = `${prefix}.nextSteps.${String(index)}`;
    source[key] = step;
    if (/^(?:cd \{\{dir\}\}|\{\{install\}\}|\{\{dev\}\})$/u.test(step)) {
      verbatim[key] = "required";
    }
  }
  if (meta.notes) source[`${prefix}.notes`] = meta.notes;
  if (meta.caveats) source[`${prefix}.caveats`] = meta.caveats;
}

function mergeTemplateSource(
  templateI18nPath: string,
  prefix: string,
  source: Record<string, string>,
  verbatim: Record<string, VerbatimPolicy>,
): void {
  if (!existsSync(templateI18nPath)) return;
  const templateParsed = flattenSource(
    JSON.parse(readFileSync(templateI18nPath, "utf8")) as Record<string, SourceEntry>,
  );
  for (const [key, value] of Object.entries(templateParsed.strings)) {
    source[`${prefix}.i18n.${key}`] = value;
  }
  for (const [key, policy] of Object.entries(templateParsed.verbatim)) {
    verbatim[`${prefix}.i18n.${key}`] = policy;
  }
}

/**
 * Reads `<root>/src/i18n.json`, then merges in keys synthesized from every
 * `<root>/templates/<platform>/scaffold.json` and `<root>/templates/<platform>/src/i18n.json`
 * that exist. Each `src/i18n.json`'s inline `verbatim` policies (see
 * `@pantoken/translation-adapters`'s `parseI18nSource`) are merged the same way, namespaced to
 * match its template's keys.
 */
export function collectI18nSource(root: string): {
  source: Record<string, string>;
  verbatim: Record<string, VerbatimPolicy>;
} {
  const rootParsed = flattenSource(
    JSON.parse(readFileSync(join(root, "src/i18n.json"), "utf8")) as Record<string, SourceEntry>,
  );
  const source = rootParsed.strings;
  const verbatim = rootParsed.verbatim;

  const templatesRoot = join(root, "templates");
  if (!existsSync(templatesRoot)) return { source, verbatim };

  for (const entry of readdirSync(templatesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const prefix = `scaffold.${entry.name}`;
    mergeScaffoldMetadata(
      join(templatesRoot, entry.name, "scaffold.json"),
      prefix,
      source,
      verbatim,
    );
    mergeTemplateSource(join(templatesRoot, entry.name, "src/i18n.json"), prefix, source, verbatim);
  }

  return { source, verbatim };
}
