/**
 * Aggregation-layer post-processors — they rewrite the CONCATENATED component CSS (not a single
 * record), so they live here and run inside `componentsCss()`:
 * - {@link withSizeAliases} appends a long-spelled twin (`.-size-small`) for every short size class.
 * - {@link withDeprecatedAliases} appends deprecated InstUI-semantic aliases (e.g. Alert `-variant-*`).
 *
 * @module
 */

/** Long-form spellings for the size scale — emitted as first-class aliases beside the short forms. */
const SIZE_LONG: Record<string, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

/**
 * For every rule whose selector uses a short size class (`.-size-sm`), append a twin rule with the
 * long spelling (`.-size-small`) so both are first-class (like the `m`/`margin` spacing aliases).
 * Size rules are flat and `@keyframes` never carry a `-size-` selector, so a flat-rule scan is safe.
 */
export function withSizeAliases(css: string): string {
  const extra: string[] = [];
  const rule = /([^{}]*\.-size-(xs|sm|md|lg|xl)\b[^{}]*)(\{[^{}]*\})/g;
  for (const [, selector, , body] of css.matchAll(rule)) {
    const long = selector
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\.-size-(xs|sm|md|lg|xl)\b/g, (_m, s) => `.-size-${SIZE_LONG[s]}`)
      .trim();
    extra.push(`${long} ${body}`);
  }
  return extra.length ? `${css}\n/* size aliases */\n${extra.join("\n")}\n` : css;
}

/**
 * Emit deprecated InstUI-semantic aliases where a canonical modifier renames the InstUI prop/value.
 * Alert normalizes InstUI's `variant`→`color` (and value `error`→`danger`); keep the `-variant-*`
 * form working, marked `@deprecated`, so InstUI users aren't broken.
 */
export function withDeprecatedAliases(css: string, p: string): string {
  const pairs: [canonical: string, deprecated: string][] = [
    // Alert: InstUI's prop is `variant` (value `error`), which we normalize to `color`/`danger`.
    [`${p}alert.-color-info`, `${p}alert.-variant-info`],
    [`${p}alert.-color-success`, `${p}alert.-variant-success`],
    [`${p}alert.-color-warning`, `${p}alert.-variant-warning`],
    [`${p}alert.-color-danger`, `${p}alert.-variant-error`],
    // Avatar: InstUI documents the palette as accent1–accent6; we name them (blue…grey) after the
    // tokens. accent1 blue, accent2 green, accent3 red, accent4 orange, accent5 ash, accent6 grey.
    [`${p}avatar.-color-blue`, `${p}avatar.-color-accent1`],
    [`${p}avatar.-color-green`, `${p}avatar.-color-accent2`],
    [`${p}avatar.-color-red`, `${p}avatar.-color-accent3`],
    [`${p}avatar.-color-orange`, `${p}avatar.-color-accent4`],
    [`${p}avatar.-color-ash`, `${p}avatar.-color-accent5`],
    [`${p}avatar.-color-grey`, `${p}avatar.-color-accent6`],
    // Radio: `variant="toggle"` renders as segmented buttons; keep the bare `-toggle` shorthand working.
    [`${p}radio.-variant-toggle`, `${p}radio.-toggle`],
    // FormFieldMessage: InstUI's `newError` type is deprecated and behaves exactly like `error`.
    [`${p}form-field-message.-type-error`, `${p}form-field-message.-type-new-error`],
    // Progress bar + circle: InstUI's `meterColor` prop maps to our normalized `-color-*` scheme.
    // `alert` folds to `warning` (no `-color-alert` in the normalized scheme).
    [`${p}progress.-color-brand`, `${p}progress.-meter-color-brand`],
    [`${p}progress.-color-info`, `${p}progress.-meter-color-info`],
    [`${p}progress.-color-success`, `${p}progress.-meter-color-success`],
    [`${p}progress.-color-warning`, `${p}progress.-meter-color-warning`],
    [`${p}progress.-color-warning`, `${p}progress.-meter-color-alert`],
    [`${p}progress.-color-danger`, `${p}progress.-meter-color-danger`],
    [`${p}progress-circle.-color-brand`, `${p}progress-circle.-meter-color-brand`],
    [`${p}progress-circle.-color-info`, `${p}progress-circle.-meter-color-info`],
    [`${p}progress-circle.-color-success`, `${p}progress-circle.-meter-color-success`],
    [`${p}progress-circle.-color-warning`, `${p}progress-circle.-meter-color-warning`],
    [`${p}progress-circle.-color-warning`, `${p}progress-circle.-meter-color-alert`],
    [`${p}progress-circle.-color-danger`, `${p}progress-circle.-meter-color-danger`],
  ];
  const extra: string[] = [];
  for (const [canonical, deprecated] of pairs) {
    const rule = new RegExp(
      `([^{}]*${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^{}]*)(\\{[^{}]*\\})`,
      "g",
    );
    for (const [, selector, body] of css.matchAll(rule)) {
      const dep = selector
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(canonical)
        .join(deprecated)
        .trim();
      extra.push(`/* @deprecated → use .-${canonical.split(".-")[1]} */\n${dep} ${body}`);
    }
  }
  return extra.length
    ? `${css}\n/* deprecated InstUI-semantic aliases */\n${extra.join("\n")}\n`
    : css;
}
