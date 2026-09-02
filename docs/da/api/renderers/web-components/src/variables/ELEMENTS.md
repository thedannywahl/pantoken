[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ELEMENTS

# Variabel: ELEMENTS

> `const` **ELEMENTS**: readonly \[`"icon"`, `"button"`, `"alert"`, `"badge"`, `"pill"`, `"tag"`, `"avatar"`, `"spinner"`, `"progress"`, `"metric"`, `"rating"`, `"progress-circle"`, `"icon-button"`, `"toggle-button"`, `"truncate"`, `"img"`, `"side-nav-bar"`, `"tree-browser"`, `"calendar"`, `"tooltip"`, `"modal"`, `"context-view"`, `"popover"`, `"tray"`, `"in-place-edit"`, `"drilldown"`, `"pages"`, `"drawer-layout"`, `"date-input"`, `"date-time-input"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

De grundlæggende (upræfikserede) elementnavne, som denne pakke registrerer. [register](../functions/register.md) skaber et tag pr. navn
under sin `prefix` mulighed — `icon` → `&lt;instui-icon&gt;` som standard, eller `&lt;x-icon&gt;` for `{ prefix: "x" }`.
Et præfiks anvendes altid (et custom-element-navn skal indeholde en bindestrek), så et tomt eller ugyldigt præfiks
faller tilbage til standarden `instui`.
