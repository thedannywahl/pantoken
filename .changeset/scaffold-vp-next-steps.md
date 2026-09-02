---
"@pantoken/scaffold": minor
"@pantoken/ai": patch
---

feat(scaffold): detect `vp`/`vpx` and drive "Next steps" from per-template `scaffold.json`

`detectPackageManager()` now falls back to `"vp"` when the running Node binary is Vite+-managed
(`process.execPath` resolves under a `vite-plus` directory) — `vp`/`vpx` set no
`npm_config_user_agent`, unlike npm/pnpm/yarn/bun/deno, so this is the only available signal.

The post-scaffold "Next steps" block is now schema-driven: a template directory may carry an
optional `scaffold.json` (`nextSteps`/`notes`/`caveats`, authored in English with `{{dir}}`,
`{{pm}}`, `{{install}}`, `{{run}}`, `{{execute}}`, and `{{dev}}` placeholders) that overrides the
generic cd/install/run-script fallback. `canvas-theme-editor` is the first template to use one, so
scaffolding it via `vp`/`vpx` now prints `vp install` / `vp run preview` (plus upload/RCE-sanitization
notes) instead of a generic "start the dev server" line. Every authored `scaffold.json` string flows
through the same `src/i18n.json` → `i18n-cache/*.json` → `generated/locales/*.ts` translation
pipeline as the CLI's existing static copy.

`printNextSteps()` now takes an additional (optional) resolved-platform argument; `@pantoken/ai`'s
`scaffold` subcommand passes it through so its output benefits from the same template-driven copy.
