import { expect, test } from "vite-plus/test";
import { toLess } from "../src/to-less.ts";
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

test("emits resolved Less variables", () => {
  const less = toLess(fixture, { mode: "light" });
  expect(less).toContain("@instui-primitive-color-blue: #0374B5;");
  // The reference resolved to the concrete blue.
  expect(less).toContain("@instui-color-brand: #0374B5;");
  // light-dark collapsed to the light value.
  expect(less).toContain("@instui-color-bg: #fff;");
});

test("respects the mode and skips icons", () => {
  const dark = toLess(fixture, { mode: "dark" });
  expect(dark).toContain("@instui-color-bg: #000;");
  expect(dark).not.toContain("instui-icon-x");
});
