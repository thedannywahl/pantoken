---
"@pantoken/canvas-theme-editor": patch
"@pantoken/scaffold": patch
---

`theme.js` no longer waits on a `DOMContentLoaded` listener (Canvas loads Theme Editor JS after the
page is already interactive, so the listener never fired) — it now loads
`@pantoken/interactions`' IIFE bundle from the CDN, wiring up every component's behavior (modal,
tooltip, drilldown, etc.) against the page's existing markup.
