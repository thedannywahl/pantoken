/**
 * `@pantoken/shadcn` — theme shadcn/ui with Instructure tokens.
 *
 * {@link toShadcnCss} emits a `:root` block pointing shadcn's CSS variables at `var(--instui-*)`.
 * Drop it in alongside `@pantoken/css` (which defines the custom properties) and shadcn components
 * adopt the Instructure look. Icons align for free — shadcn and Instructure both use Lucide.
 *
 * @module
 * @experimental
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

const COLOR_ALIASES = Object.keys(SHADCN_TO_INSTUI).filter((name) => name !== "--radius");

/** Emit Tailwind v4 aliases for the shadcn theme variables and derived radius scale. */
export function toShadcnTailwindV4Css(): string {
  const colors = COLOR_ALIASES.map((name) => `  --color-${name.slice(2)}: var(${name});`);
  const radii = [
    "  --radius-sm: calc(var(--radius) * 0.6);",
    "  --radius-md: calc(var(--radius) * 0.8);",
    "  --radius-lg: var(--radius);",
    "  --radius-xl: calc(var(--radius) * 1.4);",
    "  --radius-2xl: calc(var(--radius) * 1.8);",
    "  --radius-3xl: calc(var(--radius) * 2.2);",
    "  --radius-4xl: calc(var(--radius) * 2.6);",
  ];
  return `/* Tailwind v4 aliases for the pantoken shadcn theme */\n@theme inline {\n${[
    ...colors,
    ...radii,
  ].join("\n")}\n}\n`;
}

/** The ready-made bridge stylesheet. */
export const shadcnCss: string = toShadcnCss();

/** The ready-made Tailwind v4 alias stylesheet. */
export const shadcnTailwindV4Css: string = toShadcnTailwindV4Css();

export default shadcnCss;
