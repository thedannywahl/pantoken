import { expect, test } from "vite-plus/test";
import { breadcrumbCss, breadcrumbLinkCss } from "../../src/index.ts";
import { breadcrumb } from "../../src/components/breadcrumb/index.ts";
import { breadcrumbLink } from "../../src/components/breadcrumb/members/link/index.ts";
import { validate } from "../_validate.ts";

test("breadcrumb: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(breadcrumb);
});

test("breadcrumb.link: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(breadcrumbLink);
});

test("breadcrumb lays out its ol, not the nav wrapper", () => {
  const css = breadcrumbCss({ prefix: "instui" });
  expect(css).toContain(".instui-breadcrumb > ol {");
  expect(css).toContain("list-style: none;");
});

test("breadcrumb.link separators scale with the parent's size modifiers", () => {
  const css = breadcrumbLinkCss({ prefix: "instui" });
  expect(css).toContain("&.-size-sm li:not(:last-child)::after");
  expect(css).toContain("&.-size-lg li:not(:last-child)::after");
  expect(css).toContain("li:not(:last-child)::after");
});

test("breadcrumb.link collapses to a back-link at a shared breakpoint", () => {
  const css = breadcrumbLinkCss({ prefix: "instui" });
  expect(css).toContain("@media (max-width: 47.9375em)");
  expect(css).toContain("> ol:has(> li:nth-last-child(2)) > li:not(:nth-last-child(2))");
  expect(css).toContain("li:nth-last-child(2)::before");
  expect(css).toContain(
    "-webkit-mask: var(--instui-icon-chevron-left) center / contain no-repeat;",
  );
  expect(css).toContain('[dir="rtl"] & > li:nth-last-child(2) > a::before');
});
