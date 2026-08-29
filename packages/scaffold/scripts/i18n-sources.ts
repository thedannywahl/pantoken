/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`), so both flow through the
 * same translate/check-drift pipeline as one flat key → value source.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads `<root>/src/i18n.json`, then merges in keys synthesized from every
 * `<root>/templates/<platform>/scaffold.json` that exists.
 */
export function collectI18nSource(root: string): Record<string, string> {
  const source: Record<string, string> = JSON.parse(
    readFileSync(join(root, "src/i18n.json"), "utf8"),
  );

  const templatesRoot = join(root, "templates");
  if (!existsSync(templatesRoot)) return source;

  for (const entry of readdirSync(templatesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const metaPath = join(templatesRoot, entry.name, "scaffold.json");
    if (!existsSync(metaPath)) continue;

    const meta = JSON.parse(readFileSync(metaPath, "utf8")) as {
      nextSteps?: string[];
      notes?: string;
      caveats?: string;
    };
    const prefix = `scaffold.${entry.name}`;

    (meta.nextSteps ?? []).forEach((step, i) => {
      source[`${prefix}.nextSteps.${i}`] = step;
    });
    if (meta.notes) source[`${prefix}.notes`] = meta.notes;
    if (meta.caveats) source[`${prefix}.caveats`] = meta.caveats;
  }

  return source;
}
