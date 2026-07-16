import { expect, test } from "vite-plus/test";
import { radioInputGroupCss } from "../../src/index.ts";
import { radioInputGroup } from "../../src/components/radio-input-group.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("radio-input-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(radioInputGroup);
});

test("radio-input-group lays toggle radios out flush as a segmented control", () => {
  const css = norm(radioInputGroupCss({ prefix: "instui" }));
  expect(css).toContain(".instui-radio-input-group {");
  expect(css).toContain(".instui-radio-input-group > legend");
  // simple variant flows into a row for -layout-columns/-inline
  expect(css).toContain(".instui-radio-input-group.-layout-columns");
  // toggle variant: segments sit flush (gap: 0), no connecting borders or overlap (InstUI colSpacing="none")
  expect(css).toContain(".instui-radio-input-group.-variant-toggle {");
  expect(css).toMatch(/\.-variant-toggle \{[^}]*gap: 0/);
  expect(css).not.toContain("border-radius: 0");
  expect(css).not.toContain("margin-inline-start: calc(-1");
  // the focused segment is lifted so its focus ring isn't clipped by a neighbour
  expect(css).toContain(
    ".instui-radio-input-group.-variant-toggle > .instui-radio:has(input:focus-visible) { z-index: 1; }",
  );
});
