/**
 * `@pantoken/swatches` — export Instructure colours as designer swatch palettes.
 *
 * Swatches are a flat reduction of the tokens to named colours, delivered *directly to a designer*
 * to import into their tool. This is not an interchange format (use `@pantoken/dtcg` or
 * `@pantoken/figma` for that) — it's a terminal palette file: Adobe ASE, GIMP `.gpl`, or Sketch
 * `.sketchpalette`.
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toSwatches } from "./model.ts";

export { toSwatches, hexToRgb } from "./model.ts";
export type { Mode, Rgb, Swatch } from "./model.ts";
export { toAse } from "./ase.ts";
export { toGpl } from "./gpl.ts";
export type { ToGplOptions } from "./gpl.ts";
export { toSketchPalette } from "./sketch.ts";
export type { SketchPalette } from "./sketch.ts";
export { toSvg } from "./svg.ts";
export type { ToSvgOptions } from "./svg.ts";

/**
 * The `rebrand` colour swatches (the default palette).
 *
 * @example Encode the ready-made palette to any format
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { swatches, toAse, toGpl } from "@pantoken/swatches";
 *
 * writeFileSync("instructure.ase", toAse(swatches));
 * writeFileSync("instructure.gpl", toGpl(swatches));
 * ```
 */
export const swatches = toSwatches(tokens);
