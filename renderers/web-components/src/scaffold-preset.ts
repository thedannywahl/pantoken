/**
 * Bingo Preset for scaffolding Web Components projects with `@pantoken/web-components`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Web Components projects with pantoken custom elements.
 *
 * Platform: `web-components`
 */
export const presetWebComponents = {
  name: "web-components",
  baseId: "scaffold-base",
  bases: [base],
  blocks: [],
} as const;
