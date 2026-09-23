import { expect, test } from "vite-plus/test";
import {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  SCOPE_ATTRS,
  SCOPE_LAYERS,
  SCHEME_ATTR,
  THEME_ATTR,
  isScheme,
  schemeScopeSelector,
  themeScopeSelector,
} from "../src/contract.ts";

test("the emitted selectors are plain attribute selectors, so any element can root a scope", () => {
  // A `:root`-anchored selector here would defeat the whole design.
  expect(themeScopeSelector("canvas")).toBe(`[${THEME_ATTR}="canvas"]`);
  expect(schemeScopeSelector("dark")).toBe(`[${SCHEME_ATTR}="dark"]`);
});

test("every resolution attribute is listed, so the mutation observer watches all of them", () => {
  expect(SCOPE_ATTRS).toContain(THEME_ATTR);
  expect(SCOPE_ATTRS).toContain(SCHEME_ATTR);
  expect(SCOPE_ATTRS).toContain(COLOR_ATTR);
  expect(SCOPE_ATTRS).toContain(BOUNDARY_ATTR);
});

test("layer precedence puts scheme and color above theme", () => {
  expect(SCOPE_LAYERS.indexOf("pantoken.scheme")).toBeGreaterThan(
    SCOPE_LAYERS.indexOf("pantoken.theme"),
  );
  expect(SCOPE_LAYERS.indexOf("pantoken.color")).toBeGreaterThan(
    SCOPE_LAYERS.indexOf("pantoken.scheme"),
  );
});

test("only light and dark are accepted schemes", () => {
  expect(isScheme("light")).toBe(true);
  expect(isScheme("dark")).toBe(true);
  expect(isScheme("sepia")).toBe(false);
  expect(isScheme(undefined)).toBe(false);
});
