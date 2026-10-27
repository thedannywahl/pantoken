import { expect, test } from "vite-plus/test";
import { drawerLayoutContentCss, drawerLayoutCss, drawerLayoutTrayCss } from "../../src/index.ts";
import { drawerLayout } from "../../src/components/drawer-layout/index.ts";
import { validate } from "../_validate.ts";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";

test("drawer-layout: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(drawerLayout);
});

test("drawer-layout supports placement, open-state gates, and overlay mode", () => {
  const css = drawerLayoutCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-drawer-layout)");
  expect(css).toContain('&[placement="end"]');
  expect(css).toContain("&.-should-overlay-tray");
  expect(css).toContain("&.-placement-end");
  expect(css).toMatch(/&:not\(\[open\]\):not\(\.-open\)\s*>\s*\.tray/);
});

test("all drawer-layout and member examples use named regions on valid elements", () => {
  for (const render of [drawerLayoutCss, drawerLayoutTrayCss, drawerLayoutContentCss]) {
    const [record] = parseCssDocs(render({ prefix: "instui" }));
    expect(record!.examples.length).toBeGreaterThan(0);
    for (const example of record!.examples) {
      const window = new Window();
      try {
        window.document.body.innerHTML = exampleHtml(example);
        const regions = [...window.document.querySelectorAll('[role="region"]')];
        expect(regions.length).toBeGreaterThan(0);
        for (const region of regions) {
          expect(region.tagName).toBe("DIV");
          expect(region.getAttribute("aria-label")).toBeTruthy();
        }
        expect(window.document.querySelector("main, aside")).toBeNull();
      } finally {
        void window.happyDOM.abort();
      }
    }
  }
});

test("drawer-layout members emit tray and content rules", () => {
  expect(drawerLayoutTrayCss({ prefix: "instui" })).toContain(
    "inline-size: var(--drawer-layout-tray-width, var(--instui-component-tray-width-xs, 16em))",
  );
  expect(drawerLayoutContentCss({ prefix: "instui" })).toContain(
    "min-inline-size: var(--drawer-layout-content-min-inline-size, var(--pantoken-bp-md, 48em))",
  );
});

test("drawer-layout auto-switches to overlay mode via a container query, without JS", () => {
  const threshold = "64em";
  expect(drawerLayoutCss({ prefix: "instui" })).toContain(
    "container: pantoken-drawer-layout / inline-size",
  );
  expect(drawerLayoutTrayCss({ prefix: "instui" })).toContain(
    `@container pantoken-drawer-layout (max-width: ${threshold})`,
  );
  expect(drawerLayoutContentCss({ prefix: "instui" })).toContain(
    `@container pantoken-drawer-layout (max-width: ${threshold})`,
  );
});

test('placement uses only logical (inline-*) properties, never left/right, so it flips correctly under dir="rtl"', () => {
  const css =
    drawerLayoutCss({ prefix: "instui" }) +
    drawerLayoutTrayCss({ prefix: "instui" }) +
    drawerLayoutContentCss({ prefix: "instui" });
  expect(css).toContain("&.-placement-start");
  expect(css).toContain("flex-direction: row-reverse");
  expect(css).not.toMatch(/(?<![a-z-])(left|right)\s*:/i);
});
