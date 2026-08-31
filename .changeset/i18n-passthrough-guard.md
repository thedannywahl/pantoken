---
"@pantoken/translation-adapters": minor
"@pantoken/scaffold": patch
---

`runI18nTranslationCli` now detects and guards against a silently-failing AI translator that echoes
the English source back untranslated instead of raising an error. New/re-checked cache entries whose
value is a trimmed, case-insensitive match of their source string are no longer written to
`i18n-cache/*.json`, and any previously-cached entry matching this pattern is reset so it's retried on
the next translate run — a warning is logged in both cases. Also warns and skips (instead of silently
dropping) a response value that's missing, non-string, or empty. `@pantoken/scaffold`'s translate
script now passes a `cachedValue` option so its legacy sha256-hash-keyed cache entries are covered by
the same audit.
