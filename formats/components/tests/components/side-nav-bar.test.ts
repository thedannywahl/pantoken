import { expect, test } from "vite-plus/test";
import { sideNavBarCss } from "../../src/index.ts";
import { sideNavBar } from "../../src/components/side-nav-bar.ts";
import { validate } from "../_validate.ts";

test("side-nav-bar: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(sideNavBar);
});

test("side-nav-bar is a vertical rail with selected + minimized states", () => {
  const css = sideNavBarCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-side-nav-bar)");
  expect(css).toContain(":scope > .item");
  expect(css).toContain(":scope > .item.-selected");
  expect(css).toContain(".instui-side-nav-bar.-minimized");
  expect(css).toContain(".instui-side-nav-bar.-minimized .item .label { display: none; }");
});
