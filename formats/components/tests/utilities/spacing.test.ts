import { expect, test } from "vite-plus/test";
import { spacingUtilitiesCss } from "../../src/index.ts";
import { spacing } from "../../src/utilities/spacing/index.ts";
import { validate } from "../_validate.ts";

test("spacing: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spacing);
}, 60_000);

test("spacing utilities: bare prefixed class + bare dash modifier (no per-component fan-out)", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-m-sm, .-m-sm { margin: var(--instui-spacing-space-sm); }");
  expect(css).toContain(
    ".instui-mt-lg, .-mt-lg { margin-block-start: var(--instui-spacing-space-lg); }",
  );
  expect(css).toContain(".instui-mx-auto, .-mx-auto { margin-inline: auto; }");
  expect(css).toContain(".instui-p-md, .-p-md { padding: var(--instui-spacing-space-md); }");
  expect(css).toContain(
    ".instui-py-0, .-py-0 { padding-block: var(--instui-component-shared-tokens-spacing-general-space-none); }",
  );
  expect(css).toContain(
    ".instui-mb-none, .-mb-none { margin-block-end: var(--instui-component-shared-tokens-spacing-general-space-none); }",
  );
  // `auto` is a margin-only value.
  expect(css).toContain(".instui-m-auto");
  expect(css).not.toContain(".instui-p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(".ui-mt-lg, .-mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain(".instui-margin-lg, .-margin-lg");
  expect(css).toContain(".instui-padding-md, .-padding-md");
  expect(css).toContain(".instui-margint-lg, .-margint-lg");
  expect(css).toContain(".instui-marginx-auto, .-marginx-auto");
  // Fully long, dash-separated spellings (property, side, and step all spelled out).
  expect(css).toContain(".instui-margin-bottom-small, .-margin-bottom-small");
  expect(css).toContain("margin-block-end: var(--instui-spacing-space-sm);");
  expect(css).toContain(".instui-padding-medium, .-padding-medium");
  expect(css).toContain(".instui-margin-inline-auto, .-margin-inline-auto");
  expect(css).toContain("margin-inline: auto;");
}, 60_000);
