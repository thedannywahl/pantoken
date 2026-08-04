/**
 * Static element metadata with no other dependencies — no CSS imports, no `@pantoken/icons`. Kept
 * separate from `../index.ts` specifically so build scripts (which run via plain Node, not through
 * this package's own Vite/esbuild pipeline) can import it directly without pulling in the raw `.css`
 * imports the element definitions transitively depend on, which plain Node can't load.
 *
 * @module
 */

/**
 * The base (unprefixed) element names this package registers. {@link register} mints a tag per name
 * under its `prefix` option — `icon` → `<instui-icon>` by default, or `<x-icon>` for `{ prefix: "x" }`.
 * A prefix is always applied (a custom-element name must contain a hyphen), so an empty or nullish prefix
 * falls back to the default `instui`.
 */
export const ELEMENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
] as const;

/**
 * Elements whose shadow markup renders another element, so registering one requires its dependencies
 * too: `<instui-date-time-input>` renders a `<instui-date-input>`, which renders a `<instui-calendar>`.
 * {@link register}'s `only` filter expands through this (transitively) so a cherry-picked subset still
 * works. Keyed by base name; values are direct dependencies.
 */
export const NESTED_DEPS: Readonly<Record<string, readonly string[]>> = {
  "date-input": ["calendar"],
  "date-time-input": ["date-input"],
};

/**
 * Base element names that actually call {@link iconSvg} to render an inline glyph, as opposed to the
 * separate, CSS-only `-icon-<name>` glyph painting most components use (a mask on a CSS custom
 * property, no JS resolution involved). `date-time-input` isn't listed because it doesn't call
 * `iconSvg` itself — it nests `date-input`/`calendar` (see {@link NESTED_DEPS}), which do.
 */
export const ICON_ELEMENTS = ["icon", "calendar", "date-input", "drilldown", "rating"] as const;
