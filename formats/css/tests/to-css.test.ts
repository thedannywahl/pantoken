import { expect, test } from "vite-plus/test";
import { danglingReferences } from "@pantoken/utils";
import { definePlugin } from "@pantoken/plugin-kit";
import { css, leanCss } from "../src/index.ts";
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

test("a plugin-contributed property with a contextual initial-value becomes a declaration, not @property", () => {
  // A `var()`/`light-dark()` value can't be a valid @property initial-value, so appendContribution must
  // route it to a :root declaration (it previously emitted invalid @property CSS for such values).
  const plugin = definePlugin({
    name: "contextual-prop",
    css: () => ({
      properties: [
        { name: "--instui-x-concrete", syntax: "<length>", value: "4px" },
        {
          name: "--instui-x-contextual",
          syntax: "*",
          value: "var(--instui-primitive-color-white)",
        },
      ],
    }),
  });
  const out = toCss(fixture, { plugins: [plugin] });
  expect(out).toContain("@property --instui-x-concrete"); // concrete → typed registration
  expect(out).not.toContain("@property --instui-x-contextual"); // contextual → never @property
  expect(out).toContain("--instui-x-contextual: var(--instui-primitive-color-white);"); // → declaration
});

test("the rebrand stylesheet is self-contained (no dangling --instui-* references)", () => {
  // Every var(--instui-*) in the full token layer resolves to a definition in the same output.
  expect(danglingReferences(css)).toEqual([]);
});

test("leanCss drops the full icon set but keeps the tokens + elevation/focus foundation", () => {
  // The lean sheet omits the ~1,777 --instui-icon-* glyph data-URIs (the bulk of the sheet)...
  expect(leanCss).not.toContain("--instui-icon-");
  // ...while the full sheet keeps them.
  expect(css).toContain("--instui-icon-");
  // The elevation + focus-outline foundation rides along in the lean sheet too.
  expect(leanCss).toContain("--instui-elevation-above:");
  expect(leanCss).toContain("--instui-focus-outline-color:");
  // Materially smaller (icons are most of the bytes).
  expect(leanCss.length).toBeLessThan(css.length / 2);
});

test("leanCss is self-contained (no dangling --instui-* references)", () => {
  // Dropping the icon tokens leaves no dangling refs — nothing in the non-icon layer points at an icon.
  expect(danglingReferences(leanCss)).toEqual([]);
});
