/**
 * `@pantoken/components` — an InstUI-look CSS component library, built from the `--instui-*` tokens.
 *
 * The shipped stylesheets:
 *
 * - **Base** ({@link baseCss}) — opt-in global document defaults from the tokens (box-sizing, body
 *   reset, page surface, base text colour/font, `color-scheme`). It also carries the focus-outline
 *   ring, so every focusable gets an accessible `:focus-visible` outline out of the box. Load it when
 *   pantoken owns the page.
 * - **Prose** ({@link proseCss}) — styles rendered markdown/prose HTML (tables, headings, links,
 *   lists, code) scoped to a content root, so a docs page or content region looks like InstUI
 *   without swapping the DOM for components. This is what the site renderers ship as their
 *   `components.css`.
 * - **Components** ({@link buttonCss}, {@link alertCss}, {@link badgeCss}, aggregated by
 *   {@link componentsCss}) — class-based component styles you apply to your own markup
 *   (`<button class="instui-button">`), for the InstUI look outside a component framework. The
 *   `--instui-elevation-*` shadow scale ({@link elevationCss}) leads this sheet, since enough
 *   components float that shadows are an intrinsic design attribute rather than an add-on.
 * - **Utilities** ({@link viewCss}, {@link spacingUtilitiesCss}, {@link gapCss}, {@link layoutUtilitiesCss}, plus a
 *   curated semantic-colour/token set) — an opt-in layer of cross-cutting classes. The generic
 *   token→class emitters (`colorUtilitiesCss`, `tokenUtilitiesCss`) live in `@pantoken/utils`; this
 *   package feeds them the curated *semantic* names, while `@pantoken/plugin-primitives` feeds the raw
 *   palette.
 * - **Fonts** (opt-in `fonts.css`) — the `@font-face` rules for the Instructure brand fonts. Base
 *   *applies* the font; `fonts.css` *loads* the woff2s, so text degrades gracefully without it.
 *
 * Everything is pure CSS derived from the token IR, so it tracks InstUI through the tokens with no
 * dependency on the InstUI React packages. For the real, interactive components, use
 * `@pantoken/react-markdown` (content) or `@instructure/ui-*` (apps).
 *
 * This module is a barrel: each documented record lives in its own file under
 * `components/`/`utilities/`/`rules/`/`declarations/`, authored with the `lib/` compose API. The
 * registries (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) drive aggregation + the parity test.
 *
 * @module
 * @beta
 */
import { COMPONENTS } from "./components/index.ts";
import { ns, type ComponentOptions } from "./lib/helpers.ts";
import { base } from "./rules/base/index.ts";
import { focusOutlineRules } from "./declarations/focus/index.ts";

// ── Shared options + prefix ─────────────────────────────────────────────────
export { DEFAULT_PREFIX, type ComponentOptions } from "./lib/helpers.ts";

// ── Rules ───────────────────────────────────────────────────────────────────
export { proseCss, type ProseOptions } from "./rules/prose/index.ts";

/**
 * Build the opt-in base/reset stylesheet: global document defaults from the tokens (box-sizing, body
 * reset, page surface, base text colour/font, `color-scheme`, base link), followed by the focus-ring
 * rules (a document-level default that targets bare focusables). Only the ring *rules* live here — the
 * `--instui-focus-outline-*` custom properties they read ship in the token sheet (`@pantoken/css`), so
 * `base.css` no longer redefines them. Load it once, ahead of the component and prose sheets, when
 * pantoken owns the page.
 *
 * @returns The CSS string.
 */
export function baseCss(): string {
  return `/* InstUI-look base/reset (@pantoken/components) */\n${base.rules("").trim()}\n\n${focusOutlineRules()}`;
}

// ── Declarations ────────────────────────────────────────────────────────────
export {
  ELEVATION_NAMES,
  elevationCss,
  elevationDeclarations,
} from "./declarations/elevation/index.ts";
export {
  FOCUSABLE_SELECTOR,
  focusOutlineCss,
  focusOutlineDeclarations,
  focusOutlineRules,
} from "./declarations/focus/index.ts";

