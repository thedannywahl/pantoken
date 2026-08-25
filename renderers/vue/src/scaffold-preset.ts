/**
 * Bingo Preset for scaffolding Vue projects with `@pantoken/vue`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Vue 3 projects with pantoken components.
 *
 * Platform: `vue`
 */
export const presetVue = {
  name: "vue",
  baseId: "scaffold-base",
  bases: [base],
  blocks: [],
} as const;
