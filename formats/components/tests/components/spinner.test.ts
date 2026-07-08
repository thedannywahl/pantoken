import { expect, test } from "vite-plus/test";
import { spinnerCss } from "../../src/index.ts";
import { spinner } from "../../src/components/spinner.ts";
import { validate } from "../_validate.ts";

test("spinner: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spinner);
});

test("spinner has sizes and an inverse track", () => {
  const css = spinnerCss({ prefix: "instui" });
  expect(css).toContain(".instui-spinner.-size-xs");
  expect(css).toContain(".instui-spinner.-size-sm");
  expect(css).toContain(".instui-spinner.-size-lg");
  expect(css).toContain(".instui-spinner.-color-inverse");
  expect(css).toContain("var(--instui-component-spinner-inverse-color)");
});
