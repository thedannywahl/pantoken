import { expect, test } from "vite-plus/test";
import { stackingUtilityCss } from "../../src/index.ts";
import { stacking } from "../../src/utilities/stacking/index.ts";
import { validate } from "../_validate.ts";

test("stacking: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(stacking);
});

test("stacking: three-selector pattern (base + namespaced + bare modifiers)", () => {
  const css = stackingUtilityCss({ prefix: "instui" });
  expect(css).toContain(".instui-stack-topmost, .instui-button.-stack-topmost");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-topmost);");
  expect(css).toContain(".instui-stack-deepest, .instui-button.-stack-deepest");
  expect(css).toContain("z-index: var(--instui-component-view-stacking-deepest);");
});
