/**
 * Bingo Preset for scaffolding React projects with `@pantoken/react`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding React projects with pantoken.
 *
 * Platform: `react`
 */
export const presetReact = {
  about: { name: "react" as const },
  base: base,
  blocks: [],
} as const;
