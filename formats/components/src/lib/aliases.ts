/**
 * Per-record alias post-processors, applied inside each `Definition.rules()` (so an alias documents on
 * its OWN component's page, not whichever record happens to be last in the bundle):
 * - {@link withSizeAliases} appends a long-spelled twin (`.-size-small`) for every short size class.
 * - {@link withAliases} appends deprecated-alias twins discovered from the record's own doc comment
 *   ({@link deprecatedAliasPairs}, via `@cssdoc/core`) — each modifier whose `@deprecated` note carries a
 *   `{@link -canonical}` gets a rule cloned from that canonical modifier.
 *
 * @module
 */
import { parseCssDocs } from "@cssdoc/core";

/** A deprecated modifier and the canonical modifier it aliases, e.g. `-toggle` → `-variant-toggle`. */
export interface AliasPair {
  alias: string;
  canonical: string;
}

/**
 * The deprecated-alias pairs in a record, read from its own doc comment: every `@modifier` whose
 * `@deprecated` note is `{@link -canonical}`. cssdoc parses that link into `deprecated.canonical`
 * (convention-independent), so no configuration is needed. Returns `[]` for records with none.
 */
export function deprecatedAliasPairs(rawRecord: string): AliasPair[] {
  const [entry] = parseCssDocs(rawRecord);
  const pairs = (entry?.modifiers ?? [])
    .filter((m) => m.deprecated?.canonical)
    .map((m) => ({ alias: m.name, canonical: m.deprecated!.canonical! }));
  // `parseCssDocs` sorts modifiers, so re-sort the pairs by where each alias is written in the comment:
  // the appended twins must keep authored order, or a multi-alias record's emitted CSS reorders.
  return pairs.sort(
    (a, b) => rawRecord.indexOf(`@modifier ${a.alias}`) - rawRecord.indexOf(`@modifier ${b.alias}`),
  );
}

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
 * Append deprecated-alias twins for a record, given its {@link AliasPair}s (from
 * {@link deprecatedAliasPairs}): every deprecated modifier that `{@link}`s a canonical one is a legacy
 * alias, so we clone each rule using the canonical modifier token under the alias name. Matching by
 * modifier token (not the full component selector) keeps it base-class-agnostic — e.g.
 * Form-Field-Messages' record name is plural but its class is singular.
 */
export function withAliases(css: string, aliases: AliasPair[]): string {
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
        // The leading `[^{}]*` can run back into a preceding comment that itself contains a brace
        // (e.g. `… hasShadow={false}). */`) and leak that comment's tail into the selector; drop
        // anything up to a stray comment close before stripping whole comments. A selector never
        // legitimately contains `*/`, so this only ever removes leaked comment text.
        .replace(/^[\s\S]*\*\//u, "")
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
