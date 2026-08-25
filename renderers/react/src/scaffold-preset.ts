/**
 * Bingo Preset for scaffolding React projects with `@pantoken/react`.
 *
 * @module
 */
import type { Preset } from "@pantoken/scaffold-base";
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding React projects with pantoken.
 *
 * Platform: `react`
 */
export const presetReact: Preset = createPreset({
  name: "react",
  base: base,
  blocks: [],
});
