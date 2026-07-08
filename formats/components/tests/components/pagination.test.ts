import { expect, test } from "vite-plus/test";
import { paginationCss } from "../../src/index.ts";
import { pagination } from "../../src/components/pagination.ts";
import { validate } from "../_validate.ts";

test("pagination: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(pagination);
});

test("pagination: brand page links, a filled current page, nav arrows, ellipsis, input variant", () => {
  const pg = paginationCss({ prefix: "instui" });
  // Pages + arrows are brand-text buttons; the current page is a filled primary button.
  expect(pg).toContain("var(--instui-color-text-interactive-navigation-primary-base)");
  expect(pg).toContain("var(--instui-color-background-interactive-action-primary-base)");
  expect(pg).toContain(".page[aria-current]");
  // Nav arrows (first/prev/next/last), a disabled state, and the truncation ellipsis (scoped forms).
  expect(pg).toContain(":scope > .arrow");
  expect(pg).toContain('.arrow[aria-disabled="true"]');
  expect(pg).toContain(":scope > .ellipsis");
  // variant="input" sizes the input from the page-input token.
  expect(pg).toContain(".instui-pagination.-variant-input");
  expect(pg).toContain("var(--instui-component-pagination-page-input-input-width)");
});
