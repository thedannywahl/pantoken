---
"@pantoken/plugin-custom-components": minor
"@pantoken/plugin-layouts": minor
---

Publish `./model.json` — a cssdoc `CssDocEntry[]` provider model for the documented `card`/`agent-shell`
(custom-components) and `wrapper` (layouts) records, built from the unminified generated CSS (the
published `.css` exports are minified and strip doc comments, so they can't be used as raw-CSS
providers). Downstream consumers can now wire these packages into their own `cssdoc.json` `providers`
array, the same way `@pantoken/pantoken/model.json` already works for `@pantoken/components`.
