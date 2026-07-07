/**
 * Emit a Vanilla Forums "Foundation" theme `variables.json` from the pantoken IR.
 *
 * Vanilla's Foundation theme is configured by a nested JSON variables object (the asset served at
 * `PUT /themes/{id}/assets/variables.json`), not the get.foundation CSS framework. This maps
 * Instructure tokens onto the documented Foundation variable paths. Values are resolved to
 * concrete, single-mode colours (Vanilla compiles the theme server-side). Extend {@link
 * VANILLA_TO_INSTUI} with more paths from the theme-variable reference as needed.
 *
 * @module
 */
import type { Token } from "@pantoken/model";
import { resolveTokens } from "@pantoken/utils";

/** The colour mode to resolve when flattening `light-dark()` values. */
export type Mode = "light" | "dark";

/**
 * Dotted Foundation variable path → the Instructure token that fills it.
 *
 * @example Read a mapping, or widen coverage by spreading into a new map
 * ```ts
 * import { VANILLA_TO_INSTUI } from "@pantoken/vanilla";
 *
 * VANILLA_TO_INSTUI["global.mainColors.primary"]; // "--instui-color-background-brand"
 * const extended = { ...VANILLA_TO_INSTUI, "global.body.color": "--instui-color-text-base" };
 * ```
 */
export const VANILLA_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "global.mainColors.primary": "--instui-color-background-brand",
  "global.mainColors.secondary": "--instui-color-background-muted",
  "global.mainColors.bg": "--instui-color-background-base",
  "global.mainColors.fg": "--instui-color-text-base",
  "global.body.backgroundColor": "--instui-color-background-base",
  "global.links.color": "--instui-color-text-info",
  "global.border.color": "--instui-color-stroke-base",
  "global.messageColors.error.fg": "--instui-color-text-error",
  "global.messageColors.warning.fg": "--instui-color-text-warning",
  "titleBar.colors.bg": "--instui-color-background-brand",
  "titleBar.colors.fg": "--instui-color-text-on-color",
  "banner.colors.primary": "--instui-color-background-brand",
  "button.primary.colors.bg": "--instui-color-background-brand",
  "button.primary.colors.fg": "--instui-color-text-on-color",
});

function setPath(root: Record<string, unknown>, path: string, value: string): void {
  const keys = path.split(".");
  let node = root;
  for (const key of keys.slice(0, -1)) {
    node[key] ??= {};
    node = node[key] as Record<string, unknown>;
  }
  node[keys.at(-1) as string] = value;
}

/** Options for {@link toVanillaVariables}. */
export interface ToVanillaOptions {
  /** Which colour mode to resolve (default `"light"`). */
  mode?: Mode;
}

/**
 * Convert an IR token list into a Vanilla Foundation `variables.json` object.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToVanillaOptions}.
 * @returns The nested variables object to PUT to the theme's `variables.json` asset.
 *
 * @example Convert an IR to the nested variables object
 * ```ts
 * import { toVanillaVariables } from "@pantoken/vanilla";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const vars = toVanillaVariables(byTheme("rebrand"));
 * // { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
 * ```
 *
 * @example Dark mode
 * ```ts
 * import { toVanillaVariables } from "@pantoken/vanilla";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
 * ```
 */
export function toVanillaVariables(
  tokens: readonly Token[],
  options: ToVanillaOptions = {},
): Record<string, unknown> {
  const resolved = resolveTokens(tokens, { mode: options.mode ?? "light" });
  const byName = new Map(tokens.map((t) => [t.name, t]));
  const out: Record<string, unknown> = {};
  for (const [path, instui] of Object.entries(VANILLA_TO_INSTUI)) {
    if (!byName.has(instui)) continue;
    setPath(out, path, resolved.get(instui) ?? "");
  }
  return out;
}
