/**
 * `@pantoken/plugin-font-families` — the Instructure brand fonts as `@font-face` rules and
 * font-family tokens.
 *
 * It vendors **Atkinson Hyperlegible Next** — the typeface InstUI uses — from Instructure's UX
 * guidelines. The woff2 files ship in the package; `@pantoken/plugin-font-families/fonts.css` is a
 * ready stylesheet whose `@font-face` rules point at them, and it also defines a
 * `--instui-font-family-<id>` custom property per family.
 *
 * As a pantoken plugin, the `css` hook contributes those same `@font-face` rules (so a stylesheet
 * built with the plugin loads the fonts) plus the font-family declarations. Import the `fonts.css`
 * file for the common case; use the plugin when you assemble CSS through `toCss`.
 *
 * @module
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";
import { FONT_FILES, FONTS_CSS } from "../generated/embedded.ts";

/** A single shipped font face. */
export interface FontFile {
  /** Family id, e.g. `"atkinson-hyperlegible-next"`. */
  family: string;
  /** The woff2 filename. */
  filename: string;
  /** Path within `assets/fonts`, e.g. `"AtkinsonHyperlegibleNext/AtkinsonHyperlegibleNext-Bold.woff2"`. */
  path: string;
  /** CSS numeric `font-weight`. */
  cssWeight: number;
  /** `normal` or `italic`. */
  style: "italic" | "normal";
}

/** A font family: its id, CSS `font-family` name, and the faces that make it up. */
export interface FontFamily {
  /** Family id, e.g. `"atkinson-hyperlegible-next"` (used in `--instui-font-family-<id>`). */
  id: string;
  /** The CSS `font-family` name, e.g. `"Atkinson Hyperlegible Next"`. */
  cssName: string;
  /** The faces (weights and styles) available for this family. */
  faces: FontFile[];
}

/**
 * Every shipped font face, sorted by family, weight, then style.
 *
 * @example Find the bold, non-italic face of a family
 * ```ts
 * import { fontFiles } from "@pantoken/plugin-font-families";
 *
 * const bold = fontFiles.find(
 *   (f) => f.family === "atkinson-hyperlegible-next" && f.cssWeight === 700 && f.style === "normal",
 * );
 * ```
 */
export const fontFiles: readonly FontFile[] = FONT_FILES;

/** The CSS `font-family` name for each family id. */
const CSS_NAMES: Record<string, string> = {
  "atkinson-hyperlegible-next": "Atkinson Hyperlegible Next",
};

/**
 * The families available, each with its faces.
 *
 * @example List the shipped families and their CSS names
 * ```ts
 * import { fontFamilies } from "@pantoken/plugin-font-families";
 *
 * for (const family of fontFamilies) {
 *   console.log(family.id, "->", family.cssName, `(${family.faces.length} faces)`);
 * }
 * ```
 */
export const fontFamilies: readonly FontFamily[] = Object.values(
  FONT_FILES.reduce<Record<string, FontFamily>>((acc, face) => {
    (acc[face.family] ??= {
      id: face.family,
      cssName: CSS_NAMES[face.family] ?? face.family,
      faces: [],
    }).faces.push(face);
    return acc;
  }, {}),
);

/**
 * The ready-made `@font-face` + font-family stylesheet (the same text as `./fonts.css`).
 *
 * @example Inline the font stylesheet into a page
 * ```ts
 * import { fontsCss } from "@pantoken/plugin-font-families";
 *
 * document.head.insertAdjacentHTML("beforeend", `<style>${fontsCss}</style>`);
 * ```
 */
export const fontsCss: string = FONTS_CSS;

/** Options for the {@link fontFamiliesPlugin} plugin. */
export interface FontFamiliesOptions {
  /**
   * Where the `css` hook's rules land relative to the stylesheet: `"prepend"` (default) so the
   * `@font-face` rules come before the base, or `"append"`.
   */
  position?: "append" | "prepend";
}

/**
 * Create the font-families plugin.
 *
 * The `css` hook contributes the `@font-face` rules and the `--instui-font-family-*` declarations.
 * The `@font-face` `src` URLs are relative to the shipped `fonts.css`, so a consumer that serves the
 * package's `assets/fonts` alongside the stylesheet gets the font files; the simplest path is to
 * import `@pantoken/plugin-font-families/fonts.css` directly.
 *
 * @param options - {@link FontFamiliesOptions}.
 * @returns A {@link PantokenPlugin} with a `css` hook.
 *
 * @example Assemble CSS through toCss with the font faces included
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { fontFamiliesPlugin } from "@pantoken/plugin-font-families";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [fontFamiliesPlugin()] });
 * ```
 *
 * @example Append the faces after the base stylesheet instead of before it
 * ```ts
 * import { fontFamiliesPlugin } from "@pantoken/plugin-font-families";
 *
 * fontFamiliesPlugin({ position: "append" });
 * ```
 */
export function fontFamiliesPlugin(options: FontFamiliesOptions = {}): PantokenPlugin {
  const position = options.position ?? "prepend";
  const declarations = fontFamilies.map((family): [string, string] => [
    `--instui-font-family-${family.id}`,
    `"${family.cssName}"`,
  ]);
  return definePlugin({
    name: "@pantoken/plugin-font-families",
    css: () => ({
      marker: "pantoken:font-families",
      declarations,
      [position]: FONTS_CSS,
    }),
  });
}

export default fontFamiliesPlugin;
