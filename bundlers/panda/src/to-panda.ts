/**
 * Build a Panda CSS preset from the pantoken IR. Panda splits a design system into `tokens` (raw,
 * mode-independent values) and `semanticTokens` (values that vary by condition, e.g. `_dark`). This
 * maps the IR onto that split: primitives become raw tokens, and any token that differs between
 * light and dark becomes a semantic token with `{ value: { base, _dark } }` — which is exactly how
 * pantoken's `light-dark()` values decompose. Tokens are bucketed into Panda's categories (colors,
 * spacing, sizes, radii, fontSizes, fontWeights, lineHeights, durations, shadows) by value type and
 * name. Icons are skipped.
 *
 * The result is shaped like the object you'd pass to Panda's `definePreset`.
 *
 * @module
 */
import { resolveTokens } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const COLOR_RE = /^(#|rgb|hsl|hwb|okl(ch|ab)|lab|lch|color\(|transparent\b|currentcolor\b)/i;
const LENGTH_RE = /^-?[\d.]+(px|rem|em|%|vh|vw|vmin|vmax|ch)$/;

/** The Panda token categories this preset populates. */
export type PandaCategory =
  | "colors"
  | "spacing"
  | "sizes"
  | "radii"
  | "fontSizes"
  | "fontWeights"
  | "lineHeights"
  | "durations"
  | "shadows";

/** Decide which Panda category a token belongs to, or `undefined` to skip it. */
function categorize(token: Token, light: string): PandaCategory | undefined {
  const name = token.name;
  if (/gradient|url\(/i.test(light)) return undefined;
  if (name.includes("shadow")) return "shadows";
  if (COLOR_RE.test(light.trim())) return "colors";
  if (token.syntax === "<time>" || /duration/.test(name)) return "durations";
  if (/font-weight/.test(name)) return "fontWeights";
  if (/line-height/.test(name)) return "lineHeights";
  if (LENGTH_RE.test(light.trim())) {
    if (/radius|corner/.test(name)) return "radii";
    if (/font-size/.test(name)) return "fontSizes";
    if (/spacing|space/.test(name)) return "spacing";
    return "sizes";
  }
  return undefined;
}

/** A raw Panda token: `{ value }`. */
export interface PandaToken {
  value: string;
}
/** A Panda semantic token: a flat value, or one that varies by the `_dark` condition. */
export interface PandaSemanticToken {
  value: string | { base: string; _dark: string };
}
type CategoryMap<V> = Partial<Record<PandaCategory, Record<string, V>>>;

/** A Panda preset (shaped for `definePreset`). */
export interface PandaPreset {
  name: string;
  theme: {
    tokens: CategoryMap<PandaToken>;
    semanticTokens: CategoryMap<PandaSemanticToken>;
  };
}

/** Strip the `--instui-` prefix to form a Panda token key. */
function toKey(name: string): string {
  return name.replace(/^--instui-/, "");
}

function put<V>(map: CategoryMap<V>, cat: PandaCategory, key: string, value: V): void {
  (map[cat] ??= {})[key] = value;
}

/**
 * Build a Panda preset from a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @returns A preset object for Panda's `definePreset`.
 *
 * @example Build a preset from a custom IR
 * ```ts
 * import { defineConfig } from "@pandacss/dev";
 * import { toPandaPreset } from "@pantoken/panda";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const preset = toPandaPreset(byTheme("rebrand"));
 * export default defineConfig({ presets: [preset] });
 * ```
 */
export function toPandaPreset(tokens: readonly Token[]): PandaPreset {
  const light = resolveTokens(tokens, { mode: "light" });
  const dark = resolveTokens(tokens, { mode: "dark" });
  const rawTokens: CategoryMap<PandaToken> = {};
  const semanticTokens: CategoryMap<PandaSemanticToken> = {};

  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    const lv = light.get(token.name) ?? token.value;
    const dv = dark.get(token.name) ?? token.value;
    const cat = categorize(token, lv);
    if (!cat) continue;
    const key = toKey(token.name);

    // A primitive (a concrete <color>, same in both modes) is a raw token; anything that varies by
    // mode is a semantic token with a `_dark` condition; anything else is a flat semantic alias.
    if (lv === dv && token.syntax === "<color>" && !token.themed) {
      put(rawTokens, cat, key, { value: lv });
    } else if (lv === dv) {
      put(semanticTokens, cat, key, { value: lv });
    } else {
      put(semanticTokens, cat, key, { value: { base: lv, _dark: dv } });
    }
  }

  return { name: "@pantoken/panda", theme: { tokens: rawTokens, semanticTokens } };
}
