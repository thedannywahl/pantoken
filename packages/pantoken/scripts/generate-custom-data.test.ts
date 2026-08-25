import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import {
  buildCssCustomData,
  buildCssDocModel,
  buildHtmlCustomData,
  emitCustomData,
} from "./generate-custom-data.ts";

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

test("buildCssDocModel includes documented component entries", () => {
  const model = buildCssDocModel();
  expect(model.length).toBeGreaterThan(30);
  expect(model.some((entry) => entry.name === "button")).toBe(true);
  expect(model.some((entry) => entry.className === ".instui-button")).toBe(true);
});

test("buildCssDocModel includes @global utility entries (spacing, gap, layout, etc.)", () => {
  // Downstream consumers resolve `@global` modifiers (e.g. `--p-lg`) chained onto a component through
  // this published model as a cssdoc `providers` entry — without utilities in the model, every one of
  // those classes reads as an unknown-modifier false positive.
  const model = buildCssDocModel();
  const spacing = model.find((entry) => entry.name === "spacing");
  expect(spacing).toBeDefined();
  expect(spacing?.global).toBe(true);
  expect(spacing?.modifiers.some((m) => m.name === "--m*")).toBe(true);
});

test("emitCustomData writes html/css custom-data artifacts", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-custom-data-"));
  try {
    const { htmlPath, cssPath, modelPath, classCount, propertyCount, entryCount } =
      emitCustomData(dir);
    expect(classCount).toBeGreaterThan(150);
    expect(propertyCount).toBeGreaterThan(1000);
    expect(entryCount).toBeGreaterThan(30);

    const htmlData = JSON.parse(readFileSync(htmlPath, "utf8")) as {
      version: number;
      globalAttributes?: Array<{ name: string }>;
    };
    const cssData = JSON.parse(readFileSync(cssPath, "utf8")) as {
      version: number;
      properties?: Array<{ name: string }>;
    };
    const model = JSON.parse(readFileSync(modelPath, "utf8")) as Array<{
      name?: string;
      className?: string;
    }>;

    expect(htmlData.version).toBe(1.1);
    expect(htmlData.globalAttributes?.some((attribute) => attribute.name === "class")).toBe(true);
    expect(cssData.version).toBe(1.1);
    expect(
      cssData.properties?.some((property) => property.name === "--instui-color-background-brand"),
    ).toBe(true);
    expect(model.some((entry) => entry.name === "button")).toBe(true);
    expect(model.some((entry) => entry.className === ".instui-button")).toBe(true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
