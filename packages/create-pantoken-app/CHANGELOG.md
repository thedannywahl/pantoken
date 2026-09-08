# create-pantoken-app

## 1.0.0

### Major Changes

- 7d964ee: feat(create-pantoken-app): pass --version and --lang through to shared CLI

  Implements Phase 2-3: updates packages/create-pantoken-app/bin/create-pantoken-app.mjs to pass version and locale flag to the rebuilt commander-based CLI via @pantoken/scaffold/cli.

  Bin shim now:

  - Imports runScaffoldCli from @pantoken/scaffold/cli (the shared CLI implementation)
  - Passes package.json version to runScaffoldCli
  - Invocation string remains "npm create pantoken-app --" for help/usage display

  Users can now invoke:

  - npx create-pantoken-app --version
  - npx create-pantoken-app react --lang hu
  - npx create-pantoken-app --help
  - npx create-pantoken-app (interactive TTY prompts platform/directory)
  - npx create-pantoken-app react --yes --dir ./my-app (non-interactive)

  Breaking change: error wording and "Next steps" output changed (inherits from rebuilt scaffold CLI).

### Minor Changes

- 7d964ee: Add a `canvas-theme-editor` scaffold platform (alias `theme-editor`) for Canvas LMS admins: it
  generates upload-ready `theme.css`/`theme.js` for Canvas's Theme Editor — pre-populated with
  pantoken's CDN imports, defaulting to its `rebrand-light` design — plus a local, TinyMCE-based
  preview and a handful of starter Rich Content Editor page templates (hero, callout, two-column,
  rubric note, testimonial) to adapt and paste into Canvas.
- 7d964ee: Add `npx create-pantoken-app generate <target>` — a flat-name alias for `@pantoken/cli` that emits
  native/non-npm design-token source (Swift, Android, Compose, Flutter, ...) instead of scaffolding a
  starter project. `create-pantoken-app <platform>` (scaffolding) is unchanged.

### Patch Changes

- 7d964ee: test: rewrite CLI test suites for the commander-based rewrite (Phase 5)

  Adds/rewrites test coverage for the Phase 1/4 CLI rebuild:

  - `packages/scaffold/tests/cli.test.ts`: fully rewritten for the commander-based
    `cli.ts` (was still testing the old readline-based API). Covers `shouldPrompt`,
    `detectPackageManager`, `validateScaffoldPlatform`, `printNextSteps`,
    `resolveScaffoldTarget` (including clack prompt/cancel paths), `scaffoldWithSpinner`,
    and `createScaffoldCommand`/`runScaffoldCli` end-to-end (help, version, invalid
    flags/platform, `--yes`, successful scaffold, failure reporting).
  - `packages/scaffold/tests/locale.test.ts` (new): covers `detectLocale`
    (--lang flag, LC_ALL/LANG env, Intl fallback, English default) and
    `createLocaleLookup` (fallback chains, `{{param}}` substitution).
  - `ai/pantoken-ai/tests/cli.test.ts` (new): covers `createAiCommand`/`runAiCli`'s
    `init` and `scaffold` subcommands, including a real bug fix (see below).
  - `packages/create-pantoken-app/tests/index.test.ts`: updated the "next steps"
    assertion for the rebuilt CLI's package-manager-aware install line, added
    `--version` and `--yes`-without-platform coverage.

  **Bug fix**: `pantoken-ai scaffold <invalid-platform>` previously failed silently
  (exit 1, no error message) because platform validation was called manually inside
  the action handler instead of registered as the argument's `argParser` — so
  commander's own error-formatting/printing pipeline never saw it. Fixed by
  registering `validateScaffoldPlatform` as the `[platform]` argument's `argParser`,
  matching how `@pantoken/scaffold`'s own CLI already does it.

  Also fixes a `spawnPrompt()` call-signature bug in both packages' `scripts/translate.ts`
  (was passing an options object as the second argument instead of `(command, args,
prompt, context?)`), and an `isolatedDeclarations` build failure in each package's
  generated `locales/index.ts` (needed an explicit `Record<string, Record<string,
string>>` type annotation on the generator template).

- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
  - @pantoken/scaffold@1.0.0
  - @pantoken/cli@0.1.28

## 0.3.1

### Patch Changes

- @pantoken/scaffold@0.4.1

## 0.3.0

### Minor Changes

- 14c883b: `pantoken-scaffold` and `create-pantoken-app` now share a single CLI implementation
  (`@pantoken/scaffold/cli`). When `--dir` is omitted and stdin is an interactive TTY, the CLI now
  prompts for a target directory instead of silently scaffolding into the current folder. The
  post-scaffold "next steps" message now recommends `vp install` alongside npm/pnpm/yarn/bun.

### Patch Changes

- Updated dependencies [14c883b]
  - @pantoken/scaffold@0.4.0

## 0.2.0

### Minor Changes

- 8aa88bb: Add `create-pantoken-app`, a flat-name npm alias for `@pantoken/scaffold` so `npm create
pantoken-app` (and `npm init pantoken-app`) work the way npm's `create-*` convention expects.
  Same CLI and platforms as `npx @pantoken/scaffold <platform>`.

### Patch Changes

- 8aa88bb: Simplify the README: a shorter blurb, `## Getting started` heading, and a
  single `npx create-pantoken-app <platform>` command instead of a hard-coded
  example, plus a link to the full docs.
- 8aa88bb: Reduce CLI complexity and clone-group duplication in the create/app bootstrap commands, and clean up audit/workspace-discovery friction in fallow config.

  Also includes non-breaking internal refactors in supporting CSS and rehype helper paths that remove duplicate-block findings from quality checks.

- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/scaffold@0.3.0
