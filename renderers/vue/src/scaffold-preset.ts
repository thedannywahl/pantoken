/**
 * Bingo Preset for scaffolding Vue projects with `@pantoken/vue`.
 *
 * @module
 */
import type { Preset } from "@pantoken/scaffold-base";
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Vue 3 projects with pantoken.
 *
 * Platform: `vue`
 */
export const presetVue: Preset = createPreset({
  name: "vue",
  base: base,
  blocks: [],
});
