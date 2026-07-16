/**
 * `@pantoken/tokens` — the canonical resolved token IR, vendored as static JSON.
 *
 * The default export is the `rebrand` theme; every theme is available by name and via
 * {@link byTheme}. Raw Tokens Studio JSON lives at `@pantoken/tokens/raw`.
 *
 * @module
 * @beta
 */
import canvasJson from "../generated/canvas.json" with { type: "json" };
import canvasHighContrastJson from "../generated/canvasHighContrast.json" with { type: "json" };
import rebrandJson from "../generated/rebrand.json" with { type: "json" };
import type { Theme, Token } from "@pantoken/model";

/**
 * The `rebrand` theme IR (the default).
 *
 * @example
 * ```ts
 * import { tokens } from "@pantoken/tokens";
 * import { toCss } from "@pantoken/css";
 *
 * const stylesheet = toCss(tokens);
 * ```
 */
export const tokens: Token[] = rebrandJson as Token[];

/**
 * The `rebrand` theme IR.
 *
 * @example
 * ```ts
 * import { rebrandTokens } from "@pantoken/tokens";
 *
 * rebrandTokens.find((t) => t.name === "--instui-color-background-brand");
 * ```
 */
export const rebrandTokens: Token[] = rebrandJson as Token[];

/**
 * The `canvas` theme IR.
 *
 * @example
 * ```ts
 * import { canvasTokens } from "@pantoken/tokens";
 * import { toCss } from "@pantoken/css";
 *
 * const stylesheet = toCss(canvasTokens);
 * ```
 */
export const canvasTokens: Token[] = canvasJson as Token[];

/**
 * The `canvasHighContrast` theme IR.
 *
 * @example
 * ```ts
 * import { canvasHighContrastTokens } from "@pantoken/tokens";
 * import { toCss } from "@pantoken/css";
 *
 * const stylesheet = toCss(canvasHighContrastTokens);
 * ```
 */
export const canvasHighContrastTokens: Token[] = canvasHighContrastJson as Token[];

/**
 * Every theme's IR, keyed by {@link Theme}.
 *
 * @example
 * ```ts
 * import { themes } from "@pantoken/tokens";
 *
 * const ir = themes.canvasHighContrast;
 * ```
 */
export const themes: Record<Theme, Token[]> = {
  rebrand: rebrandTokens,
  canvas: canvasTokens,
  canvasHighContrast: canvasHighContrastTokens,
};

/**
 * Look up a theme's IR by name.
 *
 * @example
 * ```ts
 * import { byTheme } from "@pantoken/tokens";
 * import { toScss } from "@pantoken/scss";
 *
 * toScss(byTheme("canvas"), { mode: "dark" });
 * ```
 */
export function byTheme(theme: Theme): Token[] {
  return themes[theme];
}

export type { Theme, Token, TokenMeta, TokenModify } from "@pantoken/model";
