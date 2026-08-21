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
  expect(css).toContain('[class*="-icon-"]::before');
  expect(css).toContain("inline-size: 1em");
  expect(css).toContain("var(--pantoken-glyph)");
  expect(css).toContain(".instui-icon,");
  expect(css).toContain(".-icon-icon");
  expect(css).toContain(".-icon");
});
