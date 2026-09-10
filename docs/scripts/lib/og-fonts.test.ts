import { describe, expect, test } from "vite-plus/test";
import { isFontFile } from "./og-fonts.ts";

describe("isFontFile", () => {
  test("accepts valid TTF font headers", () => {
    const bytes = new Uint8Array([
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]);
    expect(isFontFile(bytes)).toBe(true);
  });

  test("rejects arbitrary network data before it is cached", () => {
    const bytes = new Uint8Array([0x3c, 0x21, 0x44, 0x4f, 0x43, 0x54, 0x59, 0x50, 0x45]);
    expect(isFontFile(bytes)).toBe(false);
  });
});
