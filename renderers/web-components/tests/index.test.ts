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

test("register defines every element against a registry", () => {
  const defined = new Map<string, unknown>();
  const registry = {
    get: (name: string) => defined.get(name),
    define: (name: string, ctor: unknown) => void defined.set(name, ctor),
  };

  // Stub HTMLElement so the element classes can be declared in this non-DOM env.
  const g = globalThis as unknown as { HTMLElement?: unknown };
  const had = "HTMLElement" in g;
  if (!had) g.HTMLElement = class {};
  try {
    register(registry as Parameters<typeof register>[0]);
  } finally {
    if (!had) delete g.HTMLElement;
  }

  expect([...defined.keys()]).toEqual([...ELEMENTS]);
});
