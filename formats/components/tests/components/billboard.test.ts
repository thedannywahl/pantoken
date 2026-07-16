import { expect, test } from "vite-plus/test";
import { billboardCss } from "../../src/index.ts";
import { billboard } from "../../src/components/billboard.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("billboard: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(billboard);
});

test("billboard size variants map to InstUI icon and text scales", () => {
  const css = norm(billboardCss({ prefix: "instui" }));
  const selectors = css.replaceAll(/\s*>\s*/g, ">");
  const compact = selectors.replaceAll(/\s+/g, "");

  expect(selectors).toContain(".instui-billboard.-size-sm {");
  expect(selectors).toContain(".instui-billboard.-size-lg {");
  expect(selectors).toContain(".instui-billboard.-size-sm .message {");
  expect(selectors).toContain(".instui-billboard.-size-lg .message {");
  expect(selectors).toContain("font-size: var(--instui-font-size-text-sm);");
  expect(selectors).toContain("font-size: 1.375rem;");

  expect(selectors).toContain(":scope>.heading {");
  expect(selectors).toContain("font-size: var(--instui-component-text-font-size-x-x-large);");
  expect(selectors).not.toContain(":scope.-size-sm>.heading {");
  expect(selectors).not.toContain(":scope.-size-lg>.heading {");
  expect(selectors).not.toContain(":scope.-size-small>.heading {");
  expect(selectors).not.toContain(":scope.-size-large>.heading {");

  expect(selectors).toContain(':scope>.hero[class*="-icon-"] {');
  expect(selectors).toContain(':scope.-size-sm>.hero[class*="-icon-"] {');
  expect(selectors).toContain(':scope.-size-lg>.hero[class*="-icon-"] {');
  expect(selectors).toContain(':scope.-size-small>.hero[class*="-icon-"] {');
  expect(selectors).toContain(':scope.-size-large>.hero[class*="-icon-"] {');
  expect(selectors).toContain("font-size: var(--instui-component-icon-illu-md);");
  expect(selectors).toContain("font-size: var(--instui-component-icon-illu-sm);");
  expect(selectors).toContain("font-size: var(--instui-component-icon-illu-lg);");
  expect(selectors).toContain(":scope>.message {");
  expect(selectors).toContain("font-size: var(--instui-font-size-text-base);");
  expect(compact).toContain("color:var(--instui-component-link-text-color);");
});

test("billboard clickable states scope icon, focus ring, and active inversion correctly", () => {
  const css = norm(billboardCss({ prefix: "instui" }));
  const selectors = css.replaceAll(/\s*>\s*/g, ">");
  const compact = selectors.replaceAll(/\s+/g, "");

  expect(selectors).toContain(".instui-billboard.-clickable:hover {");
  expect(selectors).toContain(
    "border-style: var(--instui-component-billboard-button-hover-border-style);",
  );
  expect(compact).toContain(":scope.-clickable:hover>.hero{");
  expect(selectors).toContain("color: var(--instui-component-link-text-hover-color);");

  expect(selectors).toContain(".instui-billboard.-clickable:focus {");
  expect(selectors).toContain("border-style: solid;");
  expect(selectors).toContain("outline: var(--instui-focus-outline-width)");

  expect(selectors).toContain(".instui-billboard.-clickable:active {");
  expect(selectors).toContain("background: var(--instui-component-billboard-clickable-active-bg);");
  expect(selectors).toContain(":scope.-clickable:active>.hero,");
  expect(selectors).toContain(":scope.-clickable:active>.message {");
  expect(selectors).toContain("color: var(--instui-component-billboard-clickable-active-text);");
  expect(selectors).not.toContain(":scope.-clickable>.heading,");
});
