# CHANGELOG

## 0.2.0

### Minor Changes

- 40987c4: Add `TranslationMemory` and `sha256` to the shared adapter primitives.

  `TranslationMemory` is a content-addressed translation cache backed by a committed JSON file, parameterised by a `prune` option. Both the docs and i18n pipelines now use it as their shared cache core, wrapping it with pipeline-specific key-construction logic and factory methods.

  `sha256(input)` is a thin helper over `node:crypto` used by both pipeline `keyFor` functions.

## 0.1.0

Initial release.

- `extractJsonObject` — pull the first `{…}` JSON object from a model response, tolerating prose and code fences.
- `spawnPrompt` — spawn an AI CLI tool, pipe the prompt via stdin, resolve with trimmed stdout.
- `sha256` — SHA-256 hex digest helper used by pipeline `keyFor` functions.
- `TranslationMemory` — content-addressed JSON cache with configurable pruning; shared by the docs and i18n translation pipelines.
