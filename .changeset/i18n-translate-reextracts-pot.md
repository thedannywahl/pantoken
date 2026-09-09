---
"@pantoken/i18n-engine": patch
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
"@pantoken/docs": patch
---

fix: `i18n translate` re-extracts the POT, so new source strings actually get translated

`runTranslateMessages` and `runTranslateContent` only ran `msgmerge` against the committed
`l10n/<space>.pot`. Nothing in the repository ever ran `i18n extract`, so a key added to a space's
source (`src/i18n.json`, a guide, a demo) never reached the POT — and therefore never reached the PO
catalogs the AI fill step reads. `i18n check` re-extracted from source, so it reported those keys as
permanently "untranslated" and blocked CI no matter how many times `translate` was run. Every
messages-space POT in the repository had silently drifted.

Both translate paths now re-extract before merging, and `i18n check` reports a stale POT as its own
drift finding instead of leaving it to surface as phantom untranslated units. The drift fix hint no
longer recommends `i18n render`, which is a no-op for messages spaces — their locale bundles are
rebuilt by the owning package's `generate` script.

A single-file messages source now leaves each unit's `reference` empty so the POT records the
space's source path, rather than emitting a bare message key as the file reference.
