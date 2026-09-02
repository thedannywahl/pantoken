/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`) and every
 * `templates/<platform>/src/i18n.json` (the template's own runtime UI strings), so all three flow
 * through the same translate/check-drift pipeline as one flat key → value source.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseI18nSource, type VerbatimPolicy } from "@pantoken/translation-adapters";

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
  const rootParsed = parseI18nSource(JSON.parse(readFileSync(join(root, "src/i18n.json"), "utf8")));
  const source = rootParsed.strings;
  const verbatim = rootParsed.verbatim;

  const templatesRoot = join(root, "templates");
  if (!existsSync(templatesRoot)) return { source, verbatim };

  for (const entry of readdirSync(templatesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const prefix = `scaffold.${entry.name}`;

    const metaPath = join(templatesRoot, entry.name, "scaffold.json");
    if (existsSync(metaPath)) {
      const meta = JSON.parse(readFileSync(metaPath, "utf8")) as {
        nextSteps?: string[];
        notes?: string;
        caveats?: string;
      };

      (meta.nextSteps ?? []).forEach((step, i) => {
        const key = `${prefix}.nextSteps.${i}`;
        source[key] = step;
        if (/^(?:cd \{\{dir\}\}|\{\{install\}\}|\{\{dev\}\})$/.test(step)) {
          verbatim[key] = "required";
        }
      });
      if (meta.notes) source[`${prefix}.notes`] = meta.notes;
      if (meta.caveats) source[`${prefix}.caveats`] = meta.caveats;
    }

    const templateI18nPath = join(templatesRoot, entry.name, "src/i18n.json");
    if (existsSync(templateI18nPath)) {
      const templateParsed = parseI18nSource(JSON.parse(readFileSync(templateI18nPath, "utf8")));
      for (const [key, value] of Object.entries(templateParsed.strings)) {
        source[`${prefix}.i18n.${key}`] = value;
      }
      for (const [key, policy] of Object.entries(templateParsed.verbatim)) {
        verbatim[`${prefix}.i18n.${key}`] = policy;
      }
    }
  }

  return { source, verbatim };
}
