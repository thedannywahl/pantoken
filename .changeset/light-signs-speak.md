---
"@pantoken/components": minor
"@pantoken/interactions": minor
"@pantoken/web-components": patch
---

Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
`--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
initialization side effects, and the web component shares the same removal behavior directly.
