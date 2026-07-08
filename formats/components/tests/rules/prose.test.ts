import { expect, test } from "vite-plus/test";
import { proseCss } from "../../src/index.ts";
import { prose } from "../../src/rules/prose.ts";
import { validate } from "../_validate.ts";

test("prose: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(prose);
});

test("prose styles GFM strikethrough and task lists", () => {
  const css = proseCss();
  expect(css).toContain(".pantoken-prose del");
  expect(css).toContain("line-through");
  expect(css).toContain('.pantoken-prose input[type="checkbox"]');
});

test("prose headings map to the Heading component tokens; body to Text content", () => {
  const css = proseCss();
  // Headings use per-level Heading font size + weight and the single heading line-height/colour.
  expect(css).toContain("var(--instui-component-heading-h1-font-weight)");
  expect(css).toContain("var(--instui-component-heading-h6-font-size)");
  expect(css).toContain("var(--instui-component-heading-line-height)");
  expect(css).toContain("var(--instui-component-heading-base-color)");
  // Body text is the Text \`content\` type style, and <small> is \`contentSmall\`.
  expect(css).toContain("var(--instui-component-text-content-line-height)");
  expect(css).toContain("var(--instui-component-text-content-small-font-size)");
  expect(css).toContain("var(--instui-component-text-content-important-font-weight)");
});
