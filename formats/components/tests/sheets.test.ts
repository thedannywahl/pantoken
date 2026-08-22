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
  listItemCss,
  maskCss,
  menuGroupCss,
  menuItemCss,
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
  tableCellCss,
  tableColHeaderCss,
  tableRowCss,
  tableRowHeaderCss,
  tabsCss,
  tabsTabCss,
  tagCss,
  textAreaCss,
  textCss,
  textInputCss,
  toggleDetailsCss,
  trayCss,
  truncateCss,
} from "../src/index.ts";
import { SENTINEL } from "../src/lib/sentinel.ts";
import { norm } from "./_css.ts";

test("every token referenced by every stylesheet exists in the IR (no drift)", () => {
  const all = `${baseCss()}\n${componentsCss({ prefix: "instui" })}\n${proseCss()}\n${selectCss({ prefix: "instui" })}`;
  // --instui-elevation-* and --instui-focus-outline-* are composite custom properties the token sheet
  // (@pantoken/css) emits from @pantoken/utils builders, NOT entries in the base token IR. The component
  // sheets reference them (shadows, focus ring) and resolve them from the token sheet at runtime, so
  // they're legitimately "unknown" to this IR-drift check — filter them out.
  const drift = unknownReferences(all, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  expect(drift).toEqual([]);
  // `unknownReferences` scans the whole concatenated sheet, so under a loaded machine it can exceed
  // the 5s default; give it headroom so the whole-sheet drift check doesn't flake in the parallel run.
}, 30000);

test("every icon the component sheets reference exists in the token IR (component-icons.css is complete)", () => {
  // component-icons.css is generated from the icons componentsCss references, valued from the token IR;
  // if a component references an icon the IR doesn't define, generation throws and the lean-foundation
  // story (style.lean.css + component-icons.css) would dangle. Guard that invariant here.
  const refs = new Set(
    [...componentsCss({ prefix: "instui" }).matchAll(/var\((--instui-icon-[a-z0-9-]+)\)/g)].map(
      (m) => m[1],
    ),
  );
  const irNames = new Set(tokens.map((t) => t.name));
  const missing = [...refs].filter((name) => !irNames.has(name)).sort();
  expect(missing).toEqual([]);
  expect(refs.size).toBeGreaterThan(0); // sanity: components do reference icons
});

test("the elevation + focus-outline foundation lives in the token sheet, not the component sheets", () => {
  // components.css references the elevation scale but no longer DEFINES it (the token sheet does).
  const components = componentsCss({ prefix: "instui" });
  expect(components).toContain("var(--instui-elevation-above)"); // still referenced
  expect(components).not.toContain("--instui-elevation-resting:"); // but not defined here anymore
  // base.css keeps the :focus-visible ring rules, but the --instui-focus-outline-* vars they read now
  // come from the token sheet — base.css references them without defining them.
  const base = baseCss();
  expect(base).toContain(":focus-visible");
  expect(base).toContain("var(--instui-focus-outline-color)"); // referenced by the ring rules
  expect(base).not.toContain("--instui-focus-outline-color:"); // not defined here anymore
});

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

test("the PFX- prefix sentinel never survives into emitted CSS, at any prefix, and is collision-free", () => {
  // The `.css`-authored records carry the sentinel; a build-time replaceAll must consume every occurrence.
  for (const opts of [{ prefix: "instui" }, { prefix: "ui" }, { prefix: null }, {}]) {
    expect(componentsCss(opts)).not.toContain(SENTINEL);
    expect(selectCss(opts)).not.toContain(SENTINEL);
  }
  // Unprefixed mode drops the prefix cleanly on a migrated `.css` record: `.badge`, never `.-badge`/`.PFX-badge`.
  const unprefixed = componentsCss({ prefix: null });
  expect(unprefixed).toContain(".badge {");
  expect(unprefixed).not.toContain(".-badge");
  // (A blanket `.instui-` check would false-positive on doc-comment prose that names classes like
  // `.instui-icon` — those are prefix-independent references in `@summary`/`@remarks`, not selectors.)
  // The sentinel must never collide with a real token name, or the replaceAll would corrupt it.
  expect(tokens.some((t) => t.name.includes(SENTINEL))).toBe(false);
  // This test calls whole-sheet emitters repeatedly; give headroom for parallel suites on slower CI.
}, 20_000);

test("modifiers are key-value: sizes alias short/long, deviations keep a deprecated InstUI shim", () => {
  const css = componentsCss({ prefix: "instui" });
  // Canonical key-value forms.
  expect(css).toContain(".instui-button.-color-secondary");
  expect(css).toContain(".instui-button.-size-sm");
  expect(css).toContain(".instui-button.-shape-circle");
  expect(css).toContain(".instui-heading.-level-h1");
  expect(css).toContain("&.-placement-top-end");
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
  // showBorder: auto by default (border only without an image), forced with -always/-never; the
  // legacy -show-border name is a deprecated functional alias of -show-border-always.
  const avatar = avatarCss({ prefix: "instui" });
  expect(avatar).toContain("&:not(:has(> img))");
  expect(avatar).toContain(".instui-avatar.-show-border-always");
  expect(avatar).toContain(".instui-avatar.-show-border-never");
  expect(avatar).toContain(".instui-avatar.-show-border {");
  // The full 7-step InstUI size scale (2xs/xs/sm/md/lg/xl/2xl) gets long-form aliases automatically.
  expect(avatar).toContain(".instui-avatar.-size-xx-small");
  expect(avatar).toContain(".instui-avatar.-size-x-small");
  expect(avatar).toContain(".instui-avatar.-size-small");
  expect(avatar).toContain(".instui-avatar.-size-medium");
  expect(avatar).toContain(".instui-avatar.-size-large");
  expect(avatar).toContain(".instui-avatar.-size-x-large");
  expect(avatar).toContain(".instui-avatar.-size-xx-large");
  // Overflowing bare text hard-clips (no ellipsis — text-overflow doesn't apply to a flex container).
  expect(avatar).toContain("white-space: nowrap;");
  // data-initials: the real name stays as content (accessible), ::before shows the compact form.
  expect(avatar).toContain("&[data-initials] {");
  expect(avatar).toContain("content: attr(data-initials);");
  expect(avatar).toContain(".instui-avatar.-size-lg[data-initials]::before {");
  // .name: an opt-in single-leading-letter clip for the no-data-initials, no-JS static case; the
  // .first-name/.last-name pair is the two-letter variant, each guarding against the other's markup.
  expect(avatar).toContain("@scope (.instui-avatar)");
  expect(avatar).toContain(".name,");
  expect(avatar).toContain("max-width: 1ch;");
  expect(avatar).toContain('&:not(:has([class*="-name"])) .name');
  expect(avatar).toContain("&:not(:has(.name)) .first-name");
  expect(avatar).toContain("&:not(:has(.name)) .last-name");
  // Sub-elements live inside an @scope block, so they're authored as bare, ancestor-scoped classes.
  const tabs = tabsCss({ prefix: "instui" });
  expect(tabs).toContain("@scope (.instui-tabs)");
  const tabsTab = tabsTabCss({ prefix: "instui" });
  expect(tabsTab).toContain(".tab.-selected");
  expect(tabsTab).toContain(".tab.-disabled");
  const metric = norm(metricCss({ prefix: "instui" }));
  expect(metric).toContain("@scope (.instui-metric)");
  expect(metric).toContain(".value {");
  // textAlign maps to align-items on the flex column (text-align alone is a no-op on the shrink box).
  expect(metric).toContain("&.-text-align-center { align-items: center;");
  expect(metric).toContain("&.-text-align-end { align-items: flex-end;");
  const byline = norm(bylineCss({ prefix: "instui" }));
  expect(byline).toContain("@scope (.instui-byline)");
  expect(byline).toContain(".title {");
  // alignContent + size (max-width) modifiers.
  expect(byline).toContain("&.-align-content-top { align-items: flex-start; }");
  expect(byline).toContain(
    ".instui-byline.-size-lg { max-width: var(--instui-component-byline-large,",
  );
  expect(tableColHeaderCss({ prefix: "instui" })).toContain(".instui-table th");
});

test("table styles row-header cells and a row hover; menu has active/group parts", () => {
  const tableRowHeader = norm(tableRowHeaderCss({ prefix: "instui" }));
  expect(tableRowHeader).toContain('.instui-table th[scope="row"]');
  expect(tableRowHeader).toContain("var(--instui-component-table-row-header-background)");
  // Hover is opt-in (`-hover`) and paints inline (left/right) borders — NOT a full-box outline.
  const tableRow = norm(tableRowCss({ prefix: "instui" }));
  expect(tableRow).toContain(".instui-table.-hover tbody tr:hover");
  expect(tableRow).toContain("var(--instui-component-table-row-hover-border-color)");
  expect(tableRow).not.toContain("outline:");
  expect(tableRow).not.toContain("tbody tr:hover { outline");
  // The row separator sits on the row (uniform), not mismatched per-cell borders.
  expect(tableRow).toContain(
    ".instui-table tbody tr { border-bottom: var(--instui-border-width-sm)",
  );
  // Caption + layout=stacked (each row a card; cells labelled via data-label).
  const table = norm(tableCss({ prefix: "instui" }));
  expect(table).toContain(".instui-table caption");
  expect(table).toContain(".instui-table.-layout-stacked");
  const tableCell = norm(tableCellCss({ prefix: "instui" }));
  expect(tableCell).toContain("td[data-label]::before");
  expect(tableCell).toContain("content: attr(data-label)");
  const menuItem = menuItemCss({ prefix: "instui" });
  const menuGroup = menuGroupCss({ prefix: "instui" });
  expect(menuGroup).toContain("@scope (.instui-menu)");
  expect(menuGroup).toContain(".group {");
  expect(menuItem).toContain(".item.-active");
  expect(menuItem).toContain("var(--instui-component-menu-item-active-background)");
  expect(menuItem).toContain(".item-info {");
});

test("context-view floats with elevation, has placements + inverse, and hides as a closed popover", () => {
  const css = norm(componentsCss({ prefix: "instui" }));
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
  expect(tabsTabCss({ prefix: "instui" })).toContain("&.-variant-secondary .tab");
  expect(tabsTabCss({ prefix: "instui" })).toContain(
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
  const list = listItemCss({ prefix: "instui" });
  expect(list).toContain("&.-delimiter-solid > li + li");
  expect(list).toContain("&.-delimiter-dashed > li + li");
  expect(list).toContain("var(--instui-component-list-item-delimiter-solid-border-color)");
  expect(list).toContain("&.-ordered > li::marker");
  expect(toggleDetailsCss({ prefix: "instui" })).toContain(".instui-toggle-details.-size-lg");
  const rating = norm(ratingCss({ prefix: "instui" }));
  expect(rating).toContain(".instui-rating.-size-sm");
  // Stars are icon glyphs (filled = solid glyph); a .label carries the visible value text. Sub-element
  // rules render inside @scope, so the filled-star selector is bare and the label is nested as > .label.
  expect(rating).toContain(
    ".-icon-star-solid { color: var(--instui-component-rating-icon-icon-filled-color); }",
  );
  expect(rating).toMatch(/:scope\s*\{[\s\S]*?>\s*\.label\s*\{/u);
  expect(rating).not.toContain(".star ");
  expect(breadcrumbCss({ prefix: "instui" })).toContain(".instui-breadcrumb.-size-lg");
});

test("billboard has sizes and a clickable variant; range has handle states and a value bubble", () => {
  const bb = billboardCss({ prefix: "instui" });
  const bbSelectors = norm(bb).replaceAll(/\s*>\s*/g, " > ");
  expect(bb).toContain(".instui-billboard.-clickable");
  expect(bb).toContain("var(--instui-component-billboard-clickable-active-bg)");
  // A hero (icon/image) + heading lead the message (sub-elements, so scoped as :scope > .x).
  expect(bbSelectors).toContain(":scope > .hero {");
  expect(bbSelectors).toContain(":scope > .heading {");
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
  const pop = norm(popoverCss({ prefix: "instui" }));
  expect(pop).toContain(".instui-popover {");
  expect(pop).toContain("box-shadow: var(--instui-elevation-above)");
  expect(pop).toContain("[popover].instui-popover { margin: 0; }");
  const tray = norm(trayCss({ prefix: "instui" }));
  expect(tray).toContain("position: fixed;");
  expect(tray).toContain(".instui-tray.-placement-end");
  expect(tray).toContain("var(--instui-component-tray-width-sm)");
  expect(tray).toContain("[popover].instui-tray { margin: 0; }");
});

test("floating surfaces adopt CSS anchor positioning + open animations under @supports", () => {
  const pop = norm(popoverCss({ prefix: "instui" }));
  expect(pop).toContain("@supports (position-area: block-end)");
  expect(pop).toContain("[popover].instui-popover.-placement-bottom { position-area: block-end; }");
  expect(pop).toContain("position-try-fallbacks: flip-block,flip-inline;");
  expect(pop).toContain("@starting-style");
  const cv = norm(contextViewCss({ prefix: "instui" }));
  expect(cv).toContain("@supports (position-area: block-end)");
  expect(cv).toContain(
    "[popover].instui-context-view.-placement-start { position-area: inline-start center; }",
  );
  const tray = norm(trayCss({ prefix: "instui" }));
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
  expect(components).toHaveLength(51);
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
  const truncate = truncateCss({ prefix: "instui" });
  expect(truncate).toContain(":where(*).--truncate.--truncate.--truncate");
  expect(truncate).toContain("-webkit-line-clamp");
  expect(truncate).toContain(":where(*).--truncate.--max-lines-3");
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
  expect(norm(tableCss({ prefix: "instui" }))).toContain(
    ".instui-table.-layout-fixed { table-layout: fixed; }",
  );
  expect(menuItemCss({ prefix: "instui" })).toContain(".item.-disabled");
  expect(modalCss({ prefix: "instui" })).toContain(".instui-modal.-overflow-fit");
});

test("heading levels are the single source of truth shared with prose", () => {
  // The same six h1–h6 size/weight pairs appear as classes in Heading and as bare tags in prose.
  const heading = headingCss({ prefix: "instui" });
  const prose = proseCss();
  for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
    const token = `var(--instui-component-heading-${level}-font-size)`;
    expect(heading).toContain(`.instui-heading.-level-${level} { font-size: ${token}`);
    expect(prose).toContain(`:where(body) ${level} { font-size: ${token}`);
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
  // The generated twin carries a plain "alias of" note (not cssdoc's `@deprecated → use` marker, which
  // would wrongly deprecate other modifiers in a compound clone); the deprecation is authored in metadata.
  expect(css).toMatch(/\/\* alias of \.-variant-toggle \*\//);
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
