import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import {
  alertCss,
  avatarCss,
  badgeCss,
  baseCss,
  billboardCss,
  breadcrumbCss,
  buttonCss,
  bylineCss,
  checkboxCss,
  closeButtonCss,
  componentsCss,
  fileDropCss,
  headingCss,
  iconCss,
  iconGlyphsCss,
  layoutUtilitiesCss,
  linkCss,
  listCss,
  maskCss,
  menuCss,
  metricCss,
  modalCss,
  pillCss,
  progressCircleCss,
  progressCss,
  proseCss,
  radioCss,
  rangeCss,
  ratingCss,
  screenReaderContentCss,
  spacingUtilitiesCss,
  spinnerCss,
  textCss,
  tableCss,
  tabsCss,
  tagCss,
  toggleDetailsCss,
  truncateCss,
  viewCss,
} from "../src/index.ts";

test("every token referenced by every stylesheet exists in the IR (no drift)", () => {
  const all = `${baseCss()}\n${componentsCss({ prefix: "instui" })}\n${proseCss()}`;
  // --instui-elevation-* (elevationCss, components.css) and --instui-focus-outline-* (focusOutlineCss,
  // base.css) are defined by those sheets, not the base token IR — locally-resolved but still "unknown"
  // to the IR-drift check, so filter them out.
  const drift = unknownReferences(all, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  expect(drift).toEqual([]);
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

test("button has primary default plus secondary and danger variants", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button {");
  expect(css).toContain(".instui-button.-color-secondary");
  expect(css).toContain(".instui-button.-color-danger");
  expect(css).toContain("var(--instui-color-background-interactive-action-primary-base)");
});

test("alert draws its bar + glyph from pseudo-elements (no wrappers) with variant colours", () => {
  const css = alertCss({ prefix: "instui" });
  for (const v of ["info", "success", "warning", "danger"]) {
    expect(css).toContain(`.instui-alert.-color-${v}`);
  }
  // The left bar (::before) and the glyph (::after) are self-drawn from the variant tokens.
  expect(css).toContain(".instui-alert::before");
  expect(css).toContain(".instui-alert::after");
  expect(css).toContain("var(--pantoken-alert-icon-bg)");
  expect(css).toContain("var(--instui-component-alert-danger-icon-background)");
  expect(css).toContain("var(--instui-component-alert-icon-color)");
  // No icon/content wrapper classes anymore.
  expect(css).not.toContain(".instui-alert__icon");
  expect(css).not.toContain(".instui-alert__content");
  // Optional shadow, screen-reader-only, and close-button detection via :has().
  expect(css).toContain(".instui-alert.-has-shadow");
  expect(css).toContain("var(--instui-elevation-above)");
  expect(css).toContain(".instui-alert.-screen-reader-only");
  expect(css).toContain(".instui-alert:has(> .instui-close-button)");
});

test("close-button is a transparent icon button with an auto glyph, sizes, and inverse", () => {
  const css = closeButtonCss({ prefix: "instui" });
  expect(css).toContain(".instui-close-button");
  expect(css).toContain(".instui-close-button::before");
  expect(css).toContain("data:image/svg+xml");
  expect(css).toContain(".instui-close-button.-size-sm");
  expect(css).toContain(".instui-close-button.-size-lg");
  expect(css).toContain(".instui-close-button.-color-inverse");
});

test("badge fills from the badge color tokens", () => {
  const css = badgeCss({ prefix: "instui" });
  expect(css).toContain(".instui-badge");
  expect(css).toContain("var(--instui-component-badge-color-primary)");
  expect(css).toContain(".instui-badge.-color-danger");
  // Inverse swaps fill/text: light chip (badge-color) with dark text (color-inverse).
  expect(css).toContain(".instui-badge.-color-inverse");
  expect(css).toContain("var(--instui-component-badge-color-inverse)");
  expect(css).toContain("--pantoken-badge-accent: var(--instui-component-badge-color)");
});

test("badge supports standalone, notification, pulse, and placement", () => {
  const css = badgeCss({ prefix: "instui" });
  // Notification dot (no count).
  expect(css).toContain(".instui-badge.-type-notification");
  expect(css).toContain("var(--instui-spacing-space-sm)");
  // Pulse ring in the accent colour.
  expect(css).toContain(".instui-badge.-pulse::before");
  // Animation identifiers use a constant internal namespace, decoupled from the class prefix.
  expect(css).toContain("@keyframes pantoken-badge-pulse");
  // Placement over a positioned wrapper.
  expect(css).toContain(".instui-badge-wrapper");
  for (const place of [
    "top-end",
    "top-start",
    "bottom-end",
    "bottom-start",
    "start-center",
    "end-center",
  ]) {
    expect(css).toContain(`.instui-badge.-placement-${place}`);
  }
  expect(css).toContain(".instui-badge.-standalone");
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

test("spinner has sizes and an inverse track", () => {
  const css = spinnerCss({ prefix: "instui" });
  expect(css).toContain(".instui-spinner.-size-xs");
  expect(css).toContain(".instui-spinner.-size-sm");
  expect(css).toContain(".instui-spinner.-size-lg");
  expect(css).toContain(".instui-spinner.-color-inverse");
  expect(css).toContain("var(--instui-component-spinner-inverse-color)");
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
  const byline = bylineCss({ prefix: "instui" });
  expect(byline).toContain("@scope (.instui-byline)");
  expect(byline).toContain(".title {");
  expect(tableCss({ prefix: "instui" })).toContain(".instui-table th");
});

test("table styles row-header cells and a row hover; menu has active/group parts", () => {
  const table = tableCss({ prefix: "instui" });
  expect(table).toContain('.instui-table th[scope="row"]');
  expect(table).toContain("var(--instui-component-table-row-header-background)");
  expect(table).toContain("var(--instui-component-table-row-hover-border-color)");
  const menu = menuCss({ prefix: "instui" });
  expect(menu).toContain("@scope (.instui-menu)");
  expect(menu).toContain(".item.-active");
  expect(menu).toContain("var(--instui-component-menu-item-active-background)");
  expect(menu).toContain(".group {");
  expect(menu).toContain(".item-info {");
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

test("context-view resets the UA popover box so it works as a native [popover]", () => {
  const css = componentsCss({ prefix: "instui" });
  // Works as a native popover: restore position:fixed (the base sets relative for the caret) so the
  // UA can centre it in the top layer; keep overflow visible for the caret.
  expect(css).toContain("[popover].instui-context-view { position: fixed; overflow: visible; }");
});

test("progress circle has sizes, the meter palette, and an inverse scheme via custom props", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toContain("conic-gradient");
  expect(css).toContain(".instui-progress-circle.-size-sm");
  expect(css).toContain(".instui-progress-circle.-size-lg");
  expect(css).toContain(".instui-progress-circle.-color-success");
  expect(css).toContain("var(--instui-component-progress-circle-meter-color-brand-inverse)");
  expect(css).toContain(".instui-progress-circle.-color-inverse");
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
  expect(ratingCss({ prefix: "instui" })).toContain(".instui-rating.-size-sm");
  expect(breadcrumbCss({ prefix: "instui" })).toContain(".instui-breadcrumb.-size-lg");
});

test("billboard has sizes and a clickable variant; range has handle states and a value bubble", () => {
  const bb = billboardCss({ prefix: "instui" });
  expect(bb).toContain(".instui-billboard.-clickable");
  expect(bb).toContain("var(--instui-component-billboard-clickable-active-bg)");
  const range = rangeCss({ prefix: "instui" });
  expect(range).toContain(":hover::-webkit-slider-thumb");
  expect(range).toContain("var(--instui-component-range-input-handle-focus-outline-color)");
  expect(range).toContain(".instui-range-value");
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
    "range",
    "mask",
    "screen-reader-content",
    "heading",
    "text",
    "close-button",
  ];
  for (const c of components) expect(all).toContain(`.instui-${c}`);
  expect(components).toHaveLength(34);
  // The icon "component" is the glyph ::before painter, not a `.instui-icon` class.
  expect(all).toContain('[class*="-icon-"]::before');
  expect(proseCss({ scope: ".vp-doc" })).toContain(".vp-doc table");
});

test("button gains icon, condensed, and toggle modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-shape-square");
  expect(css).toContain(".instui-button.-condensed");
  expect(css).toContain('.instui-button.-toggle[aria-pressed="true"]');
  expect(css).toContain(".instui-button.-without-border"); // InstUI withBorder={false}
});

test("button has success color and small/large size modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-success");
  expect(css).toContain("var(--instui-color-background-interactive-action-success-base)");
  expect(css).toContain(".instui-button.-size-sm");
  expect(css).toContain(".instui-button.-size-lg");
  expect(css).toContain("var(--instui-component-base-button-large-height)");
});

test("button has tertiary, primary-inverse, ai, ai-secondary colors and a circle shape", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-tertiary");
  expect(css).toContain(".instui-button.-color-primary-inverse");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-background)");
  expect(css).toContain(".instui-button.-color-ai");
  expect(css).toContain("var(--instui-color-background-interactive-action-ai-top-gradient-base)");
  expect(css).toContain(".instui-button.-color-ai-secondary");
  expect(css).toContain(".instui-button.-shape-circle");
  expect(css).toContain("border-radius: 50%");
});

