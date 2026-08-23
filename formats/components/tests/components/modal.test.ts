import { expect, test } from "vite-plus/test";
import { modalBodyCss, modalCss } from "../../src/index.ts";
import { modal } from "../../src/components/modal/index.ts";
import { norm } from "../_css.ts";
import { validate } from "../_validate.ts";

test("modal: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(modal);
});

test("modal has sizes, a compact density, and an inverse scheme", () => {
  const css = norm(modalCss({ prefix: "instui" }));
  expect(css).toContain("@scope (.instui-modal)");
  expect(css).toMatch(/&\.-size-sm/u);
  expect(css).toMatch(/&\.-size-lg/u);
  expect(css).toMatch(/&\.-size-auto/u);
  expect(css).toMatch(/&\.-size-fullscreen/u);
  expect(norm(modalBodyCss({ prefix: "instui" }))).toContain(
    "var(--instui-component-modal-body-padding-compact)",
  );
  expect(css).toMatch(/&\.-color-inverse/u);
  expect(css).toContain("var(--instui-component-modal-inverse-background-color)");
  // Modals float, so they carry elevation (from the elevation plugin, like alert's shadow).
  expect(css).toContain("box-shadow: var(--instui-elevation-topmost)");
  // Native <dialog> support: UA reset + a ::backdrop dimmed by the Mask token.
  expect(css).toMatch(/dialog&/u);
  expect(css).toMatch(/dialog&::backdrop/u);
  expect(css).toContain("background: var(--instui-component-mask-background-color)");
});
