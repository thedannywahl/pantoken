/**
 * The glyph-token half of the icon system: one `.-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token, optionally declaring those token
 * values too. Bespoke (no cssdoc record, not in the UTILITIES registry) and shipped as its own large
 * `icons.css`. The painter half — the shared `::before` that masks the glyph — is the documented
 * `icon` utility.
 *
 * @module
 */
import type { ComponentOptions } from "../../lib/helpers.ts";

/** Options for {@link iconGlyphsCss}. */
export interface IconGlyphsOptions extends ComponentOptions {
  /**
   * Icon name → `--instui-icon-<name>` data-URI value. When given, the sheet also declares those
   * custom properties in `:root`, making it self-contained: the glyphs paint without a separate
   * token sheet loaded alongside. Omit to emit the lean mapping-only sheet.
   */
  values?: Readonly<Record<string, string>>;
}

/**
 * Build the icon-glyph stylesheet: one `.-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token. Kept out of the component bundle
 * (it's large); ships as its own `icons.css`. Pass the icon names (e.g. from `@pantoken/icons`).
 *
 * @param names - Icon names without the `--instui-icon-` prefix (e.g. `["megaphone", "check"]`).
 * @param options - {@link IconGlyphsOptions} for optional icon token values and a prefix.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { iconGlyphsCss } from "@pantoken/components";
 * import { icons } from "@pantoken/icons";
 *
 * const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
 * ```
 *
 * This is the glyph-token half of the icon system (the `.-icon-<name>` modifiers, shipped as
 * `icons.css`); the `icon` utility is the painter half (the shared `::before`). They share the `icon`
 * demo.
 */
export function iconGlyphsCss(names: readonly string[], options: IconGlyphsOptions = {}): string {
  const prefix = options.prefix || "";
  const rules = names
    .map((name) => `.-icon-${name} { --pantoken-glyph: var(--instui-icon-${name}); }`)
    .join("\n");
  const header = `/* InstUI icon glyphs (@pantoken/components) — prefix: ${prefix} */\n`;
  if (!options.values) return `${header}${rules}\n`;
  const tokens = names
    .map((name) => {
      const value = options.values?.[name];
      if (value === undefined)
        throw new Error(`iconGlyphsCss: no value supplied for icon "${name}"`);
      return `  --instui-icon-${name}: ${value};`;
    })
    .join("\n");
  return `${header}:root {\n${tokens}\n}\n${rules}\n`;
}
