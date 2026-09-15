import { expect, test } from "vite-plus/test";
import { alertCss } from "../../src/index.ts";
import { alert } from "../../src/components/alert/index.ts";
import { validate } from "../_validate.ts";

test("alert: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(alert);
});

test("alert draws its bar + glyph from pseudo-elements (no wrappers) with variant colours", () => {
  const css = alertCss({ prefix: "instui" });
  expect(css).toContain("&:is(.-variant-info, .-color-info)");
  expect(css).toContain("&:is(.-variant-success, .-color-success)");
  expect(css).toContain("&:is(.-variant-warning, .-color-warning)");
  expect(css).toContain("&:is(.-variant-error, .-color-danger, .-color-error)");
  for (const color of ["#2b7abc", "#03893d", "light-dark(#f0c16c, #8c6400)", "#e62429"]) {
    expect(css).toContain(`background: ${color}`);
    expect(css).toContain(`border-color: ${color}`);
  }
  for (const color of ["#2b7abc", "#03893d", "light-dark(#f0c16c, #8c6400)", "#e62429"]) {
    expect(css).toContain(`--pantoken-alert-icon-bg: ${color}`);
  }
  // The left bar (::before) and the glyph (::after) are self-drawn from the variant tokens.
  expect(css).toContain("&::before");
  expect(css).toContain("&::after");
  expect(css).toContain("var(--pantoken-alert-icon-bg)");
  expect(css).not.toContain("--instui-component-alert-danger-icon-background");
  expect(css).toContain("var(--instui-color-icon-on-color)");
  // No icon/content wrapper classes anymore.
  expect(css).not.toContain(".instui-alert__icon");
  expect(css).not.toContain(".instui-alert__content");
  // Optional shadow, screen-reader-only, and close-button detection via :has().
  expect(css).toMatch(
    /&:is\(\.-has-shadow-false,\s*\.-without-shadow\)\s*\{\s*box-shadow:\s*none/u,
  );
  expect(css).toContain("var(--instui-elevation-above)");
  expect(css).toContain("&.-screen-reader-only");
  expect(css).toMatch(/>\s*\.instui-close-button:not\(\[class\*="-size-"\]\)/u);
  expect(css).toContain("var(--instui-component-base-button-small-height)");
  expect(css).toContain("&:has(> .instui-close-button)");
  // Timeout mirrors InstUI milliseconds and defaults to a fade unless explicitly disabled.
  expect(css).toContain("@property --timeout");
  expect(css).toContain('syntax: "<integer>"');
  expect(css).toContain("--timeout: 0");
  expect(css).not.toContain(".instui-alert.-removing");
  expect(css).not.toContain("transition: opacity");
});
