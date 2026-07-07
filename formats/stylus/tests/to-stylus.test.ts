import { expect, test } from "vite-plus/test";
import { toStylus } from "../src/to-stylus.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  {
    name: "--instui-color-bg",
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

test("emits resolved Stylus variables", () => {
  const styl = toStylus(fixture, { mode: "light" });
  expect(styl).toContain("instui-primitive-color-blue = #0374B5");
  // The reference resolved to the concrete blue.
  expect(styl).toContain("instui-color-brand = #0374B5");
  // light-dark collapsed to the light value.
  expect(styl).toContain("instui-color-bg = #fff");
  // No semicolons in Stylus.
  expect(styl).not.toContain(";");
});

test("respects the mode and skips icons", () => {
  const dark = toStylus(fixture, { mode: "dark" });
  expect(dark).toContain("instui-color-bg = #000");
  expect(dark).not.toContain("instui-icon-x");
});
