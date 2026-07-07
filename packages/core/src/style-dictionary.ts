/**
 * Adapters that turn the CSS-oriented IR into inputs the native lineage needs. The IR's values
 * are web-shaped (`var(...)`, `light-dark()`); native platforms need fully-resolved, single-mode
 * concrete values. {@link resolveReferences} flattens the graph; {@link toStyleDictionary} shapes
 * the result as a Style Dictionary token dictionary.
 *
 * @module
 */
import { resolveTokens } from "@pantoken/utils";
import { cssSyntaxForValue } from "./utils.ts";
import type { Mode } from "@pantoken/utils";
import type { Token } from "./model.ts";

export type { Mode } from "@pantoken/utils";

/**
 * Resolve every token to a concrete, single-mode value: expand `var(...)` chains and collapse
 * `light-dark()` to the chosen `mode`.
 *
 * @param tokens - The IR.
 * @param mode - Which side of `light-dark()` to keep (default `"light"`).
 * @returns A map of token name to concrete value.
 *
 * @example Resolve the built IR to concrete dark-mode values
 * ```ts
 * import { buildTokens, resolveReferences } from "@pantoken/core";
 *
 * const resolved = resolveReferences(buildTokens(), "dark");
 * resolved.get("--instui-color-background-base"); // → a concrete "#…" value
 * ```
 */
export function resolveReferences(
  tokens: readonly Token[],
  mode: Mode = "light",
): Map<string, string> {
  return resolveTokens(tokens, { mode });
}

function sdType(syntax: string): string {
  switch (syntax) {
    case "<color>":
      return "color";
    case "<length>":
    case "<percentage>":
      return "dimension";
    case "<number>":
    case "<integer>":
      return "number";
    case "<image>":
      return "asset";
    default:
      return "other";
  }
}

/** A Style Dictionary leaf. */
export interface SdLeaf {
  value: string;
  type: string;
}

/**
 * Shape the resolved IR as a flat Style Dictionary token dictionary keyed by token name (with the
 * leading `--` stripped). Feed this to `tools/sd-config` for the native emitters.
 *
 * @param tokens - The IR.
 * @param mode - Which colour mode to resolve (default `"light"`).
 * @returns A Style Dictionary dictionary object.
 *
 * @example Shape the IR for the native lineage
 * ```ts
 * import { buildTokens, toStyleDictionary } from "@pantoken/core";
 *
 * const dictionary = toStyleDictionary(buildTokens(), "light");
 * // → { "instui-color-background-base": { value: "#…", type: "color" }, … }
 * // keys drop the leading "--"; feed this to tools/sd-config.
 * ```
 */
export function toStyleDictionary(
  tokens: readonly Token[],
  mode: Mode = "light",
): Record<string, SdLeaf> {
  const resolved = resolveReferences(tokens, mode);
  const out: Record<string, SdLeaf> = {};
  for (const token of tokens) {
    const value = resolved.get(token.name) ?? token.value;
    // Reference tokens carry syntax "*"; infer the native type from the resolved concrete value,
    // falling back to the token's own (icon) syntax when the value stays contextual.
    const syntax = token.syntax === "*" ? cssSyntaxForValue(value) : token.syntax;
    out[token.name.replace(/^--/, "")] = { value, type: sdType(syntax) };
  }
  return out;
}
