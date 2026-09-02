---
"@pantoken/scaffold": patch
---

feat(scaffold): detect deno alongside npm/pnpm/yarn/bun for the "Next steps" install command

`detectPackageManager()` now recognizes `deno` from `npm_config_user_agent` (set when the CLI is
invoked via `deno run npm:...`/`deno install`'s npm-compat layer), printing `deno install` in the
post-scaffold "Next steps" block instead of falling back to `npm install`.

Also updates the `@pantoken/scaffold`/`@pantoken/ai` READMEs and the `init-pantoken`/
`scaffold-pantoken` Claude Code skills' package-manager substitution guidance and lockfile-detection
table to include `deno.lock`/`deno run npm:<pkg>`/`deno add npm:<pkg>` alongside the existing
npm/pnpm/yarn/bun rows.

Verified that every scaffold platform template (`components`, `react`, `vue`, `web-components`,
`angular`, `svelte`, `next`) already emits its own `package.json` — no further template changes were
needed there. A `pnpm-workspace.yaml` (or similar monorepo-only manifest) is intentionally NOT
emitted: each scaffold is a standalone single-package project, and adding a workspace file would be
incorrect regardless of which package manager the user installs with.
