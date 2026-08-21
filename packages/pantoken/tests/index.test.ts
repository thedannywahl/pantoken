import { expect, test } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as astroPkg from "@pantoken/astro";
import * as pantoken from "../src/index.ts";

test("the meta barrel namespace-exports every target", () => {
  const keys = Object.keys(pantoken);
  for (const key of ["tokens", "css", "icons", "astro", "rehype", "transition", "simpleIcons"]) {
    expect(keys).toContain(key);
  }
});

test("import { astro } from 'pantoken' exposes the standalone package API", () => {
  expect(typeof (pantoken as Record<string, { InstUI?: unknown }>).astro.InstUI).toBe("function");
  // pantoken/astro === @pantoken/astro
  expect((pantoken as Record<string, { InstUI?: unknown }>).astro.InstUI).toBe(astroPkg.InstUI);
});

test("import { tokens } from 'pantoken' exposes the IR", () => {
  const { tokens } = pantoken as Record<string, { tokens?: unknown[] }>;
  expect(Array.isArray(tokens.tokens)).toBe(true);
  expect((tokens.tokens ?? []).length).toBeGreaterThan(1000);
});

test("package exports include VS Code custom data subpaths", () => {
  const manifest = JSON.parse(
    readFileSync(join(import.meta.dirname, "..", "package.json"), "utf8"),
  ) as {
    exports?: Record<string, string>;
  };
  expect(manifest.exports?.["./html-custom-data.json"]).toBe("./dist/html-custom-data.json");
  expect(manifest.exports?.["./css-custom-data.json"]).toBe("./dist/css-custom-data.json");
});
