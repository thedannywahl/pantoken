/**
 * The translatable-unit derivation for the VitePress home page (`docs/index.md`'s frontmatter),
 * shared by `translate-home.ts` (which writes the cache) and `check-locale-drift.ts` (which asserts
 * it's current).
 *
 * Both sides must derive byte-identical unit text or the drift check reports misses the translator
 * already filled, so the regexes, the frontmatter bounds, and the backtick swap live here once rather
 * than in each script.
 */

/**
 * A frontmatter line's prefix: indentation, plus the `- ` of a YAML list item when the key is that
 * item's first. `docs/index.md` currently puts `icon:`/`theme:` first in every list item, so each
 * `title:`/`text:` lands on its own line — but reordering a feature must not silently drop it from
 * translation, so the prefix is optional rather than assumed absent. It's a capture group because
 * `translate-home.ts` rebuilds the line around the translated value and has to re-emit it verbatim.
 */
const LIST_PREFIX = String.raw`(\s*(?:-\s+)?)`;

/** The only frontmatter keys VitePress renders as visible home-page copy. */
export const TRANSLATABLE_KEY = new RegExp(
  `^${LIST_PREFIX}(text|tagline|title|details):(\\s*)(.*)$`,
);

/** A route value that needs the locale prefix so it doesn't 404 under a localized route. */
export const LINK_KEY = new RegExp(`^${LIST_PREFIX}link:(\\s*)(/.*)$`);

/**
 * `&grave;…&grave;` stands in for backticks in `details` (literal backticks in this hand-authored
 * frontmatter render oddly). Swap them for real backticks before translating so the shared batch
 * masking in `api-translation.ts` protects the wrapped command instead of letting the model translate
 * it as prose.
 */
export const toBackticks = (text: string): string =>
  text.replace(/&grave;([^&]*?)&grave;/g, "`$1`");

/** The inverse of {@link toBackticks}, applied on the way back into frontmatter. */
export const toGrave = (text: string): string => text.replace(/`([^`]*)`/g, "&grave;$1&grave;");

/**
 * The `[start, end)` line range of the leading YAML frontmatter, or `null` when there is none.
 *
 * Both callers scope their line matching to this range. Without it, body prose is fair game for the
 * key regexes — a markdown list like `- title: Naming things` in the page body would be rewritten as
 * if it were frontmatter, and translated into the `home` cache as a phantom unit.
 */
export function frontmatterRange(lines: readonly string[]): readonly [number, number] | null {
  if (lines[0]?.trim() !== "---") return null;
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  return end === -1 ? null : [1, end];
}

/**
 * The deduped, backtick-normalized `text` units a home page needs translated, in source order.
 * This is the exact set whose `keyFor("text", …)` keys must be present in a locale's `home` cache.
 */
export function collectHomeUnits(source: string): string[] {
  const lines = source.split("\n");
  const range = frontmatterRange(lines);
  if (!range) return [];
  const values = lines
    .slice(range[0], range[1])
    .flatMap((line) => {
      const value = line.match(TRANSLATABLE_KEY)?.[4];
      return value ? [value] : [];
    })
    .map(toBackticks);
  return [...new Set(values)];
}
