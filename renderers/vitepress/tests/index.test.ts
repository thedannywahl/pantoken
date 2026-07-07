import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { VITEPRESS_TO_INSTUI, toVitePressCss, vitePressCss } from "../src/index.ts";

test("every mapped Instructure token exists in the IR (no drift)", () => {
  expect(unknownReferences(vitePressCss, tokens)).toEqual([]);
});

test("maps VitePress variables to var(--instui-*)", () => {
  expect(vitePressCss).toContain(
    "--vp-c-brand-1: var(--instui-color-text-interactive-navigation-primary-base);",
  );
  expect(vitePressCss).toContain("--vp-c-text-1: var(--instui-color-text-base);");
  expect(vitePressCss).toContain(":root {");
});

test("every mapping targets an --instui-* token", () => {
  for (const instui of Object.values(VITEPRESS_TO_INSTUI)) {
    expect(instui.startsWith("--instui-")).toBe(true);
  }
});

test("selector is configurable", () => {
  expect(toVitePressCss({ selector: ".dark" })).toContain(".dark {");
});
