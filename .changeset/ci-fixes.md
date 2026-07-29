---
"@pantoken/pantoken": patch
"@pantoken/typedoc-plugin-demo": patch
"@pantoken/typedoc-plugin-live-example": patch
---

Fix CI failures and resolve CodeQL security findings: add missing @eslint/css dependency; fix file-system-race (TOCTOU) in typedoc-plugin-demo (atomic writes, no existsSync guard), typedoc-plugin-live-example (Dirent-based readdir), and upstream-diff (try/catch instead of existsSync); fix polynomial-redos in utils, drupal, dtcg, figma, core, and react-markdown; fix prototype pollution in dtcg; add top-level permissions: read-all to release and copilot-setup-steps workflows; mark test files as fallow entry points.
