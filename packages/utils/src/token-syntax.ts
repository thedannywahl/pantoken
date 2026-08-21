/**
 * Validates a resolved token value against the REAL CSS grammar for the property its name
 * implies, using `css-tree`'s spec-driven lexer (backed by `mdn-data`, the same W3C-spec dataset
 * browsers/`stylelint` use) as the authoritative source — not a hand-rolled value-shape sniffer.
 * `BESPOKE_SYNTAX` is the one shared table of pantoken-invented, non-standard property grammars
 * (also consumed by `docs/scripts/build-css-api.ts` for human-readable type display), so the docs
 * and this validator can never drift apart.
 *
 * @module
 */
import * as csstree from "css-tree";

/** The registered `css-tree` property descriptor for `name`, or throws — never silently unmatched. */
function requireProperty(name: string): NonNullable<ReturnType<typeof csstree.lexer.getProperty>> {
  const property = csstree.lexer.getProperty(name);
  if (!property) throw new Error(`css-tree has no registered property named "${name}"`);
  return property;
}

/**
 * The REAL CSS grammar string for a property, generated from `css-tree`'s own lexer (the same
 * instance {@link isSyntaxValid} matches against) rather than hand-typed — guaranteed byte-identical
 * to what the lexer actually validates, so it can never drift out of sync with itself.
 */
function propertyGrammar(name: string): string {
  const syntax = requireProperty(name).syntax;
  if (!syntax) throw new Error(`css-tree property "${name}" has no generatable grammar`);
  return csstree.definitionSyntax.generate(syntax);
}

/**
 * A real CSS property name for {@link TOKEN_NAME_TO_PROPERTY}, validated against `css-tree`'s
 * registry at module load — the same fail-fast safety net as {@link propertyGrammar}, so a typo'd
 * property name throws immediately with a clear message instead of silently flagging every
 * matching token as a mismatch at build time.
 */
function realProperty(name: string): string {
  requireProperty(name);
  return name;
}

/**
 * Non-standard, pantoken-authored property grammars `css-tree`/`mdn-data` don't know about —
 * matched by token-name substring, most-specific first, as raw CSS Value Definition Syntax
 * (CSS Values 4 §2.1: `|` `||` `&&` `[]` `?` `{a,b}` `#`) rather than a real property name. Only
 * `<...>` references to types `mdn-data` registers as standalone generic types belong here (e.g.
 * NOT `<font-family-name>`, which only exists inline inside the real `font-family` property's own
 * definition — that's matched via `TOKEN_NAME_TO_PROPERTY` instead).
 */
