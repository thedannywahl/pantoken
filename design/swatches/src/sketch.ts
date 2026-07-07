/**
 * Encode swatches as a Sketch `.sketchpalette` document (the Sketch Palettes plugin format). JSON
 * with colours as 0–1 RGBA.
 *
 * @module
 */
import { hexToRgb } from "./model.ts";
import type { Swatch } from "./model.ts";

/** A `.sketchpalette` document. */
export interface SketchPalette {
  compatibleVersion: string;
  pluginVersion: string;
  colors: { name: string; red: number; green: number; blue: number; alpha: number }[];
}

/**
 * Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).
 *
 * @param swatches - The palette.
 *
 * @example Write a Sketch .sketchpalette
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { swatches, toSketchPalette } from "@pantoken/swatches";
 *
 * writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
 * ```
 */
export function toSketchPalette(swatches: readonly Swatch[]): SketchPalette {
  const colors: SketchPalette["colors"] = [];
  for (const swatch of swatches) {
    const rgb = hexToRgb(swatch.hex);
    if (!rgb) continue;
    colors.push({
      name: swatch.name,
      red: rgb.r / 255,
      green: rgb.g / 255,
      blue: rgb.b / 255,
      alpha: 1,
    });
  }
  return { compatibleVersion: "2.0", pluginVersion: "2.22", colors };
}
