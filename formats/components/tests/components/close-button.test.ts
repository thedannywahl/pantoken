import { expect, test } from "vite-plus/test";
import { closeButtonCss } from "../../src/index.ts";
import { closeButton } from "../../src/components/close-button/index.ts";
import { validate } from "../_validate.ts";

test("close-button: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(closeButton);
});

test("close-button is a transparent icon button with an auto glyph, sizes, and inverse", () => {
  const css = closeButtonCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-close-button)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&::before/u);
  expect(css).toContain("var(--instui-icon-x)");
  expect(css).toMatch(/&\.-size-sm/u);
  expect(css).toMatch(/&\.-size-lg/u);
  expect(css).toMatch(/&\.-color-inverse/u);
});
