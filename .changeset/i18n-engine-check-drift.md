---
"@pantoken/i18n-engine": minor
---

`i18n check` is now real for `docs.guides`, reusing the existing `DriftReporter` (from
`@pantoken/translation-adapters`, unchanged) rather than a new implementation. Untranslated units are
reported as drift findings per locale, severity resolved from `config.locales.tiers` +
`config.defaults.drift` (a `source`-tier unit blocks by default, everything else warns). `--strict`
escalates every warn to blocking, matching the legacy `I18N_DRIFT_STRICT` convention. `lint`/`stats`
remain not-yet-implemented.
