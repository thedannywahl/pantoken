import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";

const outDir = resolve(import.meta.dirname, "../public/r");

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
