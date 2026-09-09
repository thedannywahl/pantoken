---
"@pantoken/docs": patch
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

fix: the `:force` translation tasks now actually force, and docs chrome/demo catalogs merge

`ui:translate:force` and `cli:translate:force` (and their `:agy` / `:copilot` variants) ran commands
byte-identical to their non-force twins. `docs:locales:translate:force` exported
`DOCS_TRANSLATION_FORCE=1`, which no script read. Both paths now retranslate for real — the CLI
tasks through `i18n translate --force`, and the docs scripts through a translation-memory lookup that
misses on purpose while the environment variable is set.

`docs:chrome:locales` and `docs:demos:locales` parsed each locale's PO file directly and never merged
it against a template, so a new key in `docs/.vitepress/i18n.json` or a `demos/*/i18n.json` could not
reach them. They now extract and `msgmerge` first.

New `ui:extract`, `cli:extract`, `docs:extract`, and `i18n:extract` tasks refresh a catalog template
from its source without spending translation credits.
