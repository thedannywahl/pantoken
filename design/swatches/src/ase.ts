/**
 * Encode swatches as an Adobe Swatch Exchange (ASE) file — the palette format Photoshop,
 * Illustrator, and InDesign import. Binary layout (big-endian):
 *
 * ```
 * "ASEF"  u16 major=1  u16 minor=0  u32 blockCount
 * per colour block:
 *   u16 type=0x0001  u32 dataLength
 *   u16 nameLen(incl. NUL)  UTF-16BE name + NUL  "RGB "  f32 r,g,b (0–1)  u16 colorType=2
 * ```
 *
 * @module
 */
import { hexToRgb } from "./model.ts";
import type { Swatch } from "./model.ts";

/**
 * Encode swatches as ASE bytes. Non-hex swatches are skipped.
 *
 * @param swatches - The palette.
 * @returns The ASE file as bytes.
 *
 * @example Write an Adobe .ase palette
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { swatches, toAse } from "@pantoken/swatches";
 *
 * writeFileSync("instructure.ase", toAse(swatches));
 * ```
 */
export function toAse(swatches: readonly Swatch[]): Uint8Array {
  const entries = swatches
    .map((s) => ({ name: s.name, rgb: hexToRgb(s.hex) }))
    .filter((e): e is { name: string; rgb: NonNullable<ReturnType<typeof hexToRgb>> } =>
      Boolean(e.rgb),
    );

  const header = Buffer.alloc(12);
  header.write("ASEF", 0, "ascii");
  header.writeUInt16BE(1, 4);
  header.writeUInt16BE(0, 6);
  header.writeUInt32BE(entries.length, 8);

  const chunks: Buffer[] = [header];
  for (const { name, rgb } of entries) {
    const nameLen = name.length + 1; // includes the NUL terminator
    const nameBuf = Buffer.alloc(nameLen * 2); // UTF-16BE; trailing 2 bytes stay 0 (NUL)
    for (let i = 0; i < name.length; i++) nameBuf.writeUInt16BE(name.charCodeAt(i), i * 2);

    const color = Buffer.alloc(12);
    color.writeFloatBE(rgb.r / 255, 0);
    color.writeFloatBE(rgb.g / 255, 4);
    color.writeFloatBE(rgb.b / 255, 8);

    const nameLenBuf = Buffer.alloc(2);
    nameLenBuf.writeUInt16BE(nameLen, 0);
    const colorType = Buffer.alloc(2);
    colorType.writeUInt16BE(2, 0); // normal

    const data = Buffer.concat([
      nameLenBuf,
      nameBuf,
      Buffer.from("RGB ", "ascii"),
      color,
      colorType,
    ]);
    const blockHeader = Buffer.alloc(6);
    blockHeader.writeUInt16BE(0x0001, 0);
    blockHeader.writeUInt32BE(data.length, 2);
    chunks.push(blockHeader, data);
  }

  return new Uint8Array(Buffer.concat(chunks));
}