export const BESPOKE_SYNTAX: readonly [RegExp, string][] = [
  // Decomposed drop-shadow PIECES (e.g. `--instui-drop-shadow-blur-elevation1-dropshadow1`) are each
  // a single value, not the full composite grammar `elevation` (below) expects — checked first, since
  // `candidatePropertyCoverage`-style verification found `drop-shadow-blur-elevation1-dropshadow1:
  // 2px` fails the composite `elevation` grammar (it isn't a whole shadow list on its own).
  [/drop-shadow-(blur|spread|x|y)-/u, "<length>"],
  // These four resolve to a REAL CSS property's grammar (box-shadow/text-decoration-line/
  // outline-color/outline-style), so the string is computed via {@link propertyGrammar} — never
  // hand-typed — even though the token NAME pattern ("elevation", "focus-outline-*") doesn't match
  // the real property name (that's why these live here and not in `TOKEN_NAME_TO_PROPERTY`, which
  // maps a name pattern to a property matched by `matchProperty` directly, string-free).
  [/elevation/u, propertyGrammar("box-shadow")],
  [/text-decoration/u, propertyGrammar("text-decoration-line")],
  [/focus-outline-color/u, propertyGrammar("outline-color")],
  [/focus-outline-style/u, propertyGrammar("outline-style")],
  [/focus-outline-width/u, propertyGrammar("outline-width")],
  [/focus-outline-offset/u, propertyGrammar("outline-offset")],
  // No standard "outline-radius" property exists — `declarations.ts` assigns this token straight
  // to a real `border-radius` declaration, so that's the authoritative grammar to check it against.
  [/focus-outline-radius/u, propertyGrammar("border-radius")],
  // `--instui-icon-color-*` holds a special CSS colour value (`currentColor`, or a `var()`-based
  // gradient) — NOT an SVG glyph url like every other `--instui-icon-*` token — so it must be
  // checked before the generic icon-glyph rule right below it.
  [/--instui-icon-color-/u, "<color>"],
  // Icon glyph vars hold a url-encoded SVG; `<url>` (not the literal `url(<string>)` grammar) is
  // required — css-tree tokenizes an unquoted `url(...)` as a single `Url` AST node, not a
  // Function+String pair, so a literal `url(<string>)` definition mismatches a real glyph value.
  [/glyph|instui-icon/u, "<url>"],
  [/-filter\b/u, propertyGrammar("filter")],
  // Decomposed box-shadow PIECES (one component's `box-shadow-{blur,spread,x,y,color}` leaves) are
  // each a single value, not the full composite `box-shadow` shorthand — checked before the real
  // `box-shadow` property below (whose name pattern would otherwise also match these), since
  // `candidatePropertyCoverage` found `--instui-component-avatar-box-shadow-blur: 1rem` fails
  // `box-shadow`'s real grammar (it isn't a whole shadow value on its own).
  [/box-shadow-(blur|spread|x|y)$/u, "<length>"],
  [/box-shadow-color$/u, "<color>"],
  // These name suffixes describe a generic length/time CONCEPT, not a specific CSS property —
  // there's no real `size`/`spacing`/`offset`/`thickness`/`circumference` property to validate
  // against, so the grammar is asserted directly. `size`/`spacing` explicitly exclude the
  // `background-size`/`letter-spacing` suffixes, which ARE real properties (see below) with
  // different (non-single-length) grammars.
  [/(?<!background)-size(?:-|\d|$)/u, "<length>"],
  [/(?<!letter)-spacing/u, "<length>"],
  [/offset$/u, "<length>"],
  [/thickness$/u, "<length>"],
  [/circumference$/u, "<length>"],
  // Named "timing" but holds a bare duration (e.g. `0.2s`), not a `transition-timing-function`
  // keyword/`cubic-bezier()` — asserting `<time>` validates the actual value shape shipped.
  [/transition-timing|toggle-transition$/u, "<time>"],
  // Breakpoint/byline-size lengths — anchored so `byline-title-margin` (a real `margin`, handled
  // below) isn't shadowed by a broader `byline-` match.
  [/breakpoints-|byline-(large|medium|small)$/u, "<length>"],
  // Decomposed progress-circle geometry PIECES (e.g. `progress-circle-large-transform: 4.5em`) are
  // each a bare length used to build a `transform` elsewhere, not a valid `transform` value on
  // their own — distinct from the real button `transform`/`text-transform` tokens below, whose
  // values are always the `none` keyword.
  [/progress-circle-.*-transform$/u, "<length>"],
  [/icon-illu-|img-image-blur-amount$/u, "<length>"],
];

