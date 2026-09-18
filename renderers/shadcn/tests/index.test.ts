import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { SHADCN_TO_INSTUI, toShadcnCss, toShadcnTailwindV4Css } from "../src/index.ts";

test("emits shadcn variables pointing at Instructure tokens", () => {
  const css = toShadcnCss();
  expect(css).toContain("--primary: var(--instui-color-background-brand);");
  expect(css).toContain("--ring: var(--instui-color-stroke-brand);");
  expect(css).toContain(":root {");
});

test("respects a custom selector", () => {
  expect(toShadcnCss({ selector: ".dark" })).toContain(".dark {");
});

test("every mapped Instructure token actually exists in the IR (no drift)", () => {
  expect(unknownReferences(toShadcnCss(), tokens)).toEqual([]);
});

test("covers the current shadcn chart and sidebar theme contracts", () => {
  expect(Object.keys(SHADCN_TO_INSTUI)).toEqual(
    expect.arrayContaining([
      "--chart-1",
      "--chart-2",
      "--chart-3",
      "--chart-4",
      "--chart-5",
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
    ]),
  );
});

test("emits Tailwind v4 color aliases and the official derived radius scale", () => {
  const css = toShadcnTailwindV4Css();
  expect(css).toContain("@theme inline {");
  expect(css).toContain("--color-chart-1: var(--chart-1);");
  expect(css).toContain("--color-sidebar-primary: var(--sidebar-primary);");
  expect(css).toContain("--radius-sm: calc(var(--radius) * 0.6);");
  expect(css).toContain("--radius-lg: var(--radius);");
  expect(css).toContain("--radius-4xl: calc(var(--radius) * 2.6);");
  expect(css).not.toContain("--color-radius:");
});
