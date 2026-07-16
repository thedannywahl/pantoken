/**
 * Whitespace-normalize CSS for format-agnostic substring assertions. The `.css` records ship through a
 * real CSS formatter (prettier via `vp check`), so the emitted sheets are multi-line — one declaration
 * per line, long `calc()`/`light-dark()` values wrapped across lines. These guards assert the *rules*
 * (selector + declarations), not the formatting, so normalize both the sheet and the expected snippet:
 * collapse whitespace runs, and strip the cosmetic spaces the formatter adds inside `()` and around `,`.
 *
 * @module
 */

/** Collapse non-semantic whitespace so `sel {\n  a: b;\n}` matches `sel { a: b; }` and `calc( x )` matches `calc(x)`. */
export const norm = (css: string): string =>
  css
    .replace(/\s+/gu, " ")
    .replace(/\(\s+/gu, "(")
    .replace(/\s+\)/gu, ")")
    .replace(/\s*,\s*/gu, ",")
    .trim();
