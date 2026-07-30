---
"@pantoken/model": minor
"@pantoken/core": minor
"@pantoken/plugin-kit": minor
"@pantoken/plugin-deprecations": minor
"@pantoken/plugin-simple-icons": minor
"@pantoken/plugin-stacking": minor
"@pantoken/plugin-transition": minor
---

**Breaking (minor/beta)**: Plugin hook contexts are now data-only to enable Worker thread
serialisation.

- `TokenHookContext` drops the `define` helper; plugins import `defineToken` from
  `@pantoken/model` (or `@pantoken/core` for CSS-syntax inference).
- `IconHookContext` changes from `{ add, resolve }` to `{ icons, theme }` where `icons` is
  a lightweight list of already-registered icon names. The `icons` hook now returns
  `IconEntry[] | void` instead of mutating via `add`.
- `@pantoken/model` exports a new zero-dependency `defineToken(input): Token` helper.
- `@pantoken/plugin-kit` exports `SandboxedPluginEntry`, `isSandboxed`, and `runPluginHook`
  for running individual plugin hooks in an isolated Worker thread (`sandbox: 'thread'`)
  or child process with `--permission` flags (`sandbox: 'process'`).
- All four first-party pantoken plugins migrated to the new context API.
- `extendPlugin` icons composition now merges returned `IconEntry[]` arrays.
