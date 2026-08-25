/**
 * The shared `bingo-stratum` {@link https://www.create.bingo/engines/stratum/concepts/bases Base}
 * every pantoken scaffold Preset (one per platform: html, react, next, angular, web-components) is
 * built from — its options schema is what makes those Presets composable into a single
 * `--preset`-driven Bingo template in `@pantoken/scaffold`.
 *
 * @module
 * @alpha
 */
import { createBase } from "bingo-stratum";
import { z } from "zod";

/** Shared options every pantoken scaffold platform Preset takes in. */
export const base = createBase({
  options: {
    name: z.string().default("pantoken-app").describe("Name of the scaffolded project"),
  },
});
