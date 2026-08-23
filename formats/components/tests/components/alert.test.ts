import { expect, test } from "vite-plus/test";
import { alertCss } from "../../src/index.ts";
import { alert } from "../../src/components/alert/index.ts";
import { validate } from "../_validate.ts";

test("alert: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(alert);
});

test("alert draws its bar + glyph from pseudo-elements (no wrappers) with variant colours", () => {
  const css = alertCss({ prefix: "instui" });
  for (const v of ["info", "success", "warning", "danger"]) {
    expect(css).toContain(`&.-color-${v}`);
  }
  // The left bar (::before) and the glyph (::after) are self-drawn from the variant tokens.
  expect(css).toContain("&::before");
  expect(css).toContain("&::after");
  expect(css).toContain("var(--pantoken-alert-icon-bg)");
  expect(css).toContain("var(--instui-component-alert-danger-icon-background)");
  expect(css).toContain("var(--instui-component-alert-icon-color)");
  // No icon/content wrapper classes anymore.
  expect(css).not.toContain(".instui-alert__icon");
  expect(css).not.toContain(".instui-alert__content");
  // Optional shadow, screen-reader-only, and close-button detection via :has().
  expect(css).toMatch(
    /&:is\(\.-has-shadow-false,\s*\.-without-shadow\)\s*\{\s*box-shadow:\s*none/u,
  );
  expect(css).toContain("var(--instui-elevation-above)");
  expect(css).toContain("&.-screen-reader-only");
  expect(css).toContain("&:has(> .instui-close-button)");
  // Timeout mirrors InstUI milliseconds and defaults to a fade unless explicitly disabled.
  expect(css).toContain("@property --timeout");
  expect(css).toContain('syntax: "<integer>"');
  expect(css).toContain("--timeout: 0");
  expect(css).not.toContain(".instui-alert.-removing");
  expect(css).not.toContain("transition: opacity");
});
