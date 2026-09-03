/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * {@link register} (auto-invoked in the browser) defines the full `<instui-*>` element set into
 * any custom-element registry. Each element renders the matching `@pantoken/components` CSS into
 * its shadow root; tokens are inherited custom properties that pierce the shadow boundary — load
 * `@pantoken/css` to supply them.
 *
 * For localized UI strings (calendar nav labels, date-input placeholder, drilldown Back text) pass
 * `locale`, `strings`, or `dir` options to {@link register}. The full Canvas-parity bundle set and
 * the {@link registerLocalized} helper are exported from this package as well.
 *
 * The module is Node-safe: element classes are defined inside {@link register}, a no-op when there
 * is no DOM, so importing during SSR or a build never touches `HTMLElement`.
 *
 * @module
 * @alpha
 */
import { register } from "./register.ts";

// ── Public types ──────────────────────────────────────────────────────────────
export type {
  CommandEventish,
  ElementDefinition,
  ElementRegistry,
  RegisterContext,
} from "./lib/context.ts";
export type { WebComponentStrings } from "./lib/strings.ts";
export { ENGLISH_STRINGS, makeStrings, resolveFirstDay } from "./lib/strings.ts";
export * from "./i18n.ts";
// Metadata with no CSS/@pantoken/icons dependencies, defined in ./lib/elements-meta.ts — re-exported
// here so the public API is unchanged; build scripts import that module directly instead (see its own
// doc comment for why).
export { ELEMENTS, ICON_ELEMENTS, NESTED_DEPS } from "./lib/elements-meta.ts";
// Context-building machinery, defined in ./lib/register-context.ts (also with no top-level side
// effects — the per-element CDN build imports it directly for the same reason).
export {
  buildRegisterContext,
  DEFAULT_PREFIX,
  iconSvg,
  noopIconSvg,
  type RegisterContextOptions,
} from "./lib/register-context.ts";

// ── Element definitions ─────────────────────────────────────────────────────────
export { register } from "./register.ts";
export { DEFINITIONS } from "./elements/index.ts";
export { alert } from "./elements/alert.ts";
export { avatar } from "./elements/avatar.ts";
export { badge } from "./elements/badge.ts";
export { button } from "./elements/button.ts";
export { calendar } from "./elements/calendar.ts";
export { contextView } from "./elements/context-view.ts";
export { dateInput } from "./elements/date-input.ts";
export { dateTimeInput } from "./elements/date-time-input.ts";
export { drawerLayout } from "./elements/drawer-layout.ts";
export { drilldown } from "./elements/drilldown.ts";
export { icon } from "./elements/icon.ts";
export { iconButton } from "./elements/icon-button.ts";
export { img } from "./elements/img.ts";
export { inPlaceEdit } from "./elements/in-place-edit.ts";
export { metric } from "./elements/metric.ts";
export { modal } from "./elements/modal.ts";
export { pages } from "./elements/pages.ts";
export { pill } from "./elements/pill.ts";
export { popover } from "./elements/popover.ts";
export { progress } from "./elements/progress.ts";
export { progressCircle } from "./elements/progress-circle.ts";
export { rating } from "./elements/rating.ts";
export { sideNavBar } from "./elements/side-nav-bar.ts";
export { spinner } from "./elements/spinner.ts";
export { tag } from "./elements/tag.ts";
export { toggleButton } from "./elements/toggle-button.ts";
export { tooltip } from "./elements/tooltip.ts";
export { tray } from "./elements/tray.ts";
export { treeBrowser } from "./elements/tree-browser.ts";
export { truncate } from "./elements/truncate.ts";

// Auto-register in the browser; a no-op everywhere else.
register();
