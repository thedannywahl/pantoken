import { expect, test } from "vite-plus/test";
import { ELEMENTS, iconSvg, register } from "../src/index.ts";
import { resolveSpace, spacingValue } from "../src/lib/helpers.ts";

test("resolveSpace maps a keyword to a token, else passes a raw CSS value through", () => {
  expect(resolveSpace("small")).toBe("var(--instui-spacing-space-sm)");
  expect(resolveSpace("none")).toBe("0");
  expect(resolveSpace("2rem")).toBe("2rem"); // raw length — verbatim
  expect(resolveSpace("auto")).toBe("auto");
});

test("spacingValue resolves the 1–4 value shorthand (keywords and raw mixed)", () => {
  expect(spacingValue("small")).toBe("var(--instui-spacing-space-sm)");
  expect(spacingValue("small none small")).toBe(
    "var(--instui-spacing-space-sm) 0 var(--instui-spacing-space-sm)",
  );
  expect(spacingValue("medium 2rem")).toBe("var(--instui-spacing-space-md) 2rem");
  expect(spacingValue(null)).toBe(""); // absent → clears the property
});

test("iconSvg returns inline SVG for known icons and empty for unknown", () => {
  expect(iconSvg("arrow-left").startsWith("<svg")).toBe(true);
  expect(iconSvg("definitely-not-an-icon")).toBe("");
});

test("iconSvg honors a custom resolver", () => {
  const svg = iconSvg("x", (code) =>
    code === "x" ? { name: "x", svg: "<svg id='x'/>" } : undefined,
  );
  expect(svg).toBe("<svg id='x'/>");
});

test("register is a no-op without a registry (SSR/build safe)", () => {
  expect(() => register(undefined)).not.toThrow();
});

/** Run register() with a stubbed HTMLElement + a fake registry, returning the defined tag names. */
function definedTags(options?: Parameters<typeof register>[1]): string[] {
  const defined = new Map<string, unknown>();
  const registry = {
    get: (name: string) => defined.get(name),
    define: (name: string, ctor: unknown) => void defined.set(name, ctor),
  };
  const g = globalThis as unknown as { HTMLElement?: unknown };
  const had = "HTMLElement" in g;
  if (!had) g.HTMLElement = class {};
  try {
    register(registry as Parameters<typeof register>[0], options);
  } finally {
    if (!had) delete g.HTMLElement;
  }
  return [...defined.keys()];
}

test("register defines every element with the default instui- prefix", () => {
  expect(definedTags()).toEqual(ELEMENTS.map((base) => `instui-${base}`));
});

test("register honors a custom prefix", () => {
  expect(definedTags({ prefix: "x" })).toEqual(ELEMENTS.map((base) => `x-${base}`));
});

test("an empty or nullish prefix falls back to the default instui- prefix", () => {
  // A prefix is required (custom-element names need a hyphen), so a blank one can't drop it.
  const expected = ELEMENTS.map((base) => `instui-${base}`);
  expect(definedTags({ prefix: "" })).toEqual(expected);
  expect(definedTags({ prefix: "   " })).toEqual(expected);
  expect(definedTags({ prefix: null })).toEqual(expected);
});

test("only registers just the requested subset", () => {
  expect(definedTags({ only: ["button", "alert"] }).sort()).toEqual([
    "instui-alert",
    "instui-button",
  ]);
});

test("only pulls in nested-render dependencies (date-time-input → date-input → calendar)", () => {
  const tags = definedTags({ only: ["date-time-input"] });
  expect(tags).toContain("instui-date-time-input");
  expect(tags).toContain("instui-date-input"); // nested dependency
  expect(tags).toContain("instui-calendar"); // transitive nested dependency
  expect(tags).not.toContain("instui-drilldown"); // not requested
  // Canonical order preserved: a dependency is defined before the element that renders it.
  expect(tags.indexOf("instui-calendar")).toBeLessThan(tags.indexOf("instui-date-input"));
  expect(tags.indexOf("instui-date-input")).toBeLessThan(tags.indexOf("instui-date-time-input"));
});
