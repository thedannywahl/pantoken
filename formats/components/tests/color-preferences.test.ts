import { expect, test } from "vite-plus/test";
import {
  breadcrumbLinkCss,
  linkCss,
  maskCss,
  maskUtilityCss,
  menuItemCss,
  modalCss,
  paginationCss,
  radioCss,
  tabsTabCss,
} from "../src/index.ts";

test("reduced transparency removes all authored backdrop blur surfaces, including global masks", () => {
  for (const prefix of ["instui", "custom", ""]) {
    for (const build of [maskCss, modalCss, maskUtilityCss]) {
      const css = build({ prefix });
      expect(css).toContain("prefers-reduced-transparency: reduce");
      expect(css).toContain("backdrop-filter: none");
    }
  }
});

test("disabled controls retain opaque state cues under reduced transparency", () => {
  for (const build of [menuItemCss, paginationCss, radioCss, tabsTabCss]) {
    expect(build({ prefix: "instui" })).toMatch(
      /@media \(prefers-reduced-transparency: reduce\)\s*\{\s*opacity: 1;/u,
    );
  }
});

test("more contrast adds link identification without changing the text palette", () => {
  for (const build of [linkCss, breadcrumbLinkCss]) {
    expect(build({ prefix: "instui" })).toMatch(
      /@media \(prefers-contrast: more\)\s*\{[^}]*text-decoration-line: underline;/u,
    );
  }
});
