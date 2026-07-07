/**
 * `@pantoken/wordpress` — Instructure design tokens as a WordPress block-theme `theme.json`.
 *
 * {@link toThemeJson} converts any IR; {@link themeJson} is the ready-made `rebrand` document. The
 * CLI can write it into a theme directory: `pantoken generate wordpress --out ./my-theme`.
 *
 * @module
 */
import themeJsonData from "../generated/theme.json" with { type: "json" };
import type { ThemeJson } from "./to-theme-json.ts";

export { toThemeJson } from "./to-theme-json.ts";
export type { Mode, ThemeJson, ToThemeJsonOptions } from "./to-theme-json.ts";

/**
 * The ready-made `rebrand` `theme.json`.
 *
 * @example Write it into a block theme
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { themeJson } from "@pantoken/wordpress";
 *
 * writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
 * ```
 */
export const themeJson: ThemeJson = themeJsonData as ThemeJson;

export default themeJson;
