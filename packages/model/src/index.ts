/**
 * `@pantoken/model` — the zero-dependency type contracts for the pantoken token IR.
 *
 * A {@link Token} is aligned to the CSS `@property` schema (`name`/`syntax`/`inherits`/
 * initial-`value`) and extended into a superset that also carries themed and reference values,
 * plus non-value {@link TokenMeta} (icons, provenance). Icons are rolled in as `<image>` tokens.
 * Every pantoken package depends on this package for the type, so no consumer needs the
 * (GitHub-only) upstream token package just to type the IR.
 *
 * @module
 * @beta
 */

/** A colour theme available in `@instructure/instructure-design-tokens`. */
export type Theme = "rebrand" | "canvas" | "canvasHighContrast";

/** A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`). */
export interface TokenModify {
  /** The modification applied to the resolved colour. */
  type: "darken" | "lighten" | "alpha" | "mix";
  /** The modifier amount, `0`–`1`. */
  value: number;
  /** The colour space the modifier operates in (e.g. `"hsl"`). */
  space?: string;
  /** The second colour, for `mix`. */
  color?: string;
}

/** Non-value metadata attached to a {@link Token}. */
export interface TokenMeta {
  /** Marks an icon token (its `syntax` is `"<image>"`). */
  kind?: "icon";
  /** The source style of an icon glyph. */
  style?: "Custom" | "Line" | "Solid";
  /** The SVG `viewBox` of an icon glyph. */
  viewBox?: string;
  /** Whether an icon flips horizontally in right-to-left contexts. */
  bidirectional?: boolean;
  /** The origin of an icon glyph. */
  source?: "custom" | "lucide";
  /** A colour modifier preserved for the native lineage (Style Dictionary). */
  modify?: TokenModify;
}

/**
 * A single design token in the canonical `@property`-aligned IR.
 *
 * @property name - The custom-property name, e.g. `--instui-color-background-base`.
 * @property syntax - The `@property` `syntax` descriptor (`"<color>"`, `"<length>"`,
 *   `"<image>"`, …) or `"*"` for contextual values.
 * @property inherits - The `@property` `inherits` flag.
 * @property value - A concrete value, a `var(...)` reference, or a `light-dark(a, b)` pair.
 */
export interface Token {
  name: string;
  syntax: string;
  inherits: boolean;
  value: string;
  /** True when the light and dark resolutions differ (value is a `light-dark()`). */
  themed?: boolean;
  /** The token this one references, when `value` is a single `var(...)`. */
  refersTo?: string;
  /** Non-value metadata. */
  meta?: TokenMeta;
}

/** The shape accepted by the `define()` helper; `inherits` defaults to `true`. */
export interface TokenInput {
  name: string;
  value: string;
  syntax?: string;
  inherits?: boolean;
  themed?: boolean;
  refersTo?: string;
  meta?: TokenMeta;
}

// ── Plugin contract ──────────────────────────────────────────────────────────────────────────
// The uniform pantoken plugin type. One plugin carries optional per-stage hooks; each stage runner
// applies only the hooks relevant to it, so the same plugin can inject at more than one layer.

/** A resolved icon, as returned by an {@link IconResolver}. */
export interface IconEntry {
  /** The icon name / code. */
  name: string;
  /** Inline SVG markup, when available. */
  svg?: string;
  /** SVG path data, for single-path brand icons. */
  path?: string;
  /** The SVG `viewBox` (default `"0 0 24 24"`). */
  viewBox?: string;
  /** The provider that produced this entry. */
  source?: string;
}

/** Maps an icon code to an {@link IconEntry}, or `undefined` when it has no match. */
export type IconResolver = (code: string) => IconEntry | undefined;

/** A typed `@property` registration. */
export interface PropertyRule {
  name: string;
  syntax: string;
  value: string;
}

/** A CSS contribution a plugin can return from its `css` hook. */
export interface CssContribution {
  /** Raw CSS emitted before the generated base. */
  prepend?: string;
  /** Raw CSS emitted after the generated base. */
  append?: string;
  /** Typed `@property` registrations to add. */
  properties?: PropertyRule[];
  /** Scoped `--var: value` declarations to add. */
  declarations?: [string, string][];
  /** A `data-*` marker for the emitted block, for debugging. */
  marker?: string;
}

/** Context passed to a plugin's `tokens` hook. */
export interface TokenHookContext {
  tokens: Token[];
  theme: Theme;
  define: (input: TokenInput) => Token;
}

/** Context passed to a plugin's `icons` hook. */
export interface IconHookContext {
  add: (entry: IconEntry) => void;
  resolve: IconResolver;
}

/** Context passed to a plugin's `css` hook. */
export interface CssHookContext {
  tokens: Token[];
  css: string;
}

/** Context passed to a plugin's `rehype` hook. */
export interface RehypeHookContext {
  resolve: IconResolver;
}

/**
 * A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
 * hook for. The same plugin can therefore inject at more than one layer.
 */
export interface PantokenPlugin {
  /** A unique, human-readable plugin name. */
  name: string;
  /** Token stage: return the full replacement token list (use `ctx.define` to add). */
  tokens?(ctx: TokenHookContext): Token[] | void;
  /** Icon stage: register providers via `ctx.add`, or wrap `ctx.resolve`. */
  icons?(ctx: IconHookContext): void;
  /** CSS stage: contribute or post-process CSS. */
  css?(ctx: CssHookContext): CssContribution | void;
  /** Rehype stage: provide a resolver merged into the rehype plugin. */
  rehype?(ctx: RehypeHookContext): { resolve?: IconResolver } | void;
  /** Native stage (Style Dictionary): register transforms/formats. */
  native?(ctx: unknown): void;
}
