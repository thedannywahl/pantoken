/**
 * `@pantoken/shadcn` — theme shadcn/ui with Instructure tokens.
 *
 * {@link toShadcnCss} emits a `:root` block pointing shadcn's CSS variables at `var(--instui-*)`.
 * Drop it in alongside `@pantoken/css` (which defines the custom properties) and shadcn components
 * adopt the Instructure look. Icons align for free — shadcn and Instructure both use Lucide.
 *
 * @module
 */
import { SHADCN_TO_INSTUI } from "./mapping.ts";

export { SHADCN_TO_INSTUI } from "./mapping.ts";

/** Options for {@link toShadcnCss}. */
export interface ToShadcnCssOptions {
  /** The selector the variables are emitted under (default `":root"`). */
  selector?: string;
}

/**
 * Emit the shadcn → Instructure CSS-variable bridge.
 *
 * @param options - {@link ToShadcnCssOptions}.
 * @returns The bridging CSS string.
 *
 * @example
 * ```ts
 * import { toShadcnCss } from "@pantoken/shadcn";
 *
 * const css = toShadcnCss();
 * // ":root { --primary: var(--instui-color-background-brand); … }"
 * // Emit alongside @pantoken/css, which defines the --instui-* properties.
 * ```
 */
export function toShadcnCss(options: ToShadcnCssOptions = {}): string {
  const selector = options.selector ?? ":root";
  const lines = Object.entries(SHADCN_TO_INSTUI).map(
    ([shadcn, instui]) => `  ${shadcn}: var(${instui});`,
  );
  return `/* shadcn/ui themed with Instructure tokens (pantoken) */\n${selector} {\n${lines.join("\n")}\n}\n`;
}

/** The ready-made bridge stylesheet. */
export const shadcnCss: string = toShadcnCss();

export default shadcnCss;