test("ai buttons carry gradient borders, a ring, and an auto ai glyph", () => {
  const css = buttonCss({ prefix: "instui" });
  // ai-primary: distinct fill (padding-box) and stroke (border-box) gradients.
  expect(css).toContain("var(--instui-color-stroke-interactive-action-ai-top-gradient-base)");
  expect(css).toContain("padding-box");
  expect(css).toContain("border-box");
  // ai-secondary: a masked ::after ring plus violet→sea gradient text (clipped to the glyphs).
  expect(css).toContain(".instui-button.-color-ai-secondary::after");
  expect(css).toContain("mask-composite: exclude");
  expect(css).toContain("background-clip: text");
  expect(css).toContain(
    "var(--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base)",
  );
  // The ai glyph is added automatically to both AI variants.
  expect(css).toContain(".instui-button.-color-ai::before");
  expect(css).toContain(".instui-button.-color-ai-secondary::before");
  expect(css).toContain("data:image/svg+xml");
  // Hover/active restore a fill (border-box clip) using the secondary hover gradient tokens.
  expect(css).toContain(".instui-button.-color-ai-secondary:hover");
  expect(css).toContain(
    "var(--instui-color-background-interactive-action-ai-secondary-hover-top-gradient)",
  );
});

test("primary-inverse resolves its hover border to the on-color hover token", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-primary-inverse:hover");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-border-color)");
});

