import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import {
  avatarCss,
  baseCss,
  billboardCss,
  breadcrumbCss,
  buttonCss,
  bylineCss,
  componentsCss,
  contextViewCss,
  fileDropCss,
  headingCss,
  linkCss,
  listCss,
  maskCss,
  menuCss,
  metricCss,
  modalCss,
  pillCss,
  popoverCss,
  progressCircleCss,
  proseCss,
  rangeInputCss,
  ratingCss,
  screenReaderContentCss,
  selectCss,
  tableCss,
  tabsCss,
  tagCss,
  textAreaCss,
  textCss,
  textInputCss,
  toggleDetailsCss,
  trayCss,
  truncateCss,
} from "../src/index.ts";

test("every token referenced by every stylesheet exists in the IR (no drift)", () => {
  const all = `${baseCss()}\n${componentsCss({ prefix: "instui" })}\n${proseCss()}\n${selectCss({ prefix: "instui" })}`;
  // --instui-elevation-* (elevationCss, components.css) and --instui-focus-outline-* (focusOutlineCss,
  // base.css) are defined by those sheets, not the base token IR — locally-resolved but still "unknown"
  // to the IR-drift check, so filter them out.
  const drift = unknownReferences(all, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  expect(drift).toEqual([]);
  // `unknownReferences` scans the whole concatenated sheet, so under a loaded machine it can exceed
  // the 5s default; give it headroom so the whole-sheet drift check doesn't flake in the parallel run.
}, 30000);

test("component classes use the configured prefix; any falsy prefix drops it entirely", () => {
  expect(buttonCss({ prefix: "instui" })).toContain(".instui-button");
  expect(buttonCss({ prefix: "ui" })).toContain(".ui-button");
  expect(buttonCss({ prefix: "ui" })).not.toContain(".instui-button");
  // Falsy → no prefix: `.button`, not `.-button` or `.instui-button`.
  for (const unprefixed of [buttonCss({ prefix: null }), buttonCss(), buttonCss({ prefix: "" })]) {
    expect(unprefixed).toContain(".button {");
    expect(unprefixed).not.toContain(".instui-");
    expect(unprefixed).not.toContain(".-button");
  }
  // The dash-prefixed modifiers survive unprefixed (`.button.-secondary`).
  expect(buttonCss({ prefix: null })).toContain(".button.-color-secondary");
});

test("modifiers are key-value: sizes alias short/long, deviations keep a deprecated InstUI shim", () => {
  const css = componentsCss({ prefix: "instui" });
  // Canonical key-value forms.
  expect(css).toContain(".instui-button.-color-secondary");
  expect(css).toContain(".instui-button.-size-sm");
  expect(css).toContain(".instui-button.-shape-circle");
  expect(css).toContain(".instui-heading.-level-h1");
  expect(css).toContain(".instui-badge.-placement-top-end");
  // Size scale is emitted with both short and long spellings.
  expect(css).toContain(".instui-button.-size-sm");
  expect(css).toContain(".instui-button.-size-small");
  // Deviations from InstUI keep a deprecated InstUI-semantic shim: alert variant→color, and the
  // avatar accent1–6 names (InstUI-documented) aliasing our token-named colours.
  expect(css).toContain(".instui-alert.-variant-info");
  expect(css).toContain(".instui-alert.-variant-error");
  expect(css).toContain(".instui-avatar.-color-accent1");
  expect(css).toContain(".instui-avatar.-color-accent6");
  expect(css).toContain("@deprecated");
  // Old bare shorthands are gone as canonical.
  expect(css).not.toContain(".instui-button.-secondary {");
  expect(css).not.toContain(".instui-button.-circle {");
});

test("pill has status variants + status weight; tag has sizes and a dismissible inline variant", () => {
  const pill = pillCss({ prefix: "instui" });
  for (const v of ["info", "success", "warning", "danger"]) {
    expect(pill).toContain(`.instui-pill.-color-${v}`);
  }
  expect(pill).toContain("var(--instui-component-pill-status-label-font-weight)");
  // A leading icon: a glyph class on the pill renders a masked ::before at the pill's size.
  expect(pill).toContain('.instui-pill[class*="-icon-"]::before');
  const tag = tagCss({ prefix: "instui" });
  expect(tag).toContain(".instui-tag:hover");
  expect(tag).toContain(".instui-tag.-size-sm");
  expect(tag).toContain(".instui-tag.-size-lg");
  expect(tag).toContain(".instui-tag.-inline::after");
  expect(tag).toContain("var(--instui-component-tag-inline-icon-color)");
});

test("avatar has color/size modifiers, tabs/metric/byline scope sub-elements via @scope", () => {
  expect(avatarCss({ prefix: "instui" })).toContain(".instui-avatar.-color-blue");
  expect(avatarCss({ prefix: "instui" })).toContain(".instui-avatar.-size-lg");
  // Sub-elements live inside an @scope block, so they're authored as bare, ancestor-scoped classes.
  const tabs = tabsCss({ prefix: "instui" });
  expect(tabs).toContain("@scope (.instui-tabs)");
  expect(tabs).toContain(".tab.-selected");
  expect(tabs).toContain(".tab.-disabled");
  const metric = metricCss({ prefix: "instui" });
  expect(metric).toContain("@scope (.instui-metric)");
  expect(metric).toContain(".value {");
  // textAlign maps to align-items on the flex column (text-align alone is a no-op on the shrink box).
  expect(metric).toContain(".instui-metric.-text-align-center { align-items: center;");
  expect(metric).toContain(".instui-metric.-text-align-end { align-items: flex-end;");
  const byline = bylineCss({ prefix: "instui" });
  expect(byline).toContain("@scope (.instui-byline)");
  expect(byline).toContain(".title {");
  // alignContent + size (max-width) modifiers.
  expect(byline).toContain(".instui-byline.-align-content-top { align-items: flex-start; }");
  expect(byline).toContain(
    ".instui-byline.-size-lg { max-width: var(--instui-component-byline-large,",
  );
  expect(tableCss({ prefix: "instui" })).toContain(".instui-table th");
});

test("table styles row-header cells and a row hover; menu has active/group parts", () => {
  const table = tableCss({ prefix: "instui" });
  expect(table).toContain('.instui-table th[scope="row"]');
  expect(table).toContain("var(--instui-component-table-row-header-background)");
  // Hover is opt-in (`-hover`) and paints inline (left/right) borders — NOT a full-box outline.
  expect(table).toContain(".instui-table.-hover tbody tr:hover");
  expect(table).toContain("var(--instui-component-table-row-hover-border-color)");
  expect(table).not.toContain("outline:");
  expect(table).not.toContain("tbody tr:hover { outline");
  // The row separator sits on the row (uniform), not mismatched per-cell borders.
  expect(table).toContain(".instui-table tbody tr { border-bottom: var(--instui-border-width-sm)");
  // Caption + layout=stacked (each row a card; cells labelled via data-label).
  expect(table).toContain(".instui-table caption");
  expect(table).toContain(".instui-table.-layout-stacked");
  expect(table).toContain("td[data-label]::before");
  expect(table).toContain("content: attr(data-label)");
  const menu = menuCss({ prefix: "instui" });
  expect(menu).toContain("@scope (.instui-menu)");
  expect(menu).toContain(".item.-active");
  expect(menu).toContain("var(--instui-component-menu-item-active-background)");
  expect(menu).toContain(".group {");
  expect(menu).toContain(".item-info {");
});

test("context-view floats with elevation, has placements + inverse, and hides as a closed popover", () => {
  const css = componentsCss({ prefix: "instui" });
  // Floats over content, so it carries a shadow.
  expect(css).toContain(".instui-context-view {");
  expect(css).toContain("box-shadow: var(--instui-elevation-above)");
  // Placement moves the caret; inverse recolours the box + arrow.
  expect(css).toContain(".instui-context-view.-placement-bottom::after");
  expect(css).toContain(".instui-context-view.-placement-start::after");
  expect(css).toContain(".instui-context-view.-placement-end::after");
  expect(css).toContain(".instui-context-view.-color-inverse");
  expect(css).toContain("var(--instui-component-context-view-arrow-background-color-inverse)");
  // As a native popover: float it in the top layer, and restore the UA hide the base display overrode.
  expect(css).toContain(
    "[popover].instui-context-view { position: fixed; overflow: visible; margin: 0; }",
  );
  expect(css).toContain("[popover].instui-context-view:not(:popover-open) { display: none; }");
});

test("tabs have a secondary variant; link has sizes, on-color, inline and unstyled", () => {
  expect(tabsCss({ prefix: "instui" })).toContain(":scope.-variant-secondary .tab");
  expect(tabsCss({ prefix: "instui" })).toContain(
    "var(--instui-component-tabs-tab-secondary-selected-background)",
  );
  const link = linkCss({ prefix: "instui" });
  expect(link).toContain(".instui-link.-size-sm");
  expect(link).toContain(".instui-link.-color-inverse");
  expect(link).toContain(".instui-link.-inline");
  expect(link).toContain(".instui-link.-unstyled");
  expect(link).toContain("var(--instui-component-link-on-color-text-color)");
});

test("list has sizes and solid/dashed delimiters; toggle-details, rating and breadcrumb have sizes", () => {
  const list = listCss({ prefix: "instui" });
  expect(list).toContain(".instui-list.-delimiter-solid");
  expect(list).toContain(".instui-list.-delimiter-dashed");
  expect(list).toContain("var(--instui-component-list-item-delimiter-solid-border-color)");
  expect(list).toContain(".instui-list.-ordered > li::marker");
  expect(toggleDetailsCss({ prefix: "instui" })).toContain(".instui-toggle-details.-size-lg");
  const rating = ratingCss({ prefix: "instui" });
  expect(rating).toContain(".instui-rating.-size-sm");
  // Stars are icon glyphs (filled = solid glyph); a .label carries the visible value text. Sub-element
  // rules render inside @scope, so the filled-star selector is bare and the label reads :scope > .label.
  expect(rating).toContain(
    ".-icon-star-solid { color: var(--instui-component-rating-icon-icon-filled-color); }",
  );
  expect(rating).toContain(":scope > .label {");
  expect(rating).not.toContain(".star ");
  expect(breadcrumbCss({ prefix: "instui" })).toContain(".instui-breadcrumb.-size-lg");
});

test("billboard has sizes and a clickable variant; range has handle states and a value bubble", () => {
  const bb = billboardCss({ prefix: "instui" });
  expect(bb).toContain(".instui-billboard.-clickable");
  expect(bb).toContain("var(--instui-component-billboard-clickable-active-bg)");
  // A hero (icon/image) + heading lead the message (sub-elements, so scoped as :scope > .x).
  expect(bb).toContain(":scope > .hero {");
  expect(bb).toContain(":scope > .heading {");
  const range = rangeInputCss({ prefix: "instui" });
  expect(range).toContain(".instui-range-input");
  expect(range).toContain(":hover::-webkit-slider-thumb");
  expect(range).toContain("var(--instui-component-range-input-handle-focus-outline-color)");
  // The value is an inverse bubble with a caret + per-size scaling.
  expect(range).toContain(".instui-range-input-value");
  expect(range).toContain("var(--instui-color-background-inverse)");
  expect(range).toContain(".instui-range-input-value::before");
  expect(range).toContain(".instui-range-input-value.-size-lg");
});

test("popover + tray are top-layer surfaces; tray docks to an edge with sizes", () => {
  const pop = popoverCss({ prefix: "instui" });
  expect(pop).toContain(".instui-popover {");
  expect(pop).toContain("box-shadow: var(--instui-elevation-above)");
  expect(pop).toContain("[popover].instui-popover { margin: 0; }");
  const tray = trayCss({ prefix: "instui" });
  expect(tray).toContain("position: fixed;");
  expect(tray).toContain(".instui-tray.-placement-end");
  expect(tray).toContain("var(--instui-component-tray-width-sm)");
  expect(tray).toContain("[popover].instui-tray { margin: 0; }");
});

test("floating surfaces adopt CSS anchor positioning + open animations under @supports", () => {
  const pop = popoverCss({ prefix: "instui" });
  expect(pop).toContain("@supports (position-area: block-end)");
  expect(pop).toContain("[popover].instui-popover.-placement-bottom { position-area: block-end; }");
  expect(pop).toContain("position-try-fallbacks: flip-block, flip-inline;");
  expect(pop).toContain("@starting-style");
  const cv = contextViewCss({ prefix: "instui" });
  expect(cv).toContain("@supports (position-area: block-end)");
  expect(cv).toContain(
    "[popover].instui-context-view.-placement-start { position-area: inline-start center; }",
  );
  const tray = trayCss({ prefix: "instui" });
  expect(tray).toContain("@supports (transition-behavior: allow-discrete)");
  expect(tray).toContain("@starting-style");
});

test("componentsCss bundles every component; proseCss scopes to a content root", () => {
  const all = componentsCss({ prefix: "instui" });
  const components = [
    "button",
    "alert",
    "badge",
    "pill",
    "tag",
    "avatar",
    "tabs",
    "metric",
    "byline",
    "img",
    "table",
    "link",
    "list",
    "checkbox",
    "radio",
    "spinner",
    "progress",
    "menu",
    "modal",
    "breadcrumb",
    "billboard",
    "rating",
    "toggle-group",
    "context-view",
    "progress-circle",
    "pagination",
    "truncate",
    "toggle-details",
    "file-drop",
    "side-nav-bar",
    "tree-browser",
    "calendar",
    "popover",
    "tray",
    "tooltip",
    "range-input",
    "mask",
    "screen-reader-content",
    "heading",
    "text",
    "close-button",
    "form-field",
    "form-field-group",
    "radio-input-group",
    "form-field-messages",
    "form-field-message",
    "text-input",
    "text-area",
    "simple-select",
    "input-group",
    "number-input",
    "in-place-edit",
  ];
  for (const c of components) expect(all).toContain(`.instui-${c}`);
  expect(components).toHaveLength(52);
  // The icon "component" is the glyph ::before painter, not a `.instui-icon` class.
  expect(all).toContain('[class*="-icon-"]::before');
  expect(proseCss({ scope: ".vp-doc" })).toContain(".vp-doc table");
});

test("new components render their key tokens", () => {
  expect(progressCircleCss({ prefix: "instui" })).toContain("conic-gradient");
  expect(fileDropCss({ prefix: "instui" })).toContain(
    "var(--instui-component-file-drop-border-color)",
  );
  expect(rangeInputCss({ prefix: "instui" })).toContain("::-webkit-slider-thumb");
  expect(truncateCss({ prefix: "instui" })).toContain("-webkit-line-clamp");
});

test("progress bar keeps the deprecated -meter-color-* aliases (incl. alert→warning)", () => {
  const css = componentsCss({ prefix: "instui" });
  expect(css).toContain(".instui-progress.-meter-color-success .bar");
  expect(css).toContain(".instui-progress.-meter-color-alert .bar");
  expect(css).toContain(".instui-progress-circle.-meter-color-success");
});

test("InstUI prop-coverage gaps: text-transform, list unstyled/inline, table fixed, menu disabled, modal fit", () => {
  expect(textCss({ prefix: "instui" })).toContain(".instui-text.-transform-uppercase");
  expect(listCss({ prefix: "instui" })).toContain(".instui-list.-unstyled");
  expect(listCss({ prefix: "instui" })).toContain(".instui-list.-inline");
  expect(tableCss({ prefix: "instui" })).toContain(
    ".instui-table.-layout-fixed { table-layout: fixed; }",
  );
  expect(menuCss({ prefix: "instui" })).toContain(".item.-disabled");
  expect(modalCss({ prefix: "instui" })).toContain(".instui-modal.-overflow-fit");
});

test("heading levels are the single source of truth shared with prose", () => {
  // The same six h1–h6 size/weight pairs appear as classes in Heading and as bare tags in prose.
  const heading = headingCss({ prefix: "instui" });
  const prose = proseCss();
  for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
    const token = `var(--instui-component-heading-${level}-font-size)`;
    expect(heading).toContain(`.instui-heading.-level-${level} { font-size: ${token}`);
    expect(prose).toContain(`.pantoken-prose ${level} { font-size: ${token}`);
  }
});

