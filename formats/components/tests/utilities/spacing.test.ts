import { expect, test } from "vite-plus/test";
import { spacingUtilitiesCss } from "../../src/index.ts";
import { spacing } from "../../src/utilities/spacing/index.ts";
import { validate } from "../_validate.ts";

test("spacing: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spacing);
}, 60_000);

test("spacing utilities: three-selector pattern (base + namespaced + bare modifiers)", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  // Verify three selectors are present (base + namespaced + bare)
  // All three selectors in one rule set
  expect(css).toContain(".instui-spacing-m-sm, .-spacing-m-sm, -m-sm");
  expect(css).toContain("margin: var(--instui-spacing-space-sm);");
  expect(css).toContain(".instui-spacing-mt-lg, .-spacing-mt-lg, -mt-lg");
  expect(css).toContain("margin-block-start: var(--instui-spacing-space-lg);");
  expect(css).toContain(".instui-spacing-mx-auto, .-spacing-mx-auto, -mx-auto");
  expect(css).toContain("margin-inline: auto;");
  expect(css).toContain(".instui-spacing-p-md, .-spacing-p-md, -p-md");
  expect(css).toContain("padding: var(--instui-spacing-space-md);");
  expect(css).toContain(".instui-spacing-py-0, .-spacing-py-0, -py-0");
  expect(css).toContain(
    "padding-block: var(--instui-component-shared-tokens-spacing-general-space-none);",
  );
  expect(css).toContain(".instui-spacing-mb-none, .-spacing-mb-none, -mb-none");
  expect(css).toContain(
    "margin-block-end: var(--instui-component-shared-tokens-spacing-general-space-none);",
  );
  // Bare modifiers work for composition at consumer level
  expect(css).toContain("-mb-sm");
  // `auto` is a margin-only value.
  expect(css).toContain("-m-auto");
  expect(css).not.toContain("-p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(".ui-spacing-mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain(".instui-spacing-margin-lg, .-spacing-margin-lg, -margin-lg");
  expect(css).toContain(".instui-spacing-padding-md, .-spacing-padding-md, -padding-md");
  expect(css).toContain(".instui-spacing-margint-lg, .-spacing-margint-lg, -margint-lg");
  expect(css).toContain(".instui-spacing-marginx-auto, .-spacing-marginx-auto, -marginx-auto");
  // Fully long, dash-separated spellings (property, side, and step all spelled out).
  expect(css).toContain(
    ".instui-spacing-margin-bottom-small, .-spacing-margin-bottom-small, -margin-bottom-small",
  );
  expect(css).toContain("margin-block-end: var(--instui-spacing-space-sm);");
  expect(css).toContain(
    ".instui-spacing-padding-medium, .-spacing-padding-medium, -padding-medium",
  );
  expect(css).toContain(
    ".instui-spacing-margin-inline-auto, .-spacing-margin-inline-auto, -margin-inline-auto",
  );
  expect(css).toContain("margin-inline: auto;");
}, 60_000);
