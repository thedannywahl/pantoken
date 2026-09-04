---
"@pantoken/i18n-engine": minor
---

Adds `msgctxt` (keyed) support to the PO/POT reader-writer and a real extract/translate/check
pipeline for `"messages"`-kind spaces (e.g. `ui.strings`), generalizing the CLI beyond
`docs.guides`.

- `src/po.ts` — `PoEntry.msgctxt` is a real field now: `parsePo`/`serializePo`/`serializePot` read
  and write `msgctxt "..."` lines. Two units with the same `msgid` but different `msgctxt` stay
  distinct PO entries (previously deduped by `msgid` alone). `serializePot` units may also carry
  per-unit extra `flags`.
- `src/extract-messages.ts` (new) — `parseMessageSource`/`extractMessagesSpace` read a
  `src/i18n.json`-shaped source (bare string, or `{message, translate}`) into keyed `MessageUnit`s.
- `src/pipeline.ts` — `runExtractMessages`/`runTranslateMessages`/`runCheckMessages`/
  `resolveMessagesForLocale`/`messagesLocales` mirror the `docs.guides` functions for any
  `kind: "messages"` space. `resolveMessagesForLocale` is the hook a package's own codegen (e.g.
  `packages/i18n/scripts/build-bundles.ts`) uses to read resolved strings back out.
- `src/cli.ts` — `extract`/`translate`/`check` now dispatch to the messages pipeline for any space
  configured with `kind: "messages"` in `i18n.config.json`, not just `docs.guides`. `render` for a
  messages space is a documented no-op (a messages space's codegen reads PO catalogs directly).
