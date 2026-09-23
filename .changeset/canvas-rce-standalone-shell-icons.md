---
"@pantoken/scaffold": patch
---

Fix the canvas theme editor scaffold's standalone app shell (shown when the scaffolded app is opened directly, outside the docs' embedding iframe) throwing on load because its Lucide icons were called as functions instead of rendered with Lucide's `createElement` helper — this silently broke every script that ran after it, including TinyMCE initialization and the download/copy buttons.
