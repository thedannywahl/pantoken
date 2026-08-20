---
"@pantoken/components": minor
---

Update truncate to apply line clamping on the base class and remove the `-lines` modifier contract.

The `truncate` component now reads `--lines` directly on `.instui-truncate` / `.pfx-truncate` and no longer exposes a separate `-lines` modifier path.
