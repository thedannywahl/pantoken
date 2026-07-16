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
});
