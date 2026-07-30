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
  /** Present on a compatibility-shim token (from a `DeprecationEntry`). */
  deprecated?: { replacement?: string; deprecatedIn?: string; removeIn?: string; note?: string };
}

// ── Deprecation ledger ─────────────────────────────────────────────────────────────────────────
// The token-layer analog of the inline component-modifier deprecations, with an explicit lifecycle.
// When an upstream release DROPS a `--instui-*` token (in a patch), pantoken keeps a working shim and
// records when it was deprecated and the upstream MINOR that will remove it. The shim ships until that
// minor is adopted, at which point the entry is retired and the consumer cuts a minor. This lets docs
// auto-state "deprecated in X, removed in Y", and the pipeline enforces the removal at the boundary.

/** An upstream reference in `<tier>@<version>` form, e.g. `"ui@11.7.4"` or `"design-tokens@v1.5.0"`. */
export type UpstreamRef = string;

/**
 * One entry in the token deprecation ledger — the lifecycle of a single dropped upstream token.
 *
 * A shim value comes from EITHER `replacement` (emit `var(replacement)`, so theming flows through) OR
 * `value` (freeze the last-known literal, when the drop has no canonical replacement). Exactly one is
 * expected; an entry with neither emits no shim.
 */
export interface DeprecationEntry {
  /** The dropped upstream token name, e.g. `--instui-component-truncate-text-line-height`. */
  token: string;
  /** The upstream release that dropped it, `<tier>@<version>` (e.g. `"design-tokens@v1.5.0"`). */
  deprecatedIn: UpstreamRef;
  /** The upstream MINOR at which the shim is retired, `<tier>@<version>` (e.g. `"design-tokens@v1.6.0"`). */
  removeIn: UpstreamRef;
  /** Forward the shim to a canonical token (emits `var(replacement)`). */
  replacement?: string;
  /** Freeze the shim to a literal (the token's last-known value) when there's no replacement. */
  value?: string;
  /** A human note rendered in the compatibility docs and the changelog. */
  note?: string;
}

/** The committed token deprecation ledger (`formats/tokens/deprecations.json`). */
export interface DeprecationLedger {
  /** The ledger schema version. */
  version: number;
  /** The deprecation entries, one per dropped upstream token. */
  entries: DeprecationEntry[];
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
}

/** Context passed to a plugin's `icons` hook. */
export interface IconHookContext {
  /** The icons already registered in the current token set (no SVG — name and metadata only). */
  icons: Array<Pick<IconEntry, "name" | "viewBox" | "source">>;
  theme: Theme;
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
  /** Token stage: return the full replacement token list. */
  tokens?(ctx: TokenHookContext): Token[] | void;
  /**
   * Icon stage: return new {@link IconEntry} records to register as `<image>` tokens.
   * Returning `undefined` or an empty array leaves the current set unchanged.
   */
  icons?(ctx: IconHookContext): IconEntry[] | void;
  /** CSS stage: contribute or post-process CSS. */
  css?(ctx: CssHookContext): CssContribution | void;
  /** Rehype stage: provide a resolver merged into the rehype plugin. */
  rehype?(ctx: RehypeHookContext): { resolve?: IconResolver } | void;
  /** Native stage (Style Dictionary): register transforms/formats. */
  native?(ctx: unknown): void;
}

/**
 * Build a well-formed {@link Token} from partial input, defaulting `syntax` to `"*"` and
 * `inherits` to `true`. Plugins import this from `@pantoken/model` to avoid depending on
 * `@pantoken/core`; for smart CSS syntax inference use `defineToken` from `@pantoken/core`.
 *
 * @example
 * ```ts
 * import { defineToken } from "@pantoken/model";
 *
 * defineToken({ name: "--instui-brand", value: "#0374B5" });
 * // → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
 * ```
 */
export function defineToken(input: TokenInput): Token {
  const refMatch = /^var\((--[\w-]+)\)$/.exec(input.value.trim())?.[1];
  return {
    name: input.name,
    syntax: input.syntax ?? "*",
    inherits: input.inherits ?? true,
    value: input.value,
    ...(input.themed || input.value.startsWith("light-dark(") ? { themed: true } : {}),
    ...((input.refersTo ?? refMatch) ? { refersTo: input.refersTo ?? refMatch } : {}),
    ...(input.meta ? { meta: input.meta } : {}),
  };
}
