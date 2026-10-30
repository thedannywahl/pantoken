import { expect, test } from "vite-plus/test";
import { toggleDetailsCss } from "../../src/index.ts";
import { toggleDetails } from "../../src/components/toggle-details/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("toggle-details: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(toggleDetails);
});

test("toggle-details hides the native marker, has a rotating chevron + filled variant", () => {
  const css = norm(toggleDetailsCss({ prefix: "instui" }));
  expect(css).toContain("summary::-webkit-details-marker { display: none; }");
  expect(css).toContain("@scope (.instui-toggle-details)");
  expect(css).toMatch(/&\s*>\s*summary::before/u);
  expect(css).toMatch(/&\[open\]\s*>\s*summary::before\s*\{\s*transform:\s*rotate\(90deg\)/u);
  expect(css).toMatch(/&\.-variant-filled\s*>\s*summary/u);
});

test("toggle-details stops chevron transitions under reduced motion without removing open state", () => {
  const css = norm(toggleDetailsCss({ prefix: "instui" }));
  expect(css).toMatch(
    /@media \(prefers-reduced-motion: reduce\) \{ & > summary::before \{ transition: none; \} \}/u,
  );
  expect(css).toContain("transition: transform 0.2s ease");
  expect(css).toMatch(/&\[open\] > summary::before \{ transform: rotate\(90deg\)/u);
});
