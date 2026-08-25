/**
 * The shared `bingo-stratum` {@link https://www.create.bingo/engines/stratum/concepts/bases | Base}
 * every pantoken scaffold Preset (one per platform: html, react, next, angular, web-components) is
 * built from — its options schema is what makes those Presets composable into a single
 * `--preset`-driven Bingo template in `@pantoken/scaffold`.
 *
 * @module
 * @alpha
 */
import type { Base } from "bingo-stratum";
import { createBase } from "bingo-stratum";
import { z } from "zod";

const options: { name: z.ZodDefault<z.ZodString> } = {
  name: z.string().default("pantoken-app").describe("Name of the scaffolded project"),
};

/** Shared options every pantoken scaffold platform Preset takes in. */
export const base: Base<typeof options> = createBase({ options });
