/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`) and every
 * `templates/<platform>/src/i18n.json` (the template's own runtime UI strings), so all three flow
 * through the same translate/check-drift pipeline as one flat key → value source.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readVerbatimKeys } from "@pantoken/translation-adapters";

/**
 * Reads `<root>/src/i18n.json`, then merges in keys synthesized from every
 * `<root>/templates/<platform>/scaffold.json` and `<root>/templates/<platform>/src/i18n.json`
 * that exist. `verbatimKeys` is the same merge applied to each `i18n.verbatim.json` sibling (see
 * `@pantoken/translation-adapters`'s `readVerbatimKeys`), namespaced to match its template's keys.
 */
export function collectI18nSource(root: string): {
  source: Record<string, string>;
  verbatimKeys: string[];
} {
  const source: Record<string, string> = JSON.parse(
    readFileSync(join(root, "src/i18n.json"), "utf8"),
  );
  const verbatimKeys = readVerbatimKeys(join(root, "src/i18n.verbatim.json"));

  const templatesRoot = join(root, "templates");
  if (!existsSync(templatesRoot)) return { source, verbatimKeys };

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
        source[`${prefix}.nextSteps.${i}`] = step;
      });
      if (meta.notes) source[`${prefix}.notes`] = meta.notes;
      if (meta.caveats) source[`${prefix}.caveats`] = meta.caveats;
    }

    const templateI18nPath = join(templatesRoot, entry.name, "src/i18n.json");
    if (existsSync(templateI18nPath)) {
      const templateStrings = JSON.parse(readFileSync(templateI18nPath, "utf8")) as Record<
        string,
        string
      >;
      for (const [key, value] of Object.entries(templateStrings)) {
        source[`${prefix}.i18n.${key}`] = value;
      }
      const templateVerbatimPath = join(templatesRoot, entry.name, "src/i18n.verbatim.json");
      for (const key of readVerbatimKeys(templateVerbatimPath)) {
        verbatimKeys.push(`${prefix}.i18n.${key}`);
      }
    }
  }

  return { source, verbatimKeys };
}
