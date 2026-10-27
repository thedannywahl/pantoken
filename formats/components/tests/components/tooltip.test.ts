import { expect, test } from "vite-plus/test";
import { tooltipCss } from "../../src/index.ts";
import { tooltip } from "../../src/components/tooltip/index.ts";
import { validate } from "../_validate.ts";

test("tooltip: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(tooltip);
});

test("tooltip shows a .tip bubble on hover/focus with placements", () => {
  const css = tooltipCss({ prefix: "instui" });
  const selectors = css.replace(/\s+/g, "");
  expect(css).toContain("@scope (.instui-tooltip)");
  expect(selectors).toContain(">.tip{");
  expect(css).toContain("inline-size: max-content;");
  expect(selectors).toContain("&:not([data-tooltip-managed]):hover>.tip,");
  expect(selectors).toContain("&:not([data-tooltip-managed]):focus-within>.tip,");
  expect(selectors).toContain("&[data-tooltip-managed]>.tip.-show");
  expect(css).toContain("pointer-events: auto;");
  expect(css).toContain("&::before");
  expect(css).toContain("block-size: var(--instui-spacing-space-xs);");
  // Placement modifiers live on the .tip itself (matching the web-component + demo markup).
  expect(css).toContain("&.-placement-bottom");
  expect(css).toContain("var(--instui-component-tooltip-padding)");
});
