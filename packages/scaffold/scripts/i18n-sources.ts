/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`) and every
 * `templates/<platform>/src/i18n.json` (the template's own runtime UI strings), so all three flow
 * through the same translate/check-drift pipeline as one flat key → value source.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads `<root>/src/i18n.json`, then merges in keys synthesized from every
 * `<root>/templates/<platform>/scaffold.json` and `<root>/templates/<platform>/src/i18n.json`
 * that exist.
 */
export function collectI18nSource(root: string): Record<string, string> {
  const source: Record<string, string> = JSON.parse(
    readFileSync(join(root, "src/i18n.json"), "utf8"),
  );

  const templatesRoot = join(root, "templates");
  if (!existsSync(templatesRoot)) return source;

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
    }
  }

  return source;
}
