import { expect, test } from "vite-plus/test";
import { closeButtonCss } from "../../src/index.ts";
import { closeButton } from "../../src/components/close-button/index.ts";
import { validate } from "../_validate.ts";

test("close-button: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(closeButton);
});

test("close-button is a transparent icon button with an auto glyph, sizes, and on-color", () => {
  const css = closeButtonCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-close-button)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&::before/u);
  expect(css).toContain("var(--instui-icon-x)");
  expect(css).toMatch(/&\.-size-sm/u);
  expect(css).toMatch(/&\.-size-md/u);
  expect(css).toMatch(/&\.-size-lg/u);
  expect(css).toContain("var(--instui-component-icon-base-color)");
  expect(css).toContain("var(--instui-component-icon-disabled-base-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-active-background)");
  expect(css).toMatch(/&:disabled,\s*\n\s*&\[aria-disabled="true"\]/u);
});

test("close-button's -on-color reads the on-color icon tokens, and -color-inverse is a functional alias of it", () => {
  const css = closeButtonCss({ prefix: "instui" });
  expect(css).toMatch(/&\.-on-color,/u);
  expect(css).toContain("var(--instui-component-icon-on-color)");
  expect(css).toContain("var(--instui-component-icon-disabled-on-color)");
  expect(css).toContain(
    "var(--instui-component-base-button-primary-inverse-ghost-hover-background)",
  );
  expect(css).toContain(
    "var(--instui-component-base-button-primary-inverse-ghost-active-background)",
  );

  const aliasRule = /&\.-on-color,\s*\n\s*&\.-color-inverse\s*\{([^}]*)\}/u.exec(css);
  expect(aliasRule).not.toBeNull();
  expect(aliasRule?.[1]).toContain("var(--instui-component-icon-on-color)");
});
