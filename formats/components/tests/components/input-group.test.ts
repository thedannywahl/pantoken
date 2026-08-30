import { expect, test } from "vite-plus/test";
import { inputGroupCss } from "../../src/index.ts";
import { inputGroup } from "../../src/components/input-group/index.ts";
import { validate } from "../_validate.ts";

test("input-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(inputGroup);
});

test("input-group is a facade with before/after slots + should-not-wrap; the inner input is chromeless", () => {
  const css = inputGroupCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-input-group)");
  expect(css).toContain("& .before");
  expect(css).toContain("& .after");
  expect(css).toContain("&.-should-not-wrap");
  expect(css).toContain("flex-wrap: nowrap");
  // the inner input sheds its own chrome
  expect(css).toContain("background: transparent");
  // ring lives on the facade
  expect(css).toContain("&:has(:focus-visible)");
});
