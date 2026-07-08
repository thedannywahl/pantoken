import { expect, test } from "vite-plus/test";
import { alertCss } from "../../src/index.ts";
import { alert } from "../../src/components/alert.ts";
import { validate } from "../_validate.ts";

test("alert: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(alert);
});

test("alert draws its bar + glyph from pseudo-elements (no wrappers) with variant colours", () => {
  const css = alertCss({ prefix: "instui" });
  for (const v of ["info", "success", "warning", "danger"]) {
    expect(css).toContain(`.instui-alert.-color-${v}`);
  }
  // The left bar (::before) and the glyph (::after) are self-drawn from the variant tokens.
  expect(css).toContain(".instui-alert::before");
  expect(css).toContain(".instui-alert::after");
  expect(css).toContain("var(--pantoken-alert-icon-bg)");
  expect(css).toContain("var(--instui-component-alert-danger-icon-background)");
  expect(css).toContain("var(--instui-component-alert-icon-color)");
  // No icon/content wrapper classes anymore.
  expect(css).not.toContain(".instui-alert__icon");
  expect(css).not.toContain(".instui-alert__content");
  // Optional shadow, screen-reader-only, and close-button detection via :has().
  expect(css).toContain(".instui-alert.-has-shadow");
  expect(css).toContain("var(--instui-elevation-above)");
  expect(css).toContain(".instui-alert.-screen-reader-only");
  expect(css).toContain(".instui-alert:has(> .instui-close-button)");
});
