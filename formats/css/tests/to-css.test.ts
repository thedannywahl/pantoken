import { expect, test } from "vite-plus/test";
import { danglingReferences } from "@pantoken/utils";
import { definePlugin } from "@pantoken/plugin-kit";
import { css } from "../src/index.ts";
import { toCss } from "../src/to-css.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-white", syntax: "<color>", inherits: true, value: "#ffffff" },
  {
    name: "--instui-color-background-base",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-white)",
    refersTo: "--instui-primitive-color-white",
  },
  {
    name: "--instui-color-bg",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
];

test("concrete tokens become @property, contextual tokens become declarations", () => {
  const css = toCss(fixture);
  expect(css).toContain("@property --instui-primitive-color-white");
  expect(css).toContain('syntax: "<color>"');
  expect(css).toContain(":root {");
  expect(css).toContain("--instui-color-background-base: var(--instui-primitive-color-white);");
  expect(css).toContain("--instui-color-bg: light-dark(#fff, #000);");
  // A contextual value must never be registered with @property.
  expect(css).not.toContain("@property --instui-color-bg");
});

test("a css-stage plugin can inject a focus rule after the base", () => {
  const focus = definePlugin({
    name: "focus",
    css: () => ({
      append: ":focus-visible { outline: 2px solid var(--instui-focus-color); }",
      marker: "pantoken:focus",
    }),
  });
  const withPlugin = toCss(fixture, { plugins: [focus] });
  expect(withPlugin).toContain(":focus-visible { outline: 2px solid var(--instui-focus-color); }");
  expect(withPlugin).toContain("/* pantoken:focus */");
});

test("the rebrand stylesheet is self-contained (no dangling --instui-* references)", () => {
  // Every var(--instui-*) in the full token layer resolves to a definition in the same output.
  expect(danglingReferences(css)).toEqual([]);
});
