/**
 * The glyph-token half of the icon system: one `.<prefix>-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token. Bespoke (no cssdoc record, not in
 * the UTILITIES registry) and shipped as its own large `icons.css`. The painter half — the shared
 * `::before` that masks the glyph — is the documented `icon` utility.
 *
 * @module
 */
import { ns, type ComponentOptions } from "../lib/helpers.ts";

/** Options for {@link iconGlyphsCss}. */
export interface IconGlyphsOptions extends ComponentOptions {
  /**
   * Also emit the deprecated InstUI-prop glyph aliases (`-render-icon-<name>`, `-render-custom-icon-<name>`)
   * as functional aliases of `-icon-<name>`. Off by default — turning it on roughly doubles the sheet, so
   * enable it only when you need markup written against the old `renderIcon`/`renderCustomIcon` prop names
   * to keep rendering. The shipped `icons.css` is built with this on.
   */
  deprecatedAliases?: boolean;
}

/**
 * Build the icon-glyph stylesheet: one `.<prefix>-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token. Kept out of the component bundle
 * (it's large); ships as its own `icons.css`. Pass the icon names (e.g. from `@pantoken/icons`).
 *
 * @param names - Icon names without the `--instui-icon-` prefix (e.g. `["megaphone", "check"]`).
 * @param options - {@link IconGlyphsOptions} (adds `deprecatedAliases` to {@link ComponentOptions}).
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
  const p = ns(prefix);
  void p; // glyph classes are prefix-independent modifiers (.-icon-<name>); consumed by any host.
  // The deprecated InstUI prop names that normalized to `-icon-<name>` (Pill's `renderIcon`, Alert's
  // `renderCustomIcon`). When `deprecatedAliases` is on, they're grouped onto the same rule as
  // FUNCTIONAL aliases (they set the same glyph var, and both contain the `-icon-` substring so the
  // shared painter + Alert's glyph pipe already fire) — otherwise omitted, which roughly halves the
  // sheet. They're `@deprecated` in each component's doc comment either way.
  const prefixes = options.deprecatedAliases
    ? ["-icon", "-render-icon", "-render-custom-icon"]
    : ["-icon"];
  const selectors = (name: string): string => prefixes.map((pre) => `.${pre}-${name}`).join(", ");
  const rules = names
    .map((name) => `${selectors(name)} { --pantoken-glyph: var(--instui-icon-${name}); }`)
    .join("\n");
  return `/* InstUI icon glyphs (@pantoken/components) — prefix: ${prefix} */\n${rules}\n`;
}
