/**
 * Builds theme.css/theme.js content for a chosen CDN provider. `@pantoken/cdn` never hardcodes a
 * package name — the default asset lists below are this package's choice of which pantoken
 * packages/files to load, and callers can override or extend them (e.g. to add another pantoken
 * package's CSS, like `@pantoken/wordpress`) via {@link BuildThemeOptions}.
 *
 * The comment prose baked into the output is a product string, not documentation for this module —
 * it comes from `src/i18n.json` (same pattern as `@pantoken/web-components`'s `src/i18n.json`),
 * with `BuildThemeOptions.strings` for a caller to supply translated text.
 *
 * @module
 */
import { buildFileUrls, type CdnBuildOptions, type CdnFile, type CdnProvider } from "@pantoken/cdn";
import englishBase from "./i18n.json" with { type: "json" };

/** The translatable strings baked into theme.css/theme.js's comments. */
export interface ThemeStrings {
  cssHeaderTitle: string;
  cssHeaderUpload: string;
  cssHeaderRequirement: string;
  cssDocsNote: string;
  jsHeaderTitle: string;
  jsHeaderUpload: string;
  jsHeaderRequirement: string;
  jsDocsNote: string;
  sectionComponentStyles: string;
  sectionFonts: string;
  sectionAdditional: string;
  additionalHintIntro: string;
  additionalHintExample: string;
  overridesCssNote1: string;
  overridesCssNote2: string;
  overridesJsNote1: string;
  overridesJsNote2: string;
}

/** English defaults, used for any key a caller's `strings` override doesn't supply. */
export const ENGLISH_THEME_STRINGS: ThemeStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, entry]) => [key, (entry as { message: string }).message]),
) as unknown as ThemeStrings;

/** A pantoken token theme variant. */
export type ThemeVariant = "rebrand" | "canvas" | "canvasHighContrast";
/** Rebrand token mode — ignored for the `canvas`/`canvasHighContrast` variants. */
export type ThemeMode = "adaptive" | "light";

/** The `@pantoken/css` lean token sheet for a given theme/mode pair. */
function tokenSheetFile(theme: ThemeVariant, mode: ThemeMode): CdnFile {
  const file =
    theme === "canvas"
      ? "style.canvas.lean.css"
      : theme === "canvasHighContrast"
        ? "style.canvas-high-contrast.lean.css"
        : mode === "light"
          ? "style.rebrand.light.lean.css"
          : "style.lean.css";
  return { package: "@pantoken/css", path: `dist/${file}` };
}

/** The component-style sheets for a given theme/mode pair (token sheet plus the constant set). */
export function defaultThemeCssAssets(
  theme: ThemeVariant = "rebrand",
  mode: ThemeMode = "light",
): CdnFile[] {
  return [
    tokenSheetFile(theme, mode),
    { package: "@pantoken/components", path: "dist/base.css" },
    { package: "@pantoken/components", path: "dist/component-icons.css" },
    { package: "@pantoken/components", path: "dist/components.css" },
    { package: "@pantoken/components", path: "dist/utilities.css" },
  ];
}

/** Component-style sheets, combined into theme.css's first `@import` where the provider allows it. */
export const DEFAULT_THEME_CSS_ASSETS: readonly CdnFile[] = defaultThemeCssAssets();

/** Font sheet(s) — always loaded as their own `@import`(s), separate from the component styles. */
export const DEFAULT_THEME_FONT_ASSETS: readonly CdnFile[] = [
  { package: "@pantoken/components", path: "dist/fonts.css" },
];

/** Script(s) theme.js injects via `<script>` tags. */
export const DEFAULT_THEME_JS_ASSETS: readonly CdnFile[] = [
  { package: "@pantoken/interactions", path: "dist/interactions.iife.js" },
];

