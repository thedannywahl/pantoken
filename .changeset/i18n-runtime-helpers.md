---
"@pantoken/i18n-engine": minor
---

Phase 3 (localization-engine plan): runtime helpers for MF2 messages and locale-aware formatting.

- `formatMessage(locale, source, params?)` — formats an MF2 message via `messageformat` (the
  reference implementation). MF2 placeholders are already bidi-isolated by `messageformat`'s own
  default; `isolate()` is for interpolation done outside MF2 formatting.
- `isolate(value)` — wraps a value in Unicode FSI/PDI bidi isolates.
- `formatNumber`/`formatDate`/`formatList`/`formatRelativeTime` — thin locale-bound wrappers over
  `Intl.NumberFormat`/`DateTimeFormat`/`ListFormat`/`RelativeTimeFormat`, so callers never hand-format.

Adds `messageformat` as a new dependency; verified the built bundle stays Node-free (no `node:*`
imports leak in transitively), matching this package's existing browser-shipping constraint.
