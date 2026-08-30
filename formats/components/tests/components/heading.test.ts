import { expect, test } from "vite-plus/test";
import { headingCss } from "../../src/index.ts";
import { heading } from "../../src/components/heading/index.ts";
import { validate } from "../_validate.ts";

test("heading: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(heading);
});

test("heading exposes levels, type variants, colours, and an ai gradient", () => {
  const css = headingCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-heading)");
  expect(css).toContain("&.-level-h1");
  expect(css).toContain("var(--instui-component-heading-h1-font-weight)");
  expect(css).toContain("&.-variant-title-page");
  expect(css).toContain("var(--instui-component-heading-title-page-desktop-font-size)");
  expect(css).toContain("&.-variant-label");
  expect(css).toContain("&.-color-secondary");
  expect(css).toContain("&.-color-ai");
  expect(css).toContain("&.-border-bottom");
});
