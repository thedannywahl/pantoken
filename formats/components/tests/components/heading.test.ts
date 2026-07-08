import { expect, test } from "vite-plus/test";
import { headingCss } from "../../src/index.ts";
import { heading } from "../../src/components/heading.ts";
import { validate } from "../_validate.ts";

test("heading: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(heading);
});

test("heading exposes levels, type variants, colours, and an ai gradient", () => {
  const css = headingCss({ prefix: "instui" });
  expect(css).toContain(".instui-heading.-level-h1");
  expect(css).toContain("var(--instui-component-heading-h1-font-weight)");
  expect(css).toContain(".instui-heading.-variant-title-page");
  expect(css).toContain("var(--instui-component-heading-title-page-desktop-font-size)");
  expect(css).toContain(".instui-heading.-variant-label");
  expect(css).toContain(".instui-heading.-color-secondary");
  expect(css).toContain(".instui-heading.-color-ai");
  expect(css).toContain(".instui-heading.-border-bottom");
});
