import { expect, test } from "vite-plus/test";
import { iconCss } from "../../src/index.ts";
import { icon } from "../../src/utilities/icon/index.ts";
import { validate } from "../_validate.ts";

test("icon: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(icon);
});

test("icon: three-selector pattern with glyph painter", () => {
  const css = iconCss({ prefix: "instui" });
  // Any element with a glyph class paints the masked glyph in currentColor via ::before — a single
  // `.instui-icon-<name>` is enough, no wrapper class.
  expect(css).toContain("@scope (.instui-icon)");
  expect(css).toMatch(/@scope\s*\(\.instui-icon\)\s*\{[\s\S]*&\s*\{[\s\S]*display:\s*inline-flex/u);
  expect(css).toContain('[class*="-icon-"]::before');
  expect(css).toContain("inline-size: 1em");
  expect(css).toContain("var(--pantoken-glyph)");
});
