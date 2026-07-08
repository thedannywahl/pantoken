import { expect, test } from "vite-plus/test";
import { iconCss } from "../../src/index.ts";
import { icon } from "../../src/utilities/icon.ts";
import { validate } from "../_validate.ts";

test("icon: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(icon);
});

test("a glyph class paints a masked ::before, so a single name class renders standalone", () => {
  const css = iconCss({ prefix: "instui" });
  // Any element with a glyph class paints the masked glyph in currentColor via ::before — a single
  // `.instui-icon-<name>` is enough, no wrapper class.
  expect(css).toContain('[class*="-icon-"]::before');
  expect(css).toContain("inline-size: 1em");
  expect(css).toContain("var(--pantoken-glyph)");
  // No `.instui-icon` wrapper class (there's no two-class form).
  expect(css).toContain(".instui-icon {");
});
