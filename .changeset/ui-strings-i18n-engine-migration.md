---
"@pantoken/web-components": minor
"@pantoken/i18n-engine": minor
---

Replaces `@pantoken/web-components`'s legacy `ui.strings` translation pipeline with the
`@pantoken/i18n-engine`-based one, preserving every existing translation.

- `renderers/web-components/src/i18n.json` now uses the `{message, translate}` schema
  (`translate: "optional"` replaces the old `verbatim: "allow"`) instead of `{string, verbatim}`.
- The 44-locale `i18n-cache/*.json` translation memory is migrated, verbatim, into
  `l10n/{locale}/ui.strings.po` (`msgctxt`-keyed by the source's own key, `msgid` the English
  source text) — every translated string was diffed against its source cache and confirmed
  byte-identical before the old cache was deleted.
- `renderers/web-components/scripts/translate.ts` and `check-drift.ts` are deleted. `pnpm
translate`/`pnpm check:drift` now run the real `i18n` CLI (`i18n translate/check ui.strings`)
  against the root `i18n.config.json`.
- `packages/i18n/scripts/build-bundles.ts` now reads resolved strings via
  `resolveMessagesForLocale()` from `@pantoken/i18n-engine` instead of the deleted cache directory.
  The regenerated `src/locales/*.ts` bundles are byte-identical to what they replace — no content
  regression.
- Adds the root `i18n.config.json`, defining the `docs.guides` (content) and `ui.strings`
  (messages) spaces the engine now drives.
