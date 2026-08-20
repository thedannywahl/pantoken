import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { buildCssCustomData, buildHtmlCustomData, emitCustomData } from "./generate-custom-data.ts";

test("buildHtmlCustomData includes InstUI class and modifier tokens", { timeout: 15_000 }, () => {
  const htmlData = buildHtmlCustomData();
  const classAttribute = htmlData.globalAttributes.find((attribute) => attribute.name === "class");
  expect(classAttribute).toBeDefined();

  const values = classAttribute?.values ?? [];
  expect(values.length).toBeGreaterThan(150);
  expect(values.some((entry) => entry.name === "instui-button")).toBe(true);
  expect(values.some((entry) => entry.name === "instui-hidden-max-sm")).toBe(true);
  expect(values.some((entry) => entry.name.startsWith("-"))).toBe(true);
});

test("buildCssCustomData includes pantoken token custom properties", () => {
  const cssData = buildCssCustomData();
  expect(cssData.version).toBe(1.1);
  expect(cssData.properties.length).toBeGreaterThan(1000);
  expect(
    cssData.properties.some((property) => property.name === "--instui-color-background-brand"),
  ).toBe(true);
  expect(cssData.properties.every((property) => property.name.startsWith("--instui-"))).toBe(true);
});

test("emitCustomData writes html/css custom-data artifacts", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-custom-data-"));
  try {
    const { htmlPath, cssPath, classCount, propertyCount } = emitCustomData(dir);
    expect(classCount).toBeGreaterThan(150);
    expect(propertyCount).toBeGreaterThan(1000);

    const htmlData = JSON.parse(readFileSync(htmlPath, "utf8")) as {
      version: number;
      globalAttributes?: Array<{ name: string }>;
    };
    const cssData = JSON.parse(readFileSync(cssPath, "utf8")) as {
      version: number;
      properties?: Array<{ name: string }>;
    };

    expect(htmlData.version).toBe(1.1);
    expect(htmlData.globalAttributes?.some((attribute) => attribute.name === "class")).toBe(true);
    expect(cssData.version).toBe(1.1);
    expect(
      cssData.properties?.some((property) => property.name === "--instui-color-background-brand"),
    ).toBe(true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
