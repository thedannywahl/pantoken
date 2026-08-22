import { readdirSync } from "node:fs";
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