test("button has a ghost (withBackground=false) variant and a block (display) variant", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-without-background");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-color)");
  expect(css).toContain(".instui-button.-color-secondary.-ghost");
  expect(css).toContain("var(--instui-component-base-button-secondary-ghost-border-color)");
  expect(css).toContain(".instui-button.-display-block");
  expect(css).toContain("width: 100%");
  // Ghost hover derives a low-opacity, darkened wash from the brand (via @pantoken/plugin-colors),
  // so the coloured rest text stays legible instead of printing same-on-same.
  expect(css).toContain(".instui-button.-without-background:hover");
  expect(css).toContain(
    "color-mix(in srgb, hsl(from var(--instui-component-base-button-primary-ghost-color) h s calc(l - 10)) 10%, transparent)",
  );
});

test("base button pins the medium height so sizes order small < medium < large", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("min-height: var(--instui-component-base-button-medium-height)");
});

test("a glyph class paints a masked ::before, so a single name class renders standalone", () => {
  const css = iconCss({ prefix: "instui" });
  // Any element with a glyph class paints the masked glyph in currentColor via ::before — a single
  // `.instui-icon-<name>` is enough, no wrapper class.
  expect(css).toContain('[class*="-icon-"]::before');
  expect(css).toContain("inline-size: 1em");
  expect(css).toContain("var(--pantoken-glyph)");
  // No `.instui-icon` wrapper class (there's no two-class form).
  expect(css).toContain(".instui-icon {");
});

test("iconGlyphsCss emits one glyph class per icon, pointing --pantoken-glyph at its token", () => {
  const css = iconGlyphsCss(["megaphone", "check"], { prefix: "instui" });
  expect(css).toContain(".-icon-megaphone { --pantoken-glyph: var(--instui-icon-megaphone); }");
  expect(css).toContain(".-icon-check { --pantoken-glyph: var(--instui-icon-check); }");
  expect(iconGlyphsCss(["megaphone"], { prefix: "ui" })).toContain(".-icon-megaphone");
});

