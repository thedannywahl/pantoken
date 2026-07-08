import { expect, test } from "vite-plus/test";
import { spacingUtilitiesCss } from "../../src/index.ts";
import { spacing } from "../../src/utilities/spacing.ts";
import { validate } from "../_validate.ts";

test("spacing: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spacing);
});

test("spacing utilities: logical per-side classes on the spacing scale, auto for margin only", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-m-sm { margin: var(--instui-spacing-space-sm); }");
  expect(css).toContain(".instui-mt-lg { margin-block-start: var(--instui-spacing-space-lg); }");
  expect(css).toContain(".instui-mx-auto { margin-inline: auto; }");
  expect(css).toContain(".instui-p-md { padding: var(--instui-spacing-space-md); }");
  expect(css).toContain(".instui-py-0 { padding-block: 0; }");
  // `auto` is a margin-only value.
  expect(css).toContain(".instui-m-auto");
  expect(css).not.toContain(".instui-p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(".ui-mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain(".instui-margin-lg { margin: var(--instui-spacing-space-lg); }");
  expect(css).toContain(".instui-padding-md { padding: var(--instui-spacing-space-md); }");
  expect(css).toContain(
    ".instui-margint-lg { margin-block-start: var(--instui-spacing-space-lg); }",
  );
  expect(css).toContain(".instui-marginx-auto { margin-inline: auto; }");
});
