/**
 * `@pantoken/canvas-theme-editor` — upload-ready `theme.css`/`theme.js` for Canvas LMS's Theme
 * Editor, pre-wired to pantoken's CDN-hosted CSS. Consumed by `@pantoken/scaffold`'s
 * `canvas-theme-editor` platform; also usable standalone.
 *
 * `THEME_CSS`/`THEME_JS` are the jsDelivr-default, unpinned output — use {@link buildTheme} to
 * target a different CDN provider, pin a version, or swap in other pantoken/third-party assets.
 *
 * @module
 * @alpha
 */
export { THEME_CSS, THEME_JS } from "../generated/theme.ts";
export {
  buildTheme,
  buildThemeCss,
  buildThemeJs,
  DEFAULT_THEME_CSS_ASSETS,
  DEFAULT_THEME_FONT_ASSETS,
  DEFAULT_THEME_JS_ASSETS,
  defaultThemeCssAssets,
  ENGLISH_THEME_STRINGS,
  type BuildThemeOptions,
  type ThemeMode,
  type ThemeStrings,
  type ThemeVariant,
} from "./build-theme.ts";
export {
  CDN_PROVIDERS,
  DEFAULT_CDN_PROVIDER_ID,
  type CdnFile,
  type CdnProvider,
} from "@pantoken/cdn";
