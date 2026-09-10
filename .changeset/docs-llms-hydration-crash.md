---
"@pantoken/docs": patch
---

Fix a hydration crash that broke every English page on direct load. `vitepress-plugin-llms` was restricted to the client build pass, but its `transform` injects a hidden "Are you an LLM?" hint into each page, so the server HTML rendered one child fewer than the client expected and Vue threw before mounting. The plugin now runs on both passes.
