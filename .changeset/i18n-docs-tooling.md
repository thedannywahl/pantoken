---
"@pantoken/docs": patch
---

Refactor translation tooling internals; no user-visible change.

- Rename `ClaudeCodeTranslationAdapter` → `AiTranslationAdapter`; `DOCS_TRANSLATION_ADAPTER=claude-code` → `DOCS_TRANSLATION_ADAPTER=ai` across scripts and package.json. The `glossary` adapter is unchanged.
- `TranslationMemory` in `docs/scripts/translation-memory.ts` is now a thin facade over the shared `@pantoken/translation-adapters` core; public API (`load`, `get`, `set`, `save`, `hits`, `misses`) is unchanged.
- `spawnPrompt` and `extractJsonObject` moved to `@pantoken/translation-adapters`; local duplicates removed.
- `agy-wrapper.sh` consolidated into `@pantoken/translation-adapters`; local copies in `docs/scripts/` and `packages/i18n/scripts/` removed. `:agy` script variants added to both pipeline `package.json` files referencing the canonical location.
