import { expect, test } from "vite-plus/test";
import { spacingUtilitiesCss } from "../../src/index.ts";
import { spacing } from "../../src/utilities/spacing.ts";
import { validate } from "../_validate.ts";

test("spacing: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spacing);
}, 60_000);

test("spacing utilities: logical per-side classes on the spacing scale, auto for margin only", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-m-sm, .instui-button.-m-sm");
  expect(css).toContain("margin: var(--instui-spacing-space-sm);");
  expect(css).toContain(".instui-mt-lg, .instui-button.-mt-lg");
  expect(css).toContain("margin-block-start: var(--instui-spacing-space-lg);");
  expect(css).toContain(".instui-mx-auto, .instui-button.-mx-auto");
  expect(css).toContain("margin-inline: auto;");
  expect(css).toContain(".instui-p-md, .instui-button.-p-md");
  expect(css).toContain("padding: var(--instui-spacing-space-md);");
  expect(css).toContain(".instui-py-0, .instui-button.-py-0");
  expect(css).toContain(
    "padding-block: var(--instui-component-shared-tokens-spacing-general-space-none);",
  );
  expect(css).toContain(".instui-mb-none, .instui-button.-mb-none");
  expect(css).toContain(
    "margin-block-end: var(--instui-component-shared-tokens-spacing-general-space-none);",
  );
  expect(css).toContain(".instui-alert.-mb-sm");
  // `auto` is a margin-only value.
  expect(css).toContain(".instui-m-auto");
  expect(css).not.toContain(".instui-p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(".ui-mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain(".instui-margin-lg, .instui-button.-margin-lg");
  expect(css).toContain(".instui-padding-md, .instui-button.-padding-md");
  expect(css).toContain(".instui-margint-lg, .instui-button.-margint-lg");
  expect(css).toContain(".instui-marginx-auto, .instui-button.-marginx-auto");
  // Fully long, dash-separated spellings (property, side, and step all spelled out).
  expect(css).toContain(".instui-margin-bottom-small, .instui-button.-margin-bottom-small");
  expect(css).toContain("margin-block-end: var(--instui-spacing-space-sm);");
  expect(css).toContain(".instui-padding-medium, .instui-button.-padding-medium");
  expect(css).toContain(".instui-margin-inline-auto, .instui-button.-margin-inline-auto");
  expect(css).toContain("margin-inline: auto;");
  // `view` is a component-attached alias target alongside every component.
  expect(css).toContain(".instui-view.-mb-sm");
  expect(css).toContain(".instui-view.-margin-bottom-small");
}, 60_000);