/**
 * Real CSS properties, matched by token-name substring — the property name to validate against
 * via `css-tree`'s built-in (`mdn-data`-sourced) lexer. Intentionally conservative: a name pattern
 * not listed here is left unmodeled rather than guessed at, since a wrong mapping could fail the
 * build on a legitimate value. Every entry here was verified with {@link candidatePropertyCoverage}
 * against the real IR (all themes) before being added.
 *
 * Order matters: `color` is LAST and end-anchored (`color$`, not a bare `/color/` substring)
 * because several UNRELATED components merely have "color" in their own name (`ColorPicker`,
 * `ColorContrast`, `ColorIndicator`, `ColorPreset") with an unrelated leaf property afterwards —
 * e.g. `--instui-component-color-picker-hash-mark-container-left-padding` (a `padding`, caught
 * earlier) or `--instui-component-color-indicator-background-size` (a `background-size`, not
 * modeled at all — left `unmodeled` rather than misrouted to `color`). Anchoring to the literal
 * end trades some coverage (a few genuine `color-<role>` tokens fall to `unmodeled`) for zero
 * false failures, verified empirically: a bare `/color/` matched 937 tokens with 62 invalid, an
 * end-anchored `/color$/` matched only 64 but 0 real invalids (its few reported "invalids" were
 * icon glyphs already resolved by the bespoke `--instui-icon-` pattern above, which runs first).
 * `opacity` excludes a digit suffix so a colour-with-baked-in-alpha primitive
 * (`--instui-primitive-color-grey-opacity10`, a colour, not a CSS `opacity` value) isn't misrouted
 * either way (`primitive-opacity\d+$` below is a separate, narrower pattern for the genuine
 * standalone opacity primitives, e.g. `--instui-primitive-opacity50`). `gap` was tried and rejected
 * naively (it also matches `--instui-icon-megaphone`), but that collision never actually reaches
 * here in practice — the bespoke icon-glyph rule above already claims every `instui-icon-*` name
 * first, so `gap` IS included, verified safe once that precedence is accounted for.
 */
export const TOKEN_NAME_TO_PROPERTY: readonly [RegExp, string][] = [
  [/font-family/u, realProperty("font-family")],
  [/font-weight/u, realProperty("font-weight")],
  [/font-size/u, realProperty("font-size")],
  [/line-height/u, realProperty("line-height")],
  [/letter-spacing/u, realProperty("letter-spacing")],
  [/opacity(?!\d)/u, realProperty("opacity")],
  [/primitive-opacity\d+$/u, realProperty("opacity")],
  [/z-index|stacking/u, realProperty("z-index")],
  [/transition-duration|-duration\b/u, realProperty("transition-duration")],
  [/border-width/u, realProperty("border-width")],
  [/-radius/u, realProperty("border-radius")],
  [/border-style/u, realProperty("border-style")],
  // Unanchored: also catches a `-bottom-border-inverse` suffix variant, not just the bare `-bottom-
  // border` ending.
  [/bottom-border/u, realProperty("border-bottom")],
  [/box-shadow/u, realProperty("box-shadow")],
  [/margin/u, realProperty("margin")],
  [/padding/u, realProperty("padding")],
  [/height/u, realProperty("height")],
  [/width/u, realProperty("width")],
  [/gap/u, realProperty("gap")],
  [/inset/u, realProperty("inset")],
  [/overflow-x$/u, realProperty("overflow-x")],
  [/overflow-y$/u, realProperty("overflow-y")],
  // `text-transform` is real and specific; checked before the narrower button `transform` rule
  // right below (which only matches a bare/`-hover-` suffix, so the two never actually collide).
  [/text-transform$/u, realProperty("text-transform")],
  [/base-button-(hover-)?transform$/u, realProperty("transform")],
  // The three specific `background-*` properties are checked before the generic `position$`
  // fallback and the generic `background$` one, since their names also end in "position"/"size"
  // respectively and need the MORE specific (and differently-shaped) real grammar.
  [/background-image$/u, realProperty("background-image")],
  [/background-position$/u, realProperty("background-position")],
  [/background-size$/u, realProperty("background-size")],
  [/background$/u, realProperty("background")],
  [/border-color/u, realProperty("border-color")],
  [/primitive-color-/u, realProperty("color")],
  // `color\d*$` also covers a digit-suffixed leaf like `--instui-color-drop-shadow-shadow-color1`;
  // `color-inverse$` covers the single `--instui-component-top-nav-bar-item-color-inverse: inherit`
  // token specifically (kept narrow rather than a bare `-inverse` match, to avoid over-matching).
  [/color(?:\d*|-inverse)$/u, realProperty("color")],
  // Generic `position$` fallback (after the more specific `background-position$` above) also
  // catches `--instui-component-top-nav-bar-layout-small-viewport-tray-fix-top-position: undefined`
  // — a genuine upstream data bug (a stringified JS `undefined`), correctly failing the build.
  [/position$/u, realProperty("position")],
];

