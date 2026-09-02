[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ELEMENTS

# Varyab: ELEMENTS

> `const` **ELEMENTS**: readonly \[`"icon"`, `"button"`, `"alert"`, `"badge"`, `"pill"`, `"tag"`, `"avatar"`, `"spinner"`, `"progress"`, `"metric"`, `"rating"`, `"progress-circle"`, `"icon-button"`, `"toggle-button"`, `"truncate"`, `"img"`, `"side-nav-bar"`, `"tree-browser"`, `"calendar"`, `"tooltip"`, `"modal"`, `"context-view"`, `"popover"`, `"tray"`, `"in-place-edit"`, `"drilldown"`, `"pages"`, `"drawer-layout"`, `"date-input"`, `"date-time-input"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

The base (unprefixed) element names this package registers. [register](../functions/register.md) mints a tag per name
under its `prefix` option — `icon` → `&lt;instui-icon&gt;` by default, or `&lt;x-icon&gt;` for `{ prefix: "x" }`.
A prefix is always applied (a custom-element name must contain a hyphen), so an empty or nullish prefix
falls back to the default `instui`.
