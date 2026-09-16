import { expect, test } from "vite-plus/test";
import { alertCss } from "../../src/index.ts";
import { alert } from "../../src/components/alert/index.ts";
import { validate } from "../_validate.ts";

test("alert: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(alert);
});

test("alert supports token-backed floating and inline status treatments", () => {
  const css = alertCss({ prefix: "instui" });
  expect(css).toContain("&:is(.-variant-success, .-color-success)");
  expect(css).toContain("&:is(.-variant-warning, .-color-warning)");
  expect(css).toContain("&:is(.-variant-error, .-color-danger, .-color-error)");
  for (const status of ["info", "success", "warning", "danger"]) {
    expect(css).toContain(`--instui-component-alert-${status}-background`);
    expect(css).toContain(`--instui-component-alert-${status}-background-inline`);
    expect(css).toContain(`--instui-component-alert-${status}-border-color`);
    expect(css).toContain(`--instui-component-alert-${status}-border-color-inline`);
  }
  expect(css).toContain("--instui-color-drop-shadow-shadow-color1");
  expect(css).toContain("--instui-drop-shadow-y-elevation4-dropshadow1");
  expect(css).toContain("--instui-component-text-base-on-color");
  expect(css).toContain("--pantoken-alert-icon-color");
  expect(css).toContain("&::after");
  expect(css).toContain("--instui-component-alert-icon-padding-left");
  expect(css).toContain("--instui-component-alert-icon-padding-right");
  expect(css).toContain("--instui-component-alert-icon-padding-vertical");
  expect(css).toContain('&[class*="-icon-"]::before');
  expect(css).toContain("content: none");
  // No icon/content wrapper classes anymore.
  expect(css).not.toContain(".instui-alert__icon");
  expect(css).not.toContain(".instui-alert__content");
  // Inline is a complete treatment; old no-shadow spellings remain functional aliases.
  expect(css).toMatch(
    /&:is\(\.-has-shadow-false,\s*\.-without-shadow\)\s*\{\s*box-shadow:\s*none/u,
  );
  expect(css).toMatch(/&\.-inline\s*\{[\s\S]*box-shadow:\s*none/u);
  expect(css).toContain("box-shadow: none");
  expect(css).toContain("& > .instui-button:not(.-color-secondary)");
  expect(css).toContain("& > .instui-button.-color-secondary");
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
