/**
 * Tests for the `@pantoken/plugin-logos` build-time generator (`scripts/generate.ts`).
 *
 * The generator reads SVG files from `assets/logos/<product>/<layout>-<mode>.svg` and writes
 * `generated/logos.css` (image tokens + `@property` registrations) and `generated/embedded.ts`
 * (the TS module that the runtime plugin imports). All filesystem I/O is mocked so this suite runs
 * without touching disk and each test reimports the module in a clean state.
 *
 * @module
 */
import { afterEach, beforeEach, describe, expect, test, vi } from "vite-plus/test";

// ─── filesystem mock ──────────────────────────────────────────────────────────
// Must be hoisted before the dynamic import below so the module never reaches
// the real filesystem when it runs its top-level side effects on import.

const readFileSync = vi.fn<(...args: unknown[]) => string>();
const writeFileSync = vi.fn();
const mkdirSync = vi.fn();
const readdirSync = vi.fn<(...args: unknown[]) => string[]>();

vi.mock("node:fs", () => ({ readFileSync, writeFileSync, mkdirSync, readdirSync }));

// ─── module scaffolding ───────────────────────────────────────────────────────

const MODULE_PATH = new URL("./generate.ts", import.meta.url).pathname;

type Generate = typeof import("./generate.ts");
let mod: Generate;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();
  // Default: every `readdirSync` call throws ENOENT so all products are skipped (safe no-op).
  readdirSync.mockImplementation(() => {
    throw new Error("ENOENT");
  });
  vi.spyOn(console, "log").mockImplementation(() => {});
  mod = await import(MODULE_PATH);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── constants ────────────────────────────────────────────────────────────────

describe("PRODUCTS", () => {
  test("contains exactly the six supported products", () => {
    expect(mod.PRODUCTS).toEqual([
      "canvas",
      "igniteai",
      "instructure",
      "learnplatform",
      "mastery",
      "parchment",
    ]);
  });
});

describe("LAYOUTS", () => {
  test("lists multi-word layouts before `icon` so longest match wins", () => {
    const iconIndex = mod.LAYOUTS.indexOf("icon");
    expect(mod.LAYOUTS.indexOf("icon-single-dot")).toBeLessThan(iconIndex);
    expect(mod.LAYOUTS.indexOf("icon-three-dot")).toBeLessThan(iconIndex);
  });
});

describe("COLOR_MODES", () => {
  test("includes current-color for adaptive monochrome variants", () => {
    expect(mod.COLOR_MODES).toContain("current-color");
  });

  test("includes all standard brand modes", () => {
    for (const mode of ["color", "dark", "light", "reversed", "full-color"]) {
      expect(mod.COLOR_MODES).toContain(mode);
    }
  });
});

// ─── parseStem ────────────────────────────────────────────────────────────────

describe("parseStem", () => {
  test("parses simple layout-mode stems", () => {
    expect(mod.parseStem("horizontal-color")).toEqual({ layout: "horizontal", colorMode: "color" });
    expect(mod.parseStem("horizontal-dark")).toEqual({ layout: "horizontal", colorMode: "dark" });
    expect(mod.parseStem("stacked-full-color")).toEqual({
      layout: "stacked",
      colorMode: "full-color",
    });
    expect(mod.parseStem("icon-reversed")).toEqual({ layout: "icon", colorMode: "reversed" });
  });

  test("parses compound color modes", () => {
    expect(mod.parseStem("horizontal-full-color-reversed")).toEqual({
      layout: "horizontal",
      colorMode: "full-color-reversed",
    });
    expect(mod.parseStem("stacked-full-color-bg")).toEqual({
      layout: "stacked",
      colorMode: "full-color-bg",
    });
    expect(mod.parseStem("icon-reversed-bg")).toEqual({
      layout: "icon",
      colorMode: "reversed-bg",
    });
  });

  test("parses the current-color adaptive mode", () => {
    expect(mod.parseStem("icon-current-color")).toEqual({
      layout: "icon",
      colorMode: "current-color",
    });
    expect(mod.parseStem("horizontal-current-color")).toEqual({
      layout: "horizontal",
      colorMode: "current-color",
    });
  });

  test("icon-single-dot and icon-three-dot win over bare icon", () => {
    expect(mod.parseStem("icon-single-dot-color")).toEqual({
      layout: "icon-single-dot",
      colorMode: "color",
    });
    expect(mod.parseStem("icon-three-dot-dark")).toEqual({
      layout: "icon-three-dot",
      colorMode: "dark",
    });
  });

  test("returns undefined for an unrecognised layout", () => {
    expect(mod.parseStem("banner-color")).toBeUndefined();
    expect(mod.parseStem("wordmark-dark")).toBeUndefined();
  });

  test("returns undefined for an unrecognised color mode", () => {
    expect(mod.parseStem("icon-vivid")).toBeUndefined();
    expect(mod.parseStem("horizontal-adaptive")).toBeUndefined();
  });

  test("returns undefined for a bare layout name with no mode suffix", () => {
    expect(mod.parseStem("horizontal")).toBeUndefined();
    expect(mod.parseStem("icon")).toBeUndefined();
  });

  test("returns undefined for an empty string", () => {
    expect(mod.parseStem("")).toBeUndefined();
  });
});

