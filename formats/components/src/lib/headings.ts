/**
 * The six document heading levels and their per-level size/weight rules — shared by the Heading
 * component (`.instui-heading.-level-h1`) and prose (`.pantoken-prose h1`) so both read one source of
 * truth from the `--instui-component-heading-<level>-*` tokens.
 *
 * @module
 */

/** The six document heading levels, in order. */
export const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

/**
 * Per-level heading size + weight, straight from the `--instui-component-heading-<level>-*` tokens.
 * `selector(level)` maps a level (`"h1"`) to the selector that should carry its type styles.
 */
export const headingLevelRules = (selector: (level: string) => string): string =>
  HEADING_LEVELS.map(
    (l) =>
      `${selector(l)} { font-size: var(--instui-component-heading-${l}-font-size); font-weight: var(--instui-component-heading-${l}-font-weight); }`,
  ).join("\n");
