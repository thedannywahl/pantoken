import { expect, test } from "vite-plus/test";
import { closeButtonCss } from "../../src/index.ts";
import { closeButton } from "../../src/components/close-button.ts";
import { validate } from "../_validate.ts";

test("close-button: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(closeButton);
});

test("close-button is a transparent icon button with an auto glyph, sizes, and inverse", () => {
  const css = closeButtonCss({ prefix: "instui" });
  expect(css).toContain(".instui-close-button");
  expect(css).toContain(".instui-close-button::before");
  expect(css).toContain("var(--instui-icon-x)");
  expect(css).toContain(".instui-close-button.-size-sm");
  expect(css).toContain(".instui-close-button.-size-lg");
  expect(css).toContain(".instui-close-button.-color-inverse");
});
