/**
 * Per-record alias post-processors, applied inside each `Definition.rules()` (so an alias documents on
 * its OWN component's page, not whichever record happens to be last in the bundle):
 * - {@link withSizeAliases} appends a long-spelled twin (`.-size-small`) for every short size class.
 * - {@link withAliases} appends deprecated-alias twins discovered from the record's own metadata — each
 *   modifier whose `@deprecated` note carries a `{@link -canonical}` gets a rule cloned from that
 *   canonical modifier. This replaces the old hand-maintained central pairs list.
 *
 * @module
 */
import type { RecordMeta } from "./record.ts";

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

/** `{@link -canonical}` inside a modifier's `@deprecated` note. */
const LINK = /\{@link\s+\.?(-[\w-]+)\s*\}/u;

/**
 * Append deprecated-alias twins for a record, discovered from its metadata: every modifier whose
 * `deprecated` note contains `{@link -canonical}` is a legacy alias of that canonical modifier, so we
 * clone each rule using the canonical modifier token under the alias name (with a `/* @deprecated → use
 * .-canonical *\/` marker). Matching by modifier token (not the full component selector) keeps it
 * base-class-agnostic — e.g. Form-Field-Messages' record name is plural but its class is singular.
 */
export function withAliases(css: string, meta: RecordMeta): string {
  const aliases = (meta.modifiers ?? [])
    .map((m) => {
      const link = m.deprecated?.match(LINK);
      return link ? { alias: m.name, canonical: link[1] } : null;
    })
    .filter((x): x is { alias: string; canonical: string } => x !== null);
  if (!aliases.length) return css;

  const extra: string[] = [];
  for (const { alias, canonical } of aliases) {
    // Anchor on the base class the canonical sits on (`.instui-radio.-variant-toggle`), matching only
    // where the canonical is the modifier ON the component — never inside `:not(.-canonical)` or a
    // compound `.-other.-canonical`, which a bare-token match would wrongly clone.
    const base = css.match(new RegExp(`(\\.[a-z][\\w-]*)\\.${canonical}\\b`, "u"))?.[1];
    if (!base) continue;
    const canonSel = `${base}.${canonical}`;
    const esc = canonSel.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const rule = new RegExp(`([^{}]*${esc}[^{}]*)(\\{[^{}]*\\})`, "gu");
    for (const [, selector, body] of css.matchAll(rule)) {
      const dep = selector
        .replace(/\/\*[\s\S]*?\*\//gu, "")
        .split(canonSel)
        .join(`${base}.${alias}`)
        .trim();
      // A plain "alias of" note — NOT cssdoc's `@deprecated → use .-x` marker. The deprecation is now
      // authored in metadata (precise, single modifier); an AST marker here would wrongly deprecate every
      // OTHER modifier in a compound clone (e.g. `-context-off` in `.instui-radio.-toggle.-context-off`).
      extra.push(`/* alias of .${canonical} */\n${dep} ${body}`);
    }
  }
  return extra.length ? `${css}\n${extra.join("\n")}\n` : css;
}
