import { expect, test } from "vite-plus/test";
import { toPandaPreset } from "../src/to-panda.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-background-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  {
    name: "--instui-color-background-base",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
  { name: "--instui-spacing-space-sm", syntax: "<length>", inherits: true, value: "0.5rem" },
  { name: "--instui-radius-medium", syntax: "<length>", inherits: true, value: "8px" },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("primitives become raw tokens", () => {
  const preset = toPandaPreset(fixture);
  expect(preset.name).toBe("@pantoken/panda");
  expect(preset.theme.tokens.colors?.["primitive-color-blue"]).toEqual({ value: "#0374B5" });
});

test("themed tokens become semanticTokens with a _dark condition", () => {
  const preset = toPandaPreset(fixture);
  expect(preset.theme.semanticTokens.colors?.["color-background-base"]).toEqual({
    value: { base: "#fff", _dark: "#000" },
  });
});

test("aliases resolve to flat semantic values", () => {
  const preset = toPandaPreset(fixture);
  expect(preset.theme.semanticTokens.colors?.["color-background-brand"]).toEqual({
    value: "#0374B5",
  });
});

test("dimensions bucket into spacing and radii; icons skipped", () => {
  const preset = toPandaPreset(fixture);
  expect(preset.theme.semanticTokens.spacing?.["spacing-space-sm"]).toEqual({ value: "0.5rem" });
  expect(preset.theme.semanticTokens.radii?.["radius-medium"]).toEqual({ value: "8px" });
  expect(preset.theme.tokens.colors?.["icon-x"]).toBeUndefined();
  expect(preset.theme.semanticTokens.colors?.["icon-x"]).toBeUndefined();
});
