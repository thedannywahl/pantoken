import { expect, test } from "vite-plus/test";
import { treeBrowserCss } from "../../src/index.ts";
import { treeBrowser } from "../../src/components/tree-browser/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("tree-browser: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(treeBrowser);
});

test("tree-browser styles nested details with a rotating chevron + hover/selected", () => {
  const css = norm(treeBrowserCss({ prefix: "instui" }));
  expect(css).toContain("@scope (.instui-tree-browser)");
  expect(css).toMatch(/&\s+details\s*>\s*summary/u);
  expect(css).toMatch(
    /&\s+details\[open\]\s*>\s*summary::before\s*\{\s*transform:\s*rotate\(90deg\)/u,
  );
  expect(css).toMatch(/&\s+\.item\.-selected/u);
  expect(css).toMatch(/&\.-size-lg/u);
});
