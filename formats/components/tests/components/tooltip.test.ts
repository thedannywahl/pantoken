import { expect, test } from "vite-plus/test";
import { tooltipCss } from "../../src/index.ts";
import { tooltip } from "../../src/components/tooltip.ts";
import { validate } from "../_validate.ts";

test("tooltip: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(tooltip);
});

test("tooltip shows a .tip bubble on hover/focus with placements", () => {
  const css = tooltipCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-tooltip)");
  expect(css).toContain(":scope > .tip");
  expect(css).toContain(".instui-tooltip:hover > .tip,");
  expect(css).toContain(".instui-tooltip:focus-within > .tip");
  // Placement modifiers live on the .tip itself (matching the web-component + demo markup).
  expect(css).toContain(".instui-tooltip > .tip.-placement-bottom");
  expect(css).toContain("var(--instui-component-tooltip-padding)");
});
