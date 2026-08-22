import { expect, test } from "vite-plus/test";
import { spacingUtilitiesCss } from "../../src/index.ts";
import { spacing } from "../../src/utilities/spacing/index.ts";
import { validate } from "../_validate.ts";

test("spacing: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spacing);
}, 60_000);

test("spacing utilities: global modifier selector shape, chainable onto any component", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(
    ":where(*).--m-sm.--m-sm.--m-sm { margin: var(--instui-spacing-space-sm); }",
  );
  expect(css).toContain(
    ":where(*).--mt-lg.--mt-lg.--mt-lg { margin-block-start: var(--instui-spacing-space-lg); }",
  );
  expect(css).toContain(":where(*).--mx-auto.--mx-auto.--mx-auto { margin-inline: auto; }");
  expect(css).toContain(
    ":where(*).--p-md.--p-md.--p-md { padding: var(--instui-spacing-space-md); }",
  );
  expect(css).toContain(
    ":where(*).--py-0.--py-0.--py-0 { padding-block: var(--instui-component-shared-tokens-spacing-general-space-none); }",
  );
  expect(css).toContain(
    ":where(*).--mb-none.--mb-none.--mb-none { margin-block-end: var(--instui-component-shared-tokens-spacing-general-space-none); }",
  );
  // `auto` is a margin-only value.
  expect(css).toContain("--m-auto");
  expect(css).not.toContain("--p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(":where(*).--mt-lg.--mt-lg.--mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain("--margin-lg.--margin-lg.--margin-lg");
  expect(css).toContain("--padding-md.--padding-md.--padding-md");
  expect(css).toContain("--margint-lg.--margint-lg.--margint-lg");
  expect(css).toContain("--marginx-auto.--marginx-auto.--marginx-auto");
  // Fully long, dash-separated spellings (property, side, and step all spelled out).
  expect(css).toContain("--margin-bottom-small.--margin-bottom-small.--margin-bottom-small");
  expect(css).toContain("margin-block-end: var(--instui-spacing-space-sm);");
  expect(css).toContain("--padding-medium.--padding-medium.--padding-medium");
  expect(css).toContain("--margin-inline-auto.--margin-inline-auto.--margin-inline-auto");
  expect(css).toContain("margin-inline: auto;");
}, 60_000);
