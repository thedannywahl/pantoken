/**
 * `@pantoken/storybook` — a Storybook theme built from Instructure tokens.
 *
 * {@link pantokenStorybookTheme} returns a plain `ThemeVars`-shaped object (so `@storybook/theming`
 * stays an optional peer) with colours resolved concretely from the IR. Pass it to Storybook's
 * `manager`/`preview` theme.
 *
 * @module
 * @experimental
 */
import { resolveTokens } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";
import type { Mode } from "@pantoken/utils";

/** Storybook ThemeVars key → the Instructure token it draws from. */
const THEME_MAP: Readonly<Record<string, string>> = {
  colorPrimary: "--instui-color-background-brand",
  colorSecondary: "--instui-color-background-info",
  appBg: "--instui-color-background-base",
  appContentBg: "--instui-color-background-container",
  appBorderColor: "--instui-color-stroke-base",
  textColor: "--instui-color-text-base",
  textInverseColor: "--instui-color-text-inverse",
  barBg: "--instui-color-background-brand",
  barTextColor: "--instui-color-text-on-color",
  inputBg: "--instui-color-background-base",
  inputBorder: "--instui-color-stroke-base",
  inputTextColor: "--instui-color-text-base",
};

/** A Storybook theme object (a subset of `ThemeVars`). */
export type StorybookTheme = { base: Mode } & Record<string, string>;

/**
 * Build a Storybook theme from the Instructure tokens.
 *
 * @param mode - `"light"` or `"dark"` (default `"light"`).
 * @returns A `ThemeVars`-shaped object.
 *
 * @example
 * ```ts
 * // .storybook/manager.ts
 * import { addons } from "@storybook/manager-api";
 * import { pantokenStorybookTheme } from "@pantoken/storybook";
 *
 * addons.setConfig({ theme: pantokenStorybookTheme("dark") });
 * ```
 */
export function pantokenStorybookTheme(mode: Mode = "light"): StorybookTheme {
  const resolved = resolveTokens(tokens, { mode });
  const theme: StorybookTheme = { base: mode, brandTitle: "Instructure" };
  for (const [key, instui] of Object.entries(THEME_MAP)) {
    const value = resolved.get(instui);
    if (value) theme[key] = value;
  }
  return theme;
}

export default pantokenStorybookTheme;
