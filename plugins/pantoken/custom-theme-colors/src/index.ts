/**
 * `@pantoken/plugin-custom-theme-colors` — custom theme color rules and hero/brand variables.
 *
 * Emits scoped `:root[data-pantoken-color="…"]` and `:root[data-pantoken-theme="canvasHighContrast"][data-pantoken-color="…"]`
 * rules for all 13 color namespaces (`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`).
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { customThemeColors } from "@pantoken/plugin-custom-theme-colors";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [customThemeColors()] });
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import type { PantokenPlugin, Token } from "@pantoken/model";

/** The 13 available color namespaces for site theme color selection. */
export const COLOR_KEYS = [
  "navy",
  "blue",
  "green",
  "red",
  "orange",
  "grey",
  "plum",
  "violet",
  "stone",
  "sky",
  "honey",
  "sea",
  "aurora",
] as const;

/** A supported custom theme color namespace. */
export type PantokenColorNamespace = (typeof COLOR_KEYS)[number];

/** Options for the {@link customThemeColors} plugin. */
export interface CustomThemeColorsOptions {
  /** Optional token array or map to resolve primitive step color values from. */
  tokens?: readonly Token[] | Map<string, string>;
}

const PRIMITIVE_STEPS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
] as const;

/**
 * Generate CSS rules for all custom theme color choices by remapping primitive color scale steps
 * (`--instui-primitive-color-navy-*` and `--instui-primitive-color-blue-*`), while preserving explicitly
 * named blue accent tokens.
 *
 * @param tokens - Optional token array or map for primitive step color lookups.
 * @returns Generated CSS rules string.
 */
export function customThemeColorsCss(tokens?: readonly Token[] | Map<string, string>): string {
  const tokenMap = new Map<string, string>();

  if (tokens instanceof Map) {
    for (const [k, v] of tokens.entries()) tokenMap.set(k, v);
  } else if (Array.isArray(tokens)) {
    for (const t of tokens) tokenMap.set(t.name, t.value);
  } else {
    for (const t of byTheme("rebrand")) tokenMap.set(t.name, t.value);
  }

  // Tokens explicitly named blue accent that should be preserved as blue even when primitives are remapped.
  const preservedBlueTokens = [
    "--instui-color-background-accent-blue",
    "--instui-color-stroke-accent-blue",
    "--instui-color-text-accent-blue",
    "--instui-color-icon-accent-blue",
    "--instui-component-shared-tokens-background-accent-blue",
    "--instui-component-shared-tokens-stroke-accent-blue",
    "--instui-component-icon-accent-blue-color",
    "--instui-component-avatar-blue-background-color",
    "--instui-component-avatar-blue-text-color",
    "--instui-component-app-nav-item-text-color",
    "--instui-component-source-code-editor-tag-definition-variable-name-color",
    "--instui-component-source-code-editor-tag-definition-property-name-color",
    "--instui-component-source-code-editor-tag-atom-color",
    "--instui-color-background-chart-sequential-blue-color0",
    "--instui-color-background-chart-sequential-blue-color1",
    "--instui-color-background-chart-sequential-blue-color2",
    "--instui-color-background-chart-sequential-blue-color3",
    "--instui-color-background-chart-sequential-blue-color4",
    "--instui-color-background-chart-sequential-blue-color5",
    "--instui-color-background-chart-sequential-blue-color6",
    "--instui-color-background-chart-sequential-blue-color7",
    "--instui-color-background-chart-sequential-blue-color8",
    "--instui-color-background-chart-sequential-blue-color9",
    "--instui-component-chart-sequential-blue-color0",
    "--instui-component-chart-sequential-blue-color1",
    "--instui-component-chart-sequential-blue-color2",
    "--instui-component-chart-sequential-blue-color3",
    "--instui-component-chart-sequential-blue-color4",
    "--instui-component-chart-sequential-blue-color5",
    "--instui-component-chart-sequential-blue-color6",
    "--instui-component-chart-sequential-blue-color7",
    "--instui-component-chart-sequential-blue-color8",
    "--instui-component-chart-sequential-blue-color9",
  ];

  function getPreservedValue(tokenName: string): string {
    const raw = tokenMap.get(tokenName);
    if (!raw) return "";
    return raw.replace(/var\((--instui-primitive-color-blue-blue\d+)\)/g, (_m, prim) => {
      return tokenMap.get(prim) ?? _m;
    });
  }

  return COLOR_KEYS.map((c) => {
    const scale = c;

    const navyOverrides = PRIMITIVE_STEPS.map(
      (step) =>
        `  --instui-primitive-color-navy-navy${step}: var(--instui-primitive-color-${scale}-${scale}${step});`,
    ).join("\n");

    const blueOverrides = PRIMITIVE_STEPS.map(
      (step) =>
        `  --instui-primitive-color-blue-blue${step}: var(--instui-primitive-color-${scale}-${scale}${step});`,
    ).join("\n");

    const opacityOverride = `  --instui-primitive-color-navy-opacity10: color-mix(in srgb, var(--instui-primitive-color-${scale}-${scale}170) 10%, transparent);`;

    const accentPreservations = preservedBlueTokens
      .map((name) => {
        const val = getPreservedValue(name);
        return val ? `  ${name}: ${val};` : "";
      })
      .filter(Boolean)
      .join("\n");

    return `:root[data-pantoken-color="${c}"] {\n${navyOverrides}\n${blueOverrides}\n${opacityOverride}\n${accentPreservations}\n}`;
  }).join("\n\n");
}
/**
 * Create the custom theme colors plugin.
 *
 * @param options - {@link CustomThemeColorsOptions}.
 * @returns A {@link PantokenPlugin} with a `css` hook.
 */
export function customThemeColors(options: CustomThemeColorsOptions = {}): PantokenPlugin {
  return definePlugin({
    name: "@pantoken/plugin-custom-theme-colors",
    css: (ctx) => ({
      marker: "pantoken:custom-theme-colors",
      append: customThemeColorsCss(options.tokens ?? ctx?.tokens),
    }),
  });
}

export default customThemeColors;
