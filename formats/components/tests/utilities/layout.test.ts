import { expect, test } from "vite-plus/test";
import { layoutUtilitiesCss } from "../../src/index.ts";
import { layout } from "../../src/utilities/layout/index.ts";
import { validate } from "../_validate.ts";

test("layout: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(layout);
});

test("layout utilities: three-selector pattern (base + namespaced + bare modifiers)", () => {
  const css = layoutUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-layout-display-flex, .-layout-display-flex, -display-flex");
  expect(css).toContain("display: flex;");
  expect(css).toContain(
    ".instui-layout-display-inline-block, .-layout-display-inline-block, -display-inline-block",
  );
  expect(css).toContain("display: inline-block;");
  expect(css).toContain(
    ".instui-layout-text-align-center, .-layout-text-align-center, -text-align-center",
  );
  expect(css).toContain("text-align: center;");
  expect(css).toContain(".instui-layout-text-align-end, .-layout-text-align-end, -text-align-end");
  expect(css).toContain("text-align: end;");
});
