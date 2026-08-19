/**
 * Freeze the barrel's public export surface. If a refactor drops or renames a `xxxCss` (or any other
 * public name), this fails loudly rather than silently shrinking the package's API. The three
 * type-only exports (`ComponentOptions`, `ProseOptions`, `IconGlyphsOptions`) can't appear in the
 * runtime key set, so they're asserted at the type level below.
 */
import { expect, test } from "vite-plus/test";
import * as api from "../src/index.ts";
import type { ComponentOptions, IconGlyphsOptions, ProseOptions } from "../src/index.ts";

const EXPECTED = [
  "DEFAULT_PREFIX",
  "ELEVATION_NAMES",
  "FOCUSABLE_SELECTOR",
  "alertCss",
  "avatarCss",
  "badgeCss",
  "baseCss",
  "billboardCss",
  "breadcrumbCss",
  "breadcrumbLinkCss",
  "buttonCss",
  "bylineCss",
  "calendarCss",
  "calendarDayCss",
  "checkboxCss",
  "closeButtonCss",
  "componentsCss",
  "contextViewCss",
  "elevationCss",
  "elevationDeclarations",
  "fileDropCss",
  "focusOutlineCss",
  "focusOutlineDeclarations",
  "focusOutlineRules",
  "formFieldCss",
  "formFieldGroupCss",
  "formFieldMessagesCss",
  "gapCss",
  "headingCss",
  "iconCss",
  "iconGlyphsCss",
  "imgCss",
  "inPlaceEditCss",
  "inputGroupCss",
  "layoutUtilitiesCss",
  "linkCss",
  "listCss",
  "listItemCss",
  "maskCss",
  "menuCss",
  "menuGroupCss",
  "menuItemCss",
  "menuSeparatorCss",
  "metricCss",
  "modalCss",
  "modalBodyCss",
  "modalFooterCss",
  "modalHeaderCss",
  "numberInputCss",
  "paginationCss",
  "paginationPageCss",
  "pillCss",
  "popoverCss",
  "progressCircleCss",
  "progressCss",
  "proseCss",
  "radioCss",
  "radioInputGroupCss",
  "rangeInputCss",
  "ratingCss",
  "responsiveUtilitiesCss",
  "screenReaderContentCss",
  "selectCss",
  "sideNavBarCss",
  "sideNavBarItemCss",
  "simpleSelectCss",
  "spacingUtilitiesCss",
  "spinnerCss",
  "tableCss",
  "tableBodyCss",
  "tableCellCss",
  "tableColHeaderCss",
  "tableHeadCss",
  "tableRowCss",
  "tableRowHeaderCss",
  "tabsCss",
  "tabsPanelCss",
  "tabsTabCss",
  "tagCss",
  "textAreaCss",
  "textCss",
  "textInputCss",
  "toggleDetailsCss",
  "toggleGroupCss",
  "tooltipCss",
  "trayCss",
  "treeBrowserCss",
  "truncateCss",
  "viewCss",
].sort();

test("the barrel's runtime export names are exactly the frozen public surface", () => {
  expect(Object.keys(api).sort()).toEqual(EXPECTED);
});

test("the type-only options interfaces are exported", () => {
  // Type-level assertion: these compile only if the interfaces are exported and shaped as expected.
  const c: ComponentOptions = { prefix: "instui" };
  const p: ProseOptions = { scope: ".pantoken-prose" };
  const g: IconGlyphsOptions = { deprecatedAliases: true };
  expect([c.prefix, p.scope, g.deprecatedAliases]).toEqual(["instui", ".pantoken-prose", true]);
});
