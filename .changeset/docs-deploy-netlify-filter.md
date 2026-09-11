---
"@pantoken/docs": patch
---

Fix the "Deploy to Netlify" step failing with `Error: Projects detected: ...` and refusing to deploy. Netlify CLI 16+ scans for a pnpm workspace and, run from the repo root, won't guess which of this monorepo's ~100 packages to deploy without a `--filter`, even with `NETLIFY_SITE_ID` set. The deploy command now passes `--filter "@pantoken/docs"`.
