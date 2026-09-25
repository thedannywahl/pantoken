import { describe, expect, test } from "vite-plus/test";
import {
  BOUNDARY_ATTR,
  BOUNDARY_CLASS,
  COLOR_ATTR,
  INSTANCE_ATTR,
  SCHEME_ATTR,
  SCOPE_ATTRS,
  SCOPE_LAYERS,
  THEME_ATTR,
  colorClass,
  colorScopeSelector,
  colorScopeSelectors,
  isScheme,
  schemeClass,
  schemeScopeSelector,
  schemeScopeSelectors,
  themeClass,
  themeScopeSelector,
  themeScopeSelectors,
} from "../src/scope.ts";

describe("scope contract", () => {
  test("lists every scope attribute and cascade layer in order", () => {
    expect(SCOPE_ATTRS).toEqual([
      THEME_ATTR,
      SCHEME_ATTR,
      COLOR_ATTR,
      BOUNDARY_ATTR,
      INSTANCE_ATTR,
    ]);
    expect(SCOPE_LAYERS).toEqual([
      "pantoken.base",
      "pantoken.theme",
      "pantoken.scheme",
      "pantoken.color",
    ]);
    expect(BOUNDARY_CLASS).toBe("--pantoken-boundary");
  });

  test.each([
    ["light", true],
    ["dark", true],
    ["auto", false],
    [undefined, false],
    [1, false],
  ])("recognizes scheme %j", (value, expected) => {
    expect(isScheme(value)).toBe(expected);
  });

  test("builds attribute and class selectors for themes", () => {
    expect(themeClass("canvas")).toBe("--pantoken-theme-canvas");
    expect(themeScopeSelector("canvas")).toBe('[data-pantoken-theme="canvas"]');
    expect(themeScopeSelectors("canvas")).toBe(
      '[data-pantoken-theme="canvas"], :where(*).--pantoken-theme-canvas.--pantoken-theme-canvas.--pantoken-theme-canvas',
    );
  });

  test("builds attribute and class selectors for schemes", () => {
    expect(schemeClass("dark")).toBe("--pantoken-scheme-dark");
    expect(schemeScopeSelector("dark")).toBe('[data-pantoken-scheme="dark"]');
    expect(schemeScopeSelectors("dark")).toBe(
      '[data-pantoken-scheme="dark"], :where(*).--pantoken-scheme-dark.--pantoken-scheme-dark.--pantoken-scheme-dark',
    );
  });

  test("builds attribute and class selectors for colors", () => {
    expect(colorClass("brand")).toBe("--pantoken-color-brand");
    expect(colorScopeSelector("brand")).toBe('[data-pantoken-color="brand"]');
    expect(colorScopeSelectors("brand")).toBe(
      '[data-pantoken-color="brand"], :where(*).--pantoken-color-brand.--pantoken-color-brand.--pantoken-color-brand',
    );
  });
});
