/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * {@link register} (auto-invoked in the browser) defines the full `<instui-*>` element set into
 * any custom-element registry. Each element renders the matching `@pantoken/components` CSS into
 * its shadow root; tokens are inherited custom properties that pierce the shadow boundary — load
 * `@pantoken/css` to supply them.
 *
 * For localized UI strings (calendar nav labels, date-input placeholder, drilldown Back text) pass
 * `locale`, `strings`, or `dir` options to {@link register}. Use `@pantoken/i18n` for the full
 * Canvas-parity bundle set of 44 locales (3 RTL) and the {@link register}-wrapping
 * `registerLocalized` helper.
 *
 * The module is Node-safe: element classes are defined inside {@link register}, a no-op when there
 * is no DOM, so importing during SSR or a build never touches `HTMLElement`.
 *
 * @module
 * @alpha
 */
import { DEFINITIONS } from "./elements/index.ts";
import type { ElementRegistry } from "./lib/context.ts";
import { NESTED_DEPS } from "./lib/elements-meta.ts";
import {
  buildRegisterContext,
  iconSvg,
  type RegisterContextOptions,
} from "./lib/register-context.ts";

// ── Public types ──────────────────────────────────────────────────────────────
export type {
  CommandEventish,
  ElementDefinition,
  ElementRegistry,
  RegisterContext,
} from "./lib/context.ts";
export type { WebComponentStrings } from "./lib/strings.ts";
export { ENGLISH_STRINGS, makeStrings, resolveFirstDay } from "./lib/strings.ts";
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

/** Expand a requested base-name set to include its transitive {@link NESTED_DEPS}. */
function withNestedDeps(only: readonly string[]): Set<string> {
  const wanted = new Set<string>();
  const add = (name: string): void => {
    if (wanted.has(name)) return;
    wanted.add(name);
    for (const dep of NESTED_DEPS[name] ?? []) add(dep);
  };
  for (const name of only) add(name);
  return wanted;
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 *
 * @param target - The registry to define into (defaults to `globalThis.customElements`).
 * @param options - `prefix` sets the tag prefix, mirroring the CSS layer: pass a non-empty string like
 *   `x` for `<x-icon>`. A prefix is always applied (a custom-element name must contain a hyphen), so an
 *   omitted, empty, or nullish prefix falls back to the default `instui` (`<instui-icon>`). `only` limits
 *   registration to a subset of the `ELEMENTS` base names — its nested render dependencies are pulled in
 *   automatically, so `{ only: ["date-time-input"] }` also defines `date-input` and `calendar`. Omit
 *   `only` to register every element (the default).
 *
 * @example
 * ```ts
 * import { register } from "@pantoken/web-components";
 * import "@pantoken/css"; // defines the --instui-* custom properties the elements read
 *
 * register(); // <instui-button>, <instui-icon>, …
 * register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
 * register(customElements, { only: ["button", "alert"] }); // just those two
 * register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
 * ```
 */
export function register(
  target: ElementRegistry | undefined = globalThis.customElements,
  options: RegisterContextOptions & { only?: readonly string[] } = {},
): void {
  if (!target || typeof HTMLElement === "undefined") return;

  // When `only` is given, expand it through the nested-render dependencies and define just that set;
  // otherwise define every element. The canonical `DEFINITIONS` order is preserved either way, so a
  // nested dependency is always defined before the element that renders it.
  const wanted = options.only ? withNestedDeps(options.only) : null;

  const ctx = buildRegisterContext(options, target, iconSvg);

  for (const def of DEFINITIONS) {
    if (wanted && !wanted.has(def.name)) continue;
    def.define(ctx);
  }
}

// Auto-register in the browser; a no-op everywhere else.
register();
