import { expect, test } from "vite-plus/test";
import { getIcon, icons, resolve } from "../src/index.ts";

test("exposes the full icon set derived from the IR", () => {
  expect(icons.length).toBeGreaterThan(500);
});

test("arrow-left is bidirectional and decodes to inline SVG", () => {
  const arrow = getIcon("arrow-left");
  expect(arrow).toBeDefined();
  expect(arrow?.bidirectional).toBe(true);
  expect(arrow?.svg.startsWith("<svg")).toBe(true);
});

test("a Custom (Instructure-authored) glyph is present and sourced", () => {
  const logo = getIcon("canvas-logo");
  expect(logo).toBeDefined();
  expect(logo?.source).toBe("custom");
});

test("resolve() returns an IconEntry for known codes and undefined otherwise", () => {
  expect(resolve("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
  expect(resolve("not-a-real-icon")).toBeUndefined();
});
