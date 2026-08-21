import { expect, test } from "vite-plus/test";
import { drawerLayoutContentCss, drawerLayoutCss, drawerLayoutTrayCss } from "../../src/index.ts";
import { drawerLayout } from "../../src/components/drawer-layout/index.ts";
import { validate } from "../_validate.ts";

test("drawer-layout: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(drawerLayout);
});

test("drawer-layout supports placement, open-state gates, and overlay mode", () => {
  const css = drawerLayoutCss({ prefix: "instui" });
  expect(css).toContain('.instui-drawer-layout[placement="end"]');
  expect(css).toContain(".instui-drawer-layout.-should-overlay-tray");
  expect(css).toContain(".instui-drawer-layout.-placement-end");
  expect(css).toContain(".instui-drawer-layout:not([open]):not(.-open) > .tray");
});

test("drawer-layout members emit tray and content rules", () => {
  expect(drawerLayoutTrayCss({ prefix: "instui" })).toContain(
    "inline-size: var(--drawer-layout-tray-width, var(--instui-component-tray-width-xs, 16em))",
  );
  expect(drawerLayoutContentCss({ prefix: "instui" })).toContain(
    "min-inline-size: var(--min-width)",
  );
});

test("drawer-layout auto-switches to overlay mode via a container query, without JS", () => {
  const threshold =
    "calc(var(--instui-component-tray-width-xs, 16em) + var(--pantoken-bp-md, 30em))";
  expect(drawerLayoutCss({ prefix: "instui" })).toContain(
    "container: pantoken-drawer-layout / inline-size",
  );
  expect(drawerLayoutTrayCss({ prefix: "instui" })).toContain(
    `@container pantoken-drawer-layout (width < ${threshold})`,
  );
  expect(drawerLayoutContentCss({ prefix: "instui" })).toContain(
    `@container pantoken-drawer-layout (width < ${threshold})`,
  );
});

test('placement uses only logical (inline-*) properties, never left/right, so it flips correctly under dir="rtl"', () => {
  const css =
    drawerLayoutCss({ prefix: "instui" }) +
    drawerLayoutTrayCss({ prefix: "instui" }) +
    drawerLayoutContentCss({ prefix: "instui" });
  expect(css).toContain(".instui-drawer-layout.-placement-start");
  expect(css).toContain("flex-direction: row-reverse");
  expect(css).not.toMatch(/(?<![a-z-])(left|right)\s*:/i);
});
