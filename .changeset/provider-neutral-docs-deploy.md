---
"@pantoken/docs": patch
---

Rename the docs deploy tooling to provider-neutral names: `docs/cloudflare/` is now `docs/edge/`, `prepare-cloudflare-deploy.ts` is `prepare-deploy.ts`, and `sync-cloudflare-r2.ts` is `sync-assets.ts`. Deploy trees now write to `docs/.vitepress/deploy-site` and `docs/.vitepress/deploy-assets`, the `CLOUDFLARE_R2_*` script knobs become `DOCS_ASSETS_*`, and `DOCS_CF_*` become `DOCS_DEPLOY_*`. The `docs:deploy:sync-r2` script is now `docs:deploy:sync-assets`.
