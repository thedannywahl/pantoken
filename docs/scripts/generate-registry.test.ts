import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { beforeAll, expect, test, vi } from "vite-plus/test";
import { buildRegistryCatalog, writeRegistry } from "./generate-registry.ts";

const outDir = resolve(import.meta.dirname, "../public/r");
const MODULE_PATH = new URL("./generate-registry.ts", import.meta.url).pathname;

beforeAll(() => {
  writeRegistry();
});

test("buildRegistryCatalog builds in-memory catalog conforming to shadcn schema", () => {
  const catalog = buildRegistryCatalog();
  expect(catalog.$schema).toBe("https://ui.shadcn.com/schema/registry.json");
  expect(catalog.name).toBe("pantoken");
  expect(catalog.homepage).toBe("https://pantoken.app");
  expect(catalog.items.length).toBeGreaterThan(0);
});

test("writeRegistry writes to custom outDir and sourceDir", () => {
  const customOut = mkdtempSync(join(tmpdir(), "registry-out-"));
  const customSource = mkdtempSync(join(tmpdir(), "registry-source-"));

  const { catalogPath, count } = writeRegistry({
    outDir: customOut,
    sourceDir: customSource,
  });

  expect(existsSync(catalogPath)).toBe(true);
  expect(existsSync(join(customSource, "registry.json"))).toBe(true);
  expect(count).toBeGreaterThan(0);
  expect(existsSync(join(customOut, "button.json"))).toBe(true);
});

test("direct CLI execution invokes writeRegistry", async () => {
  const savedArgv = process.argv;
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  try {
    vi.resetModules();
    process.argv = ["node", MODULE_PATH];
    await import("./generate-registry.ts");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("registry: wrote"));
  } finally {
    process.argv = savedArgv;
    logSpy.mockRestore();
  }
});

test("registry.json catalog is generated with valid structure", () => {
  const catalogPath = resolve(outDir, "registry.json");
  expect(existsSync(catalogPath)).toBe(true);

  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  expect(catalog.$schema).toBe("https://ui.shadcn.com/schema/registry.json");
  expect(catalog.name).toBe("pantoken");
  expect(catalog.homepage).toBe("https://pantoken.app");
  expect(Array.isArray(catalog.items)).toBe(true);
  expect(catalog.items.length).toBeGreaterThan(0);
});

test("theme-canvas item contains expected CSS variables and dependencies", () => {
  const themePath = resolve(outDir, "theme-canvas.json");
  expect(existsSync(themePath)).toBe(true);

  const theme = JSON.parse(readFileSync(themePath, "utf8"));
  expect(theme.name).toBe("theme-canvas");
  expect(theme.type).toBe("registry:theme");
  expect(theme.dependencies).toContain("@pantoken/css");
  expect(theme.dependencies).toContain("@pantoken/shadcn");
  expect(theme.cssVars?.light?.primary).toBe("var(--instui-color-background-brand)");
});

test("button component item contains React implementation file", () => {
  const buttonPath = resolve(outDir, "button.json");
  expect(existsSync(buttonPath)).toBe(true);

  const button = JSON.parse(readFileSync(buttonPath, "utf8"));
  expect(button.name).toBe("button");
  expect(button.type).toBe("registry:ui");
  expect(button.files?.[0]?.content).toContain("instui-button");
});

test("registry browser page exists at docs/r/index.md", () => {
  const pagePath = resolve(import.meta.dirname, "../r/index.md");
  expect(existsSync(pagePath)).toBe(true);
  const content = readFileSync(pagePath, "utf8");
  expect(content).toContain("<RegistryBrowser />");
});
