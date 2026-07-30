import { expect, test } from "vite-plus/test";
import { getIcon, icons, resolve } from "../src/index.ts";
import { sanitizeSvg } from "@pantoken/utils";

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

test("sanitizeSvg strips script elements from decoded SVG", () => {
  const dirty = `<svg><script>alert(1)</script><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(dirty)).not.toContain("<script");
  expect(sanitizeSvg(dirty)).toContain("<path");
});

test("sanitizeSvg strips event-handler attributes", () => {
  const dirty = `<svg><path onclick="evil()" d="M0 0"/></svg>`;
  expect(sanitizeSvg(dirty)).not.toContain("onclick");
  expect(sanitizeSvg(dirty)).toContain("<path");
});

test("icon svgs from the IR contain no script elements", () => {
  for (const icon of icons) {
    expect(icon.svg).not.toMatch(/<script/i);
  }
});

test("resolve() returns an IconEntry for known codes and undefined otherwise", () => {
  expect(resolve("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
  expect(resolve("not-a-real-icon")).toBeUndefined();
});
