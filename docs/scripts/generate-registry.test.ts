import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
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
  writeFileSync(join(customOut, "stale.json"), "{}\n");

  const { catalogPath, count } = writeRegistry({
    outDir: customOut,
    sourceDir: customSource,
  });

  expect(existsSync(catalogPath)).toBe(true);
  expect(existsSync(join(customSource, "registry.json"))).toBe(true);
  expect(count).toBeGreaterThan(0);
  expect(existsSync(join(customOut, "button.json"))).toBe(true);
  expect(existsSync(join(customOut, "stale.json"))).toBe(false);

  const publicCatalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  const sourceCatalog = JSON.parse(readFileSync(join(customSource, "registry.json"), "utf8"));
  for (const item of sourceCatalog.items) {
    const publicItem = publicCatalog.items.find(
      (entry: { name: string }) => entry.name === item.name,
    );
    const manifest = JSON.parse(readFileSync(join(customOut, `${item.name}.json`), "utf8"));
    expect(manifest.files).toEqual(item.files);
    expect(publicItem).toEqual({
      ...item,
      ...(item.files && {
        files: item.files.map(({ content: _content, ...file }: { content?: string }) => file),
      }),
    });
    for (const file of publicItem.files ?? []) {
      expect(file).not.toHaveProperty("content");
    }
  }
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

test("theme-canvas item installs the Canvas token sheet and dependencies", () => {
  const themePath = resolve(outDir, "theme-canvas.json");
  expect(existsSync(themePath)).toBe(true);

  const theme = JSON.parse(readFileSync(themePath, "utf8"));
  expect(theme.name).toBe("theme-canvas");
  expect(theme.type).toBe("registry:theme");
  expect(theme.dependencies).toContain("@pantoken/css");
  expect(theme.dependencies).toContain("@pantoken/shadcn");
  expect(theme.css).toHaveProperty('@import "@pantoken/css/style.canvas.css"');
  expect(theme.cssVars).toBeUndefined();
});

test("button component item installs CSS without generating React source", () => {
  const buttonPath = resolve(outDir, "button.json");
  expect(existsSync(buttonPath)).toBe(true);

  const button = JSON.parse(readFileSync(buttonPath, "utf8"));
  expect(button.name).toBe("button");
  expect(button.type).toBe("registry:style");
  expect(button.dependencies).toContain("@pantoken/components");
  expect(button.registryDependencies).toContain("@pantoken/base");
  expect(button.css).toHaveProperty('@import "@pantoken/components/button.css"');
  expect(button.files).toBeUndefined();
});

test("registry emits no generated React components or hooks", () => {
  const catalog = buildRegistryCatalog();
  expect(catalog.items.some(({ type }) => type === "registry:hook")).toBe(false);
  expect(JSON.stringify(catalog)).not.toContain(".tsx");
  expect(catalog.items.some(({ name }) => name.startsWith("use-instui-"))).toBe(false);
});

test("compound member styles install with their owning component", () => {
  const modal = buildRegistryCatalog().items.find(({ name }) => name === "modal");
  expect(modal?.meta?.members).toEqual(["modal.header", "modal.body", "modal.footer"]);
  expect(modal?.css).toHaveProperty('@import "@pantoken/components/modal.header.css"');
});

test("base and themes install their required CSS in dependency order", () => {
  const catalog = buildRegistryCatalog();
  const base = catalog.items.find(({ name }) => name === "base");
  const canvas = catalog.items.find(({ name }) => name === "theme-canvas");
  const nextGen = catalog.items.find(({ name }) => name === "theme-rebrand");
  expect(base?.css).toHaveProperty('@import "@pantoken/css/style.css"');
  expect(base?.css).toHaveProperty('@import "@pantoken/shadcn/tailwind-v4.css"');
  expect(canvas?.registryDependencies).toContain("@pantoken/base");
  expect(canvas?.css).toHaveProperty('@import "@pantoken/css/style.canvas.css"');
  expect(nextGen?.title).toBe("Instructure Next gen Theme");
});

test("publishes applicable plugin CSS without build-tool plugins", () => {
  const catalog = buildRegistryCatalog();
  const card = catalog.items.find(({ name }) => name === "card");
  const hero = catalog.items.find(({ name }) => name === "hero");
  const logos = catalog.items.find(({ name }) => name === "logo-canvas");
  expect(card?.css).toHaveProperty('@import "@pantoken/plugin-custom-components/card.css"');
  expect(hero?.css).toHaveProperty('@import "@pantoken/plugin-layouts/hero.css"');
  expect(logos?.css).toHaveProperty('@import "@pantoken/plugin-logos/canvas.css"');
  expect(catalog.items.some(({ name }) => name === "vite")).toBe(false);
  expect(catalog.items.some(({ name }) => name === "tailwind")).toBe(false);
});

test("registry item names are unique", () => {
  const names = buildRegistryCatalog().items.map(({ name }) => name);
  expect(new Set(names).size).toBe(names.length);
});

test("registry browser page exists at docs/r/index.md", () => {
  const pagePath = resolve(import.meta.dirname, "../r/index.md");
  expect(existsSync(pagePath)).toBe(true);
  const content = readFileSync(pagePath, "utf8");
  expect(content).toContain("<RegistryBrowser />");
});
