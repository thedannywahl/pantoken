import { expect, test } from "vite-plus/test";
import { parseNodes, parseSelector, renderNode, splitRules } from "../src/wrapper-context.ts";

test("splitRules ignores plain declarations preceding a nested selector", () => {
  const rules = splitRules("display: flex;\n\n.top { color: red; }");
  expect(rules).toEqual([{ selector: ".top", body: " color: red; " }]);
});

test("splitRules returns every top-level rule, ignoring nested braces", () => {
  const rules = splitRules(".a { .b { color: red; } }\n.c { color: blue; }");
  expect(rules.map((r) => r.selector)).toEqual([".a", ".c"]);
});

test("parseSelector turns an @component at-rule into a comment placeholder", () => {
  expect(parseSelector("@component breadcrumb")).toEqual({ tag: "", comment: "breadcrumb" });
});

test("parseSelector skips a &-scoped state selector", () => {
  expect(parseSelector("&.-optional:optional")).toBeNull();
});

test("parseSelector reads a class attribute selector as a className", () => {
  expect(parseSelector('div[class~="foo"]')).toEqual({
    tag: "div",
    className: "foo",
    optional: false,
  });
});

test("parseSelector reads a non-class attribute selector as attrs", () => {
  expect(parseSelector("slot[name='content']")).toEqual({
    tag: "slot",
    attrs: { name: "content" },
    optional: false,
  });
});

test("parseSelector marks a node optional from an :optional pseudo-class", () => {
  expect(parseSelector(".foo:optional")).toEqual({ tag: "div", className: "foo", optional: true });
});

test("parseSelector defaults to a div tag for a bare class selector", () => {
  expect(parseSelector(".container")).toEqual({
    tag: "div",
    className: "container",
    optional: false,
  });
});

test("parseNodes builds a nested tree from comma-separated selectors", () => {
  const nodes = parseNodes(".a, .b { .child { color: red; } }");
  expect(nodes).toEqual([
    {
      tag: "div",
      className: "a",
      optional: false,
      children: [{ tag: "div", className: "child", optional: false, children: [] }],
    },
    {
      tag: "div",
      className: "b",
      optional: false,
      children: [{ tag: "div", className: "child", optional: false, children: [] }],
    },
  ]);
});

test("renderNode renders a comment node without an element", () => {
  const node = { tag: "", comment: "breadcrumb", children: [] };
  expect(renderNode(node, "html", 0)).toBe("<!-- breadcrumb -->");
  expect(renderNode(node, "jsx", 0)).toBe("{/* breadcrumb */}");
});

test("renderNode marks an optional node with a trailing comment", () => {
  const node = { tag: "div", className: "foo", optional: true, children: [] };
  expect(renderNode(node, "html", 0)).toBe('<div class="foo"></div> <!-- optional -->');
});

test("renderNode renders attrs and nests children with indentation", () => {
  const node = {
    tag: "slot",
    attrs: { name: "header" },
    children: [{ tag: "div", className: "child", children: [] }],
  };
  expect(renderNode(node, "html", 1)).toBe(
    '  <slot name="header">\n    <div class="child"></div>\n  </slot>',
  );
});

test("renderNode injects the main content slot text per format", () => {
  const node = { tag: "slot", attrs: { name: "content" }, children: [] };
  expect(renderNode(node, "html", 0)).toContain('class="instui-button -color-primary"');
  expect(renderNode(node, "jsx", 0)).toContain('className="instui-button -color-primary"');
});

test("renderNode injects known part placeholder text (e.g. title) over children", () => {
  const node = { tag: "div", className: "title", children: [] };
  expect(renderNode(node, "html", 0)).toBe('<div class="title">\n  {{projectName}}\n</div>');
});
