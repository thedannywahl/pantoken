import { expect, test } from "vite-plus/test";
import { toMuiTheme } from "../src/to-mui.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  {
    name: "--instui-color-background-brand",
    syntax: "*",
    inherits: true,
    value: "light-dark(#0374B5, #4b9fd6)",
    themed: true,
  },
  { name: "--instui-color-text-on-color", syntax: "*", inherits: true, value: "#ffffff" },
  {
    name: "--instui-color-background-base",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
  { name: "--instui-color-background-container", syntax: "*", inherits: true, value: "#f5f5f5" },
  { name: "--instui-color-text-base", syntax: "*", inherits: true, value: "#2d3b45" },
  { name: "--instui-color-text-muted", syntax: "*", inherits: true, value: "#6b7780" },
  { name: "--instui-color-stroke-base", syntax: "*", inherits: true, value: "#c7cdd1" },
  { name: "--instui-spacing-space-sm", syntax: "<length>", inherits: true, value: "0.5rem" },
];

test("maps tokens to a MUI palette, resolving the requested mode", () => {
  const light = toMuiTheme(fixture, "light");
  expect(light.palette.mode).toBe("light");
  expect(light.palette.primary.main).toBe("#0374B5");
  expect(light.palette.primary.contrastText).toBe("#ffffff");
  expect(light.palette.background.default).toBe("#fff");
  expect(light.palette.background.paper).toBe("#f5f5f5");
  expect(light.palette.text.primary).toBe("#2d3b45");
  expect(light.palette.divider).toBe("#c7cdd1");
  // 0.5rem → 8px.
  expect(light.shape.borderRadius).toBe(8);
});

test("dark mode picks the dark light-dark() branch", () => {
  const dark = toMuiTheme(fixture, "dark");
  expect(dark.palette.mode).toBe("dark");
  expect(dark.palette.primary.main).toBe("#4b9fd6");
  expect(dark.palette.background.default).toBe("#000");
});
