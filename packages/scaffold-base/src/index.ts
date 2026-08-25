/**
 * `@pantoken/scaffold-base` — the shared `bingo-stratum` Base, cssdoc Block, and wrapper-layout
 * markup context every pantoken scaffold platform Preset (`@pantoken/react`, `@pantoken/next`,
 * `@pantoken/angular`, `@pantoken/web-components`, `@pantoken/components`) is built from. Composed
 * into a single Bingo template by `@pantoken/scaffold` — not meant to be used standalone.
 *
 * @module
 * @alpha
 */
export type { Preset } from "bingo-stratum";
export { base } from "./base.ts";
export { createPreset } from "./preset.ts";
export { blockCssdoc } from "./blocks/cssdoc.ts";
export {
  getWrapperContext,
  renderWrapperContainer,
  wrapperRootClassName,
} from "./wrapper-context.ts";
