/**
 * Compose the Instructure-styled Pendo guide stylesheet.
 *
 * The `--instui-*` custom-property layer comes from pantoken (`@pantoken/css` → `toCss`), scoped to
 * the guide container `[class*="instui"]` — the drop-in replacement for pendo-styles' generated
 * `vendor/tokens.css`. On top sit the ported component layers (see {@link COMPONENTS}), assembled in
 * `@layer` cascade order, then run through the package-local `add-important` and `add-scope`
 * transforms so the result is a deployable guide stylesheet. The `vars` layer holds
 * `--pendo-*` aliases and token overrides; the `chrome` layer holds backdrop, image, and divider.
 *
 * @module
 */
import postcss from "postcss";
import { toCss } from "@pantoken/css";
import { elevationCss, focusOutlineDeclarations, focusOutlineRules } from "@pantoken/components";
import { byTheme } from "@pantoken/tokens";
import {
  pruneCustomProps,
  flattenProperty,
  mangleCustomProps,
  type FlattenPropertyOptions,
  type MangleCustomPropsOptions,
} from "@pantoken/plugin-props-minify";
import { COMPONENTS, LAYER_ORDER, PENDO_VARS_CSS } from "./layers.ts";
import { addImportant } from "./plugins/add-important.ts";
import { addScope } from "./plugins/add-scope.ts";
import type { Theme } from "@pantoken/model";

/** The guide container selector the token layer and component rules are scoped under. */
const GUIDE_SELECTOR = '[class*="instui"]';

/**
 * Focusables whose ring is fully delegated to focusLayer(). Elements with additional focus
 * behaviour (card `:focus-visible` reset, input background/border resets, radio sibling label
 * suppression) keep component-specific `:focus` rules but omit the outline declarations.
 */
const FOCUSABLES =
  "._pendo-button, ._pendo-close-guide, ._pendo-text-link, " +
  "select._pendo-multi-choice-poll-select, ._pendo-open-text-poll-input, input.pendo-radio";

/** Build the `instui.elevation` layer: the named `--instui-elevation-*` box-shadow custom props. */
function elevationLayer(selector: string): string {
  return `@layer instui.elevation {\n${elevationCss({ selector })}}`;
}

/** Build the `instui.focusOutline` layer: the `--instui-focus-outline-*` token defs + the ring rules
 *  (from `@pantoken/components`), scoped to Pendo's focusables. */
function focusLayer(selector: string): string {
  const decls = focusOutlineDeclarations()
    .map(([n, v]) => `  ${n}: ${v};`)
    .join("\n");
  return `@layer instui.focusOutline {\n${selector} {\n${decls}\n}\n\n${focusOutlineRules(FOCUSABLES)}\n}`;
}

/** Options for {@link buildPendoCss}. */
export interface BuildPendoCssOptions {
  /** Theme to source the `--instui-*` layer from (default `"rebrand"`). */
  theme?: Theme;
  /** The `@scope` root selector (default `[class*="instui"]._pendo-step-container`). */
  scopeSelector?: string;
  /** Wrap component rules in `@scope` for DOM containment (default `true`). */
  scope?: boolean;
  /** Add `!important` to component declarations so they beat Pendo's styles (default `true`). */
  important?: boolean;
  /** Tree-shake unused `--instui-*` tokens (default `true`; off ships the full token set). */
  prune?: boolean;
  /**
   * Convert `@property` at-rules to plain custom-property declarations via
   * {@link flattenProperty} (default `false`). `true` uses plugin defaults with
   * `injectSelector: ":scope"` so the declarations land inside the `@scope` block.
   * Pass a {@link FlattenPropertyOptions} object to override individual defaults.
   */
  flatten?: boolean | FlattenPropertyOptions;
  /**
   * Mangle `--instui-*` names to minimal base-26 identifiers via {@link mangleCustomProps}
   * (default `false`). Safe here because the full token + component stylesheet is a
   * self-contained bundle. Pass a {@link MangleCustomPropsOptions} object to override defaults.
   */
  mangle?: boolean | MangleCustomPropsOptions;
}

/**
 * Build the Pendo guide stylesheet.
 *
 * @param options - {@link BuildPendoCssOptions}.
 * @returns The composed CSS.
 *
 * @example Default rebrand build (scoped, !important, pruned)
 * ```ts
 * import { buildPendoCss } from "@pantoken/pendo";
 *
 * const css = buildPendoCss();
 * ```
 *
 * @example Canvas theme, unscoped, keep the full token set
 * ```ts
 * import { buildPendoCss } from "@pantoken/pendo";
 *
 * const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
 * ```
 */
export function buildPendoCss(options: BuildPendoCssOptions = {}): string {
  const {
    theme = "rebrand",
    scopeSelector = '[class*="instui"]._pendo-step-container',
    scope = true,
    important = true,
    prune = true,
    flatten = false,
    mangle = false,
  } = options;

  const rootSelector = scope ? ":scope" : GUIDE_SELECTOR;
  const tokenCss = toCss(byTheme(theme), { scope: rootSelector });
  const order = `@layer ${LAYER_ORDER.map((l) => `instui.${l}`).join(", ")};`;
  const varsCss = scope ? PENDO_VARS_CSS.replaceAll(GUIDE_SELECTOR, ":scope") : PENDO_VARS_CSS;
  const tokenLayer = `@layer instui.tokens {\n${tokenCss}\n\n${varsCss}\n}`;
  const components = COMPONENTS.map((c) => `@layer instui.${c.layer} {\n${c.css}\n}`).join("\n\n");
  const scopedComponents = scope ? components : components.replaceAll(":scope", ":not(*)");
  const full = `${order}\n\n${tokenLayer}\n\n${elevationLayer(rootSelector)}\n\n${scopedComponents}\n\n${focusLayer(rootSelector)}`;

  // Plugin order: !important → prune → flatten → mangle → scope (scope must be last).
  const plugins = [];
  if (important) plugins.push(addImportant());
  if (prune) plugins.push(pruneCustomProps());
  if (flatten)
    plugins.push(
      flattenProperty(
        flatten === true ? { injectSelector: ":scope" } : { injectSelector: ":scope", ...flatten },
      ),
    );
  if (mangle) plugins.push(mangleCustomProps(mangle === true ? {} : mangle));
  if (scope) plugins.push(addScope({ selector: scopeSelector }));
  const css = plugins.length ? postcss(plugins).process(full, { from: undefined }).css : full;

  return `${css}\n`;
}
