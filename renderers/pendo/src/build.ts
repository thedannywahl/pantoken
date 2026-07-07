/**
 * Compose the Instructure-styled Pendo guide stylesheet.
 *
 * The `--instui-*` custom-property layer comes from pantoken (`@pantoken/css` → `toCss`), scoped to
 * the guide container `[class*="instui"]` — the drop-in replacement for pendo-styles' generated
 * `vendor/tokens.css`. On top sit the ported component layers (see {@link COMPONENTS}), assembled in
 * `@layer` cascade order, then run through the package-local `add-important` and `add-scope`
 * transforms so the result is a deployable guide stylesheet.
 *
 * @module
 */
import postcss from "postcss";
import { toCss } from "@pantoken/css";
import { elevationCss } from "@pantoken/components";
import { focusOutline } from "@pantoken/plugin-focus-outline";
import { byTheme } from "@pantoken/tokens";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
import { COMPONENTS, LAYER_ORDER, MANUAL_CSS } from "./layers.ts";
import { addImportant } from "./plugins/add-important.ts";
import { addScope } from "./plugins/add-scope.ts";
import type { Theme } from "@pantoken/model";

/** The guide container selector the token layer and component rules are scoped under. */
const GUIDE_SELECTOR = '[class*="instui"]';

/**
 * The pure-outline focusables whose ring is delegated to `@pantoken/plugin-focus-outline`. Elements
 * with custom focus behaviour (select/textarea background resets, radio and number-scale sibling
 * outlines, the card's `:focus-visible` reset) keep their own rules and are left off this list.
 */
const FOCUSABLES = "._pendo-button, ._pendo-close-guide, ._pendo-text-link";

/** Build the `instui.elevation` layer: the named `--instui-elevation-*` box-shadow custom props. */
function elevationLayer(): string {
  return `@layer instui.elevation {\n${elevationCss({ selector: GUIDE_SELECTOR })}}`;
}

/** Build the `instui.focusOutline` layer from the focus-outline plugin (ring + its token defs). */
function focusLayer(theme: Theme): string {
  const contribution = focusOutline({ theme, selector: FOCUSABLES }).css?.({
    tokens: byTheme(theme),
    css: "",
  });
  const decls = (contribution?.declarations ?? []).map(([n, v]) => `  ${n}: ${v};`).join("\n");
  return `@layer instui.focusOutline {\n${GUIDE_SELECTOR} {\n${decls}\n}\n\n${contribution?.append ?? ""}\n}`;
}

/** Options for {@link buildPendoCss}. */
export interface BuildPendoCssOptions {
  /** Theme to source the `--instui-*` layer from (default `"rebrand"`). */
  theme?: Theme;
  /** The `@scope` root selector (default `._pendo-step-container`). */
  scopeSelector?: string;
  /** Wrap component rules in `@scope` for DOM containment (default `true`). */
  scope?: boolean;
  /** Add `!important` to component declarations so they beat Pendo's styles (default `true`). */
  important?: boolean;
  /** Tree-shake unused `--instui-*` tokens (default `true`; off ships the full token set). */
  prune?: boolean;
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
    scopeSelector = "._pendo-step-container",
    scope = true,
    important = true,
    prune = true,
  } = options;

  const tokenCss = toCss(byTheme(theme), { scope: GUIDE_SELECTOR });
  const order = `@layer ${LAYER_ORDER.map((l) => `instui.${l}`).join(", ")};`;
  const tokenLayer = `@layer instui.tokens {\n${tokenCss}\n\n${MANUAL_CSS}\n}`;
  const components = COMPONENTS.map((c) => `@layer instui.${c.layer} {\n${c.css}\n}`).join("\n\n");
  const full = `${order}\n\n${tokenLayer}\n\n${elevationLayer()}\n\n${components}\n\n${focusLayer(theme)}`;

  // One pass over the whole stylesheet: !important on component rules, prune the unused token set,
  // then wrap everything in @scope (last, so it contains the pruned result).
  const plugins = [];
  if (important) plugins.push(addImportant());
  if (prune) plugins.push(pruneCustomProps());
  if (scope) plugins.push(addScope({ selector: scopeSelector }));
  const css = plugins.length ? postcss(plugins).process(full, { from: undefined }).css : full;

  return `${css}\n`;
}
