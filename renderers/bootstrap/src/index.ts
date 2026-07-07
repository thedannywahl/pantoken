/**
 * `@pantoken/bootstrap` — theme Bootstrap 5 with Instructure tokens.
 *
 * Points Bootstrap's `--bs-*` CSS variables at `var(--instui-*)`. Drop it in alongside
 * `@pantoken/css` and Bootstrap components adopt the Instructure look while keeping theming through
 * the same custom properties.
 *
 * @module
 */

/** Bootstrap 5 CSS variable → the Instructure token it resolves to. */
export const BOOTSTRAP_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "--bs-body-bg": "--instui-color-background-base",
  "--bs-body-color": "--instui-color-text-base",
  "--bs-primary": "--instui-color-background-brand",
  "--bs-secondary": "--instui-color-background-muted",
  "--bs-success": "--instui-color-background-success",
  "--bs-danger": "--instui-color-background-error",
  "--bs-warning": "--instui-color-background-warning",
  "--bs-info": "--instui-color-background-info",
  "--bs-link-color": "--instui-color-text-info",
  "--bs-border-color": "--instui-color-stroke-base",
  "--bs-border-radius": "--instui-spacing-space-sm",
});

/** Options for {@link toBootstrapCss}. */
export interface ToBootstrapCssOptions {
  /** The selector the variables are emitted under (default `":root"`). */
  selector?: string;
}

/**
 * Emit the Bootstrap → Instructure CSS-variable bridge.
 *
 * @param options - {@link ToBootstrapCssOptions}.
 * @returns The bridging CSS string.
 *
 * @example Default :root bridge
 * ```ts
 * import { toBootstrapCss } from "@pantoken/bootstrap";
 *
 * const css = toBootstrapCss();
 * // ":root { --bs-primary: var(--instui-color-background-brand); … }"
 * ```
 *
 * @example Scope to Bootstrap's theme attribute
 * ```ts
 * import { toBootstrapCss } from "@pantoken/bootstrap";
 *
 * const css = toBootstrapCss({ selector: "[data-bs-theme]" });
 * ```
 */
export function toBootstrapCss(options: ToBootstrapCssOptions = {}): string {
  const selector = options.selector ?? ":root";
  const lines = Object.entries(BOOTSTRAP_TO_INSTUI).map(
    ([bs, instui]) => `  ${bs}: var(${instui});`,
  );
  return `/* Bootstrap 5 themed with Instructure tokens (pantoken) */\n${selector} {\n${lines.join("\n")}\n}\n`;
}

/** The ready-made bridge stylesheet. */
export const bootstrapCss: string = toBootstrapCss();

export default bootstrapCss;
