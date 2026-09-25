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
import { themedTokens } from "./theme-variants.ts";
import {
  BOUNDARY_ATTR,
  BOUNDARY_CLASS,
  COLOR_ATTR,
  SCHEME_ATTR,
  SCOPE_LAYERS,
  THEME_ATTR,
  colorClass,
  schemeClass,
  schemeScopeSelector,
  schemeScopeSelectors,
  themeClass,
  themeScopeSelector,
  themeScopeSelectors,
} from "@pantoken/utils";
import type { Scheme } from "./theme-variants.ts";
import type { PantokenPlugin, Theme } from "@pantoken/model";

export {
  BOUNDARY_ATTR,
  BOUNDARY_CLASS,
  COLOR_ATTR,
  SCHEME_ATTR,
  THEME_ATTR,
  colorClass,
  schemeClass,
  schemeScopeSelector,
  schemeScopeSelectors,
  themeClass,
  themeScopeSelector,
  themeScopeSelectors,
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
 * One theme's complete token set, scoped to any element carrying `data-pantoken-theme="<theme>"` or
 * the equivalent `.--pantoken-theme-<theme>` class.
 *
 * Every token is emitted as a declaration — including the concrete ones that would normally become
 * `@property` initial-values — because an initial-value is document-global and cannot vary per scope.
 */
export function scopedThemeCss(theme: Theme, options: ScopedCssOptions = {}): string {
  const { includeIcons = true, plugins = [] } = options;
  return toCss(themedTokens(theme, { includeIcons }), {
    scope: themeScopeSelectors(theme),
    layer: "pantoken.theme",
    emit: "declarations",
    declareAll: true,
    plugins,
  });
}

/**
 * Pin a subtree's color scheme.
 *
 * `color-scheme` is an ordinary inherited property, so one rule keyed to the scope attribute (or its
 * class twin) resolves every `light-dark()` token below it. No token needs flattening: this sheet is
 * a couple of hundred bytes, not the ~87kb an explicit per-token override table would cost.
 */
export function scopedSchemeCss(scheme: Scheme): string {
  return [
    "@layer pantoken.scheme {",
    `  ${schemeScopeSelectors(scheme)} {`,
    `    color-scheme: ${scheme};`,
    "  }",
    "}",
  ].join("\n");
}

/**
 * The light and dark scheme pins, as a standalone sheet. Theme-independent — the scheme only decides
 * which branch of `light-dark()` wins, which the browser does for us.
 *
 * @example
 * ```ts
 * import { schemesCss } from "@pantoken/css";
 *
 * schemesCss();
 * ```
 */
export function schemesCss(): string {
  return [scopedSchemeCss("light"), scopedSchemeCss("dark")].join("\n\n");
}

/** Options for {@link multiScopeCss}. */
export interface MultiScopeCssOptions extends ScopedCssOptions {
  /** Themes to emit scope blocks for. */
  themes: readonly Theme[];
  /** The theme whose concrete tokens back the one-time `@property` registrations. */
  defaultTheme: Theme;
  /** Include the light/dark `color-scheme` pins (default `true`; see {@link schemesCss}). */
  schemes?: boolean;
}

/**
 * The complete multi-scope sheet: layer order, one set of `@property` registrations, a shared base
 * block, a token block per theme, and the light/dark `color-scheme` pins.
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
  const { themes, defaultTheme, schemes = true, includeIcons = true, plugins = [] } = options;

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
        scope: themeScopeSelectors(theme),
        layer: "pantoken.theme",
        emit: "declarations",
        declareAll: true,
      }),
    );
  }

  // Theme-independent, and small enough that omitting it would never be worth the footgun.
  if (schemes) blocks.push(schemesCss());

  return blocks.filter(Boolean).join("\n\n");
}
