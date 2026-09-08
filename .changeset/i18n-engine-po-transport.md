---
"@pantoken/i18n-engine": minor
---

Phase 2 building block (localization-engine plan): the PO transport layer.

- `src/po.ts` — a minimal gettext PO/POT reader/writer: `parsePo`/`serializePo`/`serializePot`,
  handling `msgid`/`msgstr` (single- and multi-line quoted strings), `#:` reference comments, `#,`
  flag comments (including `fuzzy`), and `#~` obsolete entries. Never re-implements `msgmerge`'s
  fuzzy-matching.
- `src/gettext.ts` — shells out to the real `msgmerge`/`msgfmt` binaries: `mergePoWithTemplate`
  (update-in-place, seeding a new PO from the template), `checkPoFile` (`msgfmt --statistics -c`),
  and `isGettextAvailable`. Verified against real binaries: a reworded source string is fuzzy-matched
  (prior translation preserved, not lost); a removed-but-translated string survives as `#~` obsolete;
  an untranslated removed string is correctly discarded (nothing to preserve); an invalid PO
  (duplicate `msgid`) throws instead of returning bogus statistics.
