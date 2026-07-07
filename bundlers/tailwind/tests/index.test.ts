import { expect, test } from "vite-plus/test";
import { pantokenPreset } from "../src/index.ts";

test("maps semantic colors to var(--instui-color-*) references", () => {
  const { colors } = pantokenPreset().theme.extend;
  expect(colors["background-base"]).toBe("var(--instui-color-background-base)");
  // Values are references, never concrete, so theming flows through CSS vars.
  for (const value of Object.values(colors)) expect(value.startsWith("var(--instui-")).toBe(true);
});

test("exposes spacing and font families", () => {
  const { spacing, fontFamily } = pantokenPreset().theme.extend;
  expect(Object.keys(spacing).length).toBeGreaterThan(0);
  expect(spacing["space-md"]).toBe("var(--instui-spacing-space-md)");
  expect(Object.keys(fontFamily).length).toBeGreaterThan(0);
});

test("primitives are opt-in", () => {
  const base = pantokenPreset().theme.extend.colors;
  const withPrims = pantokenPreset({ includePrimitives: true }).theme.extend.colors;
  expect(Object.keys(withPrims).length).toBeGreaterThan(Object.keys(base).length);
  expect(Object.keys(withPrims).some((k) => k.startsWith("primitive-"))).toBe(true);
});
