import { expect, test } from "vite-plus/test";
import { selectCss } from "../../src/index.ts";

test("selectCss is an experimental @supports enhancement of simple-select using options-item tokens", () => {
  const css = selectCss({ prefix: "instui" });
  // Everything is gated behind the experimental customizable-select feature query.
  expect(css).toContain("@supports (appearance: base-select)");
  expect(css).toContain("appearance: base-select");
  expect(css).toContain("@scope (.instui-simple-select)");
  expect(css).toMatch(/&::picker\(select\)/u);
  expect(css).toMatch(/&\s+option/u);
  expect(css).toMatch(/&\s+option::checkmark/u);
  // Options are painted from the options-item token family (panel + hover + selected).
  expect(css).toContain("var(--instui-component-options-item-background)");
  expect(css).toContain("var(--instui-component-options-item-highlighted-background)");
  expect(css).toContain("var(--instui-component-options-item-selected-background)");
  // It targets simple-select — no new component class.
  expect(css).not.toContain(".instui-select ");
});
