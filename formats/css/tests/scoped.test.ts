import { expect, test } from "vite-plus/test";
import { toCss } from "../src/to-css.ts";
import { darkBranch, lightBranch, schemeOverrideTokens } from "../src/theme-variants.ts";
import {
  LAYERS,
  layerOrderCss,
  multiScopeCss,
  propertiesCss,
  schemeScopeSelector,
  scopedSchemeCss,
  scopedThemeCss,
  themeScopeSelector,
} from "../src/scoped.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-white", syntax: "<color>", inherits: true, value: "#ffffff" },
  {
    name: "--instui-color-background-base",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-white)",
  },
  {
    name: "--instui-color-bg",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
];

test("emit: properties yields registrations with no declaration block", () => {
  const out = toCss(fixture, { emit: "properties" });
  expect(out).toContain("@property --instui-primitive-color-white");
  expect(out).not.toContain(":root {");
  expect(out).not.toContain("--instui-color-background-base:");
});

test("emit: declarations yields no @property at-rule", () => {
  const out = toCss(fixture, { emit: "declarations" });
  expect(out).not.toMatch(/@property\s+--/);
  expect(out).toContain("--instui-color-background-base: var(--instui-primitive-color-white);");
});

test("declareAll routes concrete tokens to declarations so a scope can override them", () => {
  const out = toCss(fixture, { emit: "declarations", declareAll: true, scope: "[data-x]" });
  expect(out).not.toMatch(/@property\s+--/);
  expect(out).toContain("[data-x] {");
  expect(out).toContain("--instui-primitive-color-white: #ffffff;");
});

test("layer wraps the declaration block", () => {
  const out = toCss(fixture, { layer: "pantoken.theme" });
  expect(out).toContain("@layer pantoken.theme {");
});

test("plugin declarations honour the configured scope instead of hardcoding :root", () => {
  const out = toCss(fixture, {
    scope: "[data-x]",
    plugins: [
      {
        name: "extra",
        css: () => ({ declarations: [["--extra", "var(--instui-color-bg)"]] }),
      },
    ],
  });
  expect(out).toContain("[data-x] {\n  --extra: var(--instui-color-bg);\n}");
});

test("light-dark branches are extracted, nested parens and all", () => {
  expect(lightBranch("light-dark(rgb(1, 2, 3), #000)")).toBe("rgb(1, 2, 3)");
  expect(darkBranch("light-dark(rgb(1, 2, 3), #000)")).toBe("#000");
  expect(lightBranch("#fff")).toBeNull();
  expect(darkBranch("#fff")).toBeNull();
});

test("scheme override tokens contain only the light-dark tokens, flattened", () => {
  const overrides = schemeOverrideTokens("rebrand", "dark");
  expect(overrides.length).toBeGreaterThan(0);
  for (const token of overrides) expect(token.value).not.toContain("light-dark(");
});

test("selectors match any element, not just :root", () => {
  expect(themeScopeSelector("canvas")).toBe('[data-pantoken-theme="canvas"]');
  expect(schemeScopeSelector("dark")).toBe('[data-pantoken-scheme="dark"]');
  expect(layerOrderCss()).toBe(`@layer ${LAYERS.join(", ")};`);
});

test("propertiesCss carries registrations only; scopedThemeCss carries declarations only", () => {
  const props = propertiesCss("rebrand", { includeIcons: false });
  expect(props).toMatch(/@property\s+--instui-/);
  expect(props).not.toContain('[data-pantoken-theme="rebrand"]');

  const scoped = scopedThemeCss("canvas", { includeIcons: false });
  expect(scoped).not.toMatch(/@property\s+--instui-/);
  expect(scoped).toContain('[data-pantoken-theme="canvas"] {');
});

test("a scheme block pins color-scheme and forces the matching branch", () => {
  const dark = scopedSchemeCss("rebrand", "dark");
  expect(dark).toContain("@layer pantoken.scheme {");
  expect(dark).toContain('[data-pantoken-theme="rebrand"][data-pantoken-scheme="dark"] {');
  expect(dark).toContain("color-scheme: dark;");
  expect(dark).not.toContain("light-dark(");
});

test("every theme block declares the identical varying token set", () => {
  const sheet = multiScopeCss({
    themes: ["rebrand", "canvas", "canvasHighContrast"],
    defaultTheme: "rebrand",
    includeIcons: false,
    schemes: false,
  });

  const names = (theme: string): string[] => {
    const start = sheet.indexOf(`  [data-pantoken-theme="${theme}"] {`);
    expect(start).toBeGreaterThan(-1);
    const end = sheet.indexOf("\n  }", start);
    return sheet
      .slice(start, end)
      .split("\n")
      .flatMap((line) => line.match(/^\s+(--[\w-]+):/)?.[1] ?? [])
      .sort();
  };

  const rebrand = names("rebrand");
  expect(rebrand.length).toBeGreaterThan(0);
  // Parity is the nesting-safety invariant: a token missing from one block would inherit the
  // enclosing scope's value instead of its own theme's. Order is irrelevant — custom properties
  // substitute at `var()` time, not declaration time.
  expect(names("canvas")).toEqual(rebrand);
  expect(names("canvasHighContrast")).toEqual(rebrand);
});

test("multiScopeCss registers each property once", () => {
  const sheet = multiScopeCss({
    themes: ["rebrand", "canvas"],
    defaultTheme: "rebrand",
    includeIcons: false,
  });
  const registered = sheet.match(/@property\s+(--[\w-]+)/g) ?? [];
  expect(registered.length).toBe(new Set(registered).size);
});
