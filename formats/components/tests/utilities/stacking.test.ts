import { expect, test } from "vite-plus/test";
import { stackingUtilityCss } from "../../src/index.ts";
import { stacking } from "../../src/utilities/stacking/index.ts";
import { validate } from "../_validate.ts";

test("stacking: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(stacking);
});

test("stacking: global modifier selector shape, chainable onto any component", () => {
  const css = stackingUtilityCss({ prefix: "instui" });
  expect(css).toContain(":where(*).--stack-topmost.--stack-topmost.--stack-topmost");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-topmost);");
  expect(css).toContain(":where(*).--stack-deepest.--stack-deepest.--stack-deepest");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-deepest);");
});
