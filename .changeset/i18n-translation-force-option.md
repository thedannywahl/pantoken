---
"@pantoken/docs": minor
"@pantoken/translation-adapters": minor
"@pantoken/scaffold": minor
"@pantoken/ai": minor
"@pantoken/web-components": minor
---

Added a force/no-cache option to both translation pipelines, so already-cached content can be
retranslated (and overwritten) instead of only ever filling cache misses. Set
`DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
each package's `translate:force`, and the root `i18n:translate:force` umbrella task.
