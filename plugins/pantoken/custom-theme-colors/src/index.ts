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
import {
  buildReferenceCurve,
  deriveScale,
  type CustomColorScale,
  type ReferenceCurve,
} from "./custom-scale.ts";

export {
  deriveScale,
  isHexColor,
  parseHexColor,
  type CustomColorScale,
  type ReferenceCurve,
} from "./custom-scale.ts";

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

/** The color namespace whose scale is derived from an arbitrary hex rather than shipped. */
export const CUSTOM_COLOR_KEY = "custom";

/** A supported custom theme color namespace. */
export type PantokenColorNamespace = (typeof COLOR_KEYS)[number] | typeof CUSTOM_COLOR_KEY;

/** Options for the {@link customThemeColors} plugin. */
export interface CustomThemeColorsOptions {
  /** Optional token array or map to resolve primitive step color values from. */
  tokens?: readonly Token[] | Map<string, string>;
  /** Selector prefix for the conditional rules — see {@link CustomThemeColorsCssOptions.selector}. */
  selector?: string;
  /** Always-true-color subtree — see {@link CustomThemeColorsCssOptions.resetSelector}. */
  resetSelector?: string;
  /** Brand hex for the `custom` scale — see {@link CustomThemeColorsCssOptions.custom}. */
  custom?: string;
}

const PRIMITIVE_STEPS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
] as const;

/** Brand primitive families whose literal hex values get relinked to the selected scale. */
const BRAND_FAMILIES = ["navy", "blue"] as const;

const COLOR_LITERAL = /#[0-9a-f]{3,8}|rgba?\([^()]*\)/giu;

interface ParsedColor {
  /** Opaque `#rrggbb`, lowercased. */
  hex: string;
  /** 0–1. */
  alpha: number;
}