test("the whole library uses RSCSS: dash-prefixed modifiers and scoped elements, never BEM `--`/`__`", () => {
  const css = `${componentsCss({ prefix: "instui" })}\n${proseCss()}`;
  // No `.instui-<comp>--<mod>` anywhere; var(--instui-…) token refs are unaffected by this pattern.
  expect(css).not.toMatch(/\.instui-[a-z0-9_-]+--[a-z]/);
  // No BEM `__` element classes: sub-elements are scoped short classes (`.instui-menu .item`) or, for
  // non-nested parts, flat prefixed classes (`.instui-badge-wrapper`).
  expect(css).not.toMatch(/__/);
});

test("mask overlays from the mask token; screen-reader-content is visually hidden", () => {
  const mask = maskCss({ prefix: "instui" });
  expect(mask).toContain(".instui-mask");
  expect(mask).toContain("var(--instui-component-mask-background-color)");
  expect(mask).toContain(".instui-mask.-fullscreen");
  const sr = screenReaderContentCss({ prefix: "instui" });
  expect(sr).toContain(".instui-screen-reader-content");
  expect(sr).toContain("clip-path: inset(50%)");
});

test("the deprecated -toggle alias mirrors radio's -variant-toggle in componentsCss", () => {
  const css = componentsCss({ prefix: "instui" });
  expect(css).toContain(".instui-radio.-toggle");
  expect(css).toMatch(/@deprecated → use \.-variant-toggle/);
});

test("the deprecated -type-new-error alias mirrors -type-error in componentsCss", () => {
  const css = componentsCss({ prefix: "instui" });
  expect(css).toContain(".instui-form-field-message.-type-new-error");
});

test("text-input and text-area style a native control with states and sizes", () => {
  const input = textInputCss({ prefix: "instui" });
  expect(input).toContain(".instui-text-input {");
  expect(input).toContain("var(--instui-component-text-input-border-color)");
  expect(input).toContain(
    ".instui-text-input.-invalid { border-color: var(--instui-component-text-input-error-border-color)",
  );
  expect(input).toContain(".instui-text-input.-size-sm");
  expect(input).toContain("var(--instui-component-text-input-height-lg)");
  const area = textAreaCss({ prefix: "instui" });
  expect(area).toContain(".instui-text-area {");
  expect(area).toContain("resize: vertical");
  expect(area).toContain("var(--instui-component-text-area-error-border-color)");
});
