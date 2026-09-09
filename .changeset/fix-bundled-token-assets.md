---
"@pantoken/core": patch
"@pantoken/tokens": patch
---

fix(core): keep upstream token assets available to `buildTokens`

The core build now leaves the upstream design-token loader external so its bundled `tokensStudio` assets resolve from the installed dependency. This restores semantic and component tokens when the tokens package regenerates its vendored IR.
