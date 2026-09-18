---
"@pantoken/docs": patch
---

Add a "Canvas RCE" utility page (`/guide/canvas-rce`) alongside the CDN Picker and Agent Tools
pages, embedding the `canvas-theme-editor` scaffold's live TinyMCE split-pane editor/preview via
iframe. A new `docs/scripts/build-canvas-rce.ts` renders the scaffold template with
`@pantoken/scaffold` and builds it into a static bundle served at `/tools/canvas-rce/`.
