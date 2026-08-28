---
"@pantoken/docs": patch
---

Import `CDN_PICKER_DEFAULTS` into the `en` locale's `cdnPicker` block instead of re-typing it (they
were required to stay identical anyway), and split `useCommandCycle`'s `scheduleNext` into one small
handler per phase, each covered by a new test suite.
