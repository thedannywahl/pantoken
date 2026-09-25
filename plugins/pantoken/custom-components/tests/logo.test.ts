import { expect, test } from "vite-plus/test";
import { logoRules } from "../src/index.ts";

test("logo: aspect-ratio-aware glyph painter, distinct from the icon painter", () => {
  const css = logoRules("instui-");
  expect(css).toContain("@scope (.instui-logo)");
  expect(css).toMatch(/@scope\s*\(\.instui-logo\)\s*\{[\s\S]*&\s*\{[\s\S]*display:\s*inline-flex/u);
  expect(css).toContain('[class*="-logo-"]::before');
  expect(css).toContain("aspect-ratio: var(--pantoken-logo-aspect, 1)");
  expect(css).toContain("var(--pantoken-glyph)");
  // Never let the logo selector collide with @pantoken/components' `[class*="-icon-"]` painter.
  expect(css).not.toContain('[class*="-icon-"]');
});
