import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vite-plus/test";
import { findCssIconNames, findCssNames } from "../scripts/css-components.ts";

const cssComponentsDir = resolve(import.meta.dirname, "../../../formats/components/src/components");
const cssNames = findCssNames(cssComponentsDir);
const cssIconNames = findCssIconNames(cssComponentsDir, cssNames);

describe("findCssNames", () => {
  test("discovers every per-record component directory, not just flat .ts files", () => {
    const dirNames = readdirSync(cssComponentsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((n) => n !== "select");
    expect([...cssNames].sort()).toEqual(dirNames.sort());
    // Guards the regression where a flat `.ts`-file scan matched nothing post-migration.
    expect(cssNames.size).toBeGreaterThan(40);
  });
});

describe("findCssIconNames", () => {
  test("flags known icon-using components", () => {
    expect(cssIconNames.has("checkbox")).toBe(true);
    expect(cssIconNames.has("close-button")).toBe(true);
    expect(cssIconNames.has("badge")).toBe(false);
  });
});

test("custom component behaviors map to plugin CSS and interaction bundles", () => {
  const manifest = JSON.parse(
    readFileSync(resolve(import.meta.dirname, "../component-capabilities.json"), "utf8"),
  ) as { components: { name: string; type: string; css: string; js: string }[] };
  const skeleton = manifest.components.find(({ name }) => name === "skeleton-loader");
  expect(skeleton).toEqual({
    name: "skeleton-loader",
    type: "both",
    css: "https://cdn.jsdelivr.net/npm/@pantoken/plugin-custom-components/dist/skeleton-loader.css",
    js: "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/skeleton-loader.iife.js",
  });
  expect(manifest.components.find(({ name }) => name === "segmented-control")).toEqual({
    name: "segmented-control",
    type: "both",
    css: "https://cdn.jsdelivr.net/npm/@pantoken/plugin-custom-components/dist/segmented-control.css",
    js: "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/segmented-control.iife.js",
  });
});
