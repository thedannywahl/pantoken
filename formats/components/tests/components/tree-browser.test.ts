import { expect, test } from "vite-plus/test";
import { treeBrowserCss } from "../../src/index.ts";
import { treeBrowser } from "../../src/components/tree-browser/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";
import { parseCssDocs } from "@cssdoc/core";
import { collectExamples } from "../../scripts/audit-accessibility.ts";
import { Window } from "happy-dom";

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

test("tree-browser examples use named focusable treeitems and production behavior, not disclosure tree roles", () => {
  const css = treeBrowserCss({ prefix: "instui" });
  const [example] = collectExamples(parseCssDocs(css), ["tree-browser"]);
  const window = new Window();
  window.document.body.innerHTML = example!.html;
  const root = window.document.querySelector('[role="tree"]')!;
  expect(root.getAttribute("aria-label")).toBe("Course files");
  expect(root.querySelector("details")).toBeNull();
  const items = [...root.querySelectorAll('[role="treeitem"]')];
  expect(items).toHaveLength(6);
  expect(items.filter((item) => item.getAttribute("tabindex") === "0")).toHaveLength(1);
  for (const branch of root.querySelectorAll("[aria-expanded]")) {
    expect(branch.getAttribute("aria-labelledby")).toBeTruthy();
    const group = window.document.getElementById(branch.getAttribute("aria-owns")!);
    expect(group?.getAttribute("role")).toBe("group");
    expect(branch.contains(group!)).toBe(false);
  }
  expect(css).toContain("@pantoken/interactions/tree-browser.js");
  expect(css).toContain('[role="treeitem"][aria-expanded="true"] > .item::before');
  expect(css).toContain("prefers-reduced-motion");
  void window.happyDOM.abort();
});
