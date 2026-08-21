---
"@pantoken/components": patch
---

Embed each `@memberOf` member's ancestor path in its own `@structure` via `@component <parent> { … }`
(replacing the older `@scope (.pfx-<parent>) { … }` doc wrapper), and complete parent-side `@structure`
blocks (`breadcrumb`, `calendar`, `list`, `menu`, `modal`, `pagination`, `side-nav-bar`, `table`, `tabs`)
so every documented member appears in its parent's structure tree.
