/**
 * Bingo Preset for scaffolding Vue projects with `@pantoken/vue`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Vue 3 projects with pantoken.
 *
 * Platform: `vue`
 */
export const presetVue = {
  about: { name: "vue" as const },
  base: base,
  blocks: [],
} as const;
