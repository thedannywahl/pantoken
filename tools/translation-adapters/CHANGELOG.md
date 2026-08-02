# CHANGELOG

## 0.1.0

Initial release.

- `extractJsonObject` — pull the first `{…}` JSON object from a model response, tolerating prose and code fences.
- `spawnPrompt` — spawn an AI CLI tool, pipe the prompt via stdin, resolve with trimmed stdout.
- `sha256` — SHA-256 hex digest helper used by pipeline `keyFor` functions.
- `TranslationMemory` — content-addressed JSON cache with configurable pruning; shared by the docs and i18n translation pipelines.
