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
  expect(css).toContain(".instui-breadcrumb.-size-sm .link:not(:last-child)::after");
  expect(css).toContain(".instui-breadcrumb.-size-lg .link:not(:last-child)::after");
  expect(css).toContain(":scope > .link:not(:last-child)::after");
});

test("breadcrumb.link collapses to a back-link at each breakpoint", () => {
  const css = breadcrumbLinkCss({ prefix: "instui" });
  for (const [name, width] of [
    ["sm", "30rem"],
    ["md", "48rem"],
    ["lg", "64rem"],
    ["xl", "80rem"],
  ]) {
    expect(css).toContain(`@media (max-width: ${width})`);
    expect(css).toContain(
      `:scope.-collapse-${name} > ol:has(> .link:nth-last-child(2)) > .link:not(:nth-last-child(2))`,
    );
    expect(css).toContain(`:scope.-collapse-${name} > .link:nth-last-child(2)::after`);
    expect(css).toContain(
      `:scope.-collapse-${name} > .link:nth-last-child(2) > a > [class*="-icon-"]`,
    );
    expect(css).toContain(`:scope.-collapse-${name} > .link:nth-last-child(2) > a::before`);
    expect(css).toContain("var(--instui-icon-arrow-left)");
    expect(css).toContain(
      `[dir="rtl"] :scope.-collapse-${name} > .link:nth-last-child(2) > a::before`,
    );
  }
});
