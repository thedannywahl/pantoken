import { expect, test } from "vite-plus/test";
import { modalCss } from "../../src/index.ts";
import { modal } from "../../src/components/modal.ts";
import { validate } from "../_validate.ts";

test("modal: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(modal);
});

test("modal has sizes, a compact density, and an inverse scheme", () => {
  const css = modalCss({ prefix: "instui" });
  expect(css).toContain(".instui-modal.-size-sm");
  expect(css).toContain(".instui-modal.-size-lg");
  expect(css).toContain(".instui-modal.-size-auto");
  expect(css).toContain(".instui-modal.-size-fullscreen");
  expect(css).toContain("var(--instui-component-modal-body-padding-compact)");
  expect(css).toContain(".instui-modal.-color-inverse");
  expect(css).toContain("var(--instui-component-modal-inverse-background-color)");
  // Modals float, so they carry elevation (from the elevation plugin, like alert's shadow).
  expect(css).toContain("box-shadow: var(--instui-elevation-topmost)");
  // Native <dialog> support: UA reset + a ::backdrop dimmed by the Mask token.
  expect(css).toContain("dialog.instui-modal");
  expect(css).toContain("dialog.instui-modal::backdrop");
  expect(css).toContain(
    "dialog.instui-modal::backdrop { background: var(--instui-component-mask-background-color); }",
  );
});
