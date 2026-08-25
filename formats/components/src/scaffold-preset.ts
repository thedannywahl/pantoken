/**
 * Bingo Preset for scaffolding projects with `@pantoken/components`.
 *
 * Combines the shared scaffold-base (name option, cssdoc block, wrapper context) with
 * components-specific presets and templates.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding component-only (HTML/CSS/JS) projects with pantoken components.
 *
 * Platform: `html`
 */
export const presetComponents = {
  about: { name: "components" as const },
  base: base,
  blocks: [],
} as const;
