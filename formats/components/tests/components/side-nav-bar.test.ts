import { expect, test } from "vite-plus/test";
import { sideNavBarCss, sideNavBarItemCss } from "../../src/index.ts";
import { sideNavBar } from "../../src/components/side-nav-bar/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("side-nav-bar: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(sideNavBar);
});

test("side-nav-bar is a vertical rail with selected + minimized states", () => {
  const css = norm(sideNavBarCss({ prefix: "instui" }));
  const item = norm(sideNavBarItemCss({ prefix: "instui" }));
  expect(item).toContain("@scope (.instui-side-nav-bar)");
  expect(item).toMatch(/:scope\s*\{\s*>\s*\.item/u);
  expect(item).toMatch(/>\s*\.item\.-selected/u);
  expect(css).toContain(".instui-side-nav-bar.-minimized");
  expect(css).toContain(".instui-side-nav-bar.-minimized .item .label { display: none; }");
});
