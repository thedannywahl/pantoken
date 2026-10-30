---
"@pantoken/interactions": minor
---

Support custom class prefixes. The auto-init bundles resolve their selectors against `data-prefix` on the script tag (or `window.PANTOKEN_PREFIX`), defaulting to `instui`. `initCloseButton` and `initRemove` accept a `prefix` option, and `withPrefix`/`ns` are exported.