// ─── dataUri ─────────────────────────────────────────────────────────────────

describe("dataUri", () => {
  test("produces a data:image/svg+xml;base64 URI", () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"/>';
    expect(mod.dataUri(svg)).toMatch(/^data:image\/svg\+xml;base64,/u);
  });

  test("round-trips: decoding the URI recovers the original SVG", () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 79"><path fill="#fff"/></svg>';
    const uri = mod.dataUri(svg);
    const b64 = uri.replace("data:image/svg+xml;base64,", "");
    expect(Buffer.from(b64, "base64").toString("utf8")).toBe(svg);
  });

  test("encodes SVGs with currentColor without loss", () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle r="10"/></svg>';
    const uri = mod.dataUri(svg);
    const decoded = Buffer.from(uri.replace("data:image/svg+xml;base64,", ""), "base64").toString(
      "utf8",
    );
    expect(decoded).toBe(svg);
  });
});

// ─── output generation ───────────────────────────────────────────────────────

/** Extract the content argument of the `writeFileSync` call whose path ends with `suffix`. */
function writtenContent(suffix: string): string {
  const call = writeFileSync.mock.calls.find(([p]) => String(p).endsWith(suffix));
  return call ? String(call[1]) : "";
}

describe("generated logos.css", () => {
  test("writes a file with the generated-file header and :root block", () => {
    expect(writtenContent("logos.css")).toContain("/* Instructure product logos as image tokens");
    expect(writtenContent("logos.css")).toContain(":root {");
  });

  test("emits --instui-logo-* tokens for each discovered logo", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/canvas")) return ["horizontal-color.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 79"/>');
    await import(MODULE_PATH);

    const css = writtenContent("logos.css");
    expect(css).toContain("--instui-logo-canvas-horizontal-color:");
    expect(css).toContain('url("data:image/svg+xml;base64,');
  });

  test("emits @property registrations for typed token docs", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/mastery")) return ["horizontal-dark.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    const css = writtenContent("logos.css");
    expect(css).toContain("@property --instui-logo-mastery-horizontal-dark");
    expect(css).toContain('syntax: "<url>"');
    expect(css).toContain("inherits: true");
  });

  test("emits the cssdoc @declaration block", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/parchment")) return ["icon-current-color.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"/>');
    await import(MODULE_PATH);

    const css = writtenContent("logos.css");
    expect(css).toContain("@declaration logos");
    expect(css).toContain("--instui-logo-parchment-icon-current-color");
  });
});

describe("generated embedded.ts", () => {
  test("writes the generated-file header comment", () => {
    expect(writtenContent("embedded.ts")).toContain("// GENERATED by scripts/generate.ts");
  });

  test("exports LOGOS, LOGO_SVGS, and LOGOS_CSS", () => {
    const ts = writtenContent("embedded.ts");
    expect(ts).toContain("export const LOGOS");
    expect(ts).toContain("export const LOGO_SVGS");
    expect(ts).toContain("export const LOGOS_CSS");
  });

  test("logos are sorted alphabetically by name", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/canvas")) return ["stacked-color.svg", "horizontal-color.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    const ts = writtenContent("embedded.ts");
    const hIdx = ts.indexOf("canvas-horizontal-color");
    const sIdx = ts.indexOf("canvas-stacked-color");
    expect(hIdx).toBeLessThan(sIdx);
  });
});

describe("generated per-product and per-logo sheets", () => {
  test("writes a doc-free per-product sheet with every logo for that product", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/canvas")) return ["horizontal-color.svg", "stacked-dark.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    const css = writtenContent("/canvas.css");
    expect(css).toContain(":root {");
    expect(css).toContain("--instui-logo-canvas-horizontal-color:");
    expect(css).toContain("--instui-logo-canvas-stacked-dark:");
    expect(css).not.toContain("@declaration");
  });

  test("writes a doc-free single-logo sheet with only that logo's token", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/mastery")) return ["horizontal-dark.svg", "icon-color.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    const css = writtenContent("/mastery-horizontal-dark.css");
    expect(css).toContain("--instui-logo-mastery-horizontal-dark:");
    expect(css).toContain("@property --instui-logo-mastery-horizontal-dark");
    expect(css).not.toContain("--instui-logo-mastery-icon-color");
  });

  test("skips a product with no discovered logos", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/canvas")) return ["horizontal-color.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    expect(writeFileSync.mock.calls.some(([p]) => String(p).endsWith("/mastery.css"))).toBe(false);
  });
});

describe("console output", () => {
  test("logs the logo count and product count", async () => {
    vi.resetModules();
    vi.clearAllMocks();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    readdirSync.mockImplementation((dir: unknown) => {
      if (String(dir).endsWith("/canvas")) return ["horizontal-color.svg"];
      if (String(dir).endsWith("/mastery")) return ["icon-dark.svg"];
      throw new Error("ENOENT");
    });
    readFileSync.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"/>');
    await import(MODULE_PATH);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("2 logos across 2 products"));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("2 per-logo and 2 per-product sheets"),
    );
  });
});
