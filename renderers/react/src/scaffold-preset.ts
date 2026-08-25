/**
 * Bingo Preset for scaffolding React projects with `@pantoken/react`.
 *
 * @module
 */
import { base } from "@pantoken/scaffold-base";

/**
 * Preset for scaffolding React projects with pantoken components.
 *
 * Platform: `react`
 */
export const presetReact = {
  name: "react",
  baseId: "scaffold-base",
  bases: [base],
  blocks: [],
} as const;
