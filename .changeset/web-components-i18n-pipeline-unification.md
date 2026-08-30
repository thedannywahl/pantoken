---
"@pantoken/web-components": patch
"@pantoken/i18n": patch
---

Unify `@pantoken/web-components`'s locale-string translation pipeline with the generic
`src/i18n.json` + `i18n-cache/*.json` + `translate`/`check:drift` convention already used by
`@pantoken/scaffold` and `@pantoken/ai`, retiring `@pantoken/i18n`'s bespoke
`sha256("wc\0"+key+"\0"+value)`-hashed translation memory (`scripts/build-bundles.ts`,
`scripts/translate-bundles.ts`, `scripts/check-bundle-drift.ts`, and their `scripts/lib/*` helpers).

`@pantoken/web-components` now owns its own `i18n-cache/*.json` (plain-key, migrated from the old
hashed cache with no translation loss) plus `scripts/translate.ts` / `scripts/translate:agy` /
`scripts/check-drift.ts`. `@pantoken/i18n`'s `scripts/build-bundles.ts` reads that cache directly to
build its `LocaleBundle`s — it no longer runs its own translation step; `LocaleBundle`,
`defineBundle`, and `registerLocalized` are unchanged and stay in `@pantoken/i18n`, since they're a
consumption-shape concern (mapping translated strings into `register()`-compatible shapes), not a
translation-pipeline concern.

Root task aliases `ui:translate`/`ui:translate:agy` now point at
`@pantoken/web-components#translate`/`translate:agy`, and `i18n:check:drift` now runs
`@pantoken/web-components#check:drift` instead of `@pantoken/i18n#check:drift`. No change to any
public `@pantoken/i18n` export or generated `LocaleBundle` output (verified byte-identical after
migration).
