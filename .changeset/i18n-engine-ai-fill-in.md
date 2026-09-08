---
"@pantoken/i18n-engine": patch
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/web-components": patch
---

Wired real AI translation into the `i18n translate` command for "messages"-kind spaces
(`ui.strings`, `cli.scaffold`, `cli.ai`). Previously `i18n translate` only ran `msgmerge` and always
reported `(no AI provider authorized yet)`, even when translation had already happened out of band —
the pipeline never actually called an AI provider for these spaces.

`runTranslateMessages` now fills empty `msgstr` entries via `I18N_TRANSLATION_COMMAND` /
`I18N_TRANSLATION_COMMAND_ARGS` (same convention as the legacy pipelines), batching untranslated
strings by `provider.batchBudget` and rotating through whichever CLI agent (`claude`/`agy`/
`copilot`) the command points at. It no-ops, leaving every entry untranslated, when the env var is
unset — unchanged behavior for CI and any script that doesn't configure a provider.

`docs.guides` is intentionally not wired through this path — it keeps its own dedicated,
markdown-aware AI pipeline (`docs/scripts/translate-guide-po.ts`).

Added differentiated `translate`/`translate:agy`/`translate:copilot` scripts to
`@pantoken/web-components`, `@pantoken/scaffold`, and `@pantoken/ai` (previously every adapter
variant silently ran the exact same plain script), and updated the root `ui:translate:*`/
`cli:translate:*` umbrella tasks to route to them.
