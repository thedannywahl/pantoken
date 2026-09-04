/**
 * Merges the static `src/i18n.json` CLI copy with per-template strings synthesized from every
 * `templates/<platform>/scaffold.json` (`nextSteps`/`notes`/`caveats`) and every
 * `templates/<platform>/src/i18n.json` (the template's own runtime UI strings), so all three flow
 * through the same translate/check-drift pipeline as one flat key → value source.
 */
export type SourceEntry = { message: string; translate: "always" | "optional" | "never" };

/** Flatten source metadata into the message-key-to-string format used by the localization pipeline. */
export function flattenSource(raw: Record<string, SourceEntry>): Record<string, string> {
  return Object.fromEntries(Object.entries(raw).map(([key, entry]) => [key, entry.message]));
}
