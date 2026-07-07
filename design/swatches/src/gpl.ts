/**
 * Encode swatches as a GIMP palette (`.gpl`) — imported by GIMP, Inkscape, Krita, Blender, and
 * Aseprite. Plain text: a header, then `R G B name` lines (0–255).
 *
 * @module
 */
import { hexToRgb } from "./model.ts";
import type { Swatch } from "./model.ts";

/** Options for {@link toGpl}. */
export interface ToGplOptions {
  /** The palette name (default `"Instructure"`). */
  name?: string;
}

/**
 * Encode swatches as a GIMP `.gpl` palette string.
 *
 * @param swatches - The palette.
 * @param options - {@link ToGplOptions}.
 *
 * @example Write a GIMP .gpl palette
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { swatches, toGpl } from "@pantoken/swatches";
 *
 * writeFileSync("instructure.gpl", toGpl(swatches));
 * ```
 *
 * @example With a custom palette name
 * ```ts
 * import { swatches, toGpl } from "@pantoken/swatches";
 *
 * const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
 * ```
 */
export function toGpl(swatches: readonly Swatch[], options: ToGplOptions = {}): string {
  const lines = ["GIMP Palette", `Name: ${options.name ?? "Instructure"}`, "Columns: 0", "#"];
  for (const swatch of swatches) {
    const rgb = hexToRgb(swatch.hex);
    if (!rgb) continue;
    const col = (n: number): string => String(n).padStart(3, " ");
    lines.push(`${col(rgb.r)} ${col(rgb.g)} ${col(rgb.b)}\t${swatch.name}`);
  }
  return `${lines.join("\n")}\n`;
}
