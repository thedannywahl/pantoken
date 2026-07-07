/**
 * `@pantoken/less` — Instructure design tokens as Less variables.
 *
 * {@link toLess} converts any IR; {@link less} is the ready-made `rebrand` variable set. A static
 * file is published at `@pantoken/less/tokens.less`.
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toLess } from "./to-less.ts";

export { toLess } from "./to-less.ts";
export type { Mode, ToLessOptions } from "./to-less.ts";

/**
 * The ready-made `rebrand` Less variable set.
 *
 * @example
 * ```ts
 * import { less } from "@pantoken/less";
 * import { writeFileSync } from "node:fs";
 *
 * writeFileSync("tokens.less", less);
 * ```
 */
export const less: string = toLess(tokens);

export default less;
