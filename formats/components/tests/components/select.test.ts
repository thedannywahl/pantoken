import { expect, test } from "vite-plus/test";
import { selectCss } from "../../src/index.ts";

test("selectCss is an experimental @supports enhancement of simple-select using options-item tokens", () => {
  const css = selectCss({ prefix: "instui" });
  // Everything is gated behind the experimental customizable-select feature query.
  expect(css).toContain("@supports (appearance: base-select)");
  expect(css).toContain("appearance: base-select");
  expect(css).toContain(".instui-simple-select::picker(select)");
  expect(css).toContain(".instui-simple-select option");
  expect(css).toContain(".instui-simple-select option::checkmark");
  // Options are painted from the options-item token family (panel + hover + selected).
  expect(css).toContain("var(--instui-component-options-item-background)");
  expect(css).toContain("var(--instui-component-options-item-highlighted-background)");
  expect(css).toContain("var(--instui-component-options-item-selected-background)");
  // It targets .instui-simple-select — no new component class.
  expect(css).not.toContain(".instui-select ");
});
