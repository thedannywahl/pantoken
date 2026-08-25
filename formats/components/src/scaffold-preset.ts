/**
 * Bingo Preset for scaffolding projects with `@pantoken/components`.
 *
 * Combines the shared scaffold-base (name option, cssdoc block, wrapper context) with
 * components-specific presets and templates.
 *
 * @module
 */
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding component-only (HTML/CSS/JS) projects with pantoken components.
 *
 * Platform: `html`
 */
export const presetComponents = createPreset({
  name: "components",
  base: base,
  blocks: [],
});
