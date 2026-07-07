/**
 * `@pantoken/css-in-js` — an Instructure theme object for runtime CSS-in-JS libraries.
 *
 * Works with any library that reads a theme from `props.theme` — Emotion, styled-components, and
 * Stitches all share that convention. {@link pantokenTheme} is the ready-made `rebrand` object,
 * var()-backed so light/dark switching flows through `@pantoken/css`. {@link toStyledTheme} builds
 * one from any IR (and can bake concrete values with `{ resolve }`).
 *
 * @example styled-components
 * ```tsx
 * import { ThemeProvider } from "styled-components";
 * import { pantokenTheme } from "@pantoken/css-in-js";
 * <ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
 * // const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
 * ```
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toStyledTheme } from "./to-theme.ts";

export { toStyledTheme, toThemeKey } from "./to-theme.ts";
export type { Mode, StyledTheme, ToStyledThemeOptions } from "./to-theme.ts";

/** The ready-made `rebrand` theme object (var()-backed). */
export const pantokenTheme: Record<string, string> = toStyledTheme(tokens);

export default pantokenTheme;
