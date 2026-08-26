# @pantoken/scaffold

## 0.4.1

### Patch Changes

- Updated dependencies [f053604]
  - @pantoken/components@1.0.3
  - @pantoken/angular@0.1.27
  - @pantoken/react@0.1.28
  - @pantoken/svelte@0.1.28
  - @pantoken/vue@0.1.28
  - @pantoken/web-components@0.5.8

## 0.4.0

### Minor Changes

- 14c883b: `pantoken-scaffold` and `create-pantoken-app` now share a single CLI implementation
  (`@pantoken/scaffold/cli`). When `--dir` is omitted and stdin is an interactive TTY, the CLI now
  prompts for a target directory instead of silently scaffolding into the current folder. The
  post-scaffold "next steps" message now recommends `vp install` alongside npm/pnpm/yarn/bun.

## 0.3.0

### Minor Changes

- 8aa88bb: Add preset ledger infrastructure and platform presets for scaffold migration to Bingo.

  **Scaffold-Base Package (`@pantoken/scaffold-base`):**

  - Switch template source to `.jsonc` for comment support
  - Generate static `cssdoc.ts` at build time, template remains as source

  **Scaffold Presets:**

  - Create platform presets in `@pantoken/components`, `@pantoken/react`, `@pantoken/vue`, `@pantoken/web-components`
  - Each platform exports `./scaffold-preset` entry point with Bingo-compatible preset definition
  - Presets extend shared scaffold-base with common options (name, cssdoc block, wrapper context)

  **Scaffold Package (`@pantoken/scaffold`):**

  - Introduce `scan-presets.ts` script that discovers all packages exporting `./scaffold-preset`
  - Generate static `preset-ledger.ts` registry at pre-build time, used by CLI to validate platforms
  - Wire preset scanning into scaffold build/test/check pipeline
  - Update `scaffoldProject` function to async, validates platform is in PRESET_LEDGER
  - Update CLI to handle async scaffolding with proper error handling
  - Update scaffold/generate.ts to read cssdoc template from scaffold-base with JSONC parsing (strips comments for output)

  **Key Features:**

  - Decentralized preset ownership: each platform package maintains its own preset definition
  - Static ledger generation enables type-safe platform discovery at runtime
  - JSONC source templates with comments for documentation
  - Foundation for future Bingo template rendering integration (presets are now validated and available)

### Patch Changes

- 8aa88bb: Export `buildIconResolverChain` from `@pantoken/icons` and use it from `@pantoken/rehype` and `@pantoken/markdown-it`, removing the duplicated resolver-chain logic between the two renderers.

  Refactor the `pantoken-ai` CLI's command dispatch and `@pantoken/scaffold`'s JSONC comment stripping to reduce cognitive complexity; no behavior change.

- 8aa88bb: Fix `@pantoken/pantoken`'s published `model.json` (the cssdoc provider model downstream consumers use)
  to include `@global` utility records (spacing/gap/layout/etc.) — previously `buildCssDocModel()` only
  parsed `generated/components.css`, so consumer projects had no way to resolve `--p-lg`-style global
  modifier classes as documented. Wired `model.json` into `@pantoken/scaffold`'s templated `cssdoc.json`
  as a `providers` entry so scaffolded projects pick this up out of the box.
- 8aa88bb: Document the `cssdoc.json` `providers` prefix-rewrite option (requires `@cssdoc/config` with the new
  per-provider `prefix` field) in the scaffolded `cssdoc.json` template, with commented-out examples for
  a custom prefix and a no-separator spelling. No behavior change — the live `providers` entry is
  unchanged, so a default-prefix consumer sees no difference.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/components@1.0.2
  - @pantoken/scaffold-base@0.2.0
  - @pantoken/react@0.1.27
  - @pantoken/vue@0.1.27
  - @pantoken/web-components@0.5.7
  - @pantoken/angular@0.1.26
  - @pantoken/svelte@0.1.27

## 0.2.0

### Minor Changes

- efed45f: Initial release: `npx @pantoken/scaffold <platform>` scaffolds a starter project — `web` (plain HTML/CSS via Vite + TS), `react` (Vite + React), or `next` (Next.js App Router) — with pantoken already installed and wired in. Also usable programmatically via `scaffoldProject`/`SCAFFOLD_PLATFORMS`.
- efed45f: Renamed the `web` platform to `html`, and added two new platforms: `angular` (standalone Angular via Vite, no Angular CLI, using `@pantoken/angular`) and `web-components` (plain Vite + `@pantoken/web-components`, no framework). Every platform's entry markup is now generated at build time from `@pantoken/plugin-layouts`'s `wrapper` app-shell layout (`.container`/`.header`/`.content` parts, via `scripts/wrapper-layout.ts`), so template markup stays in sync automatically when that layout changes.

### Patch Changes

- efed45f: Every scaffold platform (`web`, `react`, `next`) now writes `.vscode/settings.json` (`html.customData`/`css.customData` pointing at `@pantoken/pantoken`'s shipped custom-data JSON) and `.vscode/extensions.json` (recommending `cssdoc.cssdoc-vscode`), and adds `@pantoken/pantoken` as a devDependency so those paths resolve after install.
