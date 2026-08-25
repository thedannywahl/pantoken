---
"@pantoken/tokens": minor
---

Retire two deprecation shims that passed their removeIn window:

- --instui-component-truncate-text-line-height
- --instui-component-badge-notification-z-index

This aligns deprecations with the current upstream contract and unblocks the upstream-drift gate.
