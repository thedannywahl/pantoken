---
"@pantoken/interactions": patch
---

Stop shipping a dedicated `drawer-layout` interaction bundle: the entry point now only applies spacing and uses shared invoker syncing, and `component-capabilities.json` marks `drawer-layout` as `css-only` instead of `both`.
