import { expect, test } from "vite-plus/test";
import { inPlaceEditCss } from "../../src/index.ts";
import { inPlaceEdit } from "../../src/components/in-place-edit/index.ts";
import { validate } from "../_validate.ts";

test("in-place-edit: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(inPlaceEdit);
});

test("in-place-edit reads as text, gets input chrome on focus, and has a readonly mode", () => {
  const css = inPlaceEditCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-in-place-edit)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&:hover/u);
  expect(css).toMatch(/&:focus/u);
  expect(css).toContain("var(--instui-component-text-input-border-color)");
  expect(css).toMatch(/&\.-readonly/u);
});
