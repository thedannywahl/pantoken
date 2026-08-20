import { expect, test } from "vite-plus/test";
import { stackingUtilityCss } from "../../src/index.ts";
import { stacking } from "../../src/utilities/stacking/index.ts";
import { validate } from "../_validate.ts";

test("stacking: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(stacking);
});

test("stacking: three-selector pattern (base + namespaced + bare modifiers)", () => {
  const css = stackingUtilityCss({ prefix: "instui" });
  expect(css).toContain(".instui-stacking-stack-topmost, .-stacking-stack-topmost, -stack-topmost");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-topmost);");
  expect(css).toContain(".instui-stacking-stack-deepest, .-stacking-stack-deepest, -stack-deepest");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-deepest);");
});
