---
"@pantoken/i18n-engine": minor
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

feat: implement the four declared-but-dead `i18n translate` options

`--locale` was the only option the `translate` action ever read. The rest were parsed and discarded:

- `--force` retranslates entries that already have a `msgstr`.
- `--tier <tier>` narrows the run to one `locales.tiers` entry, and rejects an unknown tier name
  rather than silently translating nothing.
- `--provider <profile>` selects a `provider.profiles` entry for the command, model, and effort.
  Profiles gained a `command` field (a path with a separator resolves against the config directory),
  so the per-package `I18N_TRANSLATION_COMMAND` plumbing is no longer needed —
  `--provider copilot` is enough. `I18N_TRANSLATION_COMMAND` and `I18N_TRANSLATION_COMMAND_ARGS`
  still override a resolved profile when set.
- `--concurrency <n>` bounds how many provider calls run at once. Batches were previously awaited
  strictly one at a time, so the `concurrency` already declared on every provider profile did
  nothing.
