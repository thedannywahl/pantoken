import { expect, test } from "vite-plus/test";
import { radioInputGroupCss } from "../../src/index.ts";
import { radioInputGroup } from "../../src/components/radio-input-group.ts";
import { validate } from "../_validate.ts";

test("radio-input-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(radioInputGroup);
});

test("radio-input-group connects toggle radios into one segmented control", () => {
  const css = radioInputGroupCss({ prefix: "instui" });
  expect(css).toContain(".instui-radio-input-group {");
  expect(css).toContain(".instui-radio-input-group > legend");
  // simple variant flows into a row for -layout-columns/-inline
  expect(css).toContain(".instui-radio-input-group.-layout-columns");
  // toggle variant collapses borders + rounds only the outer ends
  expect(css).toContain(
    ".instui-radio-input-group.-variant-toggle > .instui-radio { border-radius: 0;",
  );
  expect(css).toContain(".instui-radio-input-group.-variant-toggle > .instui-radio:first-of-type");
  expect(css).toContain(
    ".instui-radio-input-group.-variant-toggle > .instui-radio + .instui-radio",
  );
  expect(css).toContain("var(--instui-component-radio-input-toggle-border-radius)");
});
