---
"@pantoken/web-components": minor
---

Export `NESTED_DEPS` (alongside the existing `ELEMENTS`) so consumers building tooling around `register()`'s `only` option no longer need to hardcode a copy of the transitive-dependency map.

Add a small IIFE build per element (`dist/<name>.iife.js`, e.g. `dist/alert.iife.js`), alongside the existing "everything" `dist/web-components.iife.js`, for a classic `<script src>` consumer who only wants one custom element. Most stay under ~600 KB (down from the ~2.5 MB monolith); the handful that render an inline icon glyph (`icon`, `calendar`, `date-input`, `drilldown`, `rating`) still bundle the icon set, since they genuinely need it. No behavior change for existing consumers — `register()`'s default icon resolution is unchanged.
