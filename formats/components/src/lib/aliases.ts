/**
 * Per-record alias post-processors, applied inside each `Definition.rules()` (so an alias documents on
 * its OWN component's page, not whichever record happens to be last in the bundle):
 * - {@link withSizeAliases} appends a long-spelled twin (`.-size-small`) for every short size class.
 * - {@link withAliases} appends deprecated-alias twins discovered from the record's own doc comment
 *   ({@link deprecatedAliasPairs}) — each modifier whose `@deprecated` note carries a `{@link -canonical}`
 *   gets a rule cloned from that canonical modifier.
 * - {@link withSpacingModifierDocs} injects wildcard `@modifier` families for the universal spacing/gap
 *   utilities, so a chained spacing modifier resolves against the record's OWN doc comment.
 *
 * NOTE: this module stays free of `@cssdoc/core` (the postcss-based parser) ON PURPOSE — it runs at
 * record-definition time, so importing it would bake postcss (and its `node:module`/`createRequire`
 * shim) into `@pantoken/components`'s runtime bundle, which crashes in the browser when the web
 * components register this package in the docs client. A focused regex over the `@modifier` line is
 * all that's needed here.
 *
 * @module
 */
import { SPACING_PROPERTIES } from "./helpers.ts";

/** A deprecated modifier and the canonical modifier it aliases, e.g. `-toggle` → `-variant-toggle`. */
export interface AliasPair {
  alias: string;
  canonical: string;
}

/** `@modifier -alias — @deprecated {@link -canonical}` (em-dash or hyphen separator; optional leading dot). */
const DEPRECATED_ALIAS =
  /@modifier\s+(-[\w-]+)\s+[—-]\s+@deprecated\s+\{@link\s+\.?(-[\w-]+)\s*\}/gu;

/**
 * The deprecated-alias pairs in a record, read from its own doc comment (in authored order): every
 * `@modifier` whose note is `@deprecated {@link -canonical}`. Returns `[]` for records with none.
 */
export function deprecatedAliasPairs(rawRecord: string): AliasPair[] {
  return [...rawRecord.matchAll(DEPRECATED_ALIAS)].map((m) => ({ alias: m[1], canonical: m[2] }));
}

/** Long-form spellings for the size scale — emitted as first-class aliases beside the short forms. */
const SIZE_LONG: Record<string, string> = {
  "2xs": "xx-small",
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
  "2xl": "xx-large",
};

/**
 * For every rule whose selector uses a short size class (`.-size-sm`), append a twin rule with the
 * long spelling (`.-size-small`) so both are first-class (like the `m`/`margin` spacing aliases).
 * Size rules are flat and `@keyframes` never carry a `-size-` selector, so a flat-rule scan is safe.
 */
export function withSizeAliases(css: string): string {
  const extra: string[] = [];
  const rule = /([^{}]*\.-size-(2xs|xs|sm|md|lg|xl|2xl)\b[^{}]*)(\{[^{}]*\})/g;
  for (const [, selector, , body] of css.matchAll(rule)) {
    const long = selector
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\.-size-(2xs|xs|sm|md|lg|xl|2xl)\b/g, (_m, s) => `.-size-${SIZE_LONG[s]}`)
      .trim();
    extra.push(`${long} ${body}`);
  }
  return extra.length ? `${css}\n/* size aliases */\n${extra.join("\n")}\n` : css;
}

/**
 * Document the long-form size twins {@link withSizeAliases} emits: for every short size class the body
 * uses, add an `@modifier -size-<long>` line to the record's doc comment so the generated twin isn't an
 * undocumented modifier. Reuses the short form's authored description (noting the alias) when present.
 * Idempotent — skips a long form already documented, and returns the comment unchanged when there are
 * no size classes.
 */
export function withSizeAliasDocs(comment: string, body: string): string {
  if (!comment) return comment;
  const shorts = new Set(
    [...body.matchAll(/\.-size-(2xs|xs|sm|md|lg|xl|2xl)\b/gu)].map((m) => m[1]),
  );
  const lines: string[] = [];
  for (const short of shorts) {
    const long = SIZE_LONG[short];
    if (new RegExp(`@modifier\\s+-size-${long}\\b`, "u").test(comment)) continue;
    const desc = comment
      .match(new RegExp(`@modifier\\s+-size-${short}\\s+[—-]\\s+([^\\n*]+)`, "u"))?.[1]
      ?.trim()
      .replace(/\.\s*$/u, "");
    const note = desc
      ? `${desc}. Long-form alias of \`-size-${short}\`.`
      : `Long-form alias of \`-size-${short}\`.`;
    lines.push(` * @modifier -size-${long} — ${note}`);
  }
  if (!lines.length) return comment;
  return comment.replace(/\n([ \t]*)\*\/\s*$/u, `\n${lines.join("\n")}\n$1*/`);
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

/**
 * Wildcard `@modifier` families for the universal spacing/gap utilities (one family per property's
 * short prefix — `-m*` covers every margin spelling, `-p*` every padding spelling — plus `-gap*`).
 * The spacing/gap utility classes are documented on the separate `spacing`/`gap` utility records, not
 * on the component or `view` record they're chained onto (`.instui-card.-mb-sm`); without this, a
 * consumer's `@cssdoc/eslint-plugin` `valid-class-usage` check flags the chained modifier as unknown,
 * since it only looks at the base class's own documented modifiers.
 */
const SPACING_MODIFIER_FAMILIES: readonly string[] = [
  ...SPACING_PROPERTIES.flatMap((property) => [`-${property.short}*`, `-${property.long}*`]),
  "-gap*",
];

/**
 * Inject the spacing/gap wildcard families into a record's own doc comment, skipping any already
 * present. Unconditional — every chainable base (component, `view`) gets the same families, since the
 * spacing/gap utilities are universal by design, not opted into per record.
 */
export function withSpacingModifierDocs(comment: string): string {
  if (!comment) return comment;
  const missing = SPACING_MODIFIER_FAMILIES.filter(
    (family) =>
      !new RegExp(`@modifier\\s+${family.replace(/\*/u, "\\*")}(?:\\s|$)`, "u").test(comment),
  );
  if (!missing.length) return comment;
  const lines = missing.map(
    (family) =>
      ` * @modifier ${family} — Universal spacing/gap utility (see the spacing/gap utilities).`,
  );
  return comment.replace(/\n([ \t]*)\*\/\s*$/u, `\n${lines.join("\n")}\n$1*/`);
}
