import { expect, test } from "vite-plus/test";
import { layoutUtilitiesCss } from "../../src/index.ts";
import { layout } from "../../src/utilities/layout.ts";
import { validate } from "../_validate.ts";

test("layout: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(layout);
});

test("layout utilities cover display and text-align (InstUI cross-cutting props)", () => {
  const css = layoutUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-display-flex { display: flex; }");
  expect(css).toContain(".instui-display-inline-block { display: inline-block; }");
  expect(css).toContain(".instui-text-align-center { text-align: center; }");
  expect(css).toContain(".instui-text-align-end { text-align: end; }");
});
