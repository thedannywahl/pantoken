import { expect, test } from "vite-plus/test";
import { billboardCss } from "../../src/index.ts";
import { billboard } from "../../src/components/billboard.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("billboard: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(billboard);
});

test("billboard size variants scale spacing, heading, message, and hero icon glyph", () => {
  const css = norm(billboardCss({ prefix: "instui" }));

  expect(css).toContain(".instui-billboard.-size-sm {");
  expect(css).toContain(".instui-billboard.-size-lg {");
  expect(css).toContain(".instui-billboard.-size-sm .message {");
  expect(css).toContain(".instui-billboard.-size-lg .message {");

  expect(css).toContain(":scope.-size-sm>.heading {");
  expect(css).toContain(":scope.-size-lg>.heading {");
  expect(css).toContain(":scope.-size-small>.heading {");
  expect(css).toContain(":scope.-size-large>.heading {");
  expect(css).toContain(':scope>.hero[class*="-icon-"] {');
  expect(css).toContain(':scope.-size-sm>.hero[class*="-icon-"] {');
  expect(css).toContain(':scope.-size-lg>.hero[class*="-icon-"] {');
  expect(css).toContain(':scope.-size-small>.hero[class*="-icon-"] {');
  expect(css).toContain(':scope.-size-large>.hero[class*="-icon-"] {');
});
