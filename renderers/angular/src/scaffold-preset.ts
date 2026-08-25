/**
 * Bingo Preset for scaffolding projects with `@pantoken/angular`.
 *
 * Combines the shared scaffold-base (name option, cssdoc block, wrapper context) with
 * Angular-specific presets and templates.
 *
 * @module
 */
import type { Preset } from "@pantoken/scaffold-base";
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Angular (standalone) projects with pantoken web components.
 *
 * Platform: `angular`
 */
export const presetAngular: Preset = createPreset({
  name: "angular",
  base: base,
  blocks: [],
});