function parseColorLiteral(literal: string): ParsedColor | undefined {
  if (literal.startsWith("#")) {
    const body = literal.slice(1).toLowerCase();
    if (body.length === 3 || body.length === 4) {
      const r = body.slice(0, 1);
      const g = body.slice(1, 2);
      const b = body.slice(2, 3);
      const a = body.slice(3, 4);
      const alpha = a === "" ? 1 : Number.parseInt(`${a}${a}`, 16) / 255;
      return { hex: `#${r}${r}${g}${g}${b}${b}`, alpha };
    }
    if (body.length === 6 || body.length === 8) {
      const alpha = body.length === 8 ? Number.parseInt(body.slice(6, 8), 16) / 255 : 1;
      return { hex: `#${body.slice(0, 6)}`, alpha };
    }
    return undefined;
  }

  const parts = literal
    .slice(literal.indexOf("(") + 1, -1)
    .split(/[,\s/]+/u)
    .filter(Boolean);
  if (parts.length < 3) return undefined;

  const channels = parts.slice(0, 3).map((part) => Number(part.replace("%", "")));
  if (channels.some((n) => !Number.isFinite(n))) return undefined;
  const hex = `#${channels.map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;

  const rawAlpha = parts[3];
  if (rawAlpha === undefined) return { hex, alpha: 1 };
  const alpha = rawAlpha.endsWith("%") ? Number(rawAlpha.slice(0, -1)) / 100 : Number(rawAlpha);
  return Number.isFinite(alpha) ? { hex, alpha } : undefined;
}

/**
 * Index the opaque hex value of every brand primitive step so literal colors elsewhere in the
 * token set can be traced back to the primitive they were flattened from.
 *
 * @param tokenMap - Resolved token name to value map.
 * @returns Map of `#rrggbb` to the primitive family and step it belongs to.
 */
function buildPrimitiveHexIndex(
  tokenMap: Map<string, string>,
): Map<string, { family: string; step: number }> {
  const index = new Map<string, { family: string; step: number }>();
  for (const family of BRAND_FAMILIES) {
    for (const step of PRIMITIVE_STEPS) {
      const value = tokenMap.get(`--instui-primitive-color-${family}-${family}${step}`);
      if (!value) continue;
      const parsed = parseColorLiteral(value.trim());
      if (!parsed || parsed.alpha < 1 || index.has(parsed.hex)) continue;
      index.set(parsed.hex, { family, step });
    }
  }
  return index;
}

/**
 * Rewrite literal brand colors in a token value to `var()` references against the selected scale.
 *
 * Upstream flattens some tokens (secondary action backgrounds and strokes, brand button fills,
 * shadow colors) to raw hex with a baked alpha, so the primitive remap alone can never reach them.
 *
 * @param value - The token value to rewrite.
 * @param index - Output of {@link buildPrimitiveHexIndex}.
 * @param scale - The selected color namespace.
 * @returns The rewritten value, or `undefined` when nothing matched.
 */
function relinkLiteralColors(
  value: string,
  index: Map<string, { family: string; step: number }>,
  scale: string,
): string | undefined {
  // Icon tokens carry SVG data URIs whose fills must not be themed.
  if (value.includes("url(")) return undefined;

  let changed = false;
  const next = value.replace(COLOR_LITERAL, (literal) => {
    const parsed = parseColorLiteral(literal);
    if (!parsed) return literal;
    const primitive = index.get(parsed.hex);
    if (!primitive || primitive.family === scale) return literal;

    changed = true;
    const reference = `var(--instui-primitive-color-${scale}-${scale}${primitive.step})`;
    if (parsed.alpha >= 1) return reference;
    const percentage = Number((parsed.alpha * 100).toFixed(2));
    return `color-mix(in srgb, ${reference} ${percentage}%, transparent)`;
  });

  return changed ? next : undefined;
}

const STATUS_INTENT_TOKEN =
  /^--instui-color-(?:background(?:-pastel)?|stroke|text|icon)-(?:info|success|warning|error)$/u;

// Tokens explicitly named blue accent remain blue even when the brand primitives are remapped.
const PRESERVED_BLUE_ACCENT_TOKENS = [
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
] as const;

// TEMPORARY: brand-tinting the elevation shadows is paused pending a design decision.
// Delete this constant and its use in customThemeColorsCss to restore it.
const RELINK_EXCLUDED = /^--instui-color-drop-shadow-/u;

/** Options for {@link customThemeColorsCss}. */
export interface CustomThemeColorsCssOptions {
  /**
   * Selector prefix the conditional `[data-pantoken-color="…"]` rules are scoped under. Defaults to
   * `:root`. Two callers can each pass a different selector (e.g. `:root` for a page's chrome and
   * `#some-tray` for a nested widget) to run independent, non-interfering color instances on the
   * same page — each toggles its own attribute on its own element instead of sharing `:root`.
   */
  selector?: string;
  /**
   * An additional selector whose subtree should always render the true, unremapped colors,
   * regardless of what an ancestor's `[data-pantoken-color]` scope currently has active. Emits one
   * unconditional rule pinning every token this plugin can override back to its own base value —
   * e.g. a color-swatch legend nested inside an already-themed page needs its reference swatches to
   * stay constant rather than inherit the ancestor's remap.
   */
  resetSelector?: string;
  /**
   * A brand hex (`#rgb`/`#rrggbb`) to derive the `custom` scale from. When set, a
   * `[data-pantoken-color="custom"]` rule is appended — see {@link customColorCss}.
   */
  custom?: string;
}

/** Sentinel scale that never matches a real color namespace, so every affected token is selected. */
const RESET_SCALE = "\0";

function toTokenMap(tokens?: readonly Token[] | Map<string, string>): Map<string, string> {
  const tokenMap = new Map<string, string>();
  if (tokens instanceof Map) {
    for (const [k, v] of tokens.entries()) tokenMap.set(k, v);
  } else if (Array.isArray(tokens)) {
    for (const t of tokens) tokenMap.set(t.name, t.value);
  } else {
    for (const t of byTheme("rebrand")) tokenMap.set(t.name, t.value);
  }
  return tokenMap;
}

function familyStepHexes(tokenMap: Map<string, string>, family: string): Map<number, string> {
  const hexes = new Map<number, string>();
  for (const step of PRIMITIVE_STEPS) {
    const value = tokenMap.get(`--instui-primitive-color-${family}-${family}${step}`);
    const parsed = value ? parseColorLiteral(value.trim()) : undefined;
    if (parsed && parsed.alpha >= 1) hexes.set(step, parsed.hex);
  }
  return hexes;
}

/**
 * The per-step lightness curve and chroma shape the `custom` scale is derived against, computed
 * from the 13 shipped families. JSON-safe, so a build can ship it to a browser that pairs it with
 * the dependency-free `@pantoken/plugin-custom-theme-colors/scale` entry.
 *
 * @param tokens - Optional token array or map to read the reference families from.
 * @returns The {@link ReferenceCurve}.
 */
export function customColorReferenceCurve(
  tokens?: readonly Token[] | Map<string, string>,
): ReferenceCurve {
  const tokenMap = toTokenMap(tokens);
  return buildReferenceCurve(
    COLOR_KEYS.map((family) => familyStepHexes(tokenMap, family)),
    PRIMITIVE_STEPS,
  );
}

/**
 * Derive the `custom` primitive scale from a brand hex. The input is anchored at the step whose
 * reference lightness (the mean OKLCH lightness of the 13 shipped families) is nearest its own,
 * then every step is rebuilt at its reference lightness with the input's hue — so the anchor step
 * lands close to, but not necessarily exactly on, the input.
 *
 * @param hex - A `#rgb`/`#rrggbb` brand color.
 * @param tokens - Optional token array or map to read the reference families from.
 * @returns The {@link CustomColorScale}.
 * @throws TypeError when `hex` isn't a valid hex color.
 */
export function deriveCustomColorScale(
  hex: string,
  tokens?: readonly Token[] | Map<string, string>,
): CustomColorScale {
  return deriveScale(hex, customColorReferenceCurve(tokens));
}

interface ScaleContext {
  tokenMap: Map<string, string>;
  preservedTokens: string[];
  preservedNames: Set<string>;
  primitiveHexIndex: Map<string, { family: string; step: number }>;
  getPreservedValue: (tokenName: string) => string;
}

function scaleContext(tokenMap: Map<string, string>): ScaleContext {
  const preservedTokens = [
    ...new Set([
      ...PRESERVED_BLUE_ACCENT_TOKENS,
      ...[...tokenMap.keys()].filter((name) => STATUS_INTENT_TOKEN.test(name)),
    ]),
  ];
  return {
    tokenMap,
    preservedTokens,
    preservedNames: new Set(preservedTokens),
    primitiveHexIndex: buildPrimitiveHexIndex(tokenMap),
    getPreservedValue(tokenName) {
      const raw = tokenMap.get(tokenName);
      if (!raw) return "";
      return raw.replace(/var\((--instui-primitive-color-blue-blue\d+)\)/g, (_m, prim) => {
        return tokenMap.get(prim) ?? _m;
      });
    },
  };
}

function scaleRule(
  ctx: ScaleContext,
  selector: string,
  scale: string,
  primitiveDecls: string[] = [],
): string {
  // Self-referencing var() (e.g. navy remapped to navy) is a guaranteed-invalid circular custom
  // property per the CSS spec, which computes as transparent — skip the no-op remap instead.
  const navyOverrides =
    scale === "navy"
      ? ""
      : PRIMITIVE_STEPS.map(
          (step) =>
            `  --instui-primitive-color-navy-navy${step}: var(--instui-primitive-color-${scale}-${scale}${step});`,
        ).join("\n");

  const blueOverrides =
    scale === "blue"
      ? ""
      : PRIMITIVE_STEPS.map(
          (step) =>
            `  --instui-primitive-color-blue-blue${step}: var(--instui-primitive-color-${scale}-${scale}${step});`,
        ).join("\n");

  const opacityOverride = `  --instui-primitive-color-navy-opacity10: color-mix(in srgb, var(--instui-primitive-color-${scale}-${scale}170) 10%, transparent);`;

  const preservedValues = ctx.preservedTokens
    .map((name) => {
      const val = ctx.getPreservedValue(name);
      return val ? `  ${name}: ${val};` : "";
    })
    .filter(Boolean)
    .join("\n");

  const relinkedValues = [...ctx.tokenMap.entries()]
    .map(([name, value]) => {
      if (ctx.preservedNames.has(name) || name.startsWith("--instui-primitive-color-")) return "";
      if (RELINK_EXCLUDED.test(name)) return "";
      const relinked = relinkLiteralColors(value, ctx.primitiveHexIndex, scale);
      return relinked ? `  ${name}: ${relinked};` : "";
    })
    .filter(Boolean)
    .join("\n");

  const primitives = primitiveDecls.length ? `${primitiveDecls.join("\n")}\n` : "";
  return `${selector}[data-pantoken-color="${scale}"] {\n${primitives}${navyOverrides}\n${blueOverrides}\n${opacityOverride}\n${preservedValues}\n${relinkedValues}\n}`;
}

/** Options for {@link customColorCss}. */
export interface CustomColorCssOptions {
  /** Optional token array or map for the reference families and relinked tokens. */
  tokens?: readonly Token[] | Map<string, string>;
  /** Selector prefix — see {@link CustomThemeColorsCssOptions.selector}. */
  selector?: string;
}

/**
 * Generate the `[data-pantoken-color="custom"]` rule for a brand hex: it declares the derived
 * `--instui-primitive-color-custom-custom*` steps and remaps the brand primitives onto them, exactly
 * like the shipped scales.
 *
 * @param hex - A `#rgb`/`#rrggbb` brand color.
 * @param options - {@link CustomColorCssOptions}.
 * @returns The CSS rule.
 * @throws TypeError when `hex` isn't a valid hex color.
 */
export function customColorCss(hex: string, options: CustomColorCssOptions = {}): string {
  const { selector = ":root" } = options;
  const tokenMap = toTokenMap(options.tokens);
  const scale = deriveCustomColorScale(hex, tokenMap);
  const primitiveDecls = [...scale.steps].map(
    ([step, value]) =>
      `  --instui-primitive-color-${CUSTOM_COLOR_KEY}-${CUSTOM_COLOR_KEY}${step}: ${value};`,
  );
  return scaleRule(scaleContext(tokenMap), selector, CUSTOM_COLOR_KEY, primitiveDecls);
}

/**
 * The `[data-pantoken-color="custom"]` remap rule without the derived primitives, for pages that
 * set `--instui-primitive-color-custom-custom*` themselves at runtime (e.g. from a color picker).
 *
 * @param options - {@link CustomColorCssOptions}.
 * @returns The CSS rule.
 */
export function customColorRemapCss(options: CustomColorCssOptions = {}): string {
  const { selector = ":root" } = options;
  return scaleRule(scaleContext(toTokenMap(options.tokens)), selector, CUSTOM_COLOR_KEY);
}

/**
 * Generate CSS rules for all custom theme color choices by remapping primitive color scale steps
 * (`--instui-primitive-color-navy-*` and `--instui-primitive-color-blue-*`) and relinking literal
 * brand hex values that upstream flattened away from those primitives, while preserving explicitly
 * named blue accents and semantic status intents.
 *
 * @param tokens - Optional token array or map for primitive step color lookups.
 * @param options - {@link CustomThemeColorsCssOptions}.
 * @returns Generated CSS rules string.
 */
export function customThemeColorsCss(
  tokens?: readonly Token[] | Map<string, string>,
  options: CustomThemeColorsCssOptions = {},
): string {
  const { selector = ":root", resetSelector, custom } = options;
  const tokenMap = toTokenMap(tokens);
  const ctx = scaleContext(tokenMap);
  const { preservedTokens, preservedNames, primitiveHexIndex, getPreservedValue } = ctx;

  const scaleRules = COLOR_KEYS.map((c) => scaleRule(ctx, selector, c));
  if (custom !== undefined) scaleRules.push(customColorCss(custom, { tokens: tokenMap, selector }));
  const rules = scaleRules.join("\n\n");

  if (!resetSelector) return rules;

  // Same property set the per-scale blocks above can touch, each pinned back to its own base value
  // (not a `var()` alias) so an ancestor's active `[data-pantoken-color]` scope can't reach in via
  // inheritance — `resetSelector`'s own declaration on the matched element wins outright.
  const resetEntries: [string, string | undefined][] = [
    ...PRIMITIVE_STEPS.map((step): [string, string | undefined] => [
      `--instui-primitive-color-navy-navy${step}`,
      tokenMap.get(`--instui-primitive-color-navy-navy${step}`),
    ]),
    ...PRIMITIVE_STEPS.map((step): [string, string | undefined] => [
      `--instui-primitive-color-blue-blue${step}`,
      tokenMap.get(`--instui-primitive-color-blue-blue${step}`),
    ]),
    [
      "--instui-primitive-color-navy-opacity10",
      tokenMap.get("--instui-primitive-color-navy-opacity10"),
    ],
    ...preservedTokens.map((name): [string, string | undefined] => [
      name,
      getPreservedValue(name) || undefined,
    ]),
    ...[...tokenMap.entries()]
      .filter(
        ([name, value]) =>
          !preservedNames.has(name) &&
          !name.startsWith("--instui-primitive-color-") &&
          !RELINK_EXCLUDED.test(name) &&
          relinkLiteralColors(value, primitiveHexIndex, RESET_SCALE) !== undefined,
      )
      .map(([name, value]): [string, string | undefined] => [name, value]),
  ];
  const resetDecls = resetEntries
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");

  return `${rules}\n\n${resetSelector} {\n${resetDecls}\n}`;
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
      append: customThemeColorsCss(options.tokens ?? ctx?.tokens, {
        selector: options.selector,
        resetSelector: options.resetSelector,
        custom: options.custom,
      }),
    }),
  });
}

export default customThemeColors;
