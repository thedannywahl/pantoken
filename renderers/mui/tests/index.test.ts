import { expect, test } from "vite-plus/test";
import { toMuiTheme } from "../src/to-mui.ts";
import defaultTheme, { darkTheme, lightTheme } from "../src/index.ts";
import type { Token } from "@pantoken/model";

test("the ready-made light and dark themes are built from the real token IR", () => {
  expect(lightTheme.palette.mode).toBe("light");
  expect(darkTheme.palette.mode).toBe("dark");
  // Every palette slot resolves to a concrete string MUI can augment.
  for (const slot of ["primary", "secondary", "error", "warning", "info", "success"] as const) {
    expect(typeof lightTheme.palette[slot].main).toBe("string");
    expect(lightTheme.palette[slot].main.length).toBeGreaterThan(0);
  }
  expect(typeof lightTheme.shape.borderRadius).toBe("number");
});

test("the default export is the light theme", () => {
  expect(defaultTheme).toBe(lightTheme);
});

test("toMuiTheme defaults to light mode when no mode is given", () => {
  const fixture: Token[] = [
    { name: "--instui-color-background-brand", syntax: "*", inherits: true, value: "#0374B5" },
  ];
  expect(toMuiTheme(fixture).palette.mode).toBe("light");
});

test("borderRadius parses a px radius value without rem scaling", () => {
  const fixture: Token[] = [
    { name: "--instui-spacing-space-sm", syntax: "<length>", inherits: true, value: "12px" },
  ];
  expect(toMuiTheme(fixture).shape.borderRadius).toBe(12);
});

test("borderRadius falls back to 4 when the radius token is missing or unparsable", () => {
  const missing: Token[] = [
    { name: "--instui-color-background-brand", syntax: "*", inherits: true, value: "#0374B5" },
  ];
  expect(toMuiTheme(missing).shape.borderRadius).toBe(4);

  const unparsable: Token[] = [
    { name: "--instui-spacing-space-sm", syntax: "<length>", inherits: true, value: "auto" },
  ];
  expect(toMuiTheme(unparsable).shape.borderRadius).toBe(4);
});
