/**
 * Bingo Preset for scaffolding projects with `@pantoken/svelte`.
 *
 * Combines the shared scaffold-base (name option, cssdoc block, wrapper context) with
 * Svelte-specific presets and templates.
 *
 * @module
 */
import type { Preset } from "@pantoken/scaffold-base";
import { base, createPreset } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding Svelte projects with pantoken web components.
 *
 * Platform: `svelte`
 */
export const presetSvelte: Preset = createPreset({
  name: "svelte",
  base: base,
  blocks: [],
});
