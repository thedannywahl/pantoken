/**
 * `@pantoken/panda` — an Instructure design-token preset for Panda CSS.
 *
 * {@link toPandaPreset} converts any IR; {@link pantokenPreset} is the ready-made `rebrand` preset.
 * Spread it into your `panda.config.ts` `presets`, and the `_dark` condition tracks pantoken's
 * `light-dark()` tokens automatically.
 *
 * @example panda.config.ts
 * ```ts
 * import { defineConfig } from "@pandacss/dev";
 * import { pantokenPreset } from "@pantoken/panda";
 * export default defineConfig({ presets: [pantokenPreset] });
 * // then: css({ color: "token(colors.color-text-base)" })
 * ```
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toPandaPreset } from "./to-panda.ts";

export { toPandaPreset } from "./to-panda.ts";
export type { PandaCategory, PandaPreset, PandaSemanticToken, PandaToken } from "./to-panda.ts";

/**
 * The ready-made `rebrand` Panda preset.
 *
 * @example Spread it into panda.config.ts
 * ```ts
 * import { defineConfig } from "@pandacss/dev";
 * import { pantokenPreset } from "@pantoken/panda";
 *
 * export default defineConfig({ presets: [pantokenPreset] });
 * // then: css({ color: "token(colors.color-text-base)" })
 * ```
 */
export const pantokenPreset = toPandaPreset(tokens);

export default pantokenPreset;
