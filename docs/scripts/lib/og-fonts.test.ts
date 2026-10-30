import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vite-plus/test";
import { isFontFile, localeFonts } from "./og-fonts.ts";

vi.mock("node:fs", async (importOriginal) => ({
  ...(await importOriginal<typeof import("node:fs")>()),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

const realFs = await vi.importActual<typeof import("node:fs")>("node:fs");
const readMock = vi.mocked(readFileSync);
const NOT_A_FONT = Buffer.from("<!DOCTYPE html>");
const TTF_HEADER = Buffer.from([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

beforeEach(() => {
  vi.clearAllMocks();
  readMock.mockImplementation(realFs.readFileSync);
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("Font resolution must not access the network");
    }),
  );
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  expect(fetch).not.toHaveBeenCalled();
  expect(writeFileSync).not.toHaveBeenCalled();
  expect(mkdirSync).not.toHaveBeenCalled();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("isFontFile", () => {
  test("accepts TTF and OTF signatures", () => {
    expect(isFontFile(TTF_HEADER)).toBe(true);
    expect(isFontFile(Buffer.concat([Buffer.from("OTTO"), Buffer.alloc(8)]))).toBe(true);
  });

  test("rejects arbitrary data and truncated font headers", () => {
    expect(isFontFile(NOT_A_FONT)).toBe(false);
    expect(isFontFile(TTF_HEADER.subarray(0, 11))).toBe(false);
  });
});

describe("vendored locale fonts", () => {
  test.each([
    ["root", "sans", "Brand, Noto Sans"],
    ["ar", "arabic", "Noto Sans Arabic, Brand, Noto Sans"],
    ["he", "hebrew", "Noto Sans Hebrew, Brand, Noto Sans"],
    ["hi", "devanagari", "Noto Sans Devanagari, Brand, Noto Sans"],
    ["hy", "armenian", "Noto Sans Armenian, Brand, Noto Sans"],
    ["th", "thai", "Noto Sans Thai, Brand, Noto Sans"],
    ["ja", "japanese", "Noto Sans JP, Brand, Noto Sans"],
    ["ko", "korean", "Noto Sans KR, Brand, Noto Sans"],
    ["zh-Hans", "simplifiedChinese", "Noto Sans SC, Brand, Noto Sans"],
    ["zh-Hant", "traditionalChinese", "Noto Sans TC, Brand, Noto Sans"],
  ])("verifies the authentic %s font and its license", async (locale, key, family) => {
    const fonts = await localeFonts(locale, "Brand", ["brand.ttf"]);
    expect(fonts.localized).toBe(true);
    expect(fonts.family).toBe(family);
    expect(fonts.files.some((path) => path.endsWith(`/noto/${key}.ttf`))).toBe(true);
    if (locale !== "root") expect(fonts.files[0]).toMatch(new RegExp(`/noto/${key}\\.ttf$`, "u"));
    expect(console.warn).not.toHaveBeenCalled();
    const license = realFs.readFileSync(
      new URL(`../../assets/fonts/noto/licenses/${key}-OFL.txt`, import.meta.url),
      "utf8",
    );
    expect(license).toContain("Copyright");
    expect(license).toContain("SIL OPEN FONT LICENSE Version 1.1");
  });

  test.each(["el", "mi", "ru", "uk", "vi"])(
    "keeps the shared sans face first for %s",
    async (locale) => {
      const fonts = await localeFonts(locale, "Brand", ["brand.ttf"]);
      expect(fonts.files).toHaveLength(2);
      expect(fonts.files[0]).toMatch(/\/noto\/sans\.ttf$/u);
      expect(fonts.family).toBe("Noto Sans, Brand");
      expect(fonts.syntheticBold).toBe(true);
    },
  );

  test("preserves script layout flags and brand/fallback ordering", async () => {
    const japanese = await localeFonts("ja", "Brand", ["brand.ttf"]);
    expect(japanese).toMatchObject({
      ideographic: true,
      wrapByCharacter: true,
      syntheticBold: true,
      localized: true,
    });
    expect(japanese.files[1]).toBe("brand.ttf");
    expect(japanese.files[2]).toMatch(/\/noto\/sans\.ttf$/u);
    expect(await localeFonts("ko", "Brand", [])).toMatchObject({
      ideographic: true,
      wrapByCharacter: false,
      syntheticBold: true,
    });
    expect(await localeFonts("ar", "Brand", [])).toMatchObject({
      ideographic: false,
      wrapByCharacter: false,
      syntheticBold: false,
    });
    expect((await localeFonts("fa", "Brand", [])).files[0]).toMatch(/\/arabic\.ttf$/u);
  });

  test.each([
    ["invalid signature", NOT_A_FONT, "valid font file"],
    ["wrong digest", TTF_HEADER, "integrity check"],
  ])("warns and uses Latin fallback for %s", async (_case, bytes, message) => {
    readMock.mockReturnValue(bytes);
    const fonts = await localeFonts("ar", "Brand", ["brand.ttf"]);
    expect(fonts).toMatchObject({ files: ["brand.ttf"], family: "Brand", localized: false });
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  test("warns on missing fonts without writing or trying to download replacements", async () => {
    readMock.mockImplementation(() => {
      throw Object.assign(new Error("Missing font"), { code: "ENOENT" });
    });
    expect(await localeFonts("ar", "Brand", ["brand.ttf"])).toMatchObject({
      files: ["brand.ttf"],
      localized: false,
    });
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("missing vendored"));
    expect((await localeFonts("root", "Brand", ["brand.ttf"])).localized).toBe(true);
  });

  test("does not hide unexpected filesystem errors", async () => {
    readMock.mockImplementation(() => {
      throw Object.assign(new Error("Permission denied"), { code: "EACCES" });
    });
    await expect(localeFonts("ar", "Brand", [])).rejects.toThrow("Permission denied");
    expect(console.warn).not.toHaveBeenCalled();
  });

  test("retains a verified fallback when only the locale face is invalid", async () => {
    readMock.mockImplementation((...args: Parameters<typeof readFileSync>) =>
      String(args[0]).endsWith("/arabic.ttf") ? NOT_A_FONT : realFs.readFileSync(...args),
    );
    const fonts = await localeFonts("ar", "Brand", ["brand.ttf"]);
    expect(fonts.localized).toBe(false);
    expect(fonts.family).toBe("Brand, Noto Sans");
    expect(fonts.files[1]).toMatch(/\/noto\/sans\.ttf$/u);
  });
});
