/**
 * Emit a WordPress block-theme `theme.json` from the pantoken IR: colour palette, spacing sizes,
 * and font families. Values are resolved to concrete, single-mode values (theme.json has no
 * light/dark expression). Icons are excluded.
 *
 * @module
 */
import type { Token } from "@pantoken/model";
import { resolveTokens } from "@pantoken/utils";

/** The colour mode to resolve when flattening `light-dark()` values. */
export type Mode = "light" | "dark";

function titleCase(slug: string): string {
  return slug.replace(/[-/]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** A WordPress `theme.json` document (the slice pantoken populates). */
export interface ThemeJson {
  $schema: string;
  version: number;
  settings: {
    color: { palette: { slug: string; name: string; color: string }[] };
    spacing: { spacingSizes: { slug: string; name: string; size: string }[] };
    typography: { fontFamilies: { slug: string; name: string; fontFamily: string }[] };
  };
}

/** Options for {@link toThemeJson}. */
export interface ToThemeJsonOptions {
  /** Which colour mode to resolve (default `"light"`). */
  mode?: Mode;
}

/**
 * Convert an IR token list into a WordPress `theme.json`.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToThemeJsonOptions}.
 * @returns A `theme.json` document.
 *
 * @example Convert an IR to a light-mode theme.json
 * ```ts
 * import { toThemeJson } from "@pantoken/wordpress";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const doc = toThemeJson(byTheme("rebrand"));
 * doc.settings.color.palette; // [{ slug, name, color }, …]
 * ```
 *
 * @example Dark mode
 * ```ts
 * import { toThemeJson } from "@pantoken/wordpress";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
 * ```
 */
export function toThemeJson(tokens: readonly Token[], options: ToThemeJsonOptions = {}): ThemeJson {
  const resolved = resolveTokens(tokens, { mode: options.mode ?? "light" });
  const value = (t: Token): string => resolved.get(t.name) ?? t.value;

  const palette: ThemeJson["settings"]["color"]["palette"] = [];
  const spacingSizes: ThemeJson["settings"]["spacing"]["spacingSizes"] = [];
  const fontFamilies: ThemeJson["settings"]["typography"]["fontFamilies"] = [];

  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    if (token.name.startsWith("--instui-color-")) {
      const slug = token.name.slice("--instui-color-".length);
      palette.push({ slug, name: titleCase(slug), color: value(token) });
    } else if (token.name.startsWith("--instui-spacing-")) {
      const slug = token.name.slice("--instui-spacing-".length);
      spacingSizes.push({ slug, name: titleCase(slug), size: value(token) });
    } else if (token.name.includes("font-family-")) {
      const slug = token.name.slice(token.name.indexOf("font-family-") + "font-family-".length);
      fontFamilies.push({ slug, name: titleCase(slug), fontFamily: value(token) });
    }
  }

  return {
    $schema: "https://schemas.wp.org/trunk/theme.json",
    version: 3,
    settings: {
      color: { palette },
      spacing: { spacingSizes },
      typography: { fontFamilies },
    },
  };
}
