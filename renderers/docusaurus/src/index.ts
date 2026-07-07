/**
 * `@pantoken/docusaurus` — theme a Docusaurus site with Instructure tokens.
 *
 * Docusaurus styles come from Infima, whose theming is driven by `--ifm-*` CSS variables. This
 * points those at `var(--instui-*)`, so dropping the output into `src/css/custom.css` (alongside
 * `@pantoken/css`, which defines the custom properties) re-skins the docs with the Instructure look
 * while light/dark keeps flowing through the same tokens.
 *
 * @module
 */

/** Infima CSS variable → the Instructure token it resolves to. */
export const INFIMA_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "--ifm-color-primary": "--instui-color-background-brand",
  // Infima hard-codes primary shades for hover/active; point them all at the brand colour.
  "--ifm-color-primary-dark": "--instui-color-background-brand",
  "--ifm-color-primary-darker": "--instui-color-background-brand",
  "--ifm-color-primary-darkest": "--instui-color-background-brand",
  "--ifm-color-primary-light": "--instui-color-background-brand",
  "--ifm-color-primary-lighter": "--instui-color-background-brand",
  "--ifm-color-primary-lightest": "--instui-color-background-brand",
  "--ifm-background-color": "--instui-color-background-base",
  "--ifm-background-surface-color": "--instui-color-background-container",
  "--ifm-navbar-background-color": "--instui-color-background-container",
  "--ifm-font-color-base": "--instui-color-text-base",
  "--ifm-heading-color": "--instui-color-text-base",
  "--ifm-color-content-secondary": "--instui-color-text-muted",
  "--ifm-link-color": "--instui-color-text-info",
  "--ifm-color-success": "--instui-color-background-success",
  "--ifm-color-danger": "--instui-color-background-error",
  "--ifm-color-warning": "--instui-color-background-warning",
  "--ifm-color-info": "--instui-color-background-info",
  "--ifm-color-emphasis-300": "--instui-color-stroke-base",
  "--ifm-toc-border-color": "--instui-color-stroke-base",
  "--ifm-global-radius": "--instui-spacing-space-sm",
});

/** Options for {@link toDocusaurusCss}. */
export interface ToDocusaurusCssOptions {
  /** The selector the variables are emitted under (default `":root"`). */
  selector?: string;
}

/**
 * Emit the Infima → Instructure CSS-variable bridge.
 *
 * @param options - {@link ToDocusaurusCssOptions}.
 * @returns The bridging CSS string.
 *
 * @example
 * ```ts
 * import { toDocusaurusCss } from "@pantoken/docusaurus";
 *
 * const css = toDocusaurusCss();
 * // ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
 * // Write it into src/css/custom.css alongside @pantoken/css.
 * ```
 */
export function toDocusaurusCss(options: ToDocusaurusCssOptions = {}): string {
  const selector = options.selector ?? ":root";
  const lines = Object.entries(INFIMA_TO_INSTUI).map(
    ([ifm, instui]) => `  ${ifm}: var(${instui});`,
  );
  return `/* Docusaurus (Infima) themed with Instructure tokens (pantoken) */\n${selector} {\n${lines.join("\n")}\n}\n`;
}

/** The ready-made bridge stylesheet. */
export const docusaurusCss: string = toDocusaurusCss();

export default docusaurusCss;
