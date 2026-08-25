/**
 * Bingo Preset for scaffolding Web Components projects with `@pantoken/web-components`.
 *
 * @module
 */
import type { Preset } from "@pantoken/scaffold-base";
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Web Components projects with pantoken.
 *
 * Platform: `web-components`
 */
export const presetWebComponents: Preset = createPreset({
  name: "web-components",
  base: base,
  blocks: [],
});
