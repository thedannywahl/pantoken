/**
 * `@pantoken/stylus` — Instructure design tokens as Stylus variables.
 *
 * {@link toStylus} converts any IR; {@link stylus} is the ready-made `rebrand` variable set. A static
 * file is published at `@pantoken/stylus/tokens.styl`.
 *
 * @module
 * @experimental
 */
import { tokens } from "@pantoken/tokens";
import { toStylus } from "./to-stylus.ts";

export { toStylus } from "./to-stylus.ts";
export type { Mode, ToStylusOptions } from "./to-stylus.ts";

/**
 * The ready-made `rebrand` Stylus variable set.
 *
 * @example
 * ```ts
 * import { stylus } from "@pantoken/stylus";
 * import { writeFileSync } from "node:fs";
 *
 * writeFileSync("tokens.styl", stylus);
 * ```
 */
export const stylus: string = toStylus(tokens);

export default stylus;
