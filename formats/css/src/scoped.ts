/**
 * Multi-scope sheets: token blocks keyed to an attribute on *any* element rather than `:root`, so
 * several themes and color schemes can be active in one document at once.
 *
 * Three things make that work:
 *
 * 1. `@property` registrations are document-global, so they are emitted once by {@link propertiesCss}
 *    and every theme block is declarations only.
 * 2. A scope block declares the *complete* token set, not a diff against the default. A diff block
 *    nested inside another theme's subtree would inherit the enclosing theme's values for every
 *    token it omitted.
 * 3. Theme, scheme, and color blocks live in separate cascade layers so that when all three
 *    attributes sit on the same element the more specific intent wins deterministically.
 *
 * @module
 */
import { toCss } from "./to-css.ts";
import { schemeOverrideTokens, themedTokens } from "./theme-variants.ts";
import {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  SCHEME_ATTR,
  SCOPE_LAYERS,
  THEME_ATTR,
  schemeScopeSelector,
  themeScopeSelector,
} from "@pantoken/utils";
import type { Scheme } from "./theme-variants.ts";
import type { PantokenPlugin, Theme } from "@pantoken/model";

export {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  SCHEME_ATTR,
  THEME_ATTR,
  schemeScopeSelector,
  themeScopeSelector,
};

/** Cascade layers this module emits into, in ascending precedence order. */
export const LAYERS: readonly string[] = SCOPE_LAYERS;

/** The `@layer` statement that fixes layer precedence. Must come before any layered rule. */
export const layerOrderCss = (): string => `@layer ${LAYERS.join(", ")};`;

/** Options shared by the scoped emitters. */
export interface ScopedCssOptions {
  /** Drop the `--instui-icon-*` glyph tokens (default `false`). */
  includeIcons?: boolean;
  /** Plugins whose `css` hooks run after the base CSS is built. */
  plugins?: readonly PantokenPlugin[];
}

/**
 * The document-global `@property` registrations, with no declarations. Load this once per document;
 * every theme sheet below is declarations only, so loading a second theme cannot clobber it.
 */
export function propertiesCss(theme: Theme, options: ScopedCssOptions = {}): string {
  const { includeIcons = true, plugins = [] } = options;
  return toCss(themedTokens(theme, { includeIcons }), { emit: "properties", plugins });
}

/**
 * One theme's complete token set, scoped to any element carrying `data-pantoken-theme="<theme>"`.
 *
 * Every token is emitted as a declaration — including the concrete ones that would normally become
 * `@property` initial-values — because an initial-value is document-global and cannot vary per scope.
 */
export function scopedThemeCss(theme: Theme, options: ScopedCssOptions = {}): string {
  const { includeIcons = true, plugins = [] } = options;
  return toCss(themedTokens(theme, { includeIcons }), {
    scope: themeScopeSelector(theme),
    layer: "pantoken.theme",
    emit: "declarations",
    declareAll: true,
    plugins,
  });
}

/**
 * The forcing block for a pinned color scheme: every `light-dark()` token flattened to the requested
 * branch, scoped to `[data-pantoken-theme="<theme>"][data-pantoken-scheme="<scheme>"]`.
 *
 * Usually redundant. `color-scheme` is an inherited property, so setting it on a scope element
 * already resolves `light-dark()` for that subtree, and it is supported by exactly the browsers that
 * support `light-dark()` in the first place. These blocks exist for consumers that can set an
 * attribute but *not* a style — Canvas RCE content being the case that needs them — and they are
 * bulky, so they are opt-in.
 */
export function scopedSchemeCss(theme: Theme, scheme: Scheme): string {
  const selector = `${themeScopeSelector(theme)}${schemeScopeSelector(scheme)}`;
  const pairs = [
    `color-scheme: ${scheme};`,
    ...schemeOverrideTokens(theme, scheme).map((t) => `${t.name}: ${t.value};`),
  ];
  return [
    "@layer pantoken.scheme {",
    `  ${selector} {`,
    ...pairs.map((pair) => `    ${pair}`),
    "  }",
    "}",
  ].join("\n");
}

/**
 * Every theme's light and dark forcing blocks, as a standalone sheet that layers on top of
 * {@link multiScopeCss}. Load it only where a scope can't set `color-scheme` itself.
 *
 * @example
 * ```ts
 * import { schemesCss } from "@pantoken/css";
 *
 * schemesCss(["rebrand", "canvas"]);
 * ```
 */
export function schemesCss(themes: readonly Theme[]): string {
  return themes
    .flatMap((theme) => [scopedSchemeCss(theme, "light"), scopedSchemeCss(theme, "dark")])
    .join("\n\n");
}

/** Options for {@link multiScopeCss}. */
export interface MultiScopeCssOptions extends ScopedCssOptions {
  /** Themes to emit scope blocks for. */
  themes: readonly Theme[];
  /** The theme whose concrete tokens back the one-time `@property` registrations. */
  defaultTheme: Theme;
  /**
   * Inline the `[data-pantoken-scheme]` forcing blocks (default `false`). Leave them out unless the
   * consumer cannot set `color-scheme` on a scope element; see {@link scopedSchemeCss}. They are
   * also available on their own via {@link schemesCss}.
   */
  schemes?: boolean;
}

/**
 * The complete multi-scope sheet: layer order, one set of `@property` registrations, a shared base
 * block, a token block per theme, and light/dark forcing blocks.
 *
 * Tokens are partitioned by whether their value actually varies across `themes`. Invariant tokens go
 * in the shared base block once; varying tokens are repeated in full in *every* theme block. That
 * second half is what makes nesting safe — a theme block that omitted a varying token would inherit
 * the enclosing scope's value for it.
 *
 * @example
 * ```ts
 * import { multiScopeCss } from "@pantoken/css";
 *
 * multiScopeCss({ themes: ["rebrand", "canvas"], defaultTheme: "rebrand" });
 * ```
 */
export function multiScopeCss(options: MultiScopeCssOptions): string {
  const { themes, defaultTheme, schemes = false, includeIcons = true, plugins = [] } = options;

  const perTheme = new Map(themes.map((t) => [t, themedTokens(t, { includeIcons })]));
  const varying = new Set<string>();
  const seen = new Map<string, string>();
  for (const tokens of perTheme.values()) {
    for (const token of tokens) {
      const previous = seen.get(token.name);
      if (previous === undefined) seen.set(token.name, token.value);
      else if (previous !== token.value) varying.add(token.name);
    }
  }

  const baseTokens = (perTheme.get(defaultTheme) ?? []).filter((t) => !varying.has(t.name));
  const blocks = [
    layerOrderCss(),
    propertiesCss(defaultTheme, { includeIcons, plugins }),
    // Concrete invariant tokens already have their value as an `@property` initial-value above, so
    // only the contextual ones need a declaration here.
    toCss(baseTokens, { scope: ":root", layer: "pantoken.base", emit: "declarations", plugins }),
  ];

  for (const theme of themes) {
    const tokens = (perTheme.get(theme) ?? []).filter((t) => varying.has(t.name));
    blocks.push(
      toCss(tokens, {
        scope: themeScopeSelector(theme),
        layer: "pantoken.theme",
        emit: "declarations",
        declareAll: true,
      }),
    );
    if (schemes) {
      blocks.push(scopedSchemeCss(theme, "light"), scopedSchemeCss(theme, "dark"));
    }
  }

  return blocks.filter(Boolean).join("\n\n");
}
