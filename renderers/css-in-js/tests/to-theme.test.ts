import { expect, test } from "vite-plus/test";
import { toStyledTheme, toThemeKey } from "../src/to-theme.ts";
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
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("camelCases token names", () => {
  expect(toThemeKey("--instui-color-background-brand")).toBe("colorBackgroundBrand");
});

test("var()-backed theme by default, icons skipped", () => {
  const theme = toStyledTheme(fixture);
  expect(theme.colorBackgroundBrand).toBe("var(--instui-color-background-brand)");
  expect(theme.colorBackgroundBase).toBe("var(--instui-color-background-base)");
  expect(theme).not.toHaveProperty("iconX");
});

test("resolves concrete values per mode when asked", () => {
  const light = toStyledTheme(fixture, { resolve: "light" });
  // var() reference flattened to the concrete blue.
  expect(light.colorBackgroundBrand).toBe("#0374B5");
  expect(light.colorBackgroundBase).toBe("#fff");
  const dark = toStyledTheme(fixture, { resolve: "dark" });
  expect(dark.colorBackgroundBase).toBe("#000");
});
