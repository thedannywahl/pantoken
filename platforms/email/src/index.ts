/**
 * `@pantoken/email` — Instructure design tokens for HTML email.
 *
 * Email clients don't support CSS custom properties and often strip `<style>`, so tokens are fully
 * resolved to concrete values for inline styling. Colours are hex; dimensions keep their `px` units.
 * Icons are excluded. `light`/`dark` maps are keyed by camelCased token name.
 *
 * @module
 * @experimental
 */
import { tokens } from "@pantoken/tokens";
import { camelCase, resolveTokens } from "@pantoken/utils";

type Mode = "light" | "dark";

function build(mode: Mode): Record<string, string> {
  const resolved = resolveTokens(tokens, { mode: mode });
  const out: Record<string, string> = {};
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    out[camelCase(token.name.replace(/^--instui-/, ""))] = resolved.get(token.name) ?? token.value;
  }
  return out;
}

/**
 * Concrete `light`-mode token values, for inline email styling.
 *
 * @example
 * ```ts
 * import { light } from "@pantoken/email";
 *
 * const bg = light.colorBackgroundBrand; // e.g. "#…"
 * ```
 */
export const light: Record<string, string> = build("light");

/**
 * Concrete `dark`-mode token values.
 *
 * @example
 * ```ts
 * import { dark } from "@pantoken/email";
 *
 * const bg = dark.colorBackgroundBrand;
 * ```
 */
export const dark: Record<string, string> = build("dark");

/**
 * Select the token map for a mode (default `"light"`).
 *
 * @example Inline a token into an email cell (light mode)
 * ```ts
 * import { emailTokens } from "@pantoken/email";
 *
 * const t = emailTokens();
 * const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
 * ```
 *
 * @example Dark mode
 * ```ts
 * import { emailTokens } from "@pantoken/email";
 *
 * const t = emailTokens("dark");
 * ```
 */
export function emailTokens(mode: Mode = "light"): Record<string, string> {
  return mode === "dark" ? dark : light;
}
