---
"@pantoken/i18n-engine": minor
---

Resolve the locale universe from committed catalogs so wildcard tiers actually enumerate.

`locales.tiers` patterns classify a locale; they can't enumerate one. Reading the set of known
locales out of the tier lists meant a `secondary: ["*"]` catch-all contributed nothing, so
`translate`, `render`, and `check` silently covered only the handful of tags spelled out
explicitly — two locales in this repository, while `lint` and `stats` (which read the `l10n/` tree)
reported all 44.

The new `knownLocales(config, configDir)` is the single source of truth: one locale per committed
catalog directory, unioned with any exact tag named in a tier. `contentLocales` and
`messagesLocales` now take `configDir` as their second argument.

Expect previously hidden drift to surface the first time a space is checked after this change: the
untranslated entries were always there, just outside the locale set the checker looked at.
