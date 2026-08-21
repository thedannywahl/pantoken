/**
 * The pantoken spacing scale — the single shared source for `@pantoken/components`' spacing/gap
 * utilities and `@pantoken/interactions`' `resolveSpace`, so the two never drift apart.
 *
 * @module
 */

/** One entry of the pantoken spacing scale: the short key, the long (word) key, and the shared CSS value. */
export interface SpacingStep {
  /** The short scale key, e.g. `"sm"` (the zero step's short key is `"0"`). */
  short: string;
  /** The long, word-spelled key, e.g. `"small"` (the zero step's long key is `"none"`). */
  long: string;
  /** The CSS value — a token reference, or a plain `"0"`/`"auto"`. */
  value: string;
}

/**
 * The pantoken spacing scale, `none`/`0` → `2xl` — the single shared source for
 * `@pantoken/components`' spacing/gap utilities and `@pantoken/interactions`' `resolveSpace`, so the
 * two never drift apart.
 */
export const SPACING_STEPS: readonly SpacingStep[] = [
  {
    short: "0",
    long: "none",
    value: "var(--instui-component-shared-tokens-spacing-general-space-none)",
  },
  { short: "2xs", long: "xx-small", value: "var(--instui-spacing-space2xs)" },
  { short: "xs", long: "x-small", value: "var(--instui-spacing-space-xs)" },
  { short: "sm", long: "small", value: "var(--instui-spacing-space-sm)" },
  { short: "md", long: "medium", value: "var(--instui-spacing-space-md)" },
  { short: "lg", long: "large", value: "var(--instui-spacing-space-lg)" },
  { short: "xl", long: "x-large", value: "var(--instui-spacing-space-xl)" },
  { short: "2xl", long: "xx-large", value: "var(--instui-spacing-space2xl)" },
];

/** The `auto` step — margin only, spelled the same both ways. */
export const SPACING_AUTO_STEP: SpacingStep = { short: "auto", long: "auto", value: "auto" };
