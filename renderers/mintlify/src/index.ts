/**
 * `@pantoken/mintlify` — theme a Mintlify docs site with Instructure tokens.
 *
 * {@link toMintlifyConfig} maps any IR onto the `colors` + `background` keys of a Mintlify
 * `docs.json`; {@link docsJson} is the ready-made `rebrand` fragment. Merge it into your `docs.json`.
 *
 * @example
 * ```jsonc
 * // docs.json
 * {
 *   "name": "My docs",
 *   "theme": "mint",
 *   "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
 *   "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
 * }
 * ```
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toMintlifyConfig } from "./to-mintlify.ts";

export { toMintlifyConfig } from "./to-mintlify.ts";
export type { MintlifyColors, MintlifyBackground, MintlifyTheme } from "./to-mintlify.ts";

/** Ready-made `rebrand` Mintlify `docs.json` theming keys (colors + background). */
export const docsJson = toMintlifyConfig(tokens);

export default docsJson;