test("new components render their key tokens", () => {
  expect(progressCircleCss({ prefix: "instui" })).toContain("conic-gradient");
  expect(fileDropCss({ prefix: "instui" })).toContain(
    "var(--instui-component-file-drop-border-color)",
  );
  expect(rangeCss({ prefix: "instui" })).toContain("::-webkit-slider-thumb");
  expect(truncateCss({ prefix: "instui" })).toContain("-webkit-line-clamp");
});

test("spacing utilities: logical per-side classes on the spacing scale, auto for margin only", () => {
  const css = spacingUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-m-sm { margin: var(--instui-spacing-space-sm); }");
  expect(css).toContain(".instui-mt-lg { margin-block-start: var(--instui-spacing-space-lg); }");
  expect(css).toContain(".instui-mx-auto { margin-inline: auto; }");
  expect(css).toContain(".instui-p-md { padding: var(--instui-spacing-space-md); }");
  expect(css).toContain(".instui-py-0 { padding-block: 0; }");
  // `auto` is a margin-only value.
  expect(css).toContain(".instui-m-auto");
  expect(css).not.toContain(".instui-p-auto");
  expect(spacingUtilitiesCss({ prefix: "ui" })).toContain(".ui-mt-lg");
  // `margin`/`padding` long-form aliases mirror the short forms.
  expect(css).toContain(".instui-margin-lg { margin: var(--instui-spacing-space-lg); }");
  expect(css).toContain(".instui-padding-md { padding: var(--instui-spacing-space-md); }");
  expect(css).toContain(
    ".instui-margint-lg { margin-block-start: var(--instui-spacing-space-lg); }",
  );
  expect(css).toContain(".instui-marginx-auto { margin-inline: auto; }");
});

