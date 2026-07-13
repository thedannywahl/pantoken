/**
 * The `css` tagged-template — an identity tag that just returns the interpolated string. Authoring the
 * record builders as `` css`…` `` (rather than a bare template literal) follows the cssdoc convention:
 * `@cssdoc/embedded`'s scanner recognizes a `css`-tagged template as an embedded stylesheet, so the
 * editor / language server and any `.ts`-level lint read the CSS (selectors and all), not just the doc
 * comment. It changes nothing at runtime — the emitted CSS is byte-for-byte what the plain template
 * produced.
 *
 * @module
 */

/** Identity tagged-template: rebuild the string from the cooked chunks + interpolated values. */
export const css = (strings: TemplateStringsArray, ...values: readonly unknown[]): string =>
  strings.reduce((out, chunk, i) => out + (i ? String(values[i - 1]) : "") + chunk, "");