function firstMatch<T>(name: string, table: readonly [RegExp, T][]): T | undefined {
  return table.find(([re]) => re.test(name))?.[1];
}

/** True when a value cannot be a typed CSS value at all (`var()` / `light-dark()`). */
export function isContextualValue(value: string): boolean {
  return /var\(|light-dark\(/.test(value);
}

/** Whether `name` maps to a modeled property/grammar at all (real or bespoke). */
export function hasModeledSyntax(name: string): boolean {
  return (
    firstMatch(name, BESPOKE_SYNTAX) !== undefined ||
    TOKEN_NAME_TO_PROPERTY.some(([re]) => re.test(name))
  );
}

/**
 * Whether a concrete value satisfies the real (or bespoke) CSS grammar for `name`'s property.
 * Returns `true` for any name with no modeled expectation — call {@link hasModeledSyntax} first
 * to distinguish "valid" from "not checked".
 *
 * @example
 * ```ts
 * import { isSyntaxValid } from "@pantoken/utils";
 *
 * isSyntaxValid("--instui-font-weight-base", "400");           // → true
 * isSyntaxValid("--instui-font-weight-base", "Medium Italic");  // → false
 * ```
 */
export function isSyntaxValid(name: string, value: string): boolean {
  const bespoke = firstMatch(name, BESPOKE_SYNTAX);
  const property = bespoke ? undefined : firstMatch(name, TOKEN_NAME_TO_PROPERTY);
  if (!bespoke && !property) return true;

  let ast: csstree.CssNode;
  try {
    ast = csstree.parse(value, { context: "value" });
  } catch {
    return false;
  }
  const result = bespoke
    ? csstree.lexer.match(bespoke, ast)
    : csstree.lexer.matchProperty(property!, ast);
  return !result.error;
}

/** A `namePattern`'s concrete, non-contextual matches against a candidate property, from the real IR. */
export interface PatternCoverage {
  /** How many concrete (non-contextual) tokens matched `namePattern`. */
  matched: number;
  /** The matches that would FAIL the candidate property's real CSS grammar. */
  invalid: readonly { name: string; value: string }[];
}

/**
 * Empirically checks a candidate `TOKEN_NAME_TO_PROPERTY` entry against the real IR before it's
 * added, rather than guessing: does every concrete value whose name matches `namePattern` actually
 * validate against `candidateProperty`'s real CSS grammar? (e.g. "every
 * `--instui-primitive-color-*-opacity\d` token is a valid `<color>`.") `matched === 0` means the
 * pattern hit nothing in this IR — not evidence of safety either way. Contextual (`var()`/
 * `light-dark()`) values are skipped, same as {@link isSyntaxValid}.
 *
 * @example
 * ```ts
 * import { candidatePropertyCoverage } from "@pantoken/utils";
 * import { tokens } from "@pantoken/tokens";
 *
 * const coverage = candidatePropertyCoverage(tokens, /-opacity\d/u, "color");
 * coverage.invalid; // → [] once every matching token is confirmed to be a valid <color>
 * ```
 */
export function candidatePropertyCoverage(
  tokens: readonly { name: string; value: string }[],
  namePattern: RegExp,
  candidateProperty: string,
): PatternCoverage {
  let matched = 0;
  const invalid: { name: string; value: string }[] = [];
  for (const { name, value } of tokens) {
    if (!namePattern.test(name) || isContextualValue(value)) continue;
    matched++;

    let ast: csstree.CssNode;
    try {
      ast = csstree.parse(value, { context: "value" });
    } catch {
      invalid.push({ name, value });
      continue;
    }
    if (csstree.lexer.matchProperty(candidateProperty, ast).error) invalid.push({ name, value });
  }
  return { matched, invalid };
}
