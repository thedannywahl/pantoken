/**
 * Bingo Preset for scaffolding Web Components projects with `@pantoken/web-components`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Web Components projects with pantoken.
 *
 * Platform: `web-components`
 */
export const presetWebComponents = {
  about: { name: "web-components" as const },
  base,
  blocks: [],
} as const;
