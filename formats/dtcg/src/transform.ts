/**
 * Transform the pantoken IR into a W3C Design Tokens (DTCG) document: a nested tree of
 * `{ $value, $type }` leaves. Values are fully resolved to a single colour mode (DTCG has no
 * `light-dark()`), and icon tokens are excluded (DTCG describes tokens, not glyph assets).
 *
 * @module
 */
import type { Token } from "@pantoken/model";
import { resolveTokens } from "@pantoken/utils";

/** The colour mode to resolve when flattening `light-dark()` values. */
export type Mode = "light" | "dark";

function sniff(value: string): string | undefined {
  const v = value.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(v) || /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\(/i.test(v)) {
    return "color";
  }
  if (/^-?\d*\.?\d+(px|rem|em)$/i.test(v)) return "dimension";
  if (/^-?\d+$/.test(v)) return "number";
  return undefined;
}

function dtcgType(syntax: string, value: string): string | undefined {
  switch (syntax) {
    case "<color>":
      return "color";
    case "<length>":
    case "<percentage>":
      return "dimension";
    case "<number>":
    case "<integer>":
      return "number";
    default:
      return sniff(value);
  }
}

/** A DTCG token leaf or group. */
export type DtcgNode = { $value: string; $type?: string } | { [key: string]: DtcgNode };

/**
 * Convert an IR token list into a DTCG document.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param mode - Which colour mode to resolve (default `"light"`).
 * @returns A nested DTCG token tree.
 *
 * @example Convert the default IR to a DTCG tree
 * ```ts
 * import { toDtcg } from "@pantoken/dtcg";
 * import { tokens } from "@pantoken/tokens";
 *
 * const doc = toDtcg(tokens);
 * // doc.color.background.brand === { $value: "#0374b5", $type: "color" }
 * ```
 *
 * @example Resolve the dark mode of another theme
 * ```ts
 * import { toDtcg } from "@pantoken/dtcg";
 * import { byTheme } from "@pantoken/tokens";
 *
 * toDtcg(byTheme("canvas"), "dark");
 * ```
 */
export function toDtcg(tokens: readonly Token[], mode: Mode = "light"): Record<string, DtcgNode> {
  const resolved = resolveTokens(tokens, { mode: mode });
  const root: Record<string, DtcgNode> = {};
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    const path = token.name.replace(/^--instui-/, "").split("-");
    let node = root as Record<string, DtcgNode>;
    for (const segment of path.slice(0, -1)) {
      node[segment] ??= {};
      node = node[segment] as Record<string, DtcgNode>;
    }
    const leaf = path.at(-1) as string;
    const value = resolved.get(token.name) ?? token.value;
    const type = dtcgType(token.syntax, value);
    node[leaf] = type ? { $value: value, $type: type } : { $value: value };
  }
  return root;
}
