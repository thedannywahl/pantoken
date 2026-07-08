import { expect, test } from "vite-plus/test";
import { ELEMENTS, iconSvg, register } from "../src/index.ts";

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
