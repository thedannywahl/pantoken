/**
 * `buildTokens` — the first and only source transformation. Reads
 * `@instructure/instructure-design-tokens` + `@instructure/ui-icons` and produces the canonical
 * `@property`-aligned {@link Token} IR (icons rolled in), then runs plugin token hooks over it.
 *
 * @module
 */
import { themeTokens } from "@instructure/instructure-design-tokens";
import { applyModify } from "./color.ts";
import { collectIcons } from "./icons.ts";
import { defineToken, runIconPlugins, runTokenPlugins } from "./plugin.ts";
import { collectLeaves, resolveValue, varName } from "./resolve.ts";
import type { PantokenPlugin } from "./plugin.ts";
import type { Leaf } from "./resolve.ts";
import type { Theme, Token, TokenMeta } from "./model.ts";

/** Options for {@link buildTokens}. */
export interface BuildTokensOptions {
  /** The theme to resolve (default: `"rebrand"`). */
  theme?: Theme;
  /** Plugins whose `tokens` hooks run over the IR (default: none). */
  plugins?: readonly PantokenPlugin[];
  /** Include the icon layer (default: true). */
  includeIcons?: boolean;
  /** Include Instructure-authored (Custom) glyphs (default: true). */
  includeInstui?: boolean;
  /** Include Lucide glyphs (default: true). */
  includeLucide?: boolean;
}

interface ThemeSpec {
  group: "rebrand" | "canvas";
  light: string;
  dark?: string;
}

const THEME_SPECS: Record<Theme, ThemeSpec> = {
  rebrand: { group: "rebrand", light: "rebrandLight", dark: "rebrandDark" },
  canvas: { group: "canvas", light: "canvas" },
  canvasHighContrast: { group: "canvas", light: "canvasHighContrast" },
};

/** Resolve a leaf's value, applying a concrete colour modifier or preserving it as metadata. */
function resolveLeaf(leaf: Leaf): { value: string; meta?: TokenMeta } {
  const value = resolveValue(leaf.value);
  if (!leaf.modify) return { value };
  const applied = value.startsWith("#") ? applyModify(value, leaf.modify) : undefined;
  return applied ? { value: applied } : { value, meta: { modify: leaf.modify } };
}

function toToken(name: string, value: string, meta?: TokenMeta): Token {
  return defineToken({ name, value, meta });
}

/**
 * Build the canonical token IR for a theme.
 *
 * @param options - {@link BuildTokensOptions}.
 * @returns The resolved, de-duplicated {@link Token} list.
 *
 * @example Build the default (rebrand) IR
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 *
 * const tokens = buildTokens();
 * // → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
 * ```
 *
 * @example Pick a theme and drop the icon layer
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 *
 * // A smaller, colour/layout-only IR for the canvas theme.
 * const tokens = buildTokens({ theme: "canvas", includeIcons: false });
 * ```
 *
 * @example Run a plugin's tokens hook over the IR
 * ```ts
 * import { buildTokens, type PantokenPlugin } from "@pantoken/core";
 *
 * const brand: PantokenPlugin = {
 *   name: "brand",
 *   tokens: ({ tokens, define }) => [
 *     ...tokens,
 *     define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
 *   ],
 * };
 *
 * buildTokens({ theme: "rebrand", plugins: [brand] });
 * ```
 */
export function buildTokens(options: BuildTokensOptions = {}): Token[] {
  const {
    theme = "rebrand",
    plugins = [],
    includeIcons = true,
    includeInstui = true,
    includeLucide = true,
  } = options;

  const spec = THEME_SPECS[theme];
  const root = themeTokens as unknown as Record<string, any>;
  const group = root[spec.group];
  const tokens: Token[] = [];

  // 1. Primitives — shared across themes, concrete values.
  for (const leaf of collectLeaves(root.primitives?.default)) {
    const { value, meta } = resolveLeaf(leaf);
    tokens.push(toToken(varName("primitive", leaf.path), value, meta));
  }

  // 2. Layout (size, spacing, radii, type…) — references point at primitives.
  for (const leaf of collectLeaves(group?.semantic?.layout?.default?.semantic)) {
    const { value, meta } = resolveLeaf(leaf);
    tokens.push(toToken(varName("", leaf.path), value, meta));
  }

  // 3. Semantic colours — emit a single value when light and dark resolve identically, else wrap
  //    both in light-dark(). This is the only layer that produces light-dark().
  const darkByPath = new Map<string, Leaf>();
  if (spec.dark) {
    for (const leaf of collectLeaves(group?.semantic?.color?.[spec.dark]?.semantic)) {
      darkByPath.set(leaf.path.join("."), leaf);
    }
  }
  for (const leaf of collectLeaves(group?.semantic?.color?.[spec.light]?.semantic)) {
    const light = resolveLeaf(leaf);
    const darkLeaf = darkByPath.get(leaf.path.join("."));
    const dark = darkLeaf ? resolveLeaf(darkLeaf) : light;
    const value =
      light.value === dark.value ? light.value : `light-dark(${light.value}, ${dark.value})`;
    tokens.push(toToken(varName("", leaf.path), value, light.meta));
  }

  // 4. Components — reference the colour/layout layers, so theming flows through automatically.
  for (const component of Object.values(group?.component ?? {})) {
    for (const leaf of collectLeaves(component)) {
      const { value, meta } = resolveLeaf(leaf);
      tokens.push(toToken(varName("component", leaf.path), value, meta));
    }
  }

  // 5. Icons — rolled in as <image> tokens, plus the icon-colour special values.
  if (includeIcons) {
    const { glyphs, colors } = collectIcons({ includeInstui, includeLucide });
    for (const glyph of glyphs) {
      tokens.push(defineToken({ name: glyph.name, value: glyph.value, meta: glyph.meta }));
    }
    for (const [name, value] of colors) tokens.push(toToken(name, value));
  }

  // 6. Plugin icon hooks — register extra glyphs as <image> tokens, then token hooks — both guarded
  //    (a wrong-stage plugin warns rather than silently doing nothing); result de-duped (later wins).
  const withIcons = runIconPlugins(tokens, plugins);
  return runTokenPlugins(withIcons, theme, plugins);
}
