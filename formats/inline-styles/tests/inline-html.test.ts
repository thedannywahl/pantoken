import { expect, test } from "vite-plus/test";
import { inlineHtml } from "../src/inline-html.ts";
import { flattenScopes } from "../src/flatten-scopes.ts";

test("inlines matching rules and keeps pseudo-class fallbacks", () => {
  const html = '<button class="action">Save</button>';
  const css = ".action { color: red; } .action:hover { color: blue; }";

  const result = inlineHtml(html, css);

  expect(result).toContain('style="color: red;"');
  expect(result).toContain(".action:hover");
});

test("preserves CSS variables for runtime theme overrides", () => {
  const result = inlineHtml('<div class="surface"></div>', ".surface { color: var(--brand); }");

  expect(result).toContain("var(--brand)");
});

test("does not let CSS close the temporary style element", () => {
  const result = inlineHtml("<div></div>", "/* </style><script>attack()</script> */");

  expect(result).not.toContain("<script>");
});

test("flattens scoped component rules before inlining", () => {
  const css = "@scope (.action) { & { color: red; } &:hover { color: blue; } }";
  const result = inlineHtml('<button class="action">Save</button>', css);

  expect(result).toContain('style="color: red;"');
  expect(result).toContain(".action:hover");
});

test("keeps commas inside scoped selector functions and attribute values", () => {
  const css = String.raw`@scope (.card, :is(.primary, .secondary), [data-label="a,b"], [data-path="a\,b"]) { button { color: red; } }`;

  expect(flattenScopes(css)).toContain(
    '.card button, :is(.primary, .secondary) button, [data-label="a,b"] button, [data-path="a\\,b"] button',
  );
});

test("flattens descendant rules inside media queries without scoping keyframes", () => {
  const css = `@scope (.card) { @media (min-width: 1px) { .button { color: red; } } @keyframes fade { from { opacity: 0; } to { opacity: 1; } } }`;
  const result = flattenScopes(css);

  expect(result).toContain(".card .button");
  expect(result).toContain("@keyframes fade");
  expect(result).toContain("from { opacity: 0; }");
  expect(result).not.toContain(".card from");
});

test("removes empty scopes and rejects unsupported scope syntax", () => {
  expect(flattenScopes("@scope (.empty);")).toBe("");
  expect(() => flattenScopes("@scope;")).toThrow("Unsupported @scope parameters");
  expect(() => flattenScopes("@scope (.root) to (.limit) {}")).toThrow(
    "Unsupported @scope parameters",
  );
  expect(() => flattenScopes("@scope () {}")).toThrow("Empty @scope root");
});
