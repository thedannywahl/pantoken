---
"@pantoken/scaffold": patch
---

fix: pre-approve `core-js`/`ttf2woff2` install scripts in scaffold templates

Every scaffolded project depends on `@pantoken/pantoken`, which transitively pulls in `core-js` and
`ttf2woff2` as subdependencies with install/postinstall scripts. Newer npm versions block those
scripts by default (`allowScripts`) and bun's default-secure install does the same
(`trustedDependencies`), both printing a warning after `npm create pantoken-app`/`create-pantoken-app`
finishes installing. pnpm's equivalent gate (`allowBuilds`) only lives in `pnpm-workspace.yaml`, not
`package.json`.

Each scaffold template now ships pre-approved entries for both packages — `allowScripts` and
`trustedDependencies` in `package.json`, and a minimal `pnpm-workspace.yaml` — so a fresh install
under npm, pnpm, or bun completes without install-script warnings.
