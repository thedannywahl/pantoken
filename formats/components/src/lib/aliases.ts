/**
 * Per-record alias post-processors, applied inside each `Definition.rules()` (so an alias documents on
 * its OWN component's page, not whichever record happens to be last in the bundle):
 * - {@link withSizeAliases} appends a long-spelled twin (`.-size-small`) for every short size class.
 * - {@link withAliases} appends alias twins discovered from the record's own doc comment
 *   ({@link deprecatedAliasPairs}) — each modifier whose note carries `@alias {@link -canonical}` (a
 *   pure rename) or `@deprecated {@link -canonical}` (a true deprecation that still works) gets a rule
 *   cloned from that canonical modifier.
 *
 * NOTE: this module stays free of `@cssdoc/core` (the postcss-based parser) ON PURPOSE — it runs at
 * record-definition time, so importing it would bake postcss (and its `node:module`/`createRequire`
 * shim) into `@pantoken/components`'s runtime bundle, which crashes in the browser when the web
 * components register this package in the docs client. A focused regex over the `@modifier` line is
 * all that's needed here.
 *
 * @module
 */
/** A deprecated modifier and the canonical modifier it aliases, e.g. `-toggle` → `-variant-toggle`. */
export interface AliasPair {
  alias: string;
  canonical: string;
}

/** `@modifier -alias — @alias|@deprecated {@link -canonical}` (em-dash/hyphen separator; optional leading dot). */
const DEPRECATED_ALIAS =
  /@modifier\s+(-[\w-]+)\s+[—-]\s+@(?:alias|deprecated)\s+\{@link\s+\.?(-[\w-]+)\s*\}/gu;

/**
 * The alias pairs in a record, read from its own doc comment (in authored order): every `@modifier`
 * whose note is `@alias {@link -canonical}` or `@deprecated {@link -canonical}`. Returns `[]` for
 * records with none.
 */
export function deprecatedAliasPairs(rawRecord: string): AliasPair[] {
  return [...rawRecord.matchAll(DEPRECATED_ALIAS)].map((m) => ({ alias: m[1], canonical: m[2] }));
}

/**
 * Append generated rules to a record body, landing them INSIDE a trailing `@scope (...) { … }` block
 * (right before its closing brace) rather than after it — a top-level `&` outside any nesting context
 * is invalid CSS, and several `.css`-authored records wrap their whole body in `@scope`. Falls back to a
 * plain append when the body doesn't end in a `@scope` block. Exported for records that need to append
 * their own interpolated, scope-relative (`&`) rules — e.g. button's AI-glyph mask and ghost washes.
 */
export function appendGenerated(css: string, extra: string): string {
  const trimmed = css.trimEnd();
  const startsWithScope = trimmed.startsWith("@scope ");
  const scopeAt = startsWithScope ? 0 : trimmed.lastIndexOf("\n@scope ") + 1;
  const openBrace = startsWithScope || scopeAt > 0 ? trimmed.indexOf("{", scopeAt) : -1;
  if (openBrace < 0 || !trimmed.endsWith("}")) return `${css}\n${extra}\n`;

  let depth = 0;
  let closeIdx = -1;
  for (let i = openBrace; i < trimmed.length; i++) {
    if (trimmed[i] === "{") depth++;
    else if (trimmed[i] === "}") {
      depth--;
      if (depth === 0) {
        closeIdx = i;
        break;
      }
    }
  }
  if (closeIdx !== trimmed.length - 1) return `${css}\n${extra}\n`; // @scope isn't the trailing block

  return `${trimmed.slice(0, closeIdx)}\n${extra}\n${trimmed.slice(closeIdx)}\n`;
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
  return extra.length ? appendGenerated(css, `/* size aliases */\n${extra.join("\n")}`) : css;
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
 * Append alias twins for a record, given its {@link AliasPair}s (from
 * {@link deprecatedAliasPairs}): every `@alias`/`@deprecated` modifier that `{@link}`s a canonical one
 * is a legacy alias, so we clone each rule using the canonical modifier token under the alias name. Matching by
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
  return extra.length ? appendGenerated(css, extra.join("\n")) : css;
}