test("layout utilities cover display and text-align (InstUI cross-cutting props)", () => {
  const css = layoutUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(".instui-display-flex { display: flex; }");
  expect(css).toContain(".instui-display-inline-block { display: inline-block; }");
  expect(css).toContain(".instui-text-align-center { text-align: center; }");
  expect(css).toContain(".instui-text-align-end { text-align: end; }");
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

test("view is a neutral box primitive", () => {
  expect(viewCss({ prefix: "instui" })).toContain(".instui-view {");
  expect(viewCss({ prefix: "instui" })).toContain("display: block");
});

test("base is an opt-in global reset painting the page surface from tokens", () => {
  const css = baseCss();
  expect(css).toContain("box-sizing: border-box");
  expect(css).toContain(":where(body)");
  expect(css).toContain("color-scheme: light dark");
  expect(css).toContain("background: var(--instui-color-background-page)");
  expect(css).toContain("color: var(--instui-color-text-base)");
  expect(css).toContain("var(--instui-font-family-base)");
  // Base is a global reset only — it must not carry component classes.
  expect(css).not.toContain(".instui-");
});

test("base carries the focus-outline ring for focusables out of the box", () => {
  const css = baseCss();
  // Token defs + a zero-specificity ring on the common focusables, revealed on :focus-visible.
  expect(css).toContain(
    "--instui-focus-outline-color: var(--instui-component-shared-tokens-focus-outline-info-color)",
  );
  expect(css).toContain(":where(a, button, input, select, textarea, summary, [tabindex])");
  expect(css).toContain(":where(:focus-visible)");
  expect(css).toContain(":where(.-focus-color-danger):where(:focus-visible)");
  expect(css).toContain(":where(.-without-focus-animation)");
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

test("heading exposes levels, type variants, colours, and an ai gradient", () => {
  const css = headingCss({ prefix: "instui" });
  expect(css).toContain(".instui-heading.-level-h1");
  expect(css).toContain("var(--instui-component-heading-h1-font-weight)");
  expect(css).toContain(".instui-heading.-variant-title-page");
  expect(css).toContain("var(--instui-component-heading-title-page-desktop-font-size)");
  expect(css).toContain(".instui-heading.-variant-label");
  expect(css).toContain(".instui-heading.-color-secondary");
  expect(css).toContain(".instui-heading.-color-ai");
  expect(css).toContain(".instui-heading.-border-bottom");
});

test("text exposes sizes, weights, colours, and content variants (dash-prefixed compound modifiers)", () => {
  const css = textCss({ prefix: "instui" });
  expect(css).toContain(".instui-text.-size-sm");
  expect(css).toContain("var(--instui-component-text-font-size-x-large)");
  expect(css).toContain(".instui-text.-weight-bold");
  expect(css).toContain(".instui-text.-color-danger");
  expect(css).toContain("var(--instui-component-text-error-color)");
  expect(css).toContain(".instui-text.-variant-description-page");
  expect(css).toContain(".instui-text.-variant-legend");
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

test("checkbox has a toggle-switch variant driven by the toggle tokens", () => {
  const css = checkboxCss({ prefix: "instui" });
  expect(css).toContain(".instui-checkbox.-variant-toggle");
  expect(css).toContain("var(--instui-color-background-muted)");
  expect(css).toContain("var(--instui-component-radio-input-toggle-background-success)");
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]::before');
  // The base (square) control must exclude the toggle variant by its CURRENT class name, or the base
  // rules out-specify the switch and it renders as a checkbox (regression fix).
  expect(css).toContain(":not(.instui-checkbox.-variant-toggle)");
  expect(css).not.toContain(":not(.instui-checkbox.-toggle)");
});

test("checkbox is a custom-appearance control with sizes, error and readonly states", () => {
  const css = checkboxCss({ prefix: "instui" });
  expect(css).toContain("appearance: none");
  expect(css).toContain("var(--instui-component-checkbox-background-checked-color)");
  expect(css).toContain("var(--instui-component-checkbox-border-hover-color)");
  expect(css).toContain(".instui-checkbox.-size-sm");
  expect(css).toContain(".instui-checkbox.-size-lg");
  expect(css).toContain("var(--instui-component-checkbox-error-border-color)");
  expect(css).toContain("var(--instui-component-checkbox-background-readonly-color)");
  // Indeterminate (mixed) fills like checked and swaps the tick for a dash.
  expect(css).toContain('input[type="checkbox"]:indeterminate');
  expect(css).toContain("--pantoken-cb-glyph");
  // The toggle handle carries a state glyph (X off, check on).
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]::after');
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]:checked::after');
  // labelPlacement: end (default), start, top.
  expect(css).toContain(".instui-checkbox.-label-placement-start");
  expect(css).toContain(".instui-checkbox.-label-placement-top");
  expect(css).toContain("row-reverse");
});

test("radio is a custom-appearance control with an inset dot and sizes", () => {
  const css = radioCss({ prefix: "instui" });
  expect(css).toContain("appearance: none");
  expect(css).toContain("var(--instui-component-radio-input-border-selected-color)");
  expect(css).toContain("var(--instui-component-radio-input-checked-inset-md)");
  expect(css).toContain(".instui-radio.-size-sm");
  expect(css).toContain(".instui-radio.-size-lg");
  expect(css).toContain("var(--instui-component-radio-input-background-disabled-color)");
});

test("progress bar has sizes, the full meter palette, and an inverse scheme", () => {
  const css = progressCss({ prefix: "instui" });
  expect(css).toContain(".instui-progress.-size-sm");
  expect(css).toContain(".instui-progress.-size-lg");
  expect(css).toContain("@scope (.instui-progress)");
  expect(css).toContain(".bar.-color-info");
  expect(css).toContain(".bar.-color-warning");
  expect(css).toContain(".bar.-color-alert");
  expect(css).toContain(".instui-progress.-color-inverse");
  expect(css).toContain("var(--instui-component-progress-bar-meter-color-brand-inverse)");
  expect(css).toContain(".instui-progress-value");
});

test("prose styles GFM strikethrough and task lists", () => {
  const css = proseCss();
  expect(css).toContain(".pantoken-prose del");
  expect(css).toContain("line-through");
  expect(css).toContain('.pantoken-prose input[type="checkbox"]');
});

test("prose headings map to the Heading component tokens; body to Text content", () => {
  const css = proseCss();
  // Headings use per-level Heading font size + weight and the single heading line-height/colour.
  expect(css).toContain("var(--instui-component-heading-h1-font-weight)");
  expect(css).toContain("var(--instui-component-heading-h6-font-size)");
  expect(css).toContain("var(--instui-component-heading-line-height)");
  expect(css).toContain("var(--instui-component-heading-base-color)");
  // Body text is the Text \`content\` type style, and <small> is \`contentSmall\`.
  expect(css).toContain("var(--instui-component-text-content-line-height)");
  expect(css).toContain("var(--instui-component-text-content-small-font-size)");
  expect(css).toContain("var(--instui-component-text-content-important-font-weight)");
});