// ── Components ──────────────────────────────────────────────────────────────
export { buttonCss } from "./components/button/index.ts";
export { alertCss } from "./components/alert/index.ts";
export { badgeCss } from "./components/badge/index.ts";
export { pillCss } from "./components/pill/index.ts";
export { tagCss } from "./components/tag/index.ts";
export { avatarCss } from "./components/avatar/index.ts";
export { tabsCss } from "./components/tabs/index.ts";
export { tabsTabCss } from "./components/tabs/members/tab/index.ts";
export { tabsPanelCss } from "./components/tabs/members/panel/index.ts";
export { metricCss } from "./components/metric/index.ts";
export { imgCss } from "./components/img/index.ts";
export { bylineCss } from "./components/byline/index.ts";
export { tableCss } from "./components/table/index.ts";
export { tableHeadCss } from "./components/table/members/head/index.ts";
export { tableBodyCss } from "./components/table/members/body/index.ts";
export { tableRowCss } from "./components/table/members/row/index.ts";
export { tableCellCss } from "./components/table/members/cell/index.ts";
export { tableColHeaderCss } from "./components/table/members/col-header/index.ts";
export { tableRowHeaderCss } from "./components/table/members/row-header/index.ts";
export { linkCss } from "./components/link/index.ts";
export { listCss } from "./components/list/index.ts";
export { listItemCss } from "./components/list/members/item/index.ts";
export { maskCss } from "./components/mask/index.ts";
export { checkboxCss } from "./components/checkbox/index.ts";
export { radioCss } from "./components/radio/index.ts";
export { spinnerCss } from "./components/spinner/index.ts";
export { progressCss } from "./components/progress/index.ts";
export { menuCss } from "./components/menu/index.ts";
export { menuItemCss } from "./components/menu/members/item/index.ts";
export { menuGroupCss } from "./components/menu/members/group/index.ts";
export { menuSeparatorCss } from "./components/menu/members/separator/index.ts";
export { modalCss } from "./components/modal/index.ts";
export { modalHeaderCss } from "./components/modal/members/header/index.ts";
export { modalBodyCss } from "./components/modal/members/body/index.ts";
export { modalFooterCss } from "./components/modal/members/footer/index.ts";
export { breadcrumbCss } from "./components/breadcrumb/index.ts";
export { breadcrumbLinkCss } from "./components/breadcrumb/members/link/index.ts";
export { billboardCss } from "./components/billboard/index.ts";
export { ratingCss } from "./components/rating/index.ts";
export { toggleGroupCss } from "./components/toggle-group/index.ts";
export { contextViewCss } from "./components/context-view/index.ts";
export { progressCircleCss } from "./components/progress-circle/index.ts";
export { paginationCss } from "./components/pagination/index.ts";
export { paginationPageCss } from "./components/pagination/members/page/index.ts";
export { truncateCss } from "./components/truncate/index.ts";
export { toggleDetailsCss } from "./components/toggle-details/index.ts";
export { fileDropCss } from "./components/file-drop/index.ts";
export { sideNavBarCss } from "./components/side-nav-bar/index.ts";
export { sideNavBarItemCss } from "./components/side-nav-bar/members/item/index.ts";
export { treeBrowserCss } from "./components/tree-browser/index.ts";
export { calendarCss } from "./components/calendar/index.ts";
export { calendarDayCss } from "./components/calendar/members/day/index.ts";
export { popoverCss } from "./components/popover/index.ts";
export { trayCss } from "./components/tray/index.ts";
export { tooltipCss } from "./components/tooltip/index.ts";
export { rangeInputCss } from "./components/range-input/index.ts";
export { headingCss } from "./components/heading/index.ts";
export { textCss } from "./components/text/index.ts";
export { closeButtonCss } from "./components/close-button/index.ts";
export { textInputCss } from "./components/text-input/index.ts";
export { textAreaCss } from "./components/text-area/index.ts";
export { simpleSelectCss } from "./components/simple-select/index.ts";
export { inputGroupCss } from "./components/input-group/index.ts";
export { numberInputCss } from "./components/number-input/index.ts";
export { inPlaceEditCss } from "./components/in-place-edit/index.ts";
export { formFieldMessagesCss } from "./components/form-field-messages/index.ts";
export { formFieldCss } from "./components/form-field/index.ts";
export { formFieldGroupCss } from "./components/form-field-group/index.ts";
export { radioInputGroupCss } from "./components/radio-input-group/index.ts";
export { viewCss } from "./components/view/index.ts";

// Bespoke: the experimental customizable-select enhancement (no cssdoc record).
export { selectCss } from "./components/select/index.ts";

// ── Utilities ───────────────────────────────────────────────────────────────
export { spacingUtilitiesCss } from "./utilities/spacing/index.ts";
export { gapCss } from "./utilities/gap/index.ts";
export { layoutUtilitiesCss } from "./utilities/layout/index.ts";
export { responsiveUtilitiesCss } from "./utilities/responsive/index.ts";
export { positionUtilitiesCss } from "./utilities/position/index.ts";
export { overflowUtilitiesCss } from "./utilities/overflow/index.ts";
export { cursorUtilitiesCss } from "./utilities/cursor/index.ts";
export { maskUtilityCss } from "./utilities/mask/index.ts";
export { iconCss } from "./utilities/icon/index.ts";
export { screenReaderContentCss } from "./utilities/screen-reader-content/index.ts";
// Bespoke: the glyph-token half of the icon system (no cssdoc record).
export { iconGlyphsCss, type IconGlyphsOptions } from "./utilities/icon-glyphs/index.ts";

/**
 * Build the aggregated component stylesheet: every component's rules in the `COMPONENTS` concat order.
 * The size-alias and alias twins are appended PER COMPONENT (within its own chunk) so each alias
 * documents on its own page — the aliases are discovered from each record's `@alias {@link -x}` or
 * `@deprecated {@link -x}` metadata (see `withAliases`), not a central hand-kept list. The
 * `--instui-elevation-*` shadow scale the components reference is defined in the token sheet
 * (`@pantoken/css`), so it's no longer inlined here.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 */
export function componentsCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  // Each record's rules() already appends its own size/deprecated-alias twins, so this is a plain concat.
  const rules = COMPONENTS.map((d) => d.rules(ns(prefix), options).trim());
  return `/* InstUI component styles (@pantoken/components) — prefix: ${prefix} */\n${rules.join("\n\n")}\n`;
}
