import { expect, test } from "vite-plus/test";
import { runtimeCss } from "../../src/lib/runtime-css.ts";

test("removes cssdoc placeholder at-rule blocks", () => {
  expect(runtimeCss(".shell { @component breadcrumb { } color: red; }")).toBe(
    ".shell {  color: red; }",
  );
});

test("removes nested cssdoc placeholder at-rule blocks", () => {
  const css = runtimeCss(".shell { @component tabs { .tab { color: red; } } display: flex; }");
  expect(css).toBe(".shell {  display: flex; }");
});

test("removes cssdoc cardinality pseudo-classes", () => {
  expect(runtimeCss(".instui-header:optional { display: flex; }")).toBe(
    ".instui-header { display: flex; }",
  );
  expect(runtimeCss(".instui-row:one-or-more { display: grid; }")).toBe(
    ".instui-row { display: grid; }",
  );
});

test("removes chained cssdoc cardinality pseudo-classes", () => {
  expect(runtimeCss("button:one-or-more:max-2:is(.instui-button) { display: inline-flex; }")).toBe(
    "button:is(.instui-button) { display: inline-flex; }",
  );
});

test("preserves ordinary selector pseudo-classes and pseudo-elements", () => {
  const css = ".instui-button:is(button):hover::before { content: ''; }";
  expect(runtimeCss(css)).toBe(css);
});

test("strips block comments from runtime css", () => {
  expect(runtimeCss("/** @layout wrapper */\n.wrapper { display: flex; }")).toBe(
    "\n.wrapper { display: flex; }",
  );
});
