import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vite-plus/test";
import { isFontFile, localeFonts } from "./og-fonts.ts";

vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

const readMock = vi.mocked(readFileSync);

/** Bytes that are neither a TTF nor an OTF header. */
const NOT_A_FONT = new Uint8Array([0x3c, 0x21, 0x44, 0x4f, 0x43, 0x54, 0x59, 0x50, 0x45]);

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

describe("localeFonts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("discards a cached file that fails the font magic-byte check", async () => {
    readMock.mockReturnValue(Buffer.from(NOT_A_FONT));
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);

    const fonts = await localeFonts("ar", "Brand", ["brand.ttf"]);

    expect(fonts.localized).toBe(false);
  });

  test("discards a downloaded file that fails the font magic-byte check", async () => {
    readMock.mockImplementation(() => {
      throw new Error("ENOENT");
    });
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(NOT_A_FONT.buffer),
    } as Response);

    const fonts = await localeFonts("ar", "Brand", ["brand.ttf"]);

    expect(fonts.localized).toBe(false);
  });
});