/** Options for {@link buildTheme}/{@link buildThemeCss}/{@link buildThemeJs}. */
export interface BuildThemeOptions {
  /** The CDN provider to build URLs for. Defaults to jsDelivr when omitted. */
  provider?: string | CdnProvider;
  /** Pins the version for every asset below that doesn't specify its own `version`. */
  version?: CdnBuildOptions["version"];
  /** Token theme variant. Defaults to `"rebrand"`. Ignored when `css` is supplied. */
  theme?: ThemeVariant;
  /** Rebrand token mode. Defaults to `"light"`. Ignored outside the `rebrand` theme, or when `css` is supplied. */
  mode?: ThemeMode;
  /** Component-style sheets. Defaults to {@link defaultThemeCssAssets} for `theme`/`mode`. */
  css?: readonly CdnFile[];
  /** Font sheet(s). Defaults to {@link DEFAULT_THEME_FONT_ASSETS}. */
  fonts?: readonly CdnFile[];
  /** Script(s). Defaults to {@link DEFAULT_THEME_JS_ASSETS}. */
  js?: readonly CdnFile[];
  /** Translated comment strings. Defaults to {@link ENGLISH_THEME_STRINGS}. */
  strings?: Partial<ThemeStrings>;
}

/** Joins each file's built URL into its own `@import url(...);` line. */
function importLines(
  files: readonly CdnFile[],
  provider: BuildThemeOptions["provider"],
  options: CdnBuildOptions,
): string {
  return buildFileUrls([...files], provider, options)
    .map((url) => `@import url("${url}");`)
    .join("\n");
}

/** Emits one `document.createElement("script")` + `appendChild` block per file's built URL. */
function scriptTags(
  files: readonly CdnFile[],
  provider: BuildThemeOptions["provider"],
  options: CdnBuildOptions,
): string {
  return buildFileUrls([...files], provider, options)
    .map(
      (url) =>
        `  var script = document.createElement("script");\n` +
        `  script.src = "${url}";\n` +
        `  document.head.appendChild(script);`,
    )
    .join("\n");
}

/** Build theme.css content for the given provider/asset selection. */
export function buildThemeCss(options: BuildThemeOptions = {}): string {
  const { provider, version } = options;
  const buildOptions: CdnBuildOptions = { version };
  const css = options.css ?? defaultThemeCssAssets(options.theme, options.mode);
  const fonts = options.fonts ?? DEFAULT_THEME_FONT_ASSETS;
  const s: ThemeStrings = { ...ENGLISH_THEME_STRINGS, ...options.strings };
  return `/**
 * ${s.cssHeaderTitle}
 * ${s.cssHeaderUpload}
 * ${s.cssHeaderRequirement}
 * ${s.cssDocsNote}
 */

/* ${s.sectionComponentStyles} */
${importLines(css, provider, buildOptions)}
/* ${s.sectionFonts} */
${importLines(fonts, provider, buildOptions)}

/* ${s.sectionAdditional} */

/** ${s.additionalHintIntro}
 * ${s.additionalHintExample}
 * @import url("https://cdn.jsdelivr.net/combine/npm/@pantoken/components/dist/icons/backpack.css");
 */

/* ---------------------------------------------------------------------------------------------
 * ${s.overridesCssNote1}
 * ${s.overridesCssNote2}
 * ------------------------------------------------------------------------------------------- */
`;
}

/** Build theme.js content for the given provider/asset selection. */
export function buildThemeJs(options: BuildThemeOptions = {}): string {
  const { provider, version } = options;
  const js = options.js ?? DEFAULT_THEME_JS_ASSETS;
  const s: ThemeStrings = { ...ENGLISH_THEME_STRINGS, ...options.strings };
  return `/**
 * ${s.jsHeaderTitle}
 * ${s.jsHeaderUpload}
 * ${s.jsHeaderRequirement}
 * ${s.jsDocsNote}
 */
(function pantokenTheme() {
  "use strict";

${scriptTags(js, provider, { version })}
})();

/* ---------------------------------------------------------------------------------------------
 * ${s.overridesJsNote1}
 * ${s.overridesJsNote2}
 * ------------------------------------------------------------------------------------------- */
`;
}

/** Build both theme.css and theme.js for the given provider/asset selection. */
export function buildTheme(options: BuildThemeOptions = {}): { css: string; js: string } {
  return { css: buildThemeCss(options), js: buildThemeJs(options) };
}
