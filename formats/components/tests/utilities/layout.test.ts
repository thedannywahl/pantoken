import { expect, test } from "vite-plus/test";
import { layoutUtilitiesCss } from "../../src/index.ts";
import { layout } from "../../src/utilities/layout/index.ts";
import { validate } from "../_validate.ts";

test("layout: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(layout);
});

test("layout utilities: global modifier selector shape, chainable onto any component", () => {
  const css = layoutUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(":where(*).--display-flex.--display-flex.--display-flex");
  expect(css).toContain("display: flex;");
  expect(css).toContain(
    ":where(*).--display-inline-block.--display-inline-block.--display-inline-block",
  );
  expect(css).toContain("display: inline-block;");
  expect(css).toContain(":where(*).--text-align-center.--text-align-center.--text-align-center");
  expect(css).toContain("text-align: center;");
  expect(css).toContain(":where(*).--text-align-end.--text-align-end.--text-align-end");
  expect(css).toContain("text-align: end;");
});
