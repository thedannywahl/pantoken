# CHANGELOG

## 0.1.5

### Patch Changes

- 7879f6b: support exporting individual icons

## 0.1.4

### Patch Changes

- 40987c4: Refactor translation tooling internals; no user-visible change.

  - Rename `ClaudeCodeTranslationAdapter` → `AiTranslationAdapter`; `DOCS_TRANSLATION_ADAPTER=claude-code` → `DOCS_TRANSLATION_ADAPTER=ai` across scripts and package.json. The `glossary` adapter is unchanged.
  - `TranslationMemory` in `docs/scripts/translation-memory.ts` is now a thin facade over the shared `@pantoken/translation-adapters` core; public API (`load`, `get`, `set`, `save`, `hits`, `misses`) is unchanged.
  - `spawnPrompt` and `extractJsonObject` moved to `@pantoken/translation-adapters`; local duplicates removed.
  - `agy-wrapper.sh` consolidated into `@pantoken/translation-adapters`; local copies in `docs/scripts/` and `packages/i18n/scripts/` removed. `:agy` script variants added to both pipeline `package.json` files referencing the canonical location.

## 0.1.3

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

## 0.1.2

### Patch Changes

- 2b814bd: Restore elevation and focus-outline foundation variables in the docs site's custom multi-theme token sheet.

## 0.1.1

### Patch Changes

- 2e5bb88: Final refactor of syntaxFromChain to eliminate high-complexity threshold by extracting token processing logic into processTokenInChain helper function.
- 2e5bb88: Further refactor build-css-api by extracting micro-functions for syntax inference and token chain traversal to reduce cyclomatic complexity of remaining functions.
- 2e5bb88: Refactor build-css-api functions (inferSyntax, syntaxFromChain, resolveSyntax, resolveToken, makeImportSnippet) to reduce cyclomatic complexity by extracting helper functions and simplifying conditional logic.

## 0.1.0

### Added

- Initial release of @pantoken/docs.
