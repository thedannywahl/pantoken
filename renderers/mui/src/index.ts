/**
 * `@pantoken/mui` — theme MUI (Material UI) with Instructure tokens.
 *
 * {@link toMuiTheme} maps any IR onto MUI theme options; {@link lightTheme} and {@link darkTheme}
 * are the ready-made `rebrand` options. Pass them to MUI's `createTheme`.
 *
 * @example
 * ```tsx
 * import { createTheme, ThemeProvider } from "@mui/material/styles";
 * import { lightTheme } from "@pantoken/mui";
 * const theme = createTheme(lightTheme);
 * <ThemeProvider theme={theme}>...</ThemeProvider>;
 * ```
 *
 * @module
 * @experimental
 */
import { tokens } from "@pantoken/tokens";
import { toMuiTheme } from "./to-mui.ts";

export { toMuiTheme } from "./to-mui.ts";
export type { Mode, MuiPaletteColor, PantokenThemeOptions } from "./to-mui.ts";

/** Ready-made `rebrand` MUI options in light mode. */
export const lightTheme = toMuiTheme(tokens, "light");

/** Ready-made `rebrand` MUI options in dark mode. */
export const darkTheme = toMuiTheme(tokens, "dark");

export default lightTheme;
