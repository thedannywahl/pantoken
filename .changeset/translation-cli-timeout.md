---
"@pantoken/docs": patch
"@pantoken/translation-adapters": patch
---

Bound every AI translation CLI call with a timeout (`DOCS_TRANSLATION_TIMEOUT_MS`, default 120s) so a
wedged CLI no longer stalls a locale build forever, and run the `copilot`/`agy` wrappers with stdin
from `/dev/null` so they can't block waiting on interactive input. `DOCS_TRANSLATION_LOCALE` now also
accepts a comma/space-separated mix of locale tags and `i18n.config.json` tier names (`primary`,
`secondary`), supports `-` prefixed exclusions (`"-ga"`, `"primary,-hu"`), and rejects a selection
that matches no docs locale.
