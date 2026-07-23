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
 * - **Utilities** ({@link viewCss}, {@link spacingUtilitiesCss}, {@link layoutUtilitiesCss}, plus a
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
import { base } from "./rules/base.ts";
import { focusOutlineRules } from "./declarations/focus.ts";

// ── Shared options + prefix ─────────────────────────────────────────────────
export { DEFAULT_PREFIX, type ComponentOptions } from "./lib/helpers.ts";

// ── Rules ───────────────────────────────────────────────────────────────────
export { proseCss, type ProseOptions } from "./rules/prose.ts";

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
export { ELEVATION_NAMES, elevationCss, elevationDeclarations } from "./declarations/elevation.ts";
export {
  FOCUSABLE_SELECTOR,
  focusOutlineCss,
  focusOutlineDeclarations,
  focusOutlineRules,
} from "./declarations/focus.ts";

// ── Components ──────────────────────────────────────────────────────────────
export { buttonCss } from "./components/button.ts";
export { alertCss } from "./components/alert.ts";
export { badgeCss } from "./components/badge.ts";
export { pillCss } from "./components/pill.ts";
export { tagCss } from "./components/tag.ts";
export { avatarCss } from "./components/avatar.ts";
export { tabsCss } from "./components/tabs.ts";
export { metricCss } from "./components/metric.ts";
export { imgCss } from "./components/img.ts";
export { bylineCss } from "./components/byline.ts";
export { tableCss } from "./components/table.ts";
export { linkCss } from "./components/link.ts";
export { listCss } from "./components/list.ts";
export { checkboxCss } from "./components/checkbox.ts";
export { radioCss } from "./components/radio.ts";
export { spinnerCss } from "./components/spinner.ts";
export { progressCss } from "./components/progress.ts";
export { menuCss } from "./components/menu.ts";
export { modalCss } from "./components/modal.ts";
export { breadcrumbCss } from "./components/breadcrumb.ts";
export { billboardCss } from "./components/billboard.ts";
export { ratingCss } from "./components/rating.ts";
export { toggleGroupCss } from "./components/toggle-group.ts";
export { contextViewCss } from "./components/context-view.ts";
export { progressCircleCss } from "./components/progress-circle.ts";
export { paginationCss } from "./components/pagination.ts";
export { truncateCss } from "./components/truncate.ts";
export { toggleDetailsCss } from "./components/toggle-details.ts";
export { fileDropCss } from "./components/file-drop.ts";
export { sideNavBarCss } from "./components/side-nav-bar.ts";
export { treeBrowserCss } from "./components/tree-browser.ts";
export { calendarCss } from "./components/calendar.ts";
export { popoverCss } from "./components/popover.ts";
export { trayCss } from "./components/tray.ts";
export { tooltipCss } from "./components/tooltip.ts";
export { rangeInputCss } from "./components/range-input.ts";
export { headingCss } from "./components/heading.ts";
export { textCss } from "./components/text.ts";
export { closeButtonCss } from "./components/close-button.ts";
export { textInputCss } from "./components/text-input.ts";
export { textAreaCss } from "./components/text-area.ts";
export { simpleSelectCss } from "./components/simple-select.ts";
export { inputGroupCss } from "./components/input-group.ts";
export { numberInputCss } from "./components/number-input.ts";
export { inPlaceEditCss } from "./components/in-place-edit.ts";
export { formFieldMessagesCss } from "./components/form-field-messages.ts";
export { formFieldCss } from "./components/form-field.ts";
export { formFieldGroupCss } from "./components/form-field-group.ts";
export { radioInputGroupCss } from "./components/radio-input-group.ts";

// Bespoke: the experimental customizable-select enhancement (no cssdoc record).
export { selectCss } from "./components/select.ts";

// ── Utilities ───────────────────────────────────────────────────────────────
export { viewCss } from "./utilities/view.ts";
export { spacingUtilitiesCss } from "./utilities/spacing.ts";
export { layoutUtilitiesCss } from "./utilities/layout.ts";
export { responsiveUtilitiesCss } from "./utilities/responsive.ts";
export { iconCss } from "./utilities/icon.ts";
export { maskCss } from "./utilities/mask.ts";
export { screenReaderContentCss } from "./utilities/screen-reader-content.ts";
// Bespoke: the glyph-token half of the icon system (no cssdoc record).
export { iconGlyphsCss, type IconGlyphsOptions } from "./utilities/icon-glyphs.ts";

/**
 * Build the aggregated component stylesheet: every component's rules in the `COMPONENTS` concat order.
 * The size-alias and deprecated-alias twins are appended PER COMPONENT (within its own chunk) so each
 * alias documents on its own page — the deprecated aliases are discovered from each record's
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
