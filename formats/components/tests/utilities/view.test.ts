import { expect, test } from "vite-plus/test";
import { viewCss } from "../../src/index.ts";
import { view } from "../../src/utilities/view.ts";
import { validate } from "../_validate.ts";

test("view: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(view);
});

test("view is a neutral box primitive", () => {
  expect(viewCss({ prefix: "instui" })).toContain(".instui-view {");
  expect(viewCss({ prefix: "instui" })).toContain("display: block");
});
