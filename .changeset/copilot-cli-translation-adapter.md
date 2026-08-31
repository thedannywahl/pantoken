---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/web-components": patch
---

Added a GitHub Copilot CLI translation adapter (`tools/translation-adapters/copilot-wrapper.sh`) and
wired `translate:copilot` / `translate:copilot:force` scripts plus root `i18n:translate:copilot` /
`i18n:translate:force:copilot` umbrella tasks across the UI, docs, and CLI i18n pipelines, matching
the existing `agy` adapter wiring. Defaults to `--model gpt-5-mini --effort low`, the cheapest model
with reasoning-effort support and its minimum effort level — plenty for literal UI-string
translation and far cheaper than the CLI's `auto` model selection.

Pinned the same "cheapest capable tier, minimum effort" defaults for the `agy` and `claude`
adapters: `agy` scripts now default to `--model gemini-3.6-flash-low` (agy bakes reasoning effort
into the model name), and `claude`/direct-invocation scripts (`translate`, `translate:force`, and
the docs pipeline's `:claude` scripts) now pin `--model claude-haiku-4-5-20251001 --effort low`
instead of relying on unset defaults.
