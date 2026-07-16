import { expect, test } from "vite-plus/test";
import { treeBrowserCss } from "../../src/index.ts";
import { treeBrowser } from "../../src/components/tree-browser.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("tree-browser: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(treeBrowser);
});

test("tree-browser styles nested details with a rotating chevron + hover/selected", () => {
  const css = norm(treeBrowserCss({ prefix: "instui" }));
  expect(css).toContain(".instui-tree-browser details > summary");
  expect(css).toContain(
    ".instui-tree-browser details[open] > summary::before { transform: rotate(90deg); }",
  );
  expect(css).toContain(".instui-tree-browser .item.-selected");
  expect(css).toContain(".instui-tree-browser.-size-lg");
});
