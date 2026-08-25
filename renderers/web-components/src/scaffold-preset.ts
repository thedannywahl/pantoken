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
  about: { name: "web-components" },
  base,
  blocks: [],
} as const;
