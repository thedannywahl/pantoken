import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { VITEPRESS_TO_INSTUI, toVitePressCss } from "../src/index.ts";

const vitePressCss = toVitePressCss();

test("every mapped Instructure token exists in the IR (no drift)", () => {
  expect(unknownReferences(vitePressCss, tokens)).toEqual([]);
});

test("VITEPRESS_TO_INSTUI contains all expected color mappings", () => {
  // Verify key categories are covered
  const mappedVars = Object.keys(VITEPRESS_TO_INSTUI);

  // Text colors
  expect(mappedVars).toContain("--vp-c-text-1");
  expect(mappedVars).toContain("--vp-c-text-2");
  expect(mappedVars).toContain("--vp-c-text-3");

  // Backgrounds
  expect(mappedVars).toContain("--vp-c-bg");
  expect(mappedVars).toContain("--vp-c-bg-alt");
  expect(mappedVars).toContain("--vp-c-bg-soft");

  // Borders
  expect(mappedVars).toContain("--vp-c-border");
  expect(mappedVars).toContain("--vp-c-divider");

  // Functional colors
  expect(mappedVars).toContain("--vp-c-default-1");
  expect(mappedVars).toContain("--vp-c-brand-1");
  expect(mappedVars).toContain("--vp-c-brand-2");
  expect(mappedVars).toContain("--vp-c-brand-3");
  expect(mappedVars).toContain("--vp-c-tip-1");
  expect(mappedVars).toContain("--vp-c-success-1");
  expect(mappedVars).toContain("--vp-c-warning-1");
  expect(mappedVars).toContain("--vp-c-danger-1");
  expect(mappedVars).toContain("--vp-c-caution-1");

  // Button component
  expect(mappedVars).toContain("--vp-button-brand-bg");
  expect(mappedVars).toContain("--vp-button-alt-text");

  // Custom block component
  expect(mappedVars).toContain("--vp-custom-block-info-bg");
  expect(mappedVars).toContain("--vp-custom-block-tip-bg");
  expect(mappedVars).toContain("--vp-custom-block-warning-bg");
  expect(mappedVars).toContain("--vp-custom-block-danger-bg");

  // Input component
  expect(mappedVars).toContain("--vp-input-border-color");
  expect(mappedVars).toContain("--vp-input-bg-color");

  // Nav component
  expect(mappedVars).toContain("--vp-nav-bg-color");
  expect(mappedVars).toContain("--vp-local-nav-bg-color");

  // Sidebar component
  expect(mappedVars).toContain("--vp-sidebar-bg-color");

  // Badge component
  expect(mappedVars).toContain("--vp-badge-info-bg");
  expect(mappedVars).toContain("--vp-badge-tip-bg");
  expect(mappedVars).toContain("--vp-badge-warning-bg");
  expect(mappedVars).toContain("--vp-badge-danger-bg");

  // Carbon ads component
  expect(mappedVars).toContain("--vp-carbon-ads-bg-color");
  expect(mappedVars).toContain("--vp-carbon-ads-hover-text-color");

  // Local search component
  expect(mappedVars).toContain("--vp-local-search-bg");
  expect(mappedVars).toContain("--vp-local-search-highlight-bg");
});

test("every mapping targets an --instui-* token", () => {
  for (const instui of Object.values(VITEPRESS_TO_INSTUI)) {
    expect(instui.startsWith("--instui-")).toBe(true);
  }
});

test("maps VitePress variables to var(--instui-*)", () => {
  expect(vitePressCss).toContain("--vp-c-bg: var(--instui-color-background-page);");
  expect(vitePressCss).toContain("--vp-c-text-1: var(--instui-color-text-base);");
  expect(vitePressCss).toContain(
    "--vp-c-brand-1: var(--instui-color-text-interactive-navigation-primary-base);",
  );
  expect(vitePressCss).toContain(":root {");
});

test("selector is configurable", () => {
  expect(toVitePressCss({ selector: ".dark" })).toContain(".dark {");
});

test("includes 60+ variable mappings", () => {
  const mappedCount = Object.keys(VITEPRESS_TO_INSTUI).length;
  expect(mappedCount).toBeGreaterThanOrEqual(60);
});
