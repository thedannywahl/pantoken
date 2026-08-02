---
"@pantoken/core": patch
---

`buildTokens({ includeIcons: false })` now skips the icon-plugin stage instead of running it against token-only plugins.

This removes noisy "has no \"icons\" hook" warnings in token-only builds and tests while keeping token hooks unchanged.
