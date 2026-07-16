/**
 * `@pantoken/scss` — Instructure design tokens as SCSS variables.
 *
 * {@link toScss} converts any IR; {@link scss} is the ready-made `rebrand` variable set. A static
 * file is published at `@pantoken/scss/tokens.scss`.
 *
 * @module
 * @experimental
 */
import { tokens } from "@pantoken/tokens";
import { toScss } from "./to-scss.ts";

export { toScss } from "./to-scss.ts";
export type { Mode, ToScssOptions } from "./to-scss.ts";

/**
 * The ready-made `rebrand` SCSS variable set.
 *
 * @example
 * ```ts
 * import { scss } from "@pantoken/scss";
 * import { writeFileSync } from "node:fs";
 *
 * writeFileSync("tokens.scss", scss);
 * ```
 */
export const scss: string = toScss(tokens);

export default scss;
