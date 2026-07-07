/**
 * `@pantoken/vitepress` — theme a VitePress site with Instructure tokens.
 *
 * VitePress theming is driven by `--vp-*` CSS variables. This points them at `var(--instui-*)`, so
 * dropping the output into `.vitepress/theme/custom.css` (alongside `@pantoken/css`, which defines
 * the custom properties) re-skins the docs with the Instructure look while light/dark keeps flowing
 * through the same tokens.
 *
 * @module
 */

/** VitePress CSS variable → the Instructure token it resolves to. */
export const VITEPRESS_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "--vp-c-bg": "--instui-color-background-base",
  "--vp-c-bg-alt": "--instui-color-background-container",
  "--vp-c-bg-soft": "--instui-color-background-muted",
  "--vp-c-text-1": "--instui-color-text-base",
  "--vp-c-text-2": "--instui-color-text-muted",
  // VitePress uses brand-1/2/3 for links, hover, and solid buttons. The navigation blue stays
  // vivid in both light and dark, so links and accents read as Instructure blue either way;
  // brand-3 is the solid button fill, so it uses the constant info blue that keeps white button
  // text legible. (The `brand` surface token is a near-black/near-white navy — wrong for accents.)
  "--vp-c-brand-1": "--instui-color-text-interactive-navigation-primary-base",
  "--vp-c-brand-2": "--instui-color-text-interactive-navigation-primary-hover",
  "--vp-c-brand-3": "--instui-color-background-info",
  "--vp-c-border": "--instui-color-stroke-base",
  "--vp-c-divider": "--instui-color-stroke-base",
  "--vp-c-gutter": "--instui-color-stroke-base",
  "--vp-c-success-1": "--instui-color-background-success",
  "--vp-c-warning-1": "--instui-color-background-warning",
  "--vp-c-danger-1": "--instui-color-background-error",
});

/** Options for {@link toVitePressCss}. */
export interface ToVitePressCssOptions {
  /** The selector the variables are emitted under (default `":root"`). */
  selector?: string;
}

/**
 * Emit the VitePress → Instructure CSS-variable bridge.
 *
 * @param options - {@link ToVitePressCssOptions}.
 * @returns The bridging CSS string.
 *
 * @example
 * ```ts
 * import { toVitePressCss } from "@pantoken/vitepress";
 *
 * const css = toVitePressCss();
 * // ":root { --vp-c-bg: var(--instui-color-background-base); … }"
 * // Write it into .vitepress/theme/custom.css alongside @pantoken/css.
 * ```
 */
export function toVitePressCss(options: ToVitePressCssOptions = {}): string {
  const selector = options.selector ?? ":root";
  const lines = Object.entries(VITEPRESS_TO_INSTUI).map(
    ([vp, instui]) => `  ${vp}: var(${instui});`,
  );
  return `/* VitePress themed with Instructure tokens (pantoken) */\n${selector} {\n${lines.join("\n")}\n}\n`;
}

/** The ready-made bridge stylesheet. */
export const vitePressCss: string = toVitePressCss();

export default vitePressCss;
